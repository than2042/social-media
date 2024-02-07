import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "../styles/CreatePost.css";

const LikeBtn = async ({ post_id }) => {
  const { userId } = auth();

  const likeCount =
    await sql`SELECT * FROM sm_like WHERE sm_post_id = ${post_id}`;

  const likes = await sql`SELECT sm_like.id, sm_user.username
      FROM sm_like
      INNER JOIN sm_user
      ON sm_like.sm_user_id = sm_user.clerk_user_id
      WHERE sm_like.sm_post_id = ${post_id}`;

  const likedRes =
    await sql`SELECT * FROM sm_like WHERE sm_post_id = ${post_id} AND sm_user_id = ${userId}`;
  const hasLiked = likedRes.rows.length >= 0;

  const handleLike = async () => {
    "use server";

    !hasLiked
      ? await sql`INSERT INTO sm_like ( sm_post_id, sm_user_id) VALUES ( ${post_id},${userId})`
      : await sql`DELETE FROM sm_like WHERE sm_post_id = ${post_id} AND sm_user_id = ${userId}`;

    await sql`INSERT INTO sm_like ( sm_post_id, sm_user_id) VALUES ( ${post_id},${userId})`;
    revalidatePath(`/`);
    redirect("/");
  };

  return (
    <div className="likeCount">
      <form className="likeForm" action={handleLike}>
        {likes.rows.map((like) => (
          <p key={likes.id + likes.username}>{like.username}</p>
        ))}
        <p>Likes: {likeCount.rows.length}</p>
        <button className="likeBtn" type="submit">
          {hasLiked && <ThumbUpIcon />}
        </button>
      </form>
    </div>
  );
};

export default LikeBtn;

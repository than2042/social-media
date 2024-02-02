import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import "../styles/CreatePost.css";

const LikeBtn = async ({ post_id }) => {
  const { userId } = auth();

  const likeCount =
    await sql`SELECT * FROM sm_like WHERE sm_post_id = ${post_id}`;

  const likedRes =
    await sql`SELECT * FROM sm_like WHERE sm_post_id = ${post_id} AND sm_user_id = ${userId}`;
  const hasLiked = likedRes.rows.length >= 0;

  const handleLike = async () => {
    "use server";
    {
      !hasLiked
        ? await sql`INSERT INTO sm_like ( sm_post_id, sm_user_id) VALUES ( ${post_id},${userId})`
        : await sql`DELETE FROM sm_like WHERE sm_post_id = ${post_id} AND sm_user_id = ${userId}`;
    }

    await sql`INSERT INTO sm_like ( sm_post_id, sm_user_id) VALUES ( ${post_id},${userId})`;
    revalidatePath(`/`);
  };

  return (
    <div className="likeCount">
      <form action={handleLike}>
        <p>Count: {likeCount.rows.length}</p>
        <button className="likeBtn" type="submit">
          {hasLiked && <ThumbUpIcon />}
        </button>
      </form>
    </div>
  );
};

export default LikeBtn;

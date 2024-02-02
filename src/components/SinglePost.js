import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CommentForm from "@/components/CommentModal";

// import "./page.css";

const SinglePost = async ({ params }) => {
  ("use server");
  const post = await sql`SELECT * FROM sm_post WHERE id = ${params.postId}`;
  console.log(post, "pst");

  // const comments =
  //   await sql`SELECT * FROM sm_comment WHERE sm_post_id = ${params.postId}`;
  // console.log(comments, "cm");

  // const handleComment = async (formData) => {
  //   "use server";
  //   const comment = formData.get("comment");
  //   const posts_id = formData.get("id");
  //   await sql`INSERT INTO sm_comment (comment, sm_post_id) VALUES (${comment}, ${posts_id})`;
  //   revalidatePath("/");
  //   redirect("/");
  // };

  return (
    <div className="singlePost">
      {post.rows && (
        <div className="displaySingle">
          <h3>{post.rows[0].title}</h3>
          <p>{post.rows[0].content}</p>

          {comments.rows.map((comment) => (
            <>
              <p key={comment.id}>{comment.comment}</p>
            </>
          ))}
        </div>
      )}
      <CommentForm
        key={comments.id}
        handleComment={handleComment}
        name="comment"
        type="text"
        id={params.id}
        // initialComment=""
        defaultValue={comments.rows[0].comment}
      />
    </div>
  );
};

export default SinglePost;

import { sql } from "@vercel/postgres";
import CommentForm from "@/components/CommentModal";

const SinglePost = async ({ params }) => {
  ("use server");
  const post = await sql`SELECT * FROM sm_post WHERE id = ${params.postId}`;
  console.log(post, "pst");

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
        defaultValue={comments.rows[0].comment}
      />
    </div>
  );
};

export default SinglePost;

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import LikeBtn from "@/components/LikeBtn";
import CommentModal from "@/components/CommentModal";

import styles from "../page.module.css";
import Link from "next/link";

const PostPage = async () => {
  let sqlQuery = `SELECT * FROM sm_post`;

  const posts = await sql.query(sqlQuery);

  const comments = await sql`SELECT * FROM sm_comment`;

  const handleComment = async (formData) => {
    "use server";
    try {
      const comment = formData.get("comment");
      const id = formData.get("id");
      await sql`INSERT INTO sm_comment (comment, sm_post_id) VALUES (${comment}, ${id})`;
      revalidatePath("/");
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.postContainer}>
      <div>
        <CreatePost />
      </div>
      <div>
        <div>
          {posts.rows.map((post) => {
            return (
              <div key={post.id}>
                <h1 key={post.id + post.content}>{post.content}</h1>
                <p key={post.sm_user_id}>{post.sm_user_id}</p>
                <LikeBtn post_id={post.id} />
                <CommentModal
                  key={post.id}
                  handleComment={handleComment}
                  name="comment"
                  type="comment"
                  id={post.id}
                  placholder="comment"
                  defaultValue={post.comment}
                />
              </div>
            );
          })}
        </div>
      </div>
      {comments.rows.map((comment) => {
        return (
          <div key={comment.id}>
            <p key={comment.comment}>{comment.comment}</p>
            <Link href={`posts/${comment.id}`}>Edit Comment</Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostPage;

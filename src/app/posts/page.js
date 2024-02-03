import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import LikeBtn from "@/components/LikeBtn";
import CommentModal from "@/components/CommentModal";
import CloseIcon from "@mui/icons-material/Close";

import styles from "../page.module.css";

const PostPage = async () => {
  let sqlQuery = `SELECT * FROM sm_post`;

  const posts = await sql.query(sqlQuery);

  const comments = await sql`SELECT * FROM sm_comment`;

  const likes = await sql`SELECT sm_like.id, sm_user.username
  FROM sm_like
  INNER JOIN sm_user
  ON sm_like.sm_user_id = sm_user.clerk_user_id;`;
  console.log(likes, "like");

  // const showUser =
  //   await sql`SELECT sm_user.id, sm_user.username FROM sm_post INNER JOIN sm_user ON sm_user.id = sm_user.id`;

  // console.log(showUser, "sh");

  const handleEditComment = async (formData) => {
    "use server";
    const comment = formData.get("comment");
    const id = formData.get("id");
    // get a id to update form comment table rather than using params to route
    await sql`UPDATE sm_comment SET comment = ${comment} WHERE id = ${parseInt(
      id
    )}`;
    revalidatePath("/");
    redirect("/");
  };

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

  const handleDelete = async (formData) => {
    "use server";
    const post_id = formData.get("id");
    await sql`DELETE FROM sm_comment WHERE sm_post_id = ${post_id}`;
    await sql`DELETE FROm sm_like WHERE sm_post_id = ${post_id}`;
    await sql`DELETE FROM sm_post WHERE id = ${post_id};`;
    revalidatePath("/");
    redirect("/");
  };

  return (
    <div className={styles.postContainer}>
      <div>
        <CreatePost />
      </div>
      <div className={styles.itemContainer}>
        {posts.rows.map((post) => {
          return (
            <div className={styles.eachItem} key={post.id}>
              <h1 key={post.id + post.content}>{post.content}</h1>
              <p key={post.sm_user_id}>
                {likes.rows.map((user) => {
                  return <span key={user.id}>{user.username || ""}</span>;
                })}
              </p>
              <div className={styles.modalContainer}>
                <LikeBtn post_id={post.id} />
                <CommentModal
                  key={post.id}
                  handleComment={handleComment}
                  name="comment"
                  type="comment"
                  id={post.id}
                  placholder="comment"
                  defaultValue={post.comment}
                  onClose="onClose"
                />
              </div>
              <form action={handleDelete} method="post">
                <input type="hidden" name="id" value={post.id} />
                <button className={styles.danger} type="submit">
                  <CloseIcon />
                </button>
              </form>
            </div>
          );
        })}
      </div>
      <div className="commentContainer">
        {comments.rows.map((comment) => {
          return (
            <div key={comment.id}>
              <p key={comment.comment}>{comment.comment}</p>
              <CommentModal
                key={comment.id}
                handleComment={handleEditComment}
                name="comment"
                type="comment"
                id={comment.id}
                placholder="comment"
                defaultValue={comment.comment}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostPage;

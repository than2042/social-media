import { sql } from "@vercel/postgres";
import CreatePostPage from "../createpost/page";

const PostPage = async () => {
  let sqlQuery = `SELECT * FROM sm_post`;
  const posts = await sql.query(sqlQuery);

  return (
    <div>
      {posts.rows.map((post) => {
        return <h1>{post.content}</h1>;
      })}
      <CreatePostPage />
    </div>
  );
};

export default PostPage;

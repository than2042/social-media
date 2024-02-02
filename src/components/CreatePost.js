import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import "../styles/CreatePost.css";

const CreatePost = async () => {
  const { userId } = auth();
  const sm_user_id =
    await sql`SELECT * from sm_user WHERE clerk_user_id = ${userId} `;

  const handleCreate = async (formData) => {
    "use server";
    const content = formData.get("content");
    await sql`INSERT INTO sm_post (content, sm_user_id ) VALUES (${content}, ${sm_user_id.rows[0].id} )`;
    revalidatePath("/");
    redirect("/");
  };

  return (
    <div className="createPostContainer">
      <h2>Create Your Post</h2>
      <form className="createForm" action={handleCreate}>
        <textarea
          key="id"
          className="textarea"
          id="textarea"
          name="content"
          type="content"
          placeholder="What's on your mind?"
        />
        <button className="postBtn"> Post </button>
      </form>
    </div>
  );
};

export default CreatePost;

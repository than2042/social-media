import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import "../styles/CreatePost.css";

const CreateProfile = () => {
  const { userId } = auth();

  async function addNewProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    await sql`INSERT INTO sm_user (clerk_user_id, username, bio) VALUES (${userId}, ${username}, ${bio})`;
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="createPostContainer">
      <h2>Create Profile</h2>
      <form action={addNewProfile}>
        <input name="username" placeholder="Username" />
        <textarea name="bio" placeholder="Bio"></textarea>
        <button>Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;

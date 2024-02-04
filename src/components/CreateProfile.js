import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import "../styles/CreatePost.css";

const CreateProfile = () => {
  const { userId } = auth();

  const addNewProfile = async (formData) => {
    "use server";
    try {
      const username = formData.get("username");
      const bio = formData.get("bio");
      if (!username || username.trim() === " " || bio || bio.trim() === "") {
        throw new Error("Invalid user or bio");
      }
      await sql`INSERT INTO sm_user (clerk_user_id, username, bio) VALUES (${userId}, ${username}, ${bio})`;
      revalidatePath("/");
      redirect("/");
    } catch (error) {
      console.log(error);
      revalidatePath("/not-found");
      redirect("/not-found");
    }
  };

  return (
    <div className="createPostContainer">
      <h2>Create Profile</h2>
      <form action={addNewProfile}>
        <input name="username" placeholder="Username" required />
        <textarea name="bio" placeholder="Bio" required></textarea>
        <button>Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;

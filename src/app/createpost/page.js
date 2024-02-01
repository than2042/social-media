import React from "react";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import Link from "next/link";
// import * as Form from "@radix-ui/react-form";

const CreatePostPage = () => {
  const handleCreate = async (formData) => {
    "use server";
    // const title = formData.get("title");
    const content = formData.get("content");
    const sm_user_id = formData.get("sm_user_id");
    await sql`INSERT INTO sm_post (content, sm_like_id, follower_id, sm_user_id ) VALUES (${content}, 1, 1,  ${sm_user_id})`;

    revalidatePath("/posts");
    redirect("/posts");
  };

  return (
    <div>
      <h1>Create Your Post</h1>
      <form action={handleCreate}>
        <textarea
          className="textarea"
          id="textarea"
          name="content"
          type="content"
          placeholder="What's on your mind?"
        />
        <button className="addBtn"> Post </button>
      </form>
      {/* <Form.Root action={handleCreate} className="FormRoot">
        <Form.Field className="FormField" name="question">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your post!!!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="Textarea"
              placeholder="What's on your mind?"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Post
          </button>
        </Form.Submit>
      </Form.Root> */}
    </div>
  );
};

export default CreatePostPage;

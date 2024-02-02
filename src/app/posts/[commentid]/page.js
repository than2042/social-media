import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EditComent = async ({ params }) => {
  const comments =
    await sql`SELECT * FROM sm_comment WHERE id = ${params.commentid}`;

  const handleEditComment = async (formData) => {
    "use server";
    const comment = formData.get("comment");
    await sql`UPDATE sm_comment SET comment = ${comment} WHERE id = ${params.commentid}`;
    revalidatePath("/");
    redirect("/");
  };
  return (
    <div>
      <form action={handleEditComment}>
        <input
          className="idInput"
          name="id"
          type="hidden"
          value={comments.id}
        />
        <textarea
          name="comment"
          placeholder="Edit Comment"
          defaultValue={comments.rows[0].comment}
        ></textarea>
        <button>Edit Comment</button>
      </form>
    </div>
  );
};

export default EditComent;

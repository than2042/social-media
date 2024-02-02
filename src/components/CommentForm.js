import SendIcon from "@mui/icons-material/Send";

const CommentForm = ({ handleComment, name, type, id, onClose }) => {
  return (
    <div>
      <form className="commentForm" action={handleComment}>
        <input className="idInput" name="id" type="hidden" value={id} />
        <textarea
          id={id}
          className="commentText"
          name={name}
          type={type}
          placeholder={name}
        />
        <button className="commentSend" onClick={onClose}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

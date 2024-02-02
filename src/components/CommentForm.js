import SendIcon from "@mui/icons-material/Send";

import "../styles/comment.css";

const CommentForm = ({
  handleComment,
  name,
  type,
  id,
  onClose,
  defaultValue,
}) => {
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
          defaultValue={defaultValue}
        />
        <button className="commentSend" onClick={onClose}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

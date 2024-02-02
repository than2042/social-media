"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CommentForm from "./CommentForm";

import "../styles/comment.css";

const CommentModal = ({ handleComment, name, type, id, defaultValue = "" }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        <Button className="modalOpen" onClick={handleOpen}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalOpen"
        >
          <Box className="muiBox">
            <CommentForm
              handleComment={handleComment}
              id={id}
              name={name}
              type={type}
              placeHolder={name}
              defaultValue={defaultValue}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CommentModal;

"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";
import CommentForm from "./CommentForm";

import "../styles/comment.css";

const CommentModal = ({
  handleComment,
  name,
  type,
  id,
  onClose,
  defaultValue = "",
}) => {
  const [open, setOpen] = useState(false);
  const [isResetForm, setIsResetFrom] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsResetFrom(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsResetFrom(true);
  };

  const resetForm = () => {
    setIsResetFrom(isResetForm);
  };

  return (
    <div>
      <div>
        <Button className="modalOpen" onClick={handleOpen}>
          <ChatIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box className="muiBox">
            <CommentForm
              handleComment={handleComment}
              id={id}
              name={name}
              type={type}
              placeHolder={name}
              defaultValue={defaultValue}
              onClick={onClose}
              resetForm={isResetForm}
              reset={resetForm}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CommentModal;

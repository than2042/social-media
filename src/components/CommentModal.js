"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CommentForm from "./CommentForm";

const CommentModal = ({ handleComment, name, type, id }) => {
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
          <Box>
            <CommentForm
              handleComment={handleComment}
              id={id}
              name={name}
              type={type}
              placeHolder={name}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CommentModal;

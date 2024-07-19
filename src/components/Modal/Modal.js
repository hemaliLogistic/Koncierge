"use client";

import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import "../Segment/global.css";

const Modal = ({
  isOpen,
  handleClose,
  handleLogout,
  description,
  leftButton,
  rightButton,
}) => {
  return (
    <Dialog
      open={isOpen}
      handler={handleClose}
      className='fixed inset-0 m-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className='modal-content modal-content-div'
        onClick={(e) => e.stopPropagation()}>
        {/* <DialogHeader>Logout Confirmation</DialogHeader> */}
        <div className='flex justify-center items-center'>
          <DialogBody className='modal-body'>{description}</DialogBody>
        </div>
        <div className='center-footer-div'>
          <DialogFooter className='modal-footer-div'>
            <Button
              className='confirm-button'
              variant='text'
              color='green'
              onClick={handleLogout}>
              {leftButton}
            </Button>
            <Button
              variant='text'
              className='cancel-button'
              // color='red'
              onClick={handleClose}>
              {rightButton}
            </Button>
          </DialogFooter>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;

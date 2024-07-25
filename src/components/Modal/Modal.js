"use client";

import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import "../Segment/global.css";
import { FormProvider, RHFTextInput } from "../hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

const Modal = ({
  isOpen,
  handleClose,
  handleLogout,
  description,
  leftButton,
  rightButton,
  isChangePassword,
  handlePassword,
  isModalVisible,
  setIsModalVisible,
}) => {
  const { t } = useTranslation("common");
  const defaultValues = useMemo(
    () => ({
      oldPassword: "",
      password: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        oldPassword: yup
          .string()
          .required(t("passwordRequired"))
          .trim(t("validpassword")),
        password: yup
          .string()
          .required(t("passwordRequired"))
          .trim(t("validpassword")),
      })
      .required()
      .strict(true);
  }, []);

  //Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = methods;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalVisible &&
        !document.querySelector(".modal-content").contains(event.target)
      ) {
        methods.reset();
        setIsModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  const onSubmitForm = async (formData) => {
    let { oldPassword, password } = formData;
    handlePassword(oldPassword, password);
    methods.reset();
  };

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
        {isChangePassword && (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmitForm)}
            className='space-y-8'>
            <RHFTextInput
              name='oldPassword'
              type={"password"}
              className='textInput-modal'
              placeholder='Old Password'
            />
            <RHFTextInput
              name='password'
              type={"password"}
              className='textInput-modal'
              placeholder='New Password'
            />
            <div className='center-footer-div'>
              <DialogFooter className='modal-footer-div'>
                <Button
                  type='submit'
                  className='confirm-button rounded-none'
                  variant='text'
                  color='green'
                  onClick={handlePassword}>
                  {leftButton}
                </Button>
                <Button
                  variant='text'
                  className='cancel-button rounded-none'
                  // color='red'
                  onClick={handleClose}>
                  {rightButton}
                </Button>
              </DialogFooter>
            </div>
          </FormProvider>
        )}

        {/* <input type='password' /> */}
        {/* <input type='password' /> */}
        {!isChangePassword && (
          <div className='center-footer-div'>
            <DialogFooter className='modal-footer-div'>
              <Button
                className='confirm-button rounded-none'
                variant='text'
                color='green'
                onClick={isChangePassword ? handlePassword : handleLogout}>
                {leftButton}
              </Button>
              <Button
                variant='text'
                className='cancel-button rounded-none'
                // color='red'
                onClick={handleClose}>
                {rightButton}
              </Button>
            </DialogFooter>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;

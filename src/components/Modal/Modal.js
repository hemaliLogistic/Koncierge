"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setIsBookingModalOpen } from "@/redux/Home/HomeSlice";
import { useRouter } from "next/navigation";

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
  isOldPassword,
  bookingModel,
  isWrongPassword,
  errorMessage,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { t } = useTranslation("common");
  // const bookingModel = useSelector(
  //     (state) => state?.homeApi?.isBookingModalOpen
  // );
  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const defaultValues = useMemo(
    () => ({
      oldPassword: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    if (isOldPassword) {
      return yup
        .object()
        .shape({
          oldPassword: yup
            .string()
            .required(t("oldPasswordRequired"))
            .trim(t("validpassword")),
          password: yup
            .string()
            .required(t("passwordRequired"))
            .trim(t("validpassword")),
          confirmPassword: yup
            .string()
            .required(t("confirmPassword"))
            .oneOf([yup.ref("password")], t("passwordNotMatched"))
            .trim(t("validConfirmPassword")),
        })
        .required()
        .strict(true);
    } else {
      return yup
        .object()
        .shape({
          password: yup
            .string()
            .required(t("passwordRequired"))
            .trim(t("validpassword")),
          confirmPassword: yup
            .string()
            .required(t("confirmPassword"))
            .oneOf([yup.ref("password")], t("passwordNotMatched"))
            .trim(t("validConfirmPassword")),
        })
        .required()
        .strict(true);
    }
  }, [isOldPassword, t]);

  //Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    setError,
  } = methods;

  useEffect(() => {
    if (errorMessage === "Old Password is Not Matched.") {
      setError("oldPassword", {
        type: "manual",
        message: errorMessage,
      });
    } else if (
      errorMessage ===
      "Your new password cannot be the same as your current password. Please select a unique password."
    ) {
      const message = "New password cannot be same as current password";
      setError("password", {
        type: "manual",
        message: message,
      });
    }
  }, [errorMessage, setError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalVisible &&
        !document.querySelector(".modal-content").contains(event.target)
      ) {
        methods.reset();
        setIsModalVisible(false);
        // dispatch(setIsBookingModalOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  const onSubmitForm = async (formData) => {
    let { oldPassword, password } = formData;
    setErrorMessage(null);

    if (isOldPassword) {
      handlePassword(oldPassword, password, handleClear);
    } else {
      handlePassword("", password, handleClear);
    }
  };

  const handleClear = () => {
    methods.reset();
  };

  const handleLogin = () => {
    router.push("/getStarted");
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
          <DialogBody className='modal-body-desc font-bold'>
            {description}
          </DialogBody>
        </div>
        {isChangePassword && (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmitForm)}
            className='space-y-8'>
            {isOldPassword && (
              <div className='inside-input-div'>
                <RHFTextInput
                  name='oldPassword'
                  type={isOldPasswordHidden ? "password" : "text"}
                  className='textInput-modal'
                  placeholder='Old Password'
                />
                <button
                  type='button'
                  onClick={() => setIsOldPasswordHidden(!isOldPasswordHidden)}
                  className='inside-input-right-icon'>
                  <img
                    src={
                      isOldPasswordHidden
                        ? "/images/hidden.png"
                        : "/images/eye.png"
                    }
                    alt='icon'
                    className='w-5 h-5'
                  />
                </button>
              </div>
            )}
            <div className='inside-input-div'>
              <RHFTextInput
                name='password'
                type={isNewPasswordHidden ? "password" : "text"}
                className='textInput-modal'
                placeholder='New Password'
              />
              <button
                type='button'
                onClick={() => setIsNewPasswordHidden(!isNewPasswordHidden)}
                className='inside-input-right-icon'>
                <img
                  src={
                    isNewPasswordHidden
                      ? "/images/hidden.png"
                      : "/images/eye.png"
                  }
                  alt='icon'
                  className='w-5 h-5'
                />
              </button>
            </div>

            <div className='inside-input-div'>
              <RHFTextInput
                name='confirmPassword'
                type={isConfirmPasswordHidden ? "password" : "text"}
                className='textInput-modal '
                placeholder='Confirm New Password'
              />
              <button
                type='button'
                onClick={() =>
                  setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
                className='inside-input-right-icon'>
                <img
                  src={
                    isConfirmPasswordHidden
                      ? "/images/hidden.png"
                      : "/images/eye.png"
                  }
                  alt='icon'
                  className='w-5 h-5'
                />
              </button>
            </div>
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
                  onClick={() => {
                    methods.reset();
                    handleClose();
                  }}>
                  {rightButton}
                </Button>
              </DialogFooter>
            </div>
          </FormProvider>
        )}

        {/* <input type='password' /> */}
        {/* <input type='password' /> */}
        {!isChangePassword && !bookingModel && (
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
                onClick={() => {
                  methods.reset();
                  handleClose();
                }}>
                {rightButton}
              </Button>
            </DialogFooter>
          </div>
        )}
        {bookingModel && (
          <div className='center-footer-div'>
            <DialogFooter className='modal-footer-div'>
              <Button
                className='confirm-button rounded-none'
                variant='text'
                color='green'
                onClick={() => handleLogin()}>
                {leftButton}
              </Button>
            </DialogFooter>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;

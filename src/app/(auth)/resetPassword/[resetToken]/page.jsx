"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { API_ROUTER } from "@/services/apiRouter";
import { toast } from "react-toastify";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { axiosPost } from "@/services/axiosHelper";
import Link from "next/link";
import {
  loginAction,
  registerAction,
  resetPasswordAction,
} from "@/redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { setIsForgotPassword } from "@/redux/Auth/AuthSlice";
import { Router } from "next/router";
import { useParams, useRouter } from "next/navigation";
import { getData } from "@/utils/storage";
import "./global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { resetPassword } from "@/redux/Auth/services";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("common");

  const { resetToken } = useParams();

  const [isHidden, setIsHidden] = useState(false);
  const [isConfirmHidden, setIsConfirmHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        password: yup
          .string()
          .required(t("passwordRequired"))
          .trim(t("validPassword")),
        confirmPassword: yup
          .string()
          .required(t("confirmPassword"))
          .oneOf([yup.ref("password")], t("passwordNotMatched"))
          .trim(t("validConfirmPassword")),
      })
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

  const { toaster } = useToaster();

  const onSubmitForm = async (formData) => {
    try {
      const { password } = formData;
      setIsLoading(true);
      const res = await dispatch(
        resetPasswordAction({
          password,
          token: resetToken,
        })
      );
      //   const res = await axiosPost(API_ROUTER.LOGIN, {
      //     is_google_login: 0,
      //     email,
      //     password,
      //   });

      console.log("res", res);
      if (!res.payload.status) {
        setIsLoading(false);
        return toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      }
      if (res.payload.status) {
        setIsLoading(false);
        toaster(TOAST_ALERTS.RESET_SUCCESSFULLY, TOAST_TYPES.SUCCESS);
        methods.reset();
        router.push("/login");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className='container-div'>
        <div className='logo-div-section'>
          <div className=''>
            <img src='/images/webLogo.png' className='' alt='Property' />
          </div>
        </div>
        <div className='image-div '>
          <CustomSlider />
        </div>

        <div className='form-div'>
          <div className='center-div'>
            <img
              src='/images/webLogo.png'
              className='logo-image'
              alt='Property'
            />
          </div>

          <div className='center-form-div'>
            <div className='title-div'>
              <p className='login-title'>{t("Forgot Password")}</p>
              <text className='login-desc'>{t("Reset your password")}</text>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitForm)}
              className='provider-div'>
              <div className='column-div'>
                <div className='inside-form'>
                  <RHFTextInput
                    name='password'
                    type={isHidden ? "password" : "text"}
                    className='input-login-div input-div-text pl-10 '
                    placeholder='New Password'
                  />
                  <div className='input-left-icon'>
                    <img
                      src='/images/lock.png'
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => setIsHidden(!isHidden)}
                    className='input-right-icon'>
                    <img
                      src={isHidden ? "/images/hidden.png" : "/images/eye.png"}
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </button>
                </div>
                <div className='inside-form'>
                  <RHFTextInput
                    name='confirmPassword'
                    type={isConfirmHidden ? "password" : "text"}
                    className='input-login-div input-div-text pl-10 '
                    placeholder='Confirm New Password'
                  />
                  <div className='input-left-icon'>
                    <img
                      src='/images/lock.png'
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => setIsConfirmHidden(!isConfirmHidden)}
                    className='input-right-icon'>
                    <img
                      src={
                        isConfirmHidden
                          ? "/images/hidden.png"
                          : "/images/eye.png"
                      }
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </button>
                </div>
              </div>

              <div className='center-div'>
                <button type='submit' className='save-btn'>
                  {t("Save")}
                </button>
              </div>
            </FormProvider>
            <div className='bottom-div'>
              <text className='register-text'>{t("Go to")}</text>
              <button onClick={() => router.replace("/login")}>
                {/* <Link className='register-btn' href='/register'> */}
                <div className='register-btn'>{t("Log in")}</div>
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default RegistrationPage;

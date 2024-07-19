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
  resendLinkAction,
  verifyEmailAction,
} from "@/redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { setIsForgotPassword, setVerfyEmail } from "@/redux/Auth/AuthSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { getData } from "@/utils/storage";
import "../verifyEmail/global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const verifyEmail = useSelector((state) => state?.registerApi?.verifyEmail);
  const { t } = useTranslation("common");

  const router = useRouter();
  const user = getData("user");
  const userAuth = user?.token;
  const [isHidden, setIsHidden] = useState(false);
  const [isConfirmHidden, setIsConfirmHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      code: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        code: yup
          .string()
          .required(t("enterCode"))
          .trim(t("validCode"))
          .matches(/^[0-9]{6}$/, t("enterDigitCode"))
          .typeError(t("enterDigitCode")),
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
      const { code } = formData;
      console.log("code", code);
      setIsLoading(true);
      const res = await dispatch(
        verifyEmailAction({
          verificationCode: code,
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
        localStorage.removeItem("isRegistreation");
        toaster(TOAST_ALERTS.VERIFIED_SUCCESSFULLY, TOAST_TYPES.SUCCESS);
        methods.reset();
        localStorage.removeItem("verifyEmail");
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };
  const resendApi = async () => {
    try {
      const email = localStorage.getItem("verifyEmail");

      const res = await dispatch(
        resendLinkAction({
          email: email,
        })
      );
      if (!res.payload.status) {
        return toast.error(res.payload.message);
      }
      if (res.payload.status) {
        toaster(TOAST_ALERTS.RESEND_LINK, TOAST_TYPES.SUCCESS);
        methods.reset();

        dispatch(setVerfyEmail(""));
      }
    } catch (error) {
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
              <p className='login-title'>{t("Verify Email")}</p>
              <text className='login-desc'>
                {t("Send a Code to Your Email")}
              </text>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitForm)}
              className='provider-div'>
              <div className='column-div'>
                <div className='inside-form'>
                  <RHFTextInput
                    name='code'
                    type={"text"}
                    className='input-login-div input-div-text pl-5 '
                    placeholder='Enter Your Code'
                  />
                </div>
              </div>
              <div className='forgot-text'>
                <button type='button' onClick={() => resendApi()}>
                  {t("Resend")}
                </button>
              </div>
              <div className='center-div'>
                <button type='submit' className='save-btn'>
                  {t("Verify")}
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

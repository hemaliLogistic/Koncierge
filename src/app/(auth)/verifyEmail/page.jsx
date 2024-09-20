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
  const storedFormData = getData("FormData");
  console.log("storedFormData", storedFormData);
  const BookingId = getData("Bookingid");
  console.log("BookingId", BookingId);
  const router = useRouter();
  const user = getData("user");
  const userAuth = user?.token;
  const [isHidden, setIsHidden] = useState(false);
  const [isConfirmHidden, setIsConfirmHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [remainingSeconds, setRemainingSeconds] = useState(60);

  useEffect(() => {
    if (isResendDisabled) {
      const timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          const newValue = prev - 1;
          return newValue < 10 ? `0${newValue}` : newValue;
        });
      }, 1000);

      const timeout = setTimeout(() => {
        setIsResendDisabled(false);
        setRemainingSeconds(60); // Reset the timer
        clearInterval(timer);
      }, 60000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isResendDisabled]);

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setRemainingSeconds(60);
  };

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
  }, [t]);

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

      console.log("res", res);
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.status) {
          localStorage.removeItem("isRegistreation");
          // toaster(TOAST_ALERTS.VERIFIED_SUCCESSFULLY, TOAST_TYPES.SUCCESS);
          methods.reset();
          localStorage.removeItem("verifyEmail");
          if (storedFormData) {
            router.push(`/bookService/${BookingId}`);
          } else {
            router.push("/dashboard");
          }
          //   router.push("/dashboard");
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res.payload.message);
        }
      } else {
        setIsLoading(false);
        toast.error(res.error.message || res.payload.message);
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
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.status) {
          toaster(TOAST_ALERTS.RESEND_LINK, TOAST_TYPES.SUCCESS);
          methods.reset();
          dispatch(setVerfyEmail(""));
          startResendTimer(); // Start the resend timer
        } else {
          setIsLoading(false);
          toast.error(res.payload.message);
        }
      } else {
        setIsLoading(false);
        toast.error(res.error.message || res.payload.message);
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };

  return (
    <div className='main-verify-container'>
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
              <div
                className={`forgot-resend-text ${
                  isResendDisabled && "opacity-40 font-light"
                }`}>
                {isResendDisabled && (
                  <p className='timer-text'>{`Time remaining: 00: ${remainingSeconds}`}</p>
                )}
                {!isResendDisabled && (
                  <button
                    type='button'
                    onClick={resendApi}
                    disabled={isResendDisabled}
                    title={
                      isResendDisabled ? t("Resend after given time") : ""
                    }>
                    {t("Resend")}
                  </button>
                )}
              </div>
              <div className='center-div'>
                <button type='submit' className='save-btn'>
                  {t("Verify")}
                </button>
              </div>
            </FormProvider>
            <div className='mt-5 mb-10'>
              <text className='register-text'>{"Edit your"}</text>

              <button
                className='email-btn'
                onClick={() => {
                  localStorage.removeItem("isRegistreation");

                  methods.reset();
                  localStorage.removeItem("verifyEmail");
                  router.push("/register");
                }}>
                <div className=' border-b-[1px] border-black'>{t("Email")}</div>
              </button>
            </div>
            {/* <div className='bottom-div'>
              <text className='register-text'>{t("Go to")}</text>
              <button onClick={() => router.replace("/login")}>
                <div className='register-btn'>{t("Log in")}</div>
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {isLoading && <Loader isAuth={true} />}
    </div>
  );
};

export default RegistrationPage;

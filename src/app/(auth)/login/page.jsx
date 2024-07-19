"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { loginAction, registerAction } from "@/redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { setIsForgotPassword } from "@/redux/Auth/AuthSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { getData } from "@/utils/storage";
import "./global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { LocationContext } from "@/utils/Context/LocationContext";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toaster } = useToaster();
  const { t } = useTranslation("common");

  const { location, error } = useContext(LocationContext);

  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        email: yup
          .string()
          .required(t("enterEmail"))
          .email(t("validEmail"))
          .trim(t("validEmail")),
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

  const onSubmitForm = async (formData) => {
    try {
      const { email, password } = formData;
      console.log("location", location);
      let loginParams = {};
      if (location) {
        loginParams = {
          loginType: "email",
          email,
          password,
          loggedTimeLatitude: location.latitude,
          loggedTimeLongitude: location.longitude,
        };
      } else {
        loginParams = {
          loginType: "email",
          email,
          password,
        };
      }
      setIsLoading(true);
      const res = await dispatch(loginAction(loginParams));

      console.log("res-=-=-=-", res);
      if (!res.payload.status) {
        setIsLoading(false);
        return toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      }
      if (res.payload.status) {
        setIsLoading(false);

        toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
        methods.reset();
        router.push("/dashboard");
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
              <p className='login-title'>{t("Welcome Back")}</p>
              <text className='login-desc'>{t("Log in your account")}</text>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitForm)}
              className='provider-div'>
              <div className='column-div'>
                <div className='inside-form'>
                  <RHFTextInput
                    name='email'
                    className='input-login-div input-div-text pl-10 ' // Add padding to the left to accommodate the image
                    placeholder='Email Address'
                  />
                  <div className='input-left-icon'>
                    <img
                      src='/images/mail.png'
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </div>
                </div>
                <div className='inside-form'>
                  <RHFTextInput
                    name='password'
                    type={isHidden ? "password" : "text"}
                    className='input-login-div input-div-text pl-10 '
                    placeholder='Password'
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
              </div>

              <div className='forgot-text'>
                <Link
                  href='/forgotPassword'
                  onClick={() => dispatch(setIsForgotPassword(true))}>
                  {t("Forgot Password ?")}
                </Link>
              </div>
              <div className='center-div'>
                <button type='submit' className='login-btn'>
                  {t("Log in")}
                </button>
              </div>

              {/* <div className='mt-[80px] lg:mt-[50px]  text-create-account-link'>
              <span className='font-normal'>
                Don’t have an account?&nbsp;
                <Link className='font-medium' href='/register'>
                  Register here
                </Link>
              </span>
            </div> */}
            </FormProvider>
            <div className='bottom-div'>
              <text className='register-text'>{t("First time here?")}</text>
              <button onClick={() => router.push("/register")}>
                {/* <Link className='register-btn' href='/register'> */}
                <div className='register-btn'>{t("Register")}</div>
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

export default LoginPage;

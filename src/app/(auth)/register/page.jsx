"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { setVerfyEmail } from "@/redux/Auth/AuthSlice";

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
import "../register/global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { LocationContext } from "@/utils/Context/LocationContext";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = getData("user");
  const userAuth = user?.token;
  const [isHidden, setIsHidden] = useState(false);
  const [isConfirmHidden, setIsConfirmHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("common");

  const { location, error } = useContext(LocationContext);

  useEffect(() => {}, []);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        userName: yup.string().required(t("enterName")).trim(t("validName")),
        email: yup
          .string()
          .required(t("enterEmail"))
          .email(t("validEmail"))
          .trim(t("validEmail")),
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
      const { userName, email, password } = formData;

      let registrationParams = {};
      if (location) {
        registrationParams = {
          name: userName,
          email: email,
          password: password,
          loginType: "email",
          loggedTimelongitude: location.longitude,
          loggedTimelatitude: location.latitude,
        };
      } else {
        registrationParams = {
          name: userName,
          email: email,
          password: password,
          loginType: "email",
        };
      }
      setIsLoading(true);
      const res = await dispatch(registerAction(registrationParams));
      if (!res.payload.status) {
        setIsLoading(false);

        return toast.error(res.payload.message);
      }
      if (res.payload.status) {
        setIsLoading(false);

        toaster(TOAST_ALERTS.REGISTER_SUCCESS, TOAST_TYPES.SUCCESS);
        methods.reset();
        dispatch(setVerfyEmail(email));
        localStorage.setItem("verifyEmail", email);
        router.push("/verifyEmail");
      }
    } catch (error) {
      setIsLoading(false);

      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("error", error);
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
              <p className='login-title'>{t("Welcome")}</p>
              <text className='login-desc'>
                {t("Register to your account")}
              </text>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitForm)}
              className='provider-div'>
              <div className='column-div'>
                <div className='inside-form'>
                  <RHFTextInput
                    name='userName'
                    className='input-login-div input-div-text pl-10 ' // Add padding to the left to accommodate the image
                    placeholder='User Name'
                  />
                  <div className='input-left-icon'>
                    <img
                      src='/images/user.png'
                      alt='icon'
                      className='w-5 h-5'
                    />
                  </div>
                </div>
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
                <div className='inside-form'>
                  <RHFTextInput
                    name='confirmPassword'
                    type={isConfirmHidden ? "password" : "text"}
                    className='input-login-div input-div-text pl-10 '
                    placeholder='Confirm Password'
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

              <div className='forgot-text'>
                <Link
                  href='/forgotPassword'
                  onClick={() => dispatch(setIsForgotPassword(true))}>
                  {t("Forgot Password ?")}
                </Link>
              </div>
              <div className='center-div'>
                <button type='submit' className='login-btn'>
                  {t("Register")}
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
            <div className='bottom-div-register'>
              <text className='register-text'>{t("Already here?")}</text>
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

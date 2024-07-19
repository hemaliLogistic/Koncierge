"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import "../login/global.css";
import CustomSlider from "@/components/CustomSlider/customeSlider";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { LocationContext } from "@/utils/Context/LocationContext";
import { loginAction } from "@/redux/Auth/action";
import { toast } from "react-toastify";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import "@/utils/global";
import Loader from "@/components/Loader";

const Home = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading", isLoading);
  const { t } = useTranslation("common");
  const { location } = useContext(LocationContext);
  const router = useRouter();
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("translate", t("Welcome Back"));
    const loginType = localStorage.getItem("loginType");
    if (session?.user && !isLoggingIn && loginType) {
      setIsLoggingIn(true);
      loginUserCall(session.user);
    }
  }, [session, isLoggingIn]);

  const googleLogin = async () => {
    localStorage.setItem("loginType", "google");
    await signIn("google");
  };

  const handleFacebookSignIn = async () => {
    localStorage.setItem("loginType", "facebook");
    await signIn("facebook", { prompt: "select_account" });
  };

  const loginUserCall = async (data) => {
    console.log("loginUserCall data", data);
    try {
      const loginType = localStorage.getItem("loginType");
      const socialLoginParam = {
        name: data?.name,
        email: data?.email,
        loginType,
        loggedTimeLatitude: location.latitude,
        loggedTimeLongitude: location.longitude,
        socialId: data?.id,
      };

      setIsLoading(true);
      const res = await dispatch(loginAction(socialLoginParam));

      if (!res.payload.status) {
        setIsLoading(false);
        toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        return;
      }
      if (res.payload.status) {
        setIsLoading(false);
        localStorage.removeItem("loginType");
        toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);

      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.error("Error", error);
    }
  };
  //   [location, dispatch, router, toaster];

  return (
    <>
      {isLoading && <Loader />}
      <div className='container-div'>
        <div className='logo-div-section'>
          <img src='/images/webLogo.png' alt='Property' />
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
              <p className='login-title'>{t("Get Started")}</p>
              <p className='login-desc'>{t("Log in or Create an account")}</p>
            </div>
            <div className='auth-div'>
              <button onClick={handleFacebookSignIn} className='social-div'>
                <div className='social-image'>
                  <div className='social-image-overlay'></div>
                  <img src='images/facebook.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div'>
                  <p className='social-text'>{t("Continue with Facebook")}</p>
                </div>
              </button>
              <button onClick={googleLogin} className='social-div bg-redEB'>
                <div className='social-image bg-redEB'>
                  <div className='social-image-overlay'></div>
                  <img src='images/google.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div bg-redEB'>
                  <p className='social-text'>{t("Continue with Google")}</p>
                </div>
              </button>
              <button
                onClick={() => router.push("/login")}
                className='social-div bg-green00'>
                <div className='social-image bg-green00'>
                  <div className='social-image-overlay'></div>
                  <img src='images/mail_white.png' className='w-6 h-6' />
                </div>
                <div className='social-text-div bg-green00'>
                  <p className='social-text'>{t("Login with Email")}</p>
                </div>
              </button>
            </div>
          </div>
          <div className='bottom-start-div'>
            <p className='register-text mt-0'>{t("First time here?")}</p>
            <button>
              <Link className='register-btn' href='/register'>
                {t("Register")}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

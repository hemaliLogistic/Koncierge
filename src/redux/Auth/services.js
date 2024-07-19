import { axiosPost } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const RegisterUser = (data) => {
  return axiosPost(API_ROUTER.REGISTER_USER, data);
};

export const LoginUser = (data) => {
  return axiosPost(API_ROUTER.LOGIN_USER, data);
};

export const ForgetPasswordUser = (data) => {
  return axiosPost(API_ROUTER.FORGET_PASSWORD_USER, data);
};

export const resetPassword = (data) => {
  return axiosPost(API_ROUTER.RESET_PASSWORD_USER, data);
};
export const verifyEmail = (data) => {
  return axiosPost(API_ROUTER.VERIFY_USER, data);
};
export const resendLink = (data) => {
  return axiosPost(API_ROUTER.RESEND_LINK, data);
};

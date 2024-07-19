import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { saveData } from "@/utils/storage";
import {
  ForgetPasswordUser,
  LoginUser,
  RegisterUser,
  resendLink,
  resetPassword,
  verifyEmail,
} from "./services";

export const registerAction = createAsyncThunk(
  "authSlice/registerAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await RegisterUser(payload);
      console.log("data", data);
      localStorage.setItem("isRegistreation", status);

      return data;
    } catch (err) {
      // console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const loginAction = createAsyncThunk(
  "authSlice/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("🚀 ~ payload:", payload);

      const { data, status } = await LoginUser(payload);
      console.log("data=====>", data);
      //  if (!res.payload.status) {
      //    return toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      //  }
      //  if (res.payload.status) {
      //    toaster(TOAST_ALERTS.LOGIN_SUCCESS, TOAST_TYPES.SUCCESS);
      //    methods.reset();
      //    router.push("/home");
      //  }
      if (data?.token) {
        // localStorage.setItem("user", JSON.stringify(data));
        saveData("user", data);
      }
      return data;
    } catch (err) {
      console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "authSlice/forgotPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("🚀 ~ payload:", payload);
      const { data, status } = await ForgetPasswordUser(payload);

      return data;
    } catch (err) {
      console.log("🚀 ~ err:", err);
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "authSlice/resetPasswordAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await resetPassword(payload);

      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const verifyEmailAction = createAsyncThunk(
  "authSlice/verifyEmailAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await verifyEmail(payload);
      if (data?.token) {
        // localStorage.setItem("user", JSON.stringify(data));
        saveData("user", data);
      }
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);
export const resendLinkAction = createAsyncThunk(
  "authSlice/resendLinkAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, status } = await resendLink(payload);

      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message);
      }
      return rejectWithValue(err.message);
    }
  }
);

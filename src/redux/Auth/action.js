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
            const response = await RegisterUser(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
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

export const loginAction = createAsyncThunk(
    "authSlice/loginAction",
    async (payload, { rejectWithValue }) => {
        try {
            console.log("🚀 ~ payload:", payload);

            const response = await LoginUser(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }
            if (data?.token) {
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
            const response = await ForgetPasswordUser(payload);
            const { data, status, message } = response;
            console.log("res---", response);
            if (!status) {
                throw new Error(message);
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

export const resetPasswordAction = createAsyncThunk(
    "authSlice/resetPasswordAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await resetPassword(payload);

            const { data, status, message } = response;
            console.log("res---", response);
            if (!status) {
                throw new Error(message);
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
export const verifyEmailAction = createAsyncThunk(
    "authSlice/verifyEmailAction",
    async (payload, { rejectWithValue }) => {
        try {

            const response = await verifyEmail(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }
            if (data?.token) {
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

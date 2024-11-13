import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
    AllBooking,
    ChangePassword,
    EditProfile,
    GetProfile,
    PastBooking,
    UpcomingBooking,
    GetNotification,
    GetRequestdata,
    GetPrefrenceData,
    BookService,
    GetRequestExpire,
    GetBookingCount,
    RattingService,
    GetSubscriptiondata,
} from "./services";
import { AxiosError } from "axios";

export const allBookingAction = createAsyncThunk(
    "dashboardSlice/allBookingAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await AllBooking(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const upcomingBookingAction = createAsyncThunk(
    "dashboardSlice/upcomingBookingAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await UpcomingBooking(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const pastBookingAction = createAsyncThunk(
    "dashboardSlice/pastBookingAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await PastBooking(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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
export const getProfileAction = createAsyncThunk(
    "dashboardSlice/getProfileAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetProfile(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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
export const editProfileAction = createAsyncThunk(
    "dashboardSlice/editProfileAction",
    async (payload, { rejectWithValue }) => {
        try {
            const formDataHeader = "multipart/form-data;";
            const response = await EditProfile(payload, true, formDataHeader);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const changePasswordAction = createAsyncThunk(
    "dashboardSlice/changePasswordAction",
    async (payload, { rejectWithValue }) => {
        try {
            const formDataHeader = "multipart/form-data;";
            const response = await ChangePassword(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const getNotificationAction = createAsyncThunk(
    "dashboardSlice/getNotificationAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetNotification(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const getRequestdataAction = createAsyncThunk(
    "dashboardSlice/getRequestdataAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetRequestdata(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

            return data;
        } catch (err) {
            // console.log("🚀 ~ err:", err);
            toast.error(err?.response?.data?.message || err.message);
            if (err instanceof AxiosError) {
                return rejectWithValue(err?.response?.data?.message);
            }
            return rejectWithValue(err.message);
            console.log("first123");
        }
    }
);

export const getSubscriptiondataAction = createAsyncThunk(
    "dashboardSlice/getSubscriptiondataAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetSubscriptiondata(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

            return data;
        } catch (err) {
            // console.log("🚀 ~ err:", err);
            toast.error(err?.response?.data?.message || err.message);
            if (err instanceof AxiosError) {
                return rejectWithValue(err?.response?.data?.message);
            }
            return rejectWithValue(err.message);
            console.log("first123");
        }
    }
);
export const getPrefrenceAction = createAsyncThunk(
    "dashboardSlice/getPrefrenceAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetPrefrenceData(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const bookServiceAction = createAsyncThunk(
    "dashboardSlice/bookServiceAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await BookService(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const getRequestExpireAction = createAsyncThunk(
    "dashboardSlice/getRequestExpireAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetRequestExpire(payload);
            const { data, status, message } = response;

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

export const rattingServiceAction = createAsyncThunk(
    "dashboardSlice/rattingServiceAction",
    async (payload, { rejectWithValue }) => {

        try {
            const response = await RattingService(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

export const getBookingCountAction = createAsyncThunk(
    "dashboardSlice/getBookingCountAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetBookingCount(payload);
            const { data, status, message } = response;
            if (!status) {
                throw new Error(message);
            }

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

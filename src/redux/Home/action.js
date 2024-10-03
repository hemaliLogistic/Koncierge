import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
    BookedSlotList,
    CheckoutSession,
    MainCategoryList,
    PaymentHistory,
    RequestServiceQutation,
    ServiceByMainCategoryList,
    UnreadNotificationCount,
    UpdateDeviceToken,

} from "./services";
import { AxiosError } from "axios";

export const updateDeviceToken = createAsyncThunk(
    "homeSlice/updateDeviceTokenAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await UpdateDeviceToken(payload);

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

export const unreadNotificationCount = createAsyncThunk(
    "homeSlice/unreadNotificationCountAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await UnreadNotificationCount(payload);

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

export const mainCategoryListAction = createAsyncThunk(
    "homeSlice/mainCategoryListAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await MainCategoryList(payload);

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

export const serviceByMainCategoryListAction = createAsyncThunk(
    "homeSlice/serviceByMainCategoryListAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await ServiceByMainCategoryList(payload);

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

export const bookedSlotListAction = createAsyncThunk(
    "homeSlice/bookedSlotListAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await BookedSlotList(payload);

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

export const requestServiceQutationAction = createAsyncThunk(
    "homeSlice/requestServiceQutationAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await RequestServiceQutation(payload);

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
export const checkoutSessionAction = createAsyncThunk(
    "homeSlice/checkoutSessionAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await CheckoutSession(payload);

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
export const paymentHistoryAction = createAsyncThunk(
    "homeSlice/paymentHistoryAction",
    async (payload, { rejectWithValue }) => {
        // console.log("payload", payload);
        try {
            const response = await PaymentHistory(payload);

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
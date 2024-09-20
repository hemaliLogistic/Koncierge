import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    SendMessage,
    BlockUser,
    GetMessage,
    GetChatList
} from './services';


// RIGHT HAND SIDE INTEGRATION

export const SendMessageAction = createAsyncThunk(
    'chatSlice/SendMessageAction',
    async (payload, { rejectWithValue }) => {
        try {
            const formDataHeader = "multipart/form-data;";
            const { data, status } = await SendMessage(payload, true, formDataHeader);
            return data;
        } catch (err) {
            console.log('🚀 ~ err:', err);
            toast.error(err?.response?.data?.message || err.message);
            if (err instanceof AxiosError) {
                return rejectWithValue(err?.response?.data?.message);
            }
            return rejectWithValue(err.message);
        }
    }
);


// GetMessage Api call
export const getMessageAction = createAsyncThunk(
    "chatSlice/getMessageAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetMessage(payload);
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

export const getMessagePaginationAction = createAsyncThunk(
    "chatSlice/getMessagePaginationAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetMessage(payload);
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


// Get Chat List 
export const getChatListAction = createAsyncThunk(
    "chatSlice/getChatListAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await GetChatList(payload);
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

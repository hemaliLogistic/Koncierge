import { createSlice } from "@reduxjs/toolkit";

import {
    getChatListAction,
    getMessageAction,
    getMessagePaginationAction,
    SendMessageAction,
} from "./action";

const initialState = {
    sendMessage: null,
    setFileInput: [],
    setSendFile: [],
    messageList: [],
    selectedUser: {},
    chatUserList: [],
    // dataToRender:[]
    audioChatInput: ""
};

const ChatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        resetToInitialState: (state) => {
            return initialState;
        },
        setSendMessage: (state, { payload }) => {
            state.sendMessage = payload;
        },
        setFileInput: (state, { payload }) => {
            state.setFileInput = payload;
        },
        setSendFileInput: (state, { payload }) => {
            state.setSendFile = payload;
        },
        setNewMessage: (state, { payload }) => {
            console.log("payload: ", payload);
            //   state.messageList = payload;
            state.messageList = [payload, ...state.messageList];
        },
        setSelectedUser: (state, { payload }) => {
            state.selectedUser = payload;
        },
        setAudioChatInput: (state, { payload }) => {
            state.audioChatInput = payload;
        },
        setPaginationMessageList: (state, { payload }) => {
            state.messageList = [...state.messageList, ...payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SendMessageAction.pending, (state, { payload }) => {
                // state.isChatDetails = true;
                state.error = null;
            })
            .addCase(SendMessageAction.fulfilled, (state, action) => {
                // state.chatDetailsData = action.payload;
                // state.isChatDetails = false;
                state.error = null;
            })
            .addCase(SendMessageAction.rejected, (state, { payload }) => {
                // state.isChatDetails = false;
                state.error = payload;
            })
            .addCase(getMessageAction.pending, (state, { payload }) => {
                // state.isChatDetails = true;
                state.error = null;
            })
            .addCase(getMessageAction.fulfilled, (state, action) => {
                state.messageList = action.payload.response;
                // state.isChatDetails = false;
                state.error = null;
            })
            .addCase(getMessageAction.rejected, (state, { payload }) => {
                // state.isChatDetails = false;
                state.error = payload;
            })
            .addCase(getMessagePaginationAction.pending, (state, { payload }) => {
                // state.isChatDetails = true;
                state.error = null;
            })
            .addCase(getMessagePaginationAction.fulfilled, (state, action) => {
                // state.messageList = action.payload.response;
                // state.isChatDetails = false;
                state.error = null;
            })
            .addCase(getMessagePaginationAction.rejected, (state, { payload }) => {
                // state.isChatDetails = false;
                state.error = payload;
            })
            .addCase(getChatListAction.pending, (state, { payload }) => {
                // state.isChatDetails = true;
                state.error = null;
            })
            .addCase(getChatListAction.fulfilled, (state, action) => {
                state.chatUserList = action.payload;
                // state.isChatDetails = false;
                state.error = null;
            })
            .addCase(getChatListAction.rejected, (state, { payload }) => {
                // state.isChatDetails = false;
                state.error = payload;
            });
    },
});

export const chatApiSliceReducer = ChatSlice.reducer;
export const {
    setSendMessage,
    setFileInput,
    setSendFileInput,
    setNewMessage,
    setSelectedUser,
    setAudioChatInput,
    setPaginationMessageList
} = ChatSlice.actions;

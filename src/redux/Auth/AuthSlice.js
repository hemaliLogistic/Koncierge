import { createSlice } from "@reduxjs/toolkit";

import {
  forgotPasswordAction,
  loginAction,
  registerAction,
  resetPasswordAction,
} from "./action";
import { verifyEmail } from "./services";

const initialState = {
  isLoading: false,
  isForgotPassword: false,
  isRestPassword: false,
  isEmailData: "",
  userData: [],
  isLoggedIn: false,
  isUser: false,
  isCookie: false,
  authState: "",
  googleLoginData: [],
  verifyEmail: "",
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetToInitialState(state) {
      return initialState;
    },
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    userData: (state, { payload }) => {
      state.userData = payload;
    },
    setIsForgotPassword: (state, { payload }) => {
      state.isForgotPassword = payload;
    },
    setIsOtp: (state, { payload }) => {
      state.isOtp = payload.isOtp;
      state.isEmailData = payload.email;
    },
    setIsRestPassword: (state, { payload }) => {
      state.isRestPassword = payload.isResetPassword;
      state.isEmailData = payload.email;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setUserStatus: (state, action) => {
      state.isUser = action.payload;
    },
    setUserStatusInitially: (state, action) => {
      state.isCookie = action.payload;
    },
    setGoogleLoginData: (state, action) => {
      state.googleLoginData = action.payload;
    },
    setVerfyEmail: (state, action) => {
      state.verifyEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(forgotPasswordAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(resetPasswordAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authApiSliceReducer = AuthSlice.reducer;

export const {
  userStore,
  resetToInitialState,
  setIsForgotPassword,
  setIsRestPassword,
  setIsLoggedIn,
  setUserStatus,
  setUserStatusInitially,
  setAuth,
  setGoogleLoginData,
  setVerfyEmail,
} = AuthSlice.actions;

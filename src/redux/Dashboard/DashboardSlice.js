import { createSlice } from "@reduxjs/toolkit";

import { allBookingAction, getProfileAction, rattingServiceAction } from "./action";

const initialState = {
    isLoading: false,
    data: [],
    notification: {},
    selectedEmployeeData: {},
    profileData: []
};

const DashBoardSlice = createSlice({
    name: "dashboardSlice",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setAppointmentData: (state, action) => {
            state.data = action.payload;
        },
        setNotificationData: (state, action) => {
            state.notification = action.payload;
        },
        setSelectedEmplyeeData: (state, action) => {
            state.selectedEmployeeData = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(allBookingAction.pending, (state, { payload }) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(getProfileAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.profileData = payload
                state.error = null;
            })
            .addCase(getProfileAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getProfileAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(rattingServiceAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(rattingServiceAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(rattingServiceAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            });
    },
});

export const dashboardApiSliceReducer = DashBoardSlice.reducer;

export const {
    userStore,
    resetToInitialState,
    setAppointmentData,
    setNotificationData,
    setSelectedEmplyeeData,
    setProfileData
} = DashBoardSlice.actions;

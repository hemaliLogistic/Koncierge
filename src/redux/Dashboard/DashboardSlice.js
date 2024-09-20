import { createSlice } from "@reduxjs/toolkit";

import { allBookingAction } from "./action";

const initialState = {
    isLoading: false,
    data: [],
    notification: {},
    selectedEmployeeData: {}

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
    },
    extraReducers: (builder) => {
        builder.addCase(allBookingAction.pending, (state, { payload }) => {
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
    setSelectedEmplyeeData
} = DashBoardSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

import { bookedSlotListAction, checkoutSessionAction, mainCategoryListAction, paymentHistoryAction, requestServiceQutationAction, serviceByMainCategoryListAction, unreadNotificationCount, updateDeviceToken } from "./action";

const initialState = {
    isLoading: false,
    categoryData: [],
    serviceListData: [],
    paymentHistoryData: [],
    bookedSlotData: [],
    quatationData: {},
    formData: {},
    isBookingModalOpen: false,
    deviceToken: {},
    unreadNotificationCount: {}

};

const HomeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {
        resetToInitialState(state) {
            return initialState;
        },
        setCategoryData: (state, action) => {
            state.categoryData = action.payload;
        },
        setServiceListData: (state, action) => {
            state.serviceListData = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload
        },
        setIsBookingModalOpen: (state, action) => {
            state.isBookingModalOpen = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(mainCategoryListAction.pending, (state, { payload }) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(mainCategoryListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.categoryData = payload.data
            })
            .addCase(mainCategoryListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                console.log("regi action--", payload);
                state.error = payload;
            })
            .addCase(serviceByMainCategoryListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(serviceByMainCategoryListAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.serviceListData = payload.data
            })
            .addCase(serviceByMainCategoryListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                console.log("regi action--", payload);
                state.error = payload;
            })
            .addCase(requestServiceQutationAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(requestServiceQutationAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.quatationData = payload.data
            })
            .addCase(requestServiceQutationAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                console.log("regi action--", payload);
                state.error = payload;
            })
            .addCase(checkoutSessionAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkoutSessionAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(checkoutSessionAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(paymentHistoryAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(paymentHistoryAction.fulfilled, (state, { payload }) => {
                state.paymentHistoryData = payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(paymentHistoryAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(bookedSlotListAction.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(bookedSlotListAction.fulfilled, (state, { payload }) => {
                state.bookedSlotData = payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(bookedSlotListAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateDeviceToken.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDeviceToken.fulfilled, (state, { payload }) => {
                state.deviceToken = payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateDeviceToken.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(unreadNotificationCount.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(unreadNotificationCount.fulfilled, (state, { payload }) => {
                state.unreadNotificationCount = payload?.data?.unReadNotifications;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(unreadNotificationCount.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const homeApiSliceReducer = HomeSlice.reducer;

export const { userStore, resetToInitialState, setCategoryData, setServiceListData, setFormData, setIsBookingModalOpen } =
    HomeSlice.actions;

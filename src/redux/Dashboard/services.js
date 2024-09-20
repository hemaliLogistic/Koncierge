import { axiosGet, axiosPost } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const AllBooking = (data) => {
    return axiosGet(API_ROUTER.ALL_BOOKING, data);
};


export const UpcomingBooking = (data) => {
    return axiosGet(API_ROUTER.UPCOMING_BOOKING, data);
};
export const PastBooking = (data) => {
    return axiosGet(API_ROUTER.PAST_BOOKING, data);
};
export const GetProfile = (data) => {
    return axiosGet(API_ROUTER.GET_PROFILE, data);
};
export const EditProfile = (data, isFormData, formDataHeader) => {
    return axiosPost(API_ROUTER.EDIT_PROFILE, data, formDataHeader, isFormData);
};
export const ChangePassword = (data) => {
    return axiosPost(API_ROUTER.CHANGE_PASSWORD, data);
};

export const GetNotification = (data) => {
    return axiosPost(API_ROUTER.GET_NOTIFICATION, data);
};

export const GetRequestdata = (data) => {
    return axiosPost(API_ROUTER.GET_REQUEST_DATA + data);
};
export const GetPrefrenceData = (data) => {
    return axiosGet(API_ROUTER.GET_PREFRENCES_DATA, data);
};
export const BookService = (data) => {
    return axiosPost(API_ROUTER.BOOK_SERVICE, data);
};
export const GetRequestExpire = (data) => {
    return axiosGet(API_ROUTER.GET_REQUEST_EXPIRED, data, true);
};

export const GetBookingCount = (data) => {
  return axiosGet(API_ROUTER.GET_BOOKING_COUNT, true);
};

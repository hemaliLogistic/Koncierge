import { axiosGet, axiosPost } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const MainCategoryList = (data) => {
    return axiosGet(API_ROUTER.MAIN_CATEGORY_LIST, data);
};
export const ServiceByMainCategoryList = (data) => {
    return axiosGet(API_ROUTER.SERVICE_LIST_BY_MAIN_CATEGORY, data);
};
export const BookedSlotList = (data) => {
    return axiosGet(API_ROUTER.BOOKED_SLOT_LIST, data);
};
export const RequestServiceQutation = (data) => {
    return axiosPost(API_ROUTER.REQUEST_SERVICE_QUTATION, data);
};
export const CheckoutSession = (data) => {
    return axiosPost(API_ROUTER.CHECKOUT_SESSION, data);
};
export const PaymentHistory = (data) => {
    return axiosGet(API_ROUTER.PAYMENT_HISTORY, data);
};
export const UpdateDeviceToken = (data) => {
    return axiosPost(API_ROUTER.UPDATE_TOKEN, data);
};
export const UnreadNotificationCount = (data) => {
    return axiosGet(API_ROUTER.UNREAD_NOTIFICATION_COUNT, data);
};
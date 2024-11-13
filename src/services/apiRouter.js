export const API_ROUTER = {
    REGISTER_USER: "user/auth/signup",
    LOGIN_USER: "user/auth/login",
    FORGET_PASSWORD_USER: "user/forgot-password",
    RESET_PASSWORD_USER: "user/reset-password",
    VERIFY_USER: "user/verify-email",
    RESEND_LINK: "user/resend-email-verification",
    UPDATE_TOKEN: "update-device-token",
    UNREAD_NOTIFICATION_COUNT: 'notification/unread-notifications',

    // Dashboard

    ALL_BOOKING: "all-booking-list",

    UPCOMING_BOOKING: "upcoming-booking-list",
    PAST_BOOKING: "past-booking-list",
    GET_PROFILE: "user/profile",
    EDIT_PROFILE: "user/update-profile",
    CHANGE_PASSWORD: "change-password",

    GET_BOOKING_COUNT: "booking-count",
    //Home Page

    MAIN_CATEGORY_LIST: "main-category-list",
    GET_NOTIFICATION: "notification/get-notifications",
    GET_REQUEST_DATA: "request-qutation-detail/",
    GET_SUBSCRIPTION_DATA: "subscription-detail/",

    GET_PREFRENCES_DATA: "preferences",

    SERVICE_LIST_BY_MAIN_CATEGORY: "service-list",
    BOOKED_SLOT_LIST: 'booked-slot',
    REQUEST_SERVICE_QUTATION: "request-service-qutation",

    BOOK_SERVICE: "book-service",
    GET_REQUEST_EXPIRED: "request-isexpired/",
    //Home Page

    MAIN_CATEGORY_LIST: "main-category-list",

    RATTING_SERVICE: "service-rating",

    GET_BOOKING_COUNT: "booking-count",

    //Payment
    CHECKOUT_SESSION: "create-checkout-session",
    PAYMENT_HISTORY: "payment-history",

    //CHAT
    SEND_MESSAGE: "common/send-message",
    GET_MESSAGE: "chat/get-message-list",
    GET_CHAT_LIST: "chat/chat-user-list"
};

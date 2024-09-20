import { axiosDelete, axiosGet, axiosPost } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const SendMessage = (data, isFormData, formDataHeader) => {
  return axiosPost(API_ROUTER.SEND_MESSAGE, data, formDataHeader, isFormData);
};

export const GetMessage = (data) => {
  return axiosGet(API_ROUTER.GET_MESSAGE, data);
}


export const GetChatList = (data) => {
  return axiosGet(API_ROUTER.GET_CHAT_LIST, data);
}
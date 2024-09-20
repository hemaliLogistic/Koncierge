import axiosInstance from "@/utils/axios";
import { HOST_API } from "../../predict";
import { getData } from "@/utils/storage";

export const axiosPost = async (
  url,
  data,
  contentType = "application/json",
  isFormData
) => {
  let response = {};
  let header = {};

  const user = getData("user");
  const userAuth = user?.token;
  if (userAuth) {
    console.log("userAuth Ma");
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    console.log("else ma ");
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const dataObj = isFormData ? data : JSON.stringify(data);

    const result = await axiosInstance.post(url, dataObj, {
      headers: header,
    });
    response.data = result?.data || result?.data?.data;
    response.status = result?.status;
    return response;
  } catch (e) {
    console.log("ERROR", e);
    if (e.response) {
      return {
        data: e.response.data,
        status: e.response.status,
        message: e.response.data.message,
      };
    } else {
      return {
        data: null,
        status: false,
        message: e.message,
      };
    }
  }
};
export const axiosGet = async (
  url,
  params = data,
  isAppend = false,
  contentType = "application/json"
) => {
  let response = {};
  let header = {};
  let result = null;
  const user = getData("user");
  const userAuth = user?.token;
  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
    };
  }
  try {
    if (isAppend) {
      result = await axiosInstance.get(url + params, {
        headers: header,
      });
    } else {
      result = await axiosInstance.get(url, {
        headers: header,
        ...(Object.keys(params).length > 0 ? { params } : {}),
      });
    }

    response.data = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPatch = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response = result.data;
    response.status = result.data?.status || [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message =
      e?.response?.data?.detail ||
      e?.response?.data?.details ||
      "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPut = async (url, data, contentType = "application/json") => {
  let response = {};
  try {
    const result = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosDelete = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.delete(url, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

import axiosInstance from "@/utils/axios";

export const axiosPost = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};

  try {
    const result = await axiosInstance.post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": contentType,
        Accept: "*/*",
      },
    });
    response.data = result?.data || result?.data?.data;
    response.status = result?.status;
  } catch (e) {
    response.status = false;
    console.log("ERROR", e);

    if (e.response) {
      // Server responded with a status other than 200 range
      console.log("Response data:", e.response.data);
      console.log("Response status:", e.response.status);
      console.log("Response headers:", e.response.headers);
    } else if (e.request) {
      // Request was made but no response was received
      console.log("Request data:", e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", e.message);
    }
  }
  return response;
};
export const axiosGet = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.get(url, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
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

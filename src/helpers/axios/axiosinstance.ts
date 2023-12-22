import { getUserInfo } from "@/services/auth.service";
import { ResponseErrorType, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getUserInfo();
    const localToken = getUserInfo() || getFromLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//@ts-ignore
instance.interceptors.response.use(
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject as any;
  },
  function (error) {
    const responseObject: ResponseErrorType = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.errorMessages,
    };
    return Promise.reject(responseObject);
    // return responseObject;
  }
);
export { instance };

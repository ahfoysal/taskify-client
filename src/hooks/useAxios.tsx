import { getBaseUrl } from "@/helpers/congig/envConfig";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 403) {
          Cookies.remove("user");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;

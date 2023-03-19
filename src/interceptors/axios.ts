import Axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const { REACT_APP_API_URL } = process.env;

export const axios = Axios.create({
  baseURL: REACT_APP_API_URL,
});

axios.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

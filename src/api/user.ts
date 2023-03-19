import { axios } from "../interceptors/axios";
import User from "../types/User";

export const getUsers = (): Promise<User[]> => {
  return axios.get("users");
};

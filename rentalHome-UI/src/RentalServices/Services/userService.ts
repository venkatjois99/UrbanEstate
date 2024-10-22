import axios from "axios";
import { RegisterUser, LoginModel } from "../../models/registerUserModel";
const url = "";

export const addNewUser = (newUser: RegisterUser) => {
  return axios.post(url, newUser);
};

export const validateLogin = (user: LoginModel) => {
  return axios.post(url, user);
};

import axios from "axios";
import { RegisterUser, LoginModel } from "../../models/registerUserModel";
const url = "http://localhost:5033/api/Account/Login";

export const addNewUser = (newUser: RegisterUser) => {
  return axios.post("http://localhost:5033/api/Account/Register", newUser);
};

export const validateLogin = (user: LoginModel) => {
  return axios.post("http://localhost:5033/api/Account/Login", user);
};

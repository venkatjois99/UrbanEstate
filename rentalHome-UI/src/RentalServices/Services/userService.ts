import axios from "axios";
import { RegisterUser, LoginModel } from "../../models/registerUserModel";
const url = "https://localhost:8080/gateway/Account";

export const addNewUser = (newUser: RegisterUser) => {
  return axios.post(`${url}/Register`, newUser);
};

export const validateLogin = (user: LoginModel) => {
  return axios.post(`${url}/Login`, user);
};

export const updateOwnerRoleService = (id:string) => {
  return axios.put(`${url}/updateOwnerRole/${id}`);
}; 
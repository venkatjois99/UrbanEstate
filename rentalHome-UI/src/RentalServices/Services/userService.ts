import axios from "axios";
import { RegisterUser, LoginModel } from "../../models/registerUserModel";
const url = "https://localhost:8080/gateway/Account";

export const addNewUser = async (newUser: RegisterUser) => {
  try {
    const response = await axios.post(`${url}/Register`, newUser);
    console.log(response);
    return response;
  } catch (error:any) {
    // Check for 401 Unauthorized or other errors
    if (error.response) {
      // The request was made, but the server responded with an error
      throw error.response;
    } else {
      // Something else happened while setting up the request
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const validateLogin = (user: LoginModel) => {
  return axios.post(`${url}/Login`, user);
};


export const updateOwnerRoleService = async (id: string | null) => {
  try {
    if (id === null) {
      throw new Error("Login expired. User ID is null.");
    }
    return await axios.put(`${url}/updateOwnerRole/${id}`);
  } catch (error) {
    // Handle the error as needed (e.g., log it, rethrow it, etc.)
    console.error("Error updating owner role:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const getUserDetailsByIdService = async (id:string | null) =>{
  try {
    if (id === null) {
      throw new Error("Login expired. User ID is null.");
    }
    return await axios.get(`${url}/GetById/${id}`);
  } catch (error) {
    console.error("Error updating owner role:", error);
    throw error; // Rethrow the error for further handling
  }
};

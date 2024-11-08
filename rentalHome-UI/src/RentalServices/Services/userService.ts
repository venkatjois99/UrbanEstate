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

export const getAllUsers = async () => {
  try {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the Bearer token
    const res = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    // Handle error appropriately (e.g., logging or rethrowing)
    throw error;
  }
};


export const forgotPasswordService = async(email:string)=>{
  try {
    if (email === null) {
      throw new Error("email is empty.");
    }
    console.log(email)
    return await axios.post(`${url}/forgot-password?Email=${email}`)
  } catch (error) {
    console.error("Error reset", error);
    throw error; // Rethrow the error for further handling
  }
}


export const deleteUser = async (email: string) => {
  try {
    const response = await axios.delete(`${url}/${email}`);
    console.log('User deleted:', response);
    return response;
  } catch (error: any) {
    // Check for 401 Unauthorized or other errors
    if (error.response) {
      // The request was made, but the server responded with an error
      console.error('Server error:', error.response);
      throw error.response;
    } else {
      // Something else happened while setting up the request
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};
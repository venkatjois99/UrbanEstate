import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser, validateLogin,updateOwnerRoleService,getUserDetailsByIdService } from "../../Services/userService";
import { LoginModel, RegisterUser } from "../../../models/registerUserModel";
import { getTokenData } from '../../../utils/jwt';
import  {setUserFromToken}  from './userSlicer';

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user: RegisterUser, { rejectWithValue }) => {
    try {
      const response = await addNewUser(user);
      if (response.status === 200 || response.status === 201) {
        // console.log("User added successfully", response.status);
        return response.data; // User data or success message
      } else {
        // console.log("Response:", response.status, response.data);
        return rejectWithValue(response.data || 'Something went wrong during registration.');
      }
    } catch (error: any) {

      // console.log(error.data.message);
      // If an error was caught in the service, we pass it to the rejectWithValue
      if (error?.status === 401) {
        return rejectWithValue(error.data.message);
      }
     
      return rejectWithValue(error.data.message || 'An error occurred while registering the user.');
    }
  }
);



export const validateUser = createAsyncThunk(
  "user/validateUser",
  async (user: LoginModel, { rejectWithValue }) => {
    try {
      const response = await validateLogin(user);
      // console.log(response);
      const token = response.data;
      if (!token) {
        return null;
      }
      const tokenData = getTokenData(token); // Decode the token
      return tokenData;
    } catch (error:any) {
      // Customize the error message sent to the rejected action payload
      if (error.response) {
        // If there's a response (e.g., 401), return the message from the response
        return rejectWithValue(error.response.data.message || 'Request failed');
      } else {
        // For network or other errors, return a generic message
        return rejectWithValue('Network Error. Please try again.');
      }
    }
  }
);
export const updateOwnerRole= createAsyncThunk("user/updateOwnerRole",async (userId:string|null) =>{
    const response = await updateOwnerRoleService(userId)
    // console.log(response);
    
    return response.data;
})

export const initializeUserFromToken = () => (dispatch: (arg0: { payload: { userId: string | null; role: string | null; }; type: "user/setUserFromToken"; }) => void) => {
    const tokenData = getTokenData(localStorage.getItem("token"));
    if (tokenData) {
        dispatch(setUserFromToken({ userId: tokenData.id, role: tokenData.role }));
    }
};


export const getUserDetailsById = createAsyncThunk(
  "user/getUserDetailsById",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue("User ID is null.");
      }
      const response = await getUserDetailsByIdService(userId);
      return response.data; // Return the user details data
    } catch (error:any) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser, validateLogin,updateOwnerRoleService,getUserDetailsByIdService } from "../../Services/userService";
import { LoginModel, RegisterUser } from "../../../models/registerUserModel";
import { getTokenData } from '../../../utils/jwt';
import  {setUserFromToken}  from './userSlicer';

export const addUser= createAsyncThunk("user/addUser",async (user:RegisterUser) =>{
    const response = await addNewUser(user)
    console.log(response);
    
    return response.data;
})

export const validateUser = createAsyncThunk("user/validateUser",async (user:LoginModel)=>{
    const response = await validateLogin(user);
    const token = response.data;
    if(!token){
        return null
    }
    const tokenData =  getTokenData(token); // Decode the token
    return tokenData;
})

export const updateOwnerRole= createAsyncThunk("user/updateOwnerRole",async (userId:string|null) =>{
    const response = await updateOwnerRoleService(userId)
    console.log(response);
    
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

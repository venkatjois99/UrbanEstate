import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser, validateLogin,updateOwnerRoleService } from "../../Services/userService";
import { LoginModel, RegisterUser } from "../../../models/registerUserModel";
import { getTokenData } from '../../../utils/jwt';

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

export const updateOwnerRole= createAsyncThunk("user/updateOwnerRole",async (userId:string) =>{
    const response = await updateOwnerRoleService(userId)
    console.log(response);
    
    return response.data;
})
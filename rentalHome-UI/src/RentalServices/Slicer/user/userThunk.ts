import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser, validateLogin } from "../../Services/userService";
import { LoginModel, RegisterUser } from "../../../models/registerUserModel";


export const addUser= createAsyncThunk("user/addUser",async (user:RegisterUser) =>{
    const response = await addNewUser(user)
    console.log(response);
    
    return response.data;
})

export const validateUser = createAsyncThunk("user/validateUser",async (user:LoginModel)=>{
    const response = await validateLogin(user);
    const data = response.data;
    if(!data.length){
        return null
    }
    return data;
})

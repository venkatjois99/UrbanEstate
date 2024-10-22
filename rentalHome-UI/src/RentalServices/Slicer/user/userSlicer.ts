import { createSlice } from "@reduxjs/toolkit";
import { addUser, validateUser } from "./userThunk";

const initialState={
     isLoggedIn:false,
     isRegistered:false,
     registerstatus: "",
     loginStatus: "",
}
const userSlicer = createSlice({
    name:'user',
    initialState,
    reducers:{
            logout:(state)=>{
                state.isLoggedIn=false
            },
            register: (state) => {
                state.isRegistered = true
            }
    },
    extraReducers:(builder)=>{
        builder
                .addCase(addUser.fulfilled,(state)=>{
                    console.log("fulfilled");
                    state.isRegistered=true
                })
                .addCase(addUser.pending,(state)=>{
                    state.registerstatus='pending';
                })
                .addCase(addUser.rejected,(state)=>{
                    state.isRegistered=false
                    state.registerstatus='rejected'
                })
                .addCase(validateUser.fulfilled,(state)=>{
                    state.isLoggedIn=true;
                    // state.loginStatus='success';
                })
                .addCase(validateUser.pending,(state)=>{
                    state.loginStatus='pending'
                })
                .addCase(validateUser.rejected,(state)=>{
                    state.isLoggedIn=false;
                    state.loginStatus='rejected'
                })

    }

})
export const {logout} = userSlicer.actions

export default userSlicer.reducer;
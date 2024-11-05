import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser, validateUser,updateOwnerRole,getUserDetailsById } from "./userThunk";
 // Import your utility function
 import { getTokenData } from '../../../utils/jwt';
import {UserModelDTO} from '../../../models/registerUserModel'

 interface AuthState {
     isLoggedIn: boolean;
     isRegistered: boolean;
     registerStatus: string;
     loginStatus: string;
     userId: string | null;
     role: string | null;
     ownerRoleStatus:string | null;
     userDetails: UserModelDTO | null;
    userDetailsStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    userDetailsError: string | null;

 }
 
 // Use generateTokenData to get initial userId and role based on token
 const tokenData = getTokenData(localStorage.getItem("token"));
 const initialState: AuthState = {
     isLoggedIn: !!localStorage.getItem("token"),
     isRegistered: false,
     registerStatus: "",
     loginStatus: "",
     userId: tokenData?.id || null,  // Initialize with userId from tokenData or null
     role: tokenData?.role || null,  // Initialize with role from tokenData or null
     ownerRoleStatus: null,
     userDetails: null,
     userDetailsStatus: 'idle',
     userDetailsError: null,
 };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;  // Clear userId on logout
            state.role = null;     // Clear role on logout
            localStorage.removeItem("token");
        },
        register: (state) => {
            state.isRegistered = true;
        },
        setUserFromToken: (state, action: PayloadAction<{ userId: string | null; role: string | null }>) => {
            state.userId = action.payload.userId;
            state.role = action.payload.role;
            state.isLoggedIn = true; // Assuming if we have userId, user is logged in
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state) => {
                console.log("fulfilled");
                state.isRegistered = true;
            })
            .addCase(addUser.pending, (state) => {
                state.registerStatus = 'pending';
            })
            .addCase(addUser.rejected, (state) => {
                state.isRegistered = false;
                state.registerStatus = 'rejected';
            })
            .addCase(validateUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoggedIn=true;
                    localStorage.setItem("token", action.payload.token); // If you want to store the token as well
                }
                console.log(state.userId);
            })
            .addCase(validateUser.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(validateUser.rejected, (state) => {
                state.isLoggedIn = false;
                state.loginStatus = 'rejected';
                state.userId =null;  // Ensure userId is cleared on failure
                state.role = null;     // Ensure role is cleared on failure
            })
            .addCase(updateOwnerRole.pending, (state) => {
                state.ownerRoleStatus = 'pending'; // Set the status to pending
            })
            .addCase(updateOwnerRole.fulfilled, (state, action) => {
                console.log("Owner role updated:", action.payload);
                state.role = action.payload.role; // Update the role in state
                state.ownerRoleStatus = 'fulfilled'; // Set status to fulfilled
            })
            .addCase(updateOwnerRole.rejected, (state) => {
                console.error("Failed to update owner role");
                state.ownerRoleStatus = 'rejected'; // Set status to rejected
            })
            .addCase(getUserDetailsById.pending, (state) => {
                state.userDetailsStatus = 'pending'; // Set loading state
            })
            .addCase(getUserDetailsById.fulfilled, (state, action: PayloadAction<UserModelDTO>) => {
                state.userDetailsStatus = 'fulfilled';
                state.userDetails = action.payload; // Store the fetched user details
            })
            .addCase(getUserDetailsById.rejected, (state, action) => {
                state.userDetailsStatus = 'rejected';
                state.userDetailsError = action.error.message || 'Failed to fetch user details';
            });
 
    }
});

export const { logout,setUserFromToken } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { addUser, validateUser } from "./userThunk";
import { getTokenData } from '../../../utils/jwt'; // Import your utility function

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
    isRegistered: false,
    registerstatus: "",
    loginStatus: "",
    userId: "",  // Add userId to initial state
    role: "",    // Add role to initial state
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = "";  // Clear userId on logout
            state.role = "";     // Clear role on logout
            localStorage.removeItem("token");
        },
        register: (state) => {
            state.isRegistered = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state) => {
                console.log("fulfilled");
                state.isRegistered = true;
            })
            .addCase(addUser.pending, (state) => {
                state.registerstatus = 'pending';
            })
            .addCase(addUser.rejected, (state) => {
                state.isRegistered = false;
                state.registerstatus = 'rejected';
            })
            .addCase(validateUser.fulfilled, (state, action) => {
                const token = action.payload; // Assuming the payload contains the token
                const tokenData = getTokenData(token); // Decode the token and get ID and role
              
                if (tokenData) {
                    state.isLoggedIn = true;
                    localStorage.setItem("token", token); // Store the token
                    state.userId = tokenData.id; // Store user ID from decoded token
                    state.role = tokenData.role; // Store role from decoded token
                }
                console.log(tokenData?.id);
            })
            .addCase(validateUser.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(validateUser.rejected, (state) => {
                state.isLoggedIn = false;
                state.loginStatus = 'rejected';
                state.userId = "";  // Ensure userId is cleared on failure
                state.role = "";     // Ensure role is cleared on failure
            });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

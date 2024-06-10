import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        console.log(info);
        try {
            const { data } = await api.post('/admin-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            console.log(data);
            return fulfillWithValue(data);
        } 
        catch (error) {
            console.error(error);  // Log the full error
            // Check if the error response exists and has data, otherwise return a generic error
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: ''
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
            state.dispatchMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(admin_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload && payload.successMessage ? payload.successMessage : "Login Successful";
            })
            .addCase(admin_login.rejected, (state, { payload }) => {
                state.loader = false;
                // Ensure there is a payload and it contains an errorMessage, otherwise set a default message
                state.errorMessage = payload && payload.errorMessage ? payload.errorMessage : "Please Enter a Valid Email and Password";
            });
    }
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;

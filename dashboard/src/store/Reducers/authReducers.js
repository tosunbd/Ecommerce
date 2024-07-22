import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/admin-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch (error) {
            // console.error(error);  // Log the full error
            // Check if the error response exists and has data, otherwise return a generic error
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);

export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/seller-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch (error) {
            // console.error(error);  // Log the full error
            // Check if the error response exists and has data, otherwise return a generic error
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);


export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/seller-register', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch (error) {
            // console.error(error);  // Log the full error
            // Check if the error response exists and has data, otherwise return a generic error
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);


export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_ , { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.get('/get-user', { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch (error) {
            // console.error(error);  // Log the full error
            // Check if the error response exists and has data, otherwise return a generic error
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);

const returnRole = (token) => {
    if (token)
    {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime)
        {
            localStorage.removeItem('accessToken');
            return '';
        }
        else
        {
            return decodeToken.role;
        }
    }
    else
    {
        return '';
    }
}


export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: {},
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            // state.successMessage = "";
            // state.dispatchMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(admin_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload && payload.successMessage ? payload.successMessage : "Admin Login Successful";
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(admin_login.rejected, (state, { payload }) => {
                state.loader = false;
                // Ensure there is a payload and it contains an errorMessage, otherwise set a default message
                state.errorMessage = payload && payload.errorMessage ? payload.errorMessage : "Please Enter a Valid Email and Password";
            })

            .addCase(seller_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(seller_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload && payload.successMessage ? payload.successMessage : "Seller Login Successful";
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(seller_login.rejected, (state, { payload }) => {
                state.loader = false;
                // Ensure there is a payload and it contains an errorMessage, otherwise set a default message
                state.errorMessage = payload && payload.errorMessage ? payload.errorMessage : "Please Enter a Valid Email and Password";
            })

            .addCase(seller_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(seller_register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload && payload.successMessage ? payload.successMessage : "Successfuly Register";
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(seller_register.rejected, (state, { payload }) => {
                state.loader = false;
                // Ensure there is a payload and it contains an errorMessage, otherwise set a default message
                state.errorMessage = payload && payload.errorMessage ? payload.errorMessage : "Please Enter a Valid Email and Password";
            })

            .addCase(get_user_info.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
            })
    }
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;

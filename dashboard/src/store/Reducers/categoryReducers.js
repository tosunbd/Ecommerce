import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
    'auth/admin_login',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            const { data } = await api.post('/category-add', formData, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        }
        catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);


export const categoryReducers = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categories: []
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
        .addCase(categoryAdd.pending, (state) => {
            state.loader = true;
        })
        // .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload && payload.successMessage ? payload.successMessage : "Admin Login Successful";
        //     state.token = payload.token;
        //     state.role = returnRole(payload.token);
        // })
        .addCase(categoryAdd.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload && payload.errorMessage ? payload.errorMessage : "Please Enter a Valid Email and Password";
        })
    }
});

export const { messageClear } = categoryReducers.actions;
export default categoryReducers.reducer;

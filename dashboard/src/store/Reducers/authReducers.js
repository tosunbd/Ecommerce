import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info) => {
        console.log(info);
        try {
            // const { data } = await api.post('/admin-login', info, { withCredentials: true });
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
)

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: ''
    },
    reducers: {
        // setUser: (state, action) => {
        //     state.user = action.payload
        // }
    },
    // extraReducers: (builder) => {
    extraReducers: () => {
        // builder
        //     .addCase(loginUser.pending, (state) => {
        //         state.loader = true
        //     })
        //     .addCase(loginUser.fulfilled, (state, action) => {
        //         state.loader = false
        //         state.successMessage = action.payload
        //     })
        //     .addCase(loginUser.rejected, (state, action) => {
        //         state.loader = false
        //         state.errorMessage = action.payload
        //     })
    }
});

export default authReducer.reducer;
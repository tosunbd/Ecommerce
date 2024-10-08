import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Start of add_category
export const add_category = createAsyncThunk(
    'category/add_category',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);

            const { data } = await api.post('/category-add', formData, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);

// End of add_category

// start of get_category

export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ itemsPerPage, currentPage, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/category-get?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
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
        categories: [],
        totalCategory: 0
    },
    reducers: {
        messageClear: (state,_) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_category.pending, (state) => {
            state.loader = true;
        })
        .addCase(add_category.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(add_category.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.categories = [...state.categories, payload.category];
        })

        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categories = payload.categories;
            state.totalCategory = payload.totalCategory;
        })
    }
});

export const { messageClear } = categoryReducers.actions;
export default categoryReducers.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Start of add_product
export const add_product = createAsyncThunk(
    'product/add_product',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/add_product', product, { withCredentials: true });
            console.log('API response:', data); // Log the API response here
            return fulfillWithValue(data);
        } catch (error) {
            console.error('API error:', error); // Log API errors
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);
// End of add_product

// start of get_product

export const get_product = createAsyncThunk(
    'product/get_product',
    async ({ itemsPerPage, currentPage, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/product-get?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);

export const productReducers = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        products: [],
        totalProduct: 0
    },
    reducers: {
        messageClear: (state,_) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_product.pending, (state) => {
            state.loader = true;
        })
        .addCase(add_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        })
        .addCase(add_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.products = [...state.products, payload.product];
        })

        .addCase(get_product.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.totalproduct = payload.totalproduct;
        })
    }
});

export const { messageClear } = productReducers.actions;
export default productReducers.reducer;

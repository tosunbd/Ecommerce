import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Start of add_product
export const add_product = createAsyncThunk(
    'product/add_product',
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/add_product', formData, {
                withCredentials: true,  // optional, depending on whether you need credentials
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data
                ? error.response.data
                : { errorMessage: 'Unable to connect to server' }
            );
        }
    }
);
// End of add_product

// Start of get_products
export const get_products = createAsyncThunk(
    'product/get_products',
    async ({ itemsPerPage, currentPage, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get_products?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);
// End of get_products

// Product Reducer Slice
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
        messageClear: (state, _) => {
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
            state.errorMessage = payload.errorMessage || 'Something went wrong';
        })
        .addCase(add_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.products = [...state.products, payload.product];
        })

        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
        });
    }
});

export const { messageClear } = productReducers.actions;
export default productReducers.reducer;

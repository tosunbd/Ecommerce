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
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);
// End of get_products

// Start of get_product
export const get_product = createAsyncThunk(
    'product/get_product',
    async (productId, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.get(`/get_product/${productId}`, { withCredentials: true }); // Make sure /api/ is included
        // console.log("get_product = " + data);
        console.log(data);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data
            ? error.response.data
            : { errorMessage: "Unable to connect to server" }
        );
      }
    }
); 
// End of get_product


// Start of update_product
export const update_product = createAsyncThunk(
    'product/update_product',
    async (product, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.post(`/update_product`, product, { withCredentials: true });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data
            ? error.response.data
            : { errorMessage: "Unable to connect to server" }
        );
      }
    }
);
// End of update_product


// Start of update_product
export const product_image_update = createAsyncThunk(
    'product/product_image_update',
    async (oldImage, newImage, productId, { rejectWithValue, fulfillWithValue }) => {
        try
        {
            const formData = new FormData();
            formData.append('oldImage', oldImage);
            formData.append('newImage', newImage);
            formData.append('productId', productId);
            const { data } = await api.post(`/product_image_update`, formData, { withCredentials: true });
            return fulfillWithValue(data);
        }
        catch (error) {
            return rejectWithValue(
                error.response && error.response.data
                ? error.response.data
                : { errorMessage: "Unable to connect to server" }
        );
      }
    }
);
// End of update_product


// Product Reducer Slice
export const productReducers = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        product: '',
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
            state.products = [...state.products, payload.product];
            state.successMessage = payload.message;            
        })
        .addCase(get_product.fulfilled, (state, { payload }) => {
            state.product = payload.product;            
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
        })
        .addCase(update_product.pending, (state) => {
            state.loader = true;
        })
        .addCase(update_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.errorMessage || 'Something went wrong';
        })
        .addCase(update_product.fulfilled, (state, { payload }) => {
            state.loader = false;            
            state.product = payload.product;
            state.successMessage = payload.message;
        });
    }
});

export const { messageClear } = productReducers.actions;
export default productReducers.reducer;

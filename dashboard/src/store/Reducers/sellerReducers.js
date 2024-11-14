import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Start of get_seller_request
export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async ({ itemsPerPage, currentPage, searchValue }, { rejectWithValue }) => {
        try {   
            const { data } = await api.get(`/get_seller_request`, {
                params: { itemsPerPage, currentPage, searchValue },
                withCredentials: true
            });
            console.log(data);
            return data; // Return data directly, no need for fulfillWithValue
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || { errorMessage: "Unable to connect to server" }
            );
        }
    }
); 
// End of get_seller_request

// Start of get_seller
export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async ({ sellerId }, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/get_seller/${sellerId}`, {
                withCredentials: true
            });
            console.log(data);
            return data; // Return data directly
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || { errorMessage: "Unable to connect to server" }
            );
        }
    }
); 
// End of get_seller

// Start of seller_status_update
export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async ({ info }, { rejectWithValue }) => {
        try {
            const { data } = await api.post(`/update_seller_status`, info, {
                withCredentials: true
            });
            console.log(data);
            return data; // Return data directly
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || { errorMessage: "Unable to connect to server" }
            );
        }
    }
); 
// End of seller_status_update

// Seller Reducer Slice
export const sellerReducers = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        seller: null,
        sellers: [],
        totalSeller: 0
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_seller_request.pending, (state) => {
            state.loader = true;
        })
        .addCase(get_seller_request.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.sellers = payload.sellers || []; // Default to empty array if undefined
            state.totalSeller = payload.totalSeller || 0;
        })
        .addCase(get_seller_request.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.errorMessage || 'Something went wrong with fetching sellers';
        })
        .addCase(get_seller.pending, (state) => {
            state.loader = true;
        })
        .addCase(get_seller.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.seller = payload?.seller || null; // Default to null if undefined
        })
        .addCase(get_seller.rejected, (state, { payload }) => { 
            state.loader = false;
            state.errorMessage = payload?.errorMessage || 'Something went wrong with fetching a seller';
        })
        .addCase(seller_status_update.pending, (state) => {
            state.loader = true;
        })
        .addCase(seller_status_update.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload?.message || 'Seller status updated successfully';
        })
        .addCase(seller_status_update.rejected, (state, { payload }) => { 
            state.loader = false;
            state.errorMessage = payload?.errorMessage || 'Something went wrong with updating seller status';
        });
    }
});

export const { messageClear } = sellerReducers.actions;
export default sellerReducers.reducer;

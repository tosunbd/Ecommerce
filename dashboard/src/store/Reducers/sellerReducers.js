import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Start of get_sellers
export const get_sellers = createAsyncThunk(
    'seller/get_sellers',
    async ({ itemsPerPage, currentPage, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get_sellers?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response && error.response.data ? error.response.data : { errorMessage: "Unable to connect to server" });
        }
    }
);
// End of get_sellers

// Start of get_seller
export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (productId, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.get(`/get_seller/${productId}`, { withCredentials: true });
        // console.log(data);
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
// End of get_seller

// Seller Reducer Slice
export const sellerReducers = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        seller: '',
        sellers: [],
        totalSeller: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder        
        .addCase(get_seller.fulfilled, (state, { payload }) => {
            state.seller = payload.seller;            
        })
        .addCase(get_sellers.fulfilled, (state, { payload }) => {
            state.sellers = payload.sellers;
            state.totalSeller = payload.totalSeller;
        });
    }
});

export const { messageClear } = sellerReducers.actions;
export default sellerReducers.reducer;

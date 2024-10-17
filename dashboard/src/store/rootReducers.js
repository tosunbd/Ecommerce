import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducers";
import categoryReducer from "./Reducers/categoryReducers";
import productReducers from './Reducers/productReducers';
import { sellerReducers } from './Reducers/sellerReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducers,
    seller: sellerReducers
});

export default rootReducer;

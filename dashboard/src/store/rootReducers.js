import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from './Reducers/productReducer';
import sellerReducer from './Reducers/sellerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducers";
import categoryReducer from "./Reducers/categoryReducers";
import productReducers from './Reducers/productReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducers
});

export default rootReducer;

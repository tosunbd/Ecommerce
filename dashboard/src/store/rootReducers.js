import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducers";
import categoryReducer from "./Reducers/categoryReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer
});

export default rootReducer;

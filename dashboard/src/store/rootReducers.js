import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./Reducers/authReducers";

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;

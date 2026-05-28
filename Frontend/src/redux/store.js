import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authslice"

export const Store = configureStore({
    reducer:{
        auth:authReducer
    }
})
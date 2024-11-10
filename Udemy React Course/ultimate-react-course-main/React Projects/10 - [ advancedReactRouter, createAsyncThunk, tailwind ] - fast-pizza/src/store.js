import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/_userSlice";
import cartReducer from "./features/cart/_cartSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
});

export default store;

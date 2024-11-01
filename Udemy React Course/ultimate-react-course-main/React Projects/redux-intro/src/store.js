import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/_accountSlice";
import customerReducer from "./features/customers/_customerSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;

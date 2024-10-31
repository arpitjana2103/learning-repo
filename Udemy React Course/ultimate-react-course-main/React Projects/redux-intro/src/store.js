import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/_accountSlice";
import customerReducer from "./features/customers/_customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/_accountSlice";
import customerReducer from "./features/customers/_customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

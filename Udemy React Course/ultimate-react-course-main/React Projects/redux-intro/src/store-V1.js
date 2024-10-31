import { combineReducers, createStore } from "redux";

const ACCOUNT_ACTION = {
    DEPOSITE: "account/deposite",
    WITHDRAW: "account/withdraw",
    REQUEST_LOAN: "account/requestLoan",
    PAYLOAN: "account/payLoan",
};

const intialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

function deposite(amount) {
    return { type: ACCOUNT_ACTION.DEPOSITE, payload: amount };
}

function withdraw(amount) {
    return { type: ACCOUNT_ACTION.WITHDRAW, payload: amount };
}

function requestLoan(purpose, amount) {
    return {
        type: ACCOUNT_ACTION.REQUEST_LOAN,
        payload: {
            amount: amount,
            loanPurpose: purpose,
        },
    };
}

function payLoan() {
    return {
        type: ACCOUNT_ACTION.PAYLOAN,
    };
}

function accountReducer(currState = intialStateAccount, action) {
    switch (action.type) {
        case ACCOUNT_ACTION.DEPOSITE:
            console.log(action);
            return {
                ...currState,
                balance: currState.balance + action.payload,
            };

        case ACCOUNT_ACTION.WITHDRAW:
            return {
                ...currState,
                balance: currState.balance - action.payload,
            };

        case ACCOUNT_ACTION.REQUEST_LOAN:
            if (currState.loan > 0) return currState;
            return {
                ...currState,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose,
                balance: currState.balance + action.payload.amount,
            };

        case ACCOUNT_ACTION.PAYLOAN:
            return {
                ...currState,
                loan: 0,
                loanPurpose: "",
                balance: currState.balance - currState.loan,
            };

        default:
            return currState;
    }
}

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================

const CUSTOMER_ACTION = {
    CREATE: "customer/create",
    UPDATE_NAME: "customer/updateName",
};

const intialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

function createCustomer(fullName, nationalID) {
    return {
        type: CUSTOMER_ACTION.CREATE,
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}

function updateName(fullName) {
    return { type: CUSTOMER_ACTION.UPDATE_NAME, payload: fullName };
}

function customerReducer(currState = intialStateCustomer, action) {
    switch (action.type) {
        case CUSTOMER_ACTION.CREATE:
            return {
                ...currState,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };

        case CUSTOMER_ACTION.UPDATE_NAME:
            return {
                ...currState,
                fullName: action.payload,
            };

        default:
            return currState;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(deposite(5000));
store.dispatch(createCustomer("Arpit Jana", 123456));

console.log(store.getState());

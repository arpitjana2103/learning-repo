const ACTION = {
    DEPOSITE: "account/deposite",
    WITHDRAW: "account/withdraw",
    REQUEST_LOAN: "account/requestLoan",
    PAYLOAN: "account/payLoan",
    CONVERTING_CURRENCY: "account/convertingCurrency",
};

const intialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

export function deposite(amount, currency) {
    console.log("currency : ", currency);
    if (currency === "USD") return { type: ACTION.DEPOSITE, payload: amount };

    return async function (dispatch, getState) {
        dispatch({ type: ACTION.CONVERTING_CURRENCY });
        const from = currency;
        const to = "USD";
        const res = await fetch(
            `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
        );
        const data = await res.json();
        const rate = data.rates.USD;
        dispatch({ type: ACTION.DEPOSITE, payload: rate * amount });
    };
}

export function withdraw(amount) {
    return { type: ACTION.WITHDRAW, payload: amount };
}

export function requestLoan(purpose, amount) {
    return {
        type: ACTION.REQUEST_LOAN,
        payload: {
            amount: amount,
            loanPurpose: purpose,
        },
    };
}

export function payLoan() {
    return {
        type: ACTION.PAYLOAN,
    };
}

export default function accountReducer(currState = intialStateAccount, action) {
    switch (action.type) {
        case ACTION.DEPOSITE:
            return {
                ...currState,
                balance: currState.balance + action.payload,
                isLoading: false,
            };

        case ACTION.WITHDRAW:
            return {
                ...currState,
                balance: currState.balance - action.payload,
            };

        case ACTION.REQUEST_LOAN:
            if (currState.loan > 0) return currState;
            return {
                ...currState,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose,
                balance: currState.balance + action.payload.amount,
            };

        case ACTION.PAYLOAN:
            return {
                ...currState,
                loan: 0,
                loanPurpose: "",
                balance: currState.balance - currState.loan,
            };

        case ACTION.CONVERTING_CURRENCY:
            return { ...currState, isLoading: true };

        default:
            return currState;
    }
}

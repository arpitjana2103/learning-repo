const ACTION = {
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

export function deposite(amount) {
    return { type: ACTION.DEPOSITE, payload: amount };
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

        default:
            return currState;
    }
}

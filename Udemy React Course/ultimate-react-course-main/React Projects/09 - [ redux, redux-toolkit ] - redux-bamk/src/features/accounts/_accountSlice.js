import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        balance: 0,
        loan: 0,
        loanPurpose: "",
        isLoading: false,
    },
    reducers: {
        deposite: function (state, action) {
            state.isLoading = false;
            state.balance += action.payload;
        },
        withdraw: function (state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare: function (amount, purpose) {
                return { payload: { amount: amount, purpose: purpose } };
            },
            reducer: function (state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.balance += action.payload.amount;
                state.loanPurpose = action.payload.loanPurpose;
            },
        },
        payLoan: function (state) {
            state.balance -= state.loan;
            state.loanPurpose = "";
            state.loan = 0;
        },
        convertingCurrency: function (state) {
            state.isLoading = true;
        },
    },
});

export default accountSlice.reducer;

export function deposite(amount, currency) {
    if (currency === "USD")
        return { type: "account/deposite", payload: amount };

    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" });
        const from = currency;
        const to = "USD";
        const res = await fetch(
            `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
        );
        const data = await res.json();
        const rate = data.rates.USD;
        dispatch({ type: "account/deposite", payload: rate * amount });
    };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

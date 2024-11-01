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
        deposite(state, action) {
            state.balance += action.payload;
        },
        withdraw(state, action) {
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
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loanPurpose = "";
            state.loan = 0;
        },
    },
});

export default accountSlice.reducer;
export const { deposite, withdraw, requestLoan, payLoan } =
    accountSlice.actions;

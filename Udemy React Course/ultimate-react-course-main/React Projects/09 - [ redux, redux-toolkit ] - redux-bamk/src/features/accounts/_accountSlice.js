import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const FRANKFURTER_API = "https://api.frankfurter.app/latest";

const deposite = createAsyncThunk(
    "account/deposite",
    async function ({ amount, currency }, thunkAPI) {
        if (currency === "USD") return amount;

        try {
            const from = currency;
            const to = "USD";
            const res = await fetch(
                `${FRANKFURTER_API}?base=${from}&symbols=${to}`
            );
            const data = await res.json();
            const rate = data.rates.USD;
            return rate * amount;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState: {
        balance: 0,
        loan: 0,
        loanPurpose: "",
        isLoading: false,
        error: null,
    },
    reducers: {
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
    },
    extraReducers: function (builder) {
        return builder
            .addCase(deposite.pending, function (state, action) {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deposite.fulfilled, function (state, action) {
                state.isLoading = false;
                state.balance += action.payload;
            })
            .addCase(deposite.rejected, function (state, action) {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default accountSlice.reducer;

const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export { deposite, withdraw, requestLoan, payLoan };

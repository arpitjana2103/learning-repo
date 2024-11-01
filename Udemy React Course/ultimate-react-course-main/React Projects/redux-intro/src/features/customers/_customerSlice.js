import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        fullName: "",
        nationalID: "",
        createdAt: "",
    },
    reducers: {
        createCustomer: {
            prepare: function (fullName, naionalID) {
                return {
                    payload: { fullName: fullName, naionalID: naionalID },
                };
            },
            reducer: function (state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.naionalID;
            },
        },
        updateName: function (state, action) {
            state.fullName = action.payload;
        },
    },
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;

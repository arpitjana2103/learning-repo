import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // cart: [],
    cart: [
        {
            pizzaId: 12,
            name: "Mediterranean",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
    ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: function (state, action) {
            // payload = New Item
            state.cart.push(action.payload);
        },
        deleteItem: function (state, action) {
            // payload = pizzaId
            state.cart = state.cart.filter(function (item) {
                return item.id !== action.payload;
            });
        },
        increaseItemQuantity: function (state, action) {
            // payload = pizzaId
            const item = state.cart.find(function (item) {
                return item.id === action.payload;
            });
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity: function (state, action) {
            // payload = pizzaId
            const item = state.cart.find(function (item) {
                return item.id === action.payload;
            });
            if (item.quantity > 0) item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearCart: function (state) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
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
                return item.pizzaId !== action.payload;
            });
        },
        increaseItemQuantity: function (state, action) {
            // payload = pizzaId
            const item = state.cart.find(function (item) {
                return item.pizzaId === action.payload;
            });
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity: function (state, action) {
            // payload = pizzaId
            const item = state.cart.find(function (item) {
                return item.pizzaId === action.payload;
            });
            item.quantity--;
            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action);

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

export const getTotalCartPrice = function (state) {
    return state.cart.cart.reduce(function (sum, item) {
        return sum + item.totalPrice;
    }, 0);
};

export const getTotalCartItemCount = function (state) {
    return state.cart.cart.reduce(function (totalQty, item) {
        return totalQty + item.quantity;
    }, 0);
};

export const getItemQuantityById = function (id) {
    return function (state) {
        return (
            state.cart.cart.find(function (item) {
                return item.pizzaId === id;
            })?.quantity || 0
        );
    };
};

export default cartSlice.reducer;

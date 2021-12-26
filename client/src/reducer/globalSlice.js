import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    subTotal: 0,
    promoAmount: 0,
    basketTotal: 0,
};

const getTotal = (cart) => {
    const subTotal = cart.reduce((acc, item) => {
        acc += item.qty * item.price;
        return acc;
    }, 0);
    return Number(subTotal).toFixed(2);
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            state.subTotal = getTotal(state.cart);
        },
        editQty: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item.sku === action.payload.sku) {
                    return action.payload;
                }
                return item;
            });

            state.subTotal = getTotal(state.cart);
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.sku !== action.payload.sku);
            state.subTotal = getTotal(state.cart);
        },
    },
});

export const { addToCart, editQty, removeItem } = globalSlice.actions;

export const selectCart = (state) => state.global.cart;

export const selectSubTotal = (state) => state.global.subTotal;

export const selectPromoAmount = (state) => state.global.promoAmount;

export const selectBasketTotal = (state) => state.global.basketTotal;

export default globalSlice.reducer;

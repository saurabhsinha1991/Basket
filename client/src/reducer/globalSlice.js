import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            debugger;
            state.cart.push(action.payload);
        }
    },
});

export const { addToCart } = globalSlice.actions;

export const selectCart = (state) => state.global.cart;

export const selectMessage = (state) => state.global.isAlreadyExist;

export default globalSlice.reducer;

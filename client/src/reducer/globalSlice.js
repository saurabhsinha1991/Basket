import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkout, validatePromo } from '../features/Checkout/CheckoutAPI';

const initialState = {
    cart: [],
    subTotal: 0,
    promoAmount: 0,
    basketTotal: 0,
    promoError: '',
    creditCardNumber: '',
    checkoutMsg: '',
    checkoutStatus: null,
};

const getTotal = (cart) => {
    const subTotal = cart.reduce((acc, item) => {
        acc += item.qty * item.price;
        return acc;
    }, 0);
    return Number(subTotal).toFixed(2);
}

export const validatePromoAsync = createAsyncThunk(
    'checkout/validatePromo',
    async (promoCode) => {
        const response = await validatePromo({ promoCode });
        return response;
    }
);

export const checkoutAsync = createAsyncThunk(
    'checkout/checkout',
    async (data) => {
        const response = await checkout(data);
        return response;
    }
);

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            state.subTotal = getTotal(state.cart);
            state.basketTotal = state.subTotal - state.promoAmount;
        },
        editQty: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item.sku === action.payload.sku) {
                    return action.payload;
                }
                return item;
            });
            state.subTotal = getTotal(state.cart);
            state.basketTotal = state.subTotal - state.promoAmount;
        },
        setCreditCard: (state, action) => {
            state.creditCardNumber = action.payload;
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.sku !== action.payload.sku);
            state.subTotal = getTotal(state.cart);
            state.basketTotal = state.subTotal - state.promoAmount;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(validatePromoAsync.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.promoError = action.payload.errors[0].msg;
                } else {
                    state.promoError = '';
                }
                const { amount, discounttype } = action.payload;
                switch(discounttype) {
                    case 'percent':
                        const promoAmount = Number(state.subTotal * amount / 100).toFixed(2);
                        state.promoAmount = promoAmount;
                        state.basketTotal = Number(state.subTotal - promoAmount).toFixed(2);
                        break;
                    default:
                        break;
                }
          })
          .addCase(checkoutAsync.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.checkoutMsg = action.payload.errors[0].msg;
                    state.checkoutStatus = 'failure';
                } else {
                    state.checkoutStatus = 'success';
                    state.checkoutMsg = action.payload.msg;
                }
          });
    },
});

export const { addToCart, editQty, removeItem, setCreditCard } = globalSlice.actions;

export const selectCart = (state) => state.global.cart;

export const selectSubTotal = (state) => state.global.subTotal;

export const selectPromoAmount = (state) => state.global.promoAmount;

export const selectBasketTotal = (state) => state.global.basketTotal;

export const selectPromoError = (state) => state.global.promoError;

export const selectCardNumber = (state) => state.global.creditCardNumber;

export const selectCheckoutMsg = (state) => state.global.checkoutMsg;

export const selectCheckoutStatus = (state) => state.global.checkoutStatus;

export default globalSlice.reducer;

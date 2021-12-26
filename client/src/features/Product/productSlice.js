import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './ProductAPI';

const initialState = {
    products: [],
    cart: [],
    loading: false,
};

export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (amount) => {
      const response = await fetchProducts(amount);
      return response;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true;
          })
          .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
          });
    },
});

export const selectProduct = (state) => state.product.products;

export const selectCart = (state) => state.product.cart;

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;

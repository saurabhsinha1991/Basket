import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './ProductAPI';

const initialState = {
    products: [],
    loading: false,
};

export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async () => {
      const response = await fetchProducts();
      return response;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
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

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;

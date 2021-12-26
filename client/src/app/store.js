import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../reducer/globalSlice';
import productReducer from '../features/Product/productSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    product: productReducer,
  },
});

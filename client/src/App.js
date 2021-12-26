import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Product from './features/Product';
import Checkout from './features/Checkout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
  );
}

export default App;

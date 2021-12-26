import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Product from './features/Product';
import Checkout from './features/Checkout';
import Summary from './features/Summary';

function App() {
  return (
      <div className='App'>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
  );
}

export default App;

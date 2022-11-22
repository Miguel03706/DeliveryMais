import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './rotas'
import { CartProvider } from './contexts/cart';
import './global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Rotas />
    </CartProvider>
  </React.StrictMode>
);


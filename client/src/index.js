import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>
);

// El formulario para seleccionar landings en el mapa funciona por separado, no se pueden hacer queries conjuntas. Deberías solucionarlo si hay tiempo.

// Hay que hacer try-catch con las API calls, que pareces nuevo.
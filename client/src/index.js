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

// Hay que darle funcionalidad a los botones de editar y eliminar landing.
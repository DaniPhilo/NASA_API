import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

      <App />

    </BrowserRouter>
);

// El formulario para seleccionar landings en el mapa funciona por separado, no se pueden hacer queries conjuntas. Deberías solucionarlo si hay tiempo.

// Hay que hacer try-catch con las API calls, que pareces nuevo.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CharacterDetail from './Components/CharacterDetail';
import './styles/global.scss';

// Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CharacterDetail />
    </BrowserRouter>
  </React.StrictMode>
);

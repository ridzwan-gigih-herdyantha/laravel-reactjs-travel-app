import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.css';
import './index.css';
//import component App
import App from './App';

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
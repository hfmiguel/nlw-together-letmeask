import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// IMPORT SCSS
import './styles/global.scss';
// IMPORT SCSS

// IMPORT FIREABSE
import './Services/fireabase';
// IMPORT FIREABSE


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

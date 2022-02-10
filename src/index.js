import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from "react-cookie";
import App from './App';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
<CookiesProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter> 
</CookiesProvider>,
document.getElementById('root')
);

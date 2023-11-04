import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/utils/ErrorBoundary';
import './index.css';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter /*basename="/RSSReact2023Q4/"*/>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
  //  </React.StrictMode>
);

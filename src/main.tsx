import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/utils/ErrorBoundary';
import { API_BASE_URL } from './constants';
import './index.css';

axios.defaults.baseURL = API_BASE_URL;

async function enableMocking() {
  if (true || process.env.NODE_ENV !== 'development') return;
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <BrowserRouter /*basename="/RSSReact2023Q4/"*/>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
    //  </React.StrictMode>
  );
});

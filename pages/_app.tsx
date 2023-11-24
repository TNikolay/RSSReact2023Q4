import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/utils/ErrorBoundary';
import Layout from '../components/utils/Layout';
import { Provider } from 'react-redux';
import { makeStore, wrapper } from '../lib/store/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={makeStore()}>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
}

export default wrapper.withRedux(App);

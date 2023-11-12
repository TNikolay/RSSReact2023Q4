import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { API_BASE_URL } from './src/constants';
import { server } from './src/mocks/node';

expect.extend(matchers);

axios.defaults.baseURL = API_BASE_URL;

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! MSW intercepted:', request.method, request.url, '!!!!!!!!!!!!!!!!!!!!!!!!!!');
});

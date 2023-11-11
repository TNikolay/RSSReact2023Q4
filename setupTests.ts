import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { server } from './src/mocks/node';
import { API_BASE_URL } from './src/constants';
import axios from 'axios';

expect.extend(matchers);

axios.defaults.baseURL = API_BASE_URL;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! MSW intercepted:', request.method, request.url, '!!!!!!!!!!!!!!!!!!!!!!!!!!');
});

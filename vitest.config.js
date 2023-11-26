import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/__setupTests.ts',
    css: false,
    coverage: {
      provider: 'v8',
      include: ['**/components', '**/pages', '**/lib'],
      exclude: ['**/.next'],
    },
  },
});

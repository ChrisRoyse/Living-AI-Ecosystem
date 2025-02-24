import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 6873,
  },
  build: {
    target: 'esnext',
  },
});
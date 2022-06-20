import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // host
  server: {
    host: true,
  },

  define: {
    'process.env': import.meta,
  },
});

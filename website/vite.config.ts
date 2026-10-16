import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The frontend talks to the local WordPress (Playground on :9400) through this proxy, so the
// browser only ever sees one origin.
const WP_URL = process.env.WP_URL ?? 'http://127.0.0.1:9400';

export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom'] },
  server: {
    port: 5173,
    proxy: { '/wp-json': { target: WP_URL, changeOrigin: true } },
  },
  build: { outDir: '../dist', emptyOutDir: true },
});

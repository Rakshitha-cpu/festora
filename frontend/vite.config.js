import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The React app uses app.html as its entry so the existing index.html
// (the deployed vanilla app) is left untouched.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: { input: 'app.html' },
  },
});

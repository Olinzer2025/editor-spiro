// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 👈 Esta línea es CLAVE para que funcione sin servidor
  plugins: [react()],
});
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../dist/editor',
  },
  server: {
    host: '127.0.0.1',
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react() as PluginOption, svgr({ svgrOptions: { icon: true } })],
});

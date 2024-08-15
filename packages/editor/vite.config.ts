import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePluginExternals } from 'vite-plugin-externals-new';

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
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "@/App.less";',
      },
    },
  },
  plugins: [
    react() as PluginOption,
    process.env.NODE_ENV === 'production' &&
      VitePluginExternals({
        react: {
          src: 'https://cdn.staticfile.net/react/18.2.0/umd/react.production.min.js',
          varName: 'React',
        },
        'react-dom': {
          src: 'https://cdn.staticfile.net/react-dom/18.2.0/umd/react-dom.production.min.js',
          varName: 'ReactDOM',
        },
        dayjs: {
          src: 'https://cdn.staticfile.net/dayjs/1.11.10/dayjs.min.js',
          varName: 'dayjs',
        },
        antd: {
          src: 'https://cdn.staticfile.net/antd/5.13.2/antd.min.js',
          varName: 'antd',
        },
        ahooks: {
          src: 'https://marsview.cdn.bcebos.com/static/ahooks.js',
          varName: 'ahooks',
        },
        axios: {
          src: 'https://cdn.staticfile.net/axios/1.6.5/axios.min.js',
          varName: 'axios',
        },
      }),
  ],
});

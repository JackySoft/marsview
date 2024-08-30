import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePluginExternals } from 'vite-plugin-externals-new';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../dist/admin',
  },
  server: {
    host: '127.0.0.1',
    port: 8090,
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
          src: 'https://marsview.cdn.bcebos.com/static/react%4018.3.1.production.min.js',
          varName: 'React',
        },
        'react-dom': {
          src: 'https://marsview.cdn.bcebos.com/static/react-dom%4018.3.1.production.min.js',
          varName: 'ReactDOM',
        },
        dayjs: {
          src: 'https://marsview.cdn.bcebos.com/static/dayjs%401.11.13.min.js',
          varName: 'dayjs',
        },
        antd: {
          src: 'https://marsview.cdn.bcebos.com/static/antd%405.20.3.min.js',
          varName: 'antd',
        },
        ahooks: {
          src: 'https://marsview.cdn.bcebos.com/static/ahooks%403.8.1.min.js',
          varName: 'ahooks',
        },
        axios: {
          src: 'https://marsview.cdn.bcebos.com/static/axios%401.7.5.min.js',
          varName: 'axios',
        },
      }),
  ],
});

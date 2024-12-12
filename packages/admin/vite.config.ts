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
    proxy: {
      '/api': {
        target: 'http://mars-api.marsview.cc',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@materials': path.resolve(__dirname, './../materials'),
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
          src: 'https://marsview.cdn.bcebos.com/static/antd%405.21.1/antd.min.js',
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
        '@ant-design/icons': {
          src: 'https://marsview.cdn.bcebos.com/static/%40ant-design-icons%405.5.1/index.umd.min.js',
          varName: 'icons',
        },
        '@ant-design/plots': {
          src: 'https://marsview.cdn.bcebos.com/static/plots%401.2.6.min.js',
          varName: 'Plots',
        },
      }),
  ],
});

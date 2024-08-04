import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import router from '@/router';
declare global {
  interface Window {
    microApp: any;
    __MICRO_APP_ENVIRONMENT__: boolean;
    mount: () => void;
    unmount: () => void;
  }
}

let root: ReactDOM.Root | null = null;

// microApp 子应用挂载
window.mount = () => {
  // 初始化渲染
  root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<App />);
  // 监听路由变化
  window.microApp?.addDataListener((data: any) => {
    if (data.path) {
      router.navigate(data.path);
    }
  }, true);
};

// microApp 子应用卸载
window.unmount = () => {
  root?.unmount();
  window.microApp.clearDataListener();
};

// 非微前端环境直接渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount();
}

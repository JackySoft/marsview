import { RouterProvider } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import router from './router';
import AntdGlobal from '@marsview/materials/utils/AntdGlobal';
import './App.less';
import './index.less';

function App() {
  return (
    <AntdApp>
      <AntdGlobal />
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;

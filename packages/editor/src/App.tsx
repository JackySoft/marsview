import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import router from './router';
import AntdGlobal from '@/utils/AntdGlobal';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
import './App.less';

function App() {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: '#7D33FF',
          colorLink: '#7D33FF',
          colorInfo: '#7D33FF',
        },
        hashed: false,
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;

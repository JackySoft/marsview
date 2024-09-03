import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Page } from '@marsview/materials/Page';
import { usePageStore as usePageStore2 } from '@marsview/materials/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { getPageDetail } from '@/api/index';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
export default function () {
  const [theme, setTheme] = useState('');
  const { id, env } = useParams();
  const { savePageInfo } = usePageStore2();
  const navitate = useNavigate();
  useEffect(() => {
    if (id) {
      getPageDetail(env as string, Number(id))
        .then((res: any) => {
          if (!res.id) {
            return navitate('/404');
          }
          let pageData: any = {};
          try {
            pageData = JSON.parse(res.page_data || '{}');
          } catch (error) {
            console.error(error);
            console.info('【json数据】', res.page_data);
            message.error('页面数据格式错误，请检查');
          }
          savePageInfo({
            pageId: res.id,
            pageName: res.name,
            remark: res.remark,
            is_public: res.is_public,
            stg_publish_id: res.stg_publish_id,
            pre_publish_id: res.pre_publish_id,
            prd_publish_id: res.prd_publish_id,
            ...pageData,
          });
          setTheme(pageData.config.props.theme || '#1677ff');
        })
        .catch(() => {
          navitate('/500');
        });
    }
  }, [id]);
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: theme,
          colorLink: theme,
          colorInfo: theme,
        },
        hashed: false,
      }}
    >
      <Page />
    </ConfigProvider>
  );
}

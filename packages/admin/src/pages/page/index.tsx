import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import Page from '@marsview/materials/Page/Page';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { getPageDetail } from '@/api/index';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { ComItemType, ConfigType } from '@materials/types/index';
export default function () {
  const [theme, setTheme] = useState('');
  const [pageData, setPageData] = useState<{ config: ConfigType; elements: ComItemType[] }>();
  const { id, env } = useParams();
  const { savePageInfo, clearPageInfo } = usePageStore(
    useShallow((state) => {
      return {
        savePageInfo: state.savePageInfo,
        clearPageInfo: state.clearPageInfo,
      };
    }),
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getPageDetail(env as string, Number(id))
        .then((res: any) => {
          if (!res.id) {
            return navigate('/404');
          }
          let pageData: any = {};
          try {
            pageData = JSON.parse(res.page_data || '{}');
          } catch (error) {
            console.error(error);
            console.info('【json数据】', res.page_data);
            message.error('页面数据格式错误，请检查');
          }
          clearPageInfo();
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
          setPageData(pageData);
          setTheme(pageData.config.props.theme || '#1677ff');
        })
        .catch(() => {
          navigate('/500');
        });
    }
  }, [id]);
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          colorPrimary: theme,
          colorLink: theme,
          colorInfo: theme,
        },
      }}
    >
      <Page config={pageData?.config} elements={pageData?.elements} />
    </ConfigProvider>
  );
}

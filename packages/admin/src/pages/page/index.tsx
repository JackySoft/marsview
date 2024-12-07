import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import Page from '@marsview/materials/Page/Page';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { getPageDetail } from '@/api/index';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { ComItemType, ConfigType } from '@materials/types/index';
import storage from '@/utils/storage';
import { styled } from 'styled-components';
import { isEnv } from '@/utils/util';
const EnvMarker = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  pointer-events: none;
`;
export default function () {
  const [theme, setTheme] = useState('');
  const [pageData, setPageData] = useState<{ config: ConfigType; elements: ComItemType[] }>();
  const [envTag, setEnvTag] = useState('');
  const { id } = useParams();
  const [searchParams] = useSearchParams();
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
      let env = searchParams.get('env') || storage.get(`${id}-env`) || 'prd';
      // 设置环境标识
      if (env === 'stg') {
        setEnvTag('https://imgcloud.cdn.bcebos.com/349626543730cd39bd152e1c6.svg');
      } else if (env === 'pre') {
        setEnvTag('https://imgcloud.cdn.bcebos.com/349626543730cd39bd152e1c7.svg');
      } else {
        setEnvTag('');
      }
      if (!isEnv(env)) {
        env = 'prd';
      }
      getPageDetail(env, 0, Number(id))
        .then((res: any) => {
          if (!res.id) {
            return navigate('/404');
          }
          let pageData: any = {};
          try {
            pageData = JSON.parse(res.pageData || '{}');
          } catch (error) {
            console.error(error);
            console.info('【json数据】', res.pageData);
            message.error('页面数据格式错误，请检查');
          }
          clearPageInfo();
          savePageInfo({
            ...res,
            pageData,
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
      {envTag && <EnvMarker src={envTag} />}
      <Page config={pageData?.config} elements={pageData?.elements} />
    </ConfigProvider>
  );
}

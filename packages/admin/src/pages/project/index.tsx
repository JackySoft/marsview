import { getPageDetail } from '@/api/index';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import NotFound from './notFound';
import Page from '@marsview/materials/Page/Page';
import { useShallow } from 'zustand/react/shallow';
import { ComItemType, ConfigType } from '@materials/types/index';

export default function () {
  const [pageData, setPageData] = useState<{ config: ConfigType; elements: ComItemType[] }>();
  const [notFound, setNotFound] = useState(false);
  const { projectId, env, pageId } = useParams();
  const { savePageInfo, clearPageInfo } = usePageStore(
    useShallow((state) => {
      return {
        savePageInfo: state.savePageInfo,
        clearPageInfo: state.clearPageInfo,
      };
    }),
  );
  useEffect(() => {
    getPageDetail(env as string, Number(pageId))
      .then((res: any) => {
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
          ...pageData,
        });
        setPageData(pageData);
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [projectId, pageId]);

  return <>{notFound ? <NotFound /> : <Page config={pageData?.config} elements={pageData?.elements} />}</>;
}

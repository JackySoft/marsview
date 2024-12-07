import { getPageDetail } from '@/api/index';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { useProjectStore } from '@/stores/projectStore';
import { message } from '@/utils/AntdGlobal';
import NotFound from './notFound';
import Page from '@marsview/materials/Page/Page';
import { useShallow } from 'zustand/react/shallow';
import { ComItemType, ConfigType } from '@materials/types/index';
import storage from '@/utils/storage';
import { getPageId, isEnv } from '@/utils/util';

export default function () {
  const [pageData, setPageData] = useState<{ config: ConfigType; elements: ComItemType[] }>();
  const [notFound, setNotFound] = useState(false);

  const { projectId } = useParams();

  const { initPageData, savePageInfo, clearPageInfo } = usePageStore(
    useShallow((state) => {
      return {
        initPageData: state.page.pageData,
        savePageInfo: state.savePageInfo,
        clearPageInfo: state.clearPageInfo,
      };
    }),
  );
  const pageMap = useProjectStore(useShallow((state) => state.pageMap));
  const { pathname } = useLocation();
  useEffect(() => {
    if (!projectId) return;
    let env = storage.get(`${projectId}-env`) || 'prd';
    const pageId = pathname.split(projectId)[1].slice(1);
    // 获取页面ID
    const id = getPageId(pageId, pageMap);
    if (!pageMap[id] || !id) {
      setNotFound(true);
      return;
    }
    if (!isEnv(env)) {
      env = 'prd';
    }
    getPageDetail(env as string, Number(projectId), Number(id))
      .then((res: any) => {
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
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
      });
    return () => {
      setPageData({ config: initPageData.config, elements: [] });
    };
  }, [projectId, pathname]);

  return <>{notFound ? <NotFound /> : <Page config={pageData?.config} elements={pageData?.elements} />}</>;
}

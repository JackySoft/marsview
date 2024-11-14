import { getPageDetail } from '@/api/index';
import { useParams } from 'react-router-dom';
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

  const { projectId, pageId } = useParams();
  const { savePageInfo, clearPageInfo } = usePageStore(
    useShallow((state) => {
      return {
        savePageInfo: state.savePageInfo,
        clearPageInfo: state.clearPageInfo,
      };
    }),
  );
  const pageMap = useProjectStore(useShallow((state) => state.pageMap));
  useEffect(() => {
    let env = storage.get(`${projectId}-env`) || 'prd';
    // 获取页面ID
    const id = getPageId(pageId, pageMap);
    if (!id) {
      setNotFound(true);
      return;
    }
    if (!isEnv(env)) {
      env = 'prd';
    }
    getPageDetail(env as string, Number(id))
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

import { getPageDetail } from '@/api/index';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePageStore as usePageStore2 } from '@mars/materials/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import NotFound from './notFound';
import { Page } from '@mars/materials/Page';
import { useShallow } from 'zustand/react/shallow';

export default function () {
  const { projectId, env, pageId } = useParams();
  const [notFound, setNotFound] = useState(false);
  const { savePageInfo, clearPageInfo } = usePageStore2(
    useShallow((state) => {
      return {
        savePageInfo: state.savePageInfo,
        clearPageInfo: state.clearPageInfo,
      };
    }),
  );
  useEffect(() => {
    clearPageInfo();
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
        savePageInfo({
          pageId: res.id,
          pageName: res.name,
          remark: res.remark,
          ...pageData,
        });
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [projectId, pageId]);

  return <>{notFound ? <NotFound /> : <Page />}</>;
}

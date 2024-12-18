import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useProjectStore } from '@/stores/projectStore';
import { getPageId } from '@/utils/util';

export default function BreadList() {
  const { pageId } = useParams();
  const [menuPath, setMenuPath] = useState([] as any[]);
  const { pathname } = useLocation();
  const { pageMap, menuMap } = useProjectStore(useShallow((state) => ({ pageMap: state.pageMap, menuMap: state.menuMap })));
  // 生成面包屑
  useEffect(() => {
    const page_id = getPageId(pageId, pageMap);
    if (!page_id) return;
    const menuItem = pageMap[Number(page_id)];
    if (pathname.endsWith('/welcome')) {
      setMenuPath([{ title: '欢迎页' }]);
      return;
    }
    if (!menuItem) return;
    const breadList = [] as any[];
    let cur = menuItem;
    while (cur) {
      breadList.unshift({
        title: cur.name,
      });
      cur = menuMap[cur.parent_id];
    }
    setMenuPath(breadList);
  }, [pathname, menuMap]);
  return <Breadcrumb className="layout-bread-crumb" items={menuPath}></Breadcrumb>;
}

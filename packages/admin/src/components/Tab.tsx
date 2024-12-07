import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Tabs } from 'antd';
import { useProjectStore } from '@/stores/projectStore';
import { getPageId } from '@/utils/util';
interface TabsItem {
  key: string;
  label: string;
  closable: boolean;
}
function Tab() {
  const navigate = useNavigate();
  const [tabsList, setTabsList] = useState<TabsItem[]>([
    {
      label: '欢迎页',
      key: 'welcome',
      closable: false,
    },
  ]);
  const [activeKey, setActiveKey] = useState('');
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const pageMap = useProjectStore(useShallow((state) => state.pageMap));

  useEffect(() => {
    addTabs();
  }, [pathname, pageMap]);
  // 创建页签
  const addTabs = () => {
    if (!projectId) return;
    const pageId = pathname.split(projectId)[1].slice(1);
    const id = getPageId(pageId, pageMap);
    const menuItem = pageMap[Number(id)];
    if (!menuItem) return;
    if (!tabsList.find((item) => item.key.includes(pathname))) {
      tabsList.push({
        key: pathname + location.search,
        label: menuItem.name,
        closable: true,
      });
    }
    setTabsList([...tabsList]);
    setActiveKey(pathname + location.search);
  };
  // 删除页签
  const remove = (path: string) => {
    if (pathname === path) {
      tabsList.forEach((item, index: number) => {
        if (item.key != pathname) return;
        const nextTab = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.key);
      });
    }
    setTabsList(tabsList.filter((item) => item.key != path));
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
    remove(targetKey as string);
  };

  // 切换页签
  const onChange = (tabKey: string) => {
    if (tabKey === 'welcome') return navigate('welcome');
    navigate(tabKey);
  };
  return (
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={activeKey}
      items={tabsList}
      onChange={onChange}
      onEdit={onEdit}
      tabBarStyle={{ marginBottom: 0, backgroundColor: '#fff', paddingTop: 10 }}
    />
  );
}
export default Tab;

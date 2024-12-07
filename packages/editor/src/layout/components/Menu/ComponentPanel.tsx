import { useEffect, useMemo, useRef, useState } from 'react';
import { Row, Col, Tabs, Collapse, Input, Divider, Empty } from 'antd';
import { SearchOutlined, UpOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import DragMenuItem from './DragMenuItem';
import components, { SysComItem } from '@/config/components';
import CustomLib from './CustomLib';
/**
 * 组件
 */
const ComponentPanel = () => {
  const customRef = useRef<{ reload: () => void }>();
  const [keyword, setKeyword] = useState('');
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [tabKey, setTabKey] = useState<string>('system');
  const [list, setList] = useState<Array<{ key: string; label: string; children: JSX.Element }>>([]);
  useEffect(() => {
    // 系统自带组件
    const items: Array<{ key: string; label: string; children: React.JSX.Element }> = (keyword ? searchByName(components, keyword) : components)
      .filter((item: SysComItem) => !item.hidden)
      .map((item: SysComItem) => {
        return {
          key: item.type,
          label: item.title,
          children: (
            <Row gutter={[10, 10]}>
              {item.data
                .filter((sub) => !sub.hidden)
                .map((subItem) => {
                  return (
                    <Col span={8} key={subItem.type}>
                      <DragMenuItem {...subItem} />
                    </Col>
                  );
                })}
            </Row>
          ),
        };
      });
    setActiveKeys(items.map((item) => item.key));
    setList(items);
  }, [keyword]);

  // 组件搜索
  function searchByName(data: any, keyword: string) {
    const results: SysComItem[] = [];

    function searchInArray(arr: any, parent: any) {
      for (const item of arr) {
        if (Array.isArray(item.data)) {
          // 如果当前项有子数组，递归搜索子数组
          searchInArray(item.data, { ...item, data: [] });
        } else if (item.name.includes(keyword)) {
          parent.data.push(item);
          if (results.filter((r) => r.type === parent.type).length > 0) continue;
          results.push({ ...parent });
        }
      }
    }
    if (keyword) {
      searchInArray(data, null);
      return results;
    }
    return data;
  }

  // collapse事件
  const handleCollapse = (keys: string | string[]) => {
    setActiveKeys(typeof keys === 'string' ? [keys] : keys);
  };

  // 页签
  const tabs = useMemo(
    () => [
      {
        key: 'system',
        label: '系统组件',
        children: (
          <>
            <Collapse
              style={{ height: list.length > 0 ? 'calc(100vh - 210px)' : '', overflowY: 'auto' }}
              items={list}
              ghost
              expandIconPosition={'end'}
              size={'small'}
              activeKey={activeKeys}
              onChange={handleCollapse}
              expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 0 : -180} />}
            />
            {list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </>
        ),
      },
      {
        key: 'custom',
        label: '自定义组件',
        children: <CustomLib ref={customRef} />,
      },
    ],
    [list, activeKeys],
  );

  // 切换时，刷新自定义组件
  const handleTabChange = (key: string) => {
    setTabKey(key);
    if (key === 'custom') {
      customRef.current?.reload();
    }
  };

  // 组件搜索
  const { run } = useDebounceFn(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setKeyword(name);
    },
    { wait: 500 },
  );

  return (
    <Tabs
      size={'small'}
      defaultActiveKey={tabs[0].key}
      tabPosition={'top'}
      onChange={handleTabChange}
      items={tabs.map((item) => {
        return {
          key: item.key,
          label: item.label,
          children: (
            <>
              {tabKey === 'system' && (
                <>
                  <Input placeholder="输入组件名称查询" suffix={<SearchOutlined />} onChange={run} />
                  <Divider style={{ margin: '12px 0 0 0' }} />
                </>
              )}
              {item.children}
            </>
          ),
        };
      })}
    />
  );
};

export default ComponentPanel;

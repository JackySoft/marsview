import { getInstallList } from '@/api/lib';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { usePageStore } from '@/stores/pageStore';
import { Button, Flex, Spin } from 'antd';
import { createId } from '@/utils/util';
/**
 * 自定义组件库
 */

function CustomLib(_: any, ref: any) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const { selectedElement, addElement, addChildElements } = usePageStore((state) => {
    return {
      addElement: state.addElement,
      addChildElements: state.addChildElements,
      selectedElement: state.selectedElement,
    };
  });
  useImperativeHandle(ref, () => {
    return {
      reload() {
        getList();
      },
    };
  });

  // 读取插件列表
  const getList = async () => {
    setLoading(true);
    const res = await getInstallList();
    setList(res);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const loadModule = async (url: string) => {
    try {
      /* @vite-ignore */
      const module = await import(url);
      return module.default || {};
    } catch (error) {
      console.error('模块加载失败:', error);
      return {};
    }
  };

  const handleClick = async (item: any) => {
    // 生成默认配置
    const { config, events, methods = [] }: any = await loadModule(item.configUrl);
    const newId = createId(item.tag);
    if (selectedElement) {
      addChildElements({
        remoteUrl: item.reactUrl,
        remoteConfigUrl: item.configUrl,
        remoteCssUrl: item.cssUrl,
        type: item.tag,
        name: item.name,
        elements: [],
        parentId: selectedElement.id,
        id: newId,
        config,
        events,
        methods,
      });
    } else {
      addElement({
        remoteUrl: item.reactUrl,
        remoteConfigUrl: item.configUrl,
        remoteCssUrl: item.cssUrl,
        type: item.tag,
        name: item.name,
        id: newId,
        config,
        events,
        methods,
        elements: [],
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }}>
        <Flex wrap="wrap" gap={5} justify="space-between" style={{ marginTop: 10 }}>
          {list.map((item) => {
            return (
              <div style={{ width: '45%' }} key={item.id}>
                <Button type="default" block onClick={() => handleClick(item)}>
                  {item.name}
                </Button>
              </div>
            );
          })}
        </Flex>
      </div>
    </Spin>
  );
}

export default forwardRef(CustomLib);

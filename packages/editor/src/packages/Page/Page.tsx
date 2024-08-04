import MarsRender from '@/packages/MarsRender/MarsRender';
import React, { useEffect } from 'react';
import { usePageStore } from '@/stores/pageStore';
import { handleActionFlow } from '@/packages/utils/action';

/**
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const Page: React.FC = () => {
  // 页面组件
  const { config, elements } = usePageStore((state) => {
    return {
      config: state.page.config,
      elements: state.page.elements,
    };
  });

  useEffect(() => {
    config.events?.forEach((event) => {
      if (event.actions?.length > 0) {
        handleActionFlow(event.actions, {});
      }
    });
  }, [config.events]);
  return (
    <div style={config.style} id="page">
      {<MarsRender elements={elements || []} />}
    </div>
  );
};
export default Page;

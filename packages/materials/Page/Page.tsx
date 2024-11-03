import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import MarsRender from '@materials/MarsRender/MarsRender';
import { usePageStore } from '@materials/stores/pageStore';
import { handleActionFlow } from '@materials/utils/action';

/**
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const Page: React.FC = () => {
  // 页面组件
  const { config, elements } = usePageStore(
    useShallow((state) => {
      return {
        config: state.page.config,
        elements: state.page.elements,
      };
    }),
  );

  useEffect(() => {
    config.events?.forEach((event) => {
      if (event.actions?.length > 0) {
        handleActionFlow(event.actions, {});
      }
    });
  }, [config.events]);
  return <div style={config.style}>{<MarsRender elements={elements || []} />}</div>;
};
export default Page;

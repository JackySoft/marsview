import { memo, useEffect } from 'react';
import MarsRender from '@materials/MarsRender/MarsRender';
import { handleActionFlow } from '@materials/utils/action';
import { ComItemType, ConfigType } from '@materials/types/index';

/**
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const Page = ({ config, elements }: { config?: ConfigType; elements?: ComItemType[] }) => {
  useEffect(() => {
    config?.events?.forEach((event: any) => {
      if (event.actions?.length > 0) {
        handleActionFlow(event.actions, {});
      }
    });
  }, [config?.events]);
  return <div style={config?.style}>{<MarsRender elements={elements || []} />}</div>;
};
export default memo(Page);

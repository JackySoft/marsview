import { ComponentType } from '@materials/types';
import * as Components from '@materials/index';
import MarsRender, { Material } from '@materials/MarsRender/MarsRender';
import { usePageStore } from '@materials/stores/pageStore';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Space } from 'antd';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  text: string;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MSpace = ({ id, type, config, elements }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);
  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  });
  return (
    visible && (
      <Space style={config.style} {...config.props}>
        {elements?.length ? elements?.map((child) => <Material key={child.id} item={child} />) : null}
      </Space>
    )
  );
};
export default forwardRef(MSpace);

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import * as icons from '@ant-design/icons';
import { usePageStore } from '@materials/stores/pageStore';
import { ComponentType } from '@materials/types';
import MarsRender from '@materials/MarsRender/MarsRender';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTabs = ({ config, elements, onTabClick, onChange }: ComponentType<TabsProps>, ref: any) => {
  const [visible, setVisible] = useState(true);

  const { elementsMap } = usePageStore((state) => {
    return {
      elementsMap: state.page.pageData.elementsMap,
    };
  });

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

  // 执行Tab切换事件
  const handleChange = (key: string) => {
    onChange?.({ activeKey: key });
  };

  // 执行Tab点击事件
  const handleTabClick = (key: string) => {
    onTabClick?.({ activeKey: key });
  };
  const { items = [], ...props } = config.props;
  const iconsList: { [key: string]: any } = icons;
  const list = items.map((item, index) => {
    if (!elements[index])
      return {
        label: item.label,
        key: item.key,
      };
    const prop = elementsMap[elements[index]?.id].config.props;
    return {
      key: item.key,
      ...prop,
      icon: prop.icon ? React.createElement(iconsList[prop.icon]) : null,
      children: <MarsRender elements={[elements[index]]} />,
    };
  });
  return visible && <Tabs style={config.style} {...props} items={list} onChange={handleChange} onTabClick={handleTabClick}></Tabs>;
};
export default forwardRef(MTabs);

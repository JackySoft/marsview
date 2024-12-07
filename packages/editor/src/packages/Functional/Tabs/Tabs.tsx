import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import * as icons from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { ComponentType } from '@/packages/types';
import MarsRender from '@/packages/MarsRender/MarsRender';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTabs = ({ id, type, config, elements, onTabClick, onChange }: ComponentType<TabsProps>, ref: any) => {
  const [visible, setVisible] = useState(true);

  const { updateToolbar, elementsMap } = usePageStore((state) => {
    return {
      elementsMap: state.page.pageData.elementsMap,
      updateToolbar: state.updateToolbar,
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
    updateToolbar();
  };

  // 执行Tab点击事件
  const handleTabClick = (key: string) => {
    onTabClick?.({ activeKey: key });
    updateToolbar();
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
  return (
    visible && (
      <Tabs style={config.style} {...props} items={list} data-id={id} data-type={type} onChange={handleChange} onTabClick={handleTabClick}></Tabs>
    )
  );
};
export default forwardRef(MTabs);

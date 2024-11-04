import { Form, InputProps, FormItemProps } from 'antd';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ComponentType, IDragTargetItem } from '@/packages/types';
import { isNull } from '@/packages/utils/util';
import { useFormContext } from '@/packages/utils/context';

import { usePageStore } from '@/stores/pageStore';
import MarsRender from '@/packages/MarsRender/MarsRender';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: InputProps;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MFormItem = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
  const addChildElements = usePageStore((state) => state.addChildElements);
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, [config.props.defaultValue]);

  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};
      addChildElements({
        type: item.type,
        name: item.name,
        parentId: id,
        id: item.id,
        config,
        events,
        methods,
      });
    },
    // TODO: 拖拽组件时，容器呈现背景色（后期需要判断组件是否可以拖入）
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
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
  const ItemProps = config.props.formItem;
  return (
    visible && (
      <Form.Item {...ItemProps} name={ItemProps.name || undefined} data-id={id} data-type={type}>
        <span ref={drop} style={config.style}>
          {elements?.length ? (
            <MarsRender elements={elements || []} />
          ) : (
            <div className="slots" style={{ height: 80, lineHeight: '80px' }}>
              拖拽组件到这里
            </div>
          )}
        </span>
      </Form.Item>
    )
  );
};

export default forwardRef(MFormItem);

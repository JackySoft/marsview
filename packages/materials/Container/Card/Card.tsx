import { ComponentType } from '@materials/types';
import { Button, Card } from 'antd';
import MarsRender from '@materials/MarsRender/MarsRender';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { omit } from 'lodash-es';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MCard = ({ config, elements, onClick }: ComponentType, ref: any) => {
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
  // 点击更多事件
  const handleClick = () => {
    onClick?.();
  };
  const meta = useMemo(() => config.props.meta, [config.props.meta]);
  return (
    visible && (
      <Card
        style={config.style}
        {...omit(config.props, ['cover', 'meta'])}
        cover={config.props.cover ? <img src={config.props.cover} /> : null}
        extra={
          config.props.extra?.text ? (
            <Button {...config.props.extra} onClick={handleClick}>
              {config.props.extra?.text}
            </Button>
          ) : null
        }
      >
        {meta.title || meta.description ? <Card.Meta {...meta} /> : null}
        <MarsRender elements={elements || []} />
      </Card>
    )
  );
};
export default forwardRef(MCard);

import { ComponentType } from '../../types';
import { Button, Card } from 'antd';
import MarsRender from '../../MarsRender/MarsRender';
import { forwardRef, useImperativeHandle, useState } from 'react';
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
    onClick && onClick();
  };
  return (
    visible && (
      <Card
        style={config.style}
        {...config.props}
        cover={config.props.cover ? <img src={config.props.cover} /> : null}
        extra={
          config.props.extra?.text ? (
            <Button {...config.props.extra} onClick={handleClick}>
              {config.props.extra?.text}
            </Button>
          ) : null
        }
      >
        <Card.Meta {...config.props.meta} />
        <MarsRender elements={elements || []} />
      </Card>
    )
  );
};
export default forwardRef(MCard);

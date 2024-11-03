import { ComponentType } from '@materials/types';
import { Empty } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  image: React.ReactNode | string;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MEmpty = ({ config }: ComponentType<IConfig>, ref: any) => {
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
  let image = config.props?.image;
  if (config.props?.image === 'simple') {
    image = Empty.PRESENTED_IMAGE_SIMPLE;
  } else if (config.props?.image === 'default') {
    image = Empty.PRESENTED_IMAGE_DEFAULT;
  } else {
    image = config.props?.image;
  }
  return visible && <Empty style={config.style} {...config.props} image={image}></Empty>;
};
export default forwardRef(MEmpty);

import { forwardRef, useImperativeHandle, useState } from 'react';
import { ComponentType } from '@materials/types';
import { Carousel } from 'antd';

const MCarousel = ({ config, onAfterChange, onBeforeChange }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
  }));

  return (
    visible && (
      <div style={config.style}>
        <Carousel {...config.props} afterChange={onAfterChange} beforeChange={onBeforeChange}>
          {
            // 将每个元素包裹在 div 中
            config.props.imageUrls.map((item: any) => (
              <div>
                <img
                  style={{
                    height: `${config.props.height || 160}`,
                    width: `${config.props.width || '100%'}`,
                  }}
                  src={item.url}
                />
              </div>
            ))
          }
        </Carousel>
      </div>
    )
  );
};

export default forwardRef(MCarousel);

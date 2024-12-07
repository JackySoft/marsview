import { ComponentType } from '@/packages/types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Carousel } from 'antd';

const MCarousel = ({ id, type, config, onAfterChange, onBeforeChange }: ComponentType, ref: any) => {
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
      <div data-id={id} data-type={type} style={config.style}>
        <Carousel {...config.props} afterChange={onAfterChange} beforeChange={onBeforeChange}>
          {config.props.imageUrls?.map((item: { url: string }) => (
            <div key={item.url}>
              <img
                style={{
                  height: `${config.props.height || 160}`,
                  width: `${config.props.width || '100%'}`,
                }}
                src={item.url}
              />
            </div>
          ))}
        </Carousel>
      </div>
    )
  );
};

export default forwardRef(MCarousel);

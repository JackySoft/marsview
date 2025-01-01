import { memo, useRef, useState } from 'react';
import { Flex, Form, Input } from 'antd';
import { HolderOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import { createId } from '@/packages/utils/util';
import { message } from '@/utils/AntdGlobal';
import { usePageStore } from '@/stores/pageStore';

const DragImages = memo(({ index, move, add, remove, form }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<{ index: number }>({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'card',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const key = createId('C', 5);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持图片格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 1.5;
    if (!isLt2M) {
      message.error('图像尺寸不能超过1.5M!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Flex align="center" ref={preview} style={{ marginBottom: 10, paddingInline: 10, gap: 10 }}>
        <HolderOutlined style={{ cursor: 'grab' }} ref={ref} />
        <Form.Item name={[index, 'url']} noStyle>
          <Input placeholder="图像地址" style={{ width: '100%' }} />
        </Form.Item>
        <PlusOutlined onClick={() => add({ width: 120 }, index + 1)} />
        {index !== 0 ? (
          <MinusOutlined
            onClick={() => {
              remove(index);
            }}
          />
        ) : (
          <span style={{ width: 20 }}></span>
        )}
      </Flex>
    </>
  );
});

export default DragImages;

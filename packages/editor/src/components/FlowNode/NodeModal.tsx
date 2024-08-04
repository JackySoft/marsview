import { Button, Drawer, Space } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import FlowNode, { NodeType } from './FlowNode';

function NodeModal(_: any, ref: any) {
  const [visible, setVisible] = useState(false);
  const [fn, setFn] = useState<{ callback: (list: NodeType[]) => void }>();
  const nodeRef = useRef<{ getNodeList: () => NodeType[]; setNodeList: (list: NodeType[]) => void }>(null);
  useImperativeHandle(ref, () => {
    return {
      open(nodeList: NodeType[], callback: () => void) {
        setFn({ callback });
        setVisible(true);
        setTimeout(() => {
          nodeRef.current?.setNodeList(nodeList);
        });
      },
    };
  });
  // 保存
  const onSave = () => {
    const list = nodeRef.current?.getNodeList() as NodeType[];
    fn?.callback(list);
    setVisible(false);
  };
  // 关闭
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title="事件流配置"
      width="100vw"
      height="100vh"
      placement="top"
      push={false}
      open={visible}
      closeIcon={null}
      onClose={onClose}
      extra={
        <>
          <Space>
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
            <Button onClick={onClose}>关闭</Button>
          </Space>
        </>
      }
    >
      <FlowNode ref={nodeRef} />
    </Drawer>
  );
}
export default forwardRef(NodeModal);

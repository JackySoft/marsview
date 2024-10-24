import { Alert, Button, Drawer, Space } from 'antd';
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
      <Alert
        message="使用说明"
        description={
          <div>
            <p>1. 事件流从左到右按顺序执行。</p>
            <p>2. 参数会在事件流中流转，比如点击表格的编辑按钮，事件流默认可以取到表格对应的行数据对象，传递到下一个节点。</p>
            <p>3. 可以通过脚本运行来干预数据输出和下一个节点的流转。</p>
            <p>4. 获取表单数据时，可以直接点开行为配置，点击获取表单值，选择对应表单即可。</p>
          </div>
        }
        type="info"
        showIcon
        style={{ position: 'absolute', top: 100, zIndex: 99 }}
      />
      <FlowNode ref={nodeRef} />
    </Drawer>
  );
}
export default forwardRef(NodeModal);

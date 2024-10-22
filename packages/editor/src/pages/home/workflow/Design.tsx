import { LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Form, Segmented, Select, Space } from 'antd';
import ApprovalFlow from './components/ApprovalFlow';
import { NodeItem, NodeType } from './components/types';
import style from './index.module.less';
import { useState } from 'react';
/**
 * 工作流设计器
 */
const Designer = () => {
  const [open, setOpen] = useState(false);
  const [node, setNode] = useState<NodeItem | null>(null);
  const nodeList: NodeItem[] = [
    {
      id: 'start',
      type: 'start',
      title: '开始',
    },
    {
      id: 'end',
      type: 'end',
      title: '结束',
    },
  ];
  // 节点点击事件
  const onNodeClick = (node: NodeItem) => {
    setOpen(true);
    setNode(node);
  };

  // 抽屉确认事件
  const handleConfirm = () => {
    setOpen(false);
  };

  // 抽屉取消事件
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={style.designer}>
      <div className={style.designerHeader}>
        <div className="left">
          <Space>
            <Button shape="circle" icon={<LeftOutlined />} onClick={() => history.back()} />
            <span>审批流</span>
          </Space>
        </div>
        <div className="center">
          <Button type="link">
            <Avatar size={20} style={{ border: '1px solid rgba(0,0,0,0.1)', backgroundColor: '#fff', fontSize: 12, color: '#000' }}>
              1
            </Avatar>
            基础配置
          </Button>
          <Button type="link">
            <Avatar size={20} style={{ border: '1px solid rgba(0,0,0,0.1)', backgroundColor: '#fff', fontSize: 12, color: '#000' }}>
              2
            </Avatar>
            表单设计
          </Button>
          <Button type="link">
            <Avatar size={20} style={{ border: '1px solid rgba(0,0,0,0.1)', backgroundColor: '#fff', fontSize: 12, color: '#000' }}>
              3
            </Avatar>
            流程设计
          </Button>
        </div>
        <div className="right">
          <Space>
            <Button type="default" icon={<SaveOutlined />}>
              保存
            </Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
      <div className={style.designerContent}>
        <ApprovalFlow nodeList={nodeList} onNodeClick={onNodeClick} />
      </div>
      {/* 点击节点，打开抽屉 */}
      <Drawer
        open={open}
        title={node?.title}
        width={'50%'}
        extra={
          <Space>
            <Button type="default" onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" onClick={handleConfirm}>
              确定
            </Button>
          </Space>
        }
        onClose={() => setOpen(false)}
      >
        <Form layout="vertical">
          <Segmented options={['设置发起人', '表单操作权限']} block />
          <Form.Item label="谁可以提交" style={{ marginTop: 16 }}>
            <Select
              mode="multiple"
              placeholder="请选择"
              options={[
                {
                  label: '张三',
                  value: 'zhangsan',
                },
                {
                  label: '李四',
                  value: 'lisi',
                },
                {
                  label: '王五',
                  value: 'wangwu',
                },
                {
                  label: '赵六',
                  value: 'zhaoliu',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Designer;

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Drawer, Form, Segmented, Select, Space } from 'antd';
import { DownloadOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import ApprovalFlow from './components/ApprovalFlow';
import { message } from '@/utils/AntdGlobal';
import { NodeItem } from './components/types';
import api from '@/api/workflow';
import style from './index.module.less';
import { saveFile } from '@/utils/util';
/**
 * 工作流设计器
 */
const Designer = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [nodeList, setNodeList] = useState<NodeItem[]>([]);
  const [node, setNode] = useState<NodeItem | null>(null);
  const nodeRef = useRef<{ getNodeList: () => void }>();
  const { id } = useParams();
  useEffect(() => {
    api.getTemplateDetail(Number(id)).then((res) => {
      setName(res.formName);
      if (res?.templateData) {
        const list = JSON.parse(res?.templateData);
        setNodeList(list);
      }
    });
  }, []);
  // 节点点击事件
  const onNodeClick = (node: NodeItem) => {
    setOpen(true);
    setNode(node);
  };

  // 保存事件
  const handleSave = async () => {
    const list = nodeRef.current?.getNodeList();
    await api.updateTemplate({
      templateData: JSON.stringify(list),
      id: Number(id),
    });
    message.success('保存成功');
  };

  // 文件导出
  const handleExport = () => {
    saveFile(name, JSON.stringify(nodeList, null, 2));
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
            <Avatar size={20} className={style.circle} style={{ fontSize: 12 }}>
              1
            </Avatar>
            基础配置
          </Button>
          <Button type="link">
            <Avatar size={20} className={style.circle} style={{ fontSize: 12 }}>
              2
            </Avatar>
            表单设计
          </Button>
          <Button type="link">
            <Avatar size={20} className={style.circle} style={{ fontSize: 12 }}>
              3
            </Avatar>
            流程设计
          </Button>
        </div>
        <div className="right">
          <Space>
            <Button type="default" icon={<SaveOutlined />} onClick={handleSave}>
              保存
            </Button>
            {/* <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
              导出
            </Button> */}
            {/* <Button type="primary">发布</Button> */}
          </Space>
        </div>
      </div>
      <div className={style.designerContent}>
        <ApprovalFlow nodeList={nodeList} onNodeClick={onNodeClick} ref={nodeRef} />
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

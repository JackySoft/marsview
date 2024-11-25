import { Tabs, Layout, Form, Input, DatePicker, Button, Table, Badge, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import api from '@/api/page';
import { useParams } from 'react-router-dom';
import SearchForm from '../admin/components/SearchForm';
import { message } from '@/utils/AntdGlobal';
import ReactJson from 'react-json-view';
import style from './index.module.less';
type EnvType = 'stg' | 'pre' | 'prd';
const items: Array<{ key: EnvType; label: string }> = [
  {
    key: 'stg',
    label: 'STG',
  },
  {
    key: 'pre',
    label: 'PRE',
  },
  {
    key: 'prd',
    label: 'PRD',
  },
];

interface HistoryItem {
  id: number;
  env: EnvType;
  pageId: number;
  page_name: string;
  pageData: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 页面发布记录
 * @param props
 * @returns
 */
export default function PublishHistory() {
  const { id = '' } = useParams();
  const [data, setData] = useState([] as HistoryItem[]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [form] = Form.useForm();
  const [activeKey, setActivityKey] = useState('stg' as EnvType);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [jsonData, setJsonData] = useState({});
  const [lastPublish, setLastPublish] = useState({
    stg: 0,
    pre: 0,
    prd: 0,
  });
  const columns: ColumnsType<HistoryItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '操作人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '版本ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '页面数据',
      key: 'pageData',
      align: 'center',
      render(_, record) {
        return (
          <Button type="link" onClick={() => handleView(record.pageData)}>
            查看页面数据
          </Button>
        );
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record, index) => {
        if (activeKey === 'stg' && lastPublish.stg === record.id) {
          return <Badge status="success" text="当前版本"></Badge>;
        }
        if (activeKey === 'pre' && lastPublish.pre === record.id) {
          return <Badge status="success" text="当前版本"></Badge>;
        }
        if (activeKey === 'prd' && lastPublish.prd === record.id) {
          return <Badge status="success" text="当前版本"></Badge>;
        }
        return (
          <Button type="link" onClick={() => rollback(record)}>
            {index === 0 ? '重新发布' : '回滚到此版本'}
          </Button>
        );
      },
    },
  ];

  // 环境Tab切换，重置分页
  const onTabChange = (key: EnvType) => {
    setActivityKey(key);
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // 默认加载发布记录
  useEffect(() => {
    fetchPageList();
  }, [activeKey, pagination.current, pagination.pageSize]);

  // 获取发布记录
  async function fetchPageList() {
    setLoading(true);
    try {
      // 查询当前页面发布历史记录
      const { name, date } = form.getFieldsValue();
      const [start, end] = date || [];
      const res = await api.publishList({
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        env: activeKey,
        pageId: parseInt(id),
        userName: name,
        start,
        end,
      });
      setData(res.list);
      setPagination({
        ...pagination,
        total: res.total,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReleaseVersion();
  }, []);

  // 获取当前页面发布的版本
  async function getReleaseVersion() {
    const res = await api.getPageDetail(parseInt(id));
    setLastPublish({
      stg: res.stgPublishId,
      pre: res.prePublishId,
      prd: res.prdPublishId,
    });
  }

  // 搜索
  function onSearch() {
    // 如果是第一页，不会触发接口调用，所以需要手动触发
    if (pagination.current === 1) {
      fetchPageList();
    } else {
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  }

  // 页面回滚
  async function rollback(item: HistoryItem) {
    await api.rollbackPage({
      pageId: item.pageId,
      env: activeKey,
      lastPublishId: item.id,
    });
    message.success('操作成功');
    getReleaseVersion();
  }

  // 查看页面数据
  const handleView = (data: string) => {
    setJsonData(JSON.parse(data));
    setVisible(true);
  };

  // 分页配置
  const paginationProp = {
    ...pagination,
    showTotal: (total: number) => `共 ${total} 条记录`,
    onChange: (current: number, pageSize: number) => {
      setPagination({
        ...pagination,
        current,
        pageSize,
      });
    },
  };
  return (
    <div>
      <Layout.Content className={style.publishHistoryList}>
        <Tabs size="middle" defaultActiveKey="1" items={items} onChange={(key) => onTabChange(key as EnvType)}></Tabs>
        <SearchForm form={form} submit={onSearch} style={{ marginBottom: 0 }} initialValues={{ date: [] }}>
          <Form.Item label="用户名" name="name">
            <Input autoComplete="off" placeholder="用户名"></Input>
          </Form.Item>
          <Form.Item label="创建于" name="date">
            <DatePicker.RangePicker format="YYYY/MM/DD" />
          </Form.Item>
        </SearchForm>
        <Table
          rowKey="id"
          loading={loading}
          scroll={{
            y: 'calc(100vh - 360px)',
          }}
          pagination={paginationProp}
          className={style.historyTable}
          columns={columns}
          dataSource={data}
        ></Table>
      </Layout.Content>
      <Modal title="页面数据" width={800} open={visible} footer={null} onCancel={() => setVisible(false)}>
        {/* https://github.com/chriskempson/base16/blob/main/styling.md */}
        <ReactJson
          style={{ height: 600, margin: 20, overflowY: 'auto' }}
          src={jsonData}
          theme={{
            base00: 'white',
            base01: '#ddd',
            base02: '#ddd',
            base03: '#444',
            base04: 'purple',
            base05: 'rgb(129 2 255)',
            base06: 'rgb(129 2 255)',
            base07: 'rgb(129 2 255)',
            base08: 'rgb(129 2 255)',
            base09: '#1677ff',
            base0A: '#7D33FF',
            base0B: '#7D33FF',
            base0C: '#7D33FF',
            base0D: '#7D33FF',
            base0E: '#7D33FF',
            base0F: '#7D33FF',
          }}
          collapsed={2}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      </Modal>
    </div>
  );
}

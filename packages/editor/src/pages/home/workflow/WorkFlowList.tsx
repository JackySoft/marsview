import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Layout, Pagination, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import api from '@/api/workflow';
import { IWorkFlow } from '@/api/workflow';
import { message, Modal } from '@/utils/AntdGlobal';
import CreateBasic from './components/CreateBasic';
import SearchBar from '@/components/Searchbar/SearchBar';
import styles from './../index.module.less';

/**
 * 页面列表
 */

export default function WorkFlow() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<IWorkFlow[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const createPageRef = useRef<{ open: () => void }>();
  const navigate = useNavigate();

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize]);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    setLoading(true);
    try {
      const { keyword } = form.getFieldsValue();
      const res = await api.getTemplateList({
        pageNum,
        pageSize: size,
        keyword,
      });
      setTotal(res?.total || 0);
      setList(res?.list || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  // 新建页面
  const handleCreate = () => {
    createPageRef.current?.open();
  };

  // 页面操作
  const handleAction = async (id: number) => {
    navigate(`/workflow/${id}`);
  };

  // 删除模板
  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    Modal.confirm({
      title: '确认',
      content: '删除后，该业务流无法恢复，请谨慎操作。',
      okText: '确认',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: async () => {
        await api.deleteTemplate(id);
        message.success('删除成功');
        getList();
      },
    });
  };

  // 提交搜索
  const handleSearch = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  // 页面列表项
  const SectionItem = ({ item }: { item: IWorkFlow }) => {
    return (
      <Card hoverable>
        <div className={styles.projectCard} onClick={() => handleAction(item.id)}>
          <Card.Meta
            style={{ cursor: 'pointer' }}
            title={item.formName}
            description={
              <>
                <DeleteOutlined className={styles.delIcon} onClick={(event) => handleDelete(event, item.id)} />
                <p style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{item.formDesc || '暂无描述'}</p>
                <p style={{ marginTop: 10 }}>
                  <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                  {item.userName}
                  &nbsp;&nbsp;
                  <span>更新于 {dayjs(item.updatedAt).fromNow()}</span>
                </p>
              </>
            }
          />
        </div>
      </Card>
    );
  };

  return (
    <>
      <Layout.Content className={styles.workflow}>
        <SearchBar form={form} from="工作流模板" showGroup={false} submit={handleSearch} refresh={getList} onCreate={handleCreate} />
        {total > 0 || loading ? (
          <>
            <div className={styles.pagesContent}>
              <Spin spinning={loading} size="large" tip="加载中...">
                <Row gutter={[20, 20]}>
                  {list.map((item: IWorkFlow, index: number) => {
                    return (
                      <Col span={6} key={item.id || index}>
                        <SectionItem item={item} />
                      </Col>
                    );
                  })}
                </Row>
              </Spin>
            </div>
            <Pagination
              total={total}
              current={current}
              showSizeChanger
              pageSize={pageSize}
              pageSizeOptions={['12', '16', '20', '50']}
              showTotal={(total) => `总共 ${total} 条`}
              align="end"
              onChange={handleChange}
            />
          </>
        ) : (
          !loading && (
            <Empty style={{ marginTop: 100 }}>
              <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                创建工作流模板
              </Button>
            </Empty>
          )
        )}
        {/* 新建模板 */}
        <CreateBasic createRef={createPageRef} update={() => getList(1, pageSize)} />
      </Layout.Content>
    </>
  );
}

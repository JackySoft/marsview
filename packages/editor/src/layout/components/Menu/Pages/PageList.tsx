import { Button, Flex, List, Spin, Tag } from 'antd';
import { PlusOutlined, SyncOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { memo, useEffect, useRef, useState } from 'react';
import { PageItem } from '@/api/pageMember';
import api from '@/api/page';
import { useNavigate } from 'react-router-dom';
import { Modal, message } from '@/utils/AntdGlobal';
import { usePageStore } from '@/stores/pageStore';
import CreatePage, { CreatePageRef } from '@/components/CreatePage';
/**
 * 编辑器中，快捷操作页面列表
 * 打开、修改、删除、新增页面
 */
export default memo(() => {
  const createRef = useRef<CreatePageRef>();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<PageItem[]>([]);
  const { pageId, projectId } = usePageStore((state) => ({
    pageId: state.page.id,
    projectId: state.page.projectId,
  }));
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(16);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getMyPagesList(1);
  }, []);

  // 获取用户页面列表
  const getMyPagesList = async (current: number) => {
    if (current > 1) {
      setMoreLoading(true);
    } else {
      setLoading(true);
    }
    const res = await api.getPageList({
      pageNum: current || pageNum,
      pageSize,
      projectId,
    });
    setPageNum(current);
    setLoading(false);
    setMoreLoading(false);
    if (res.list.length < pageSize) {
      setHasMore(false);
    }
    if (current === 1) {
      setList(res.list);
    } else {
      setList([...list, ...res.list]);
    }
  };

  // 新增页面
  const handleAdd = (item?: PageItem) => {
    if (item) {
      createRef.current?.open('edit', item);
    } else {
      createRef.current?.open('create');
    }
  };

  // 删除页面
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '确认',
      content: '删除后，将无法恢复，请谨慎操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await api.delPageData({
          id,
        });
        message.success('删除成功');
        getMyPagesList(1);
        if (list.length > 0) navigate(`/editor/${list[0].id}/edit`);
      },
    });
  };

  // 在编辑器中，打开当前页面
  const handleOpen = async (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    navigate(`/editor/${id}/edit`);
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mars-theme-card-border-color)' }}>
        <Button type="link" icon={<PlusOutlined />} onClick={() => handleAdd()} style={{ marginLeft: -15 }}>
          新增
        </Button>
        <Button
          type="link"
          icon={<SyncOutlined />}
          onClick={() => {
            getMyPagesList(1);
          }}
        >
          刷新
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => {
              return (
                <List.Item
                  actions={[
                    item.id === pageId ? <Tag color="#7D33FF">当前</Tag> : '',
                    <DeleteOutlined onClick={() => handleDelete(item.id)} />,
                    <EditOutlined onClick={() => handleAdd(item)} />,
                  ]}
                >
                  <List.Item.Meta title={<a onClick={(event) => handleOpen(event, item.id)}>{item.name}</a>} />
                </List.Item>
              );
            }}
          />
          {hasMore ? (
            <div style={{ textAlign: 'center', padding: 10 }}>
              <Button
                block
                loading={moreLoading}
                onClick={() => {
                  getMyPagesList(pageNum + 1);
                }}
              >
                加载更多
              </Button>
            </div>
          ) : (
            <div style={{ fontSize: '12px', borderTop: '1px solid #f5f5f5', marginTop: '12px', padding: '5px', textAlign: 'center' }}>没有更多了</div>
          )}
        </div>
      </Spin>
      {/* 创建和修改页面 */}
      <CreatePage
        createRef={createRef}
        update={() => {
          getMyPagesList(1);
        }}
      />
    </>
  );
});

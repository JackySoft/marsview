import { Button, Skeleton, Space, Pagination, Form, Empty } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { UserOutlined, CodeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getLibList } from '@/api/lib';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import SearchBar from '@/components/Searchbar/SearchBar';
import CreateLib from './lib/CreateLib';
import dayjs from 'dayjs';
import style from './index.module.less';

/**
 * 组件商店
 */
export default () => {
  const [form] = Form.useForm();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { userInfo } = usePageStore((state) => ({ userInfo: state.userInfo }));
  const createLibRef = useRef<{ open: () => void }>();
  const navigate = useNavigate();

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize]);

  // 加载列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    try {
      setLoading(true);
      const { type, keyword } = form.getFieldsValue();
      const { list, total } = await getLibList({
        pageNum,
        pageSize: size,
        keyword,
        type,
      });
      setList(list);
      setTotal(total);
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

  // 进入开发页面
  const handleEdit = (type: 'edit' | 'install', id: number) => {
    if (type === 'edit') {
      navigate(`/lib/${id}`);
    } else {
      // todo
      message.info('暂未开放');
    }
  };

  // 搜索
  const handleSearch = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  // 新建组件
  const handleCreate = () => {
    createLibRef.current?.open();
  };

  const LibItem = ({ item }: { item: any }) => {
    return (
      <div className={style.item} key={item.id}>
        <div className={style.itemInfo}>
          <h2>{item.name}</h2>
          <p className={style.remark}>{item.description || '暂无描述'}</p>
          <p>
            <span style={{ marginRight: 10 }}>
              <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
              {item.userName}
            </span>
            <span>更新于 {dayjs(item.updatedAt).fromNow()}</span>
          </p>
        </div>
        <Space>
          {userInfo.userId === item.userId ? (
            <Button type="primary" icon={<CodeOutlined />} onClick={() => handleEdit('edit', item.id)}>
              开发
            </Button>
          ) : (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleEdit('install', item.id)}>
              安装
            </Button>
          )}
        </Space>
      </div>
    );
  };

  return (
    <div className={style.libWrap}>
      <SearchBar form={form} from="组件" submit={handleSearch} refresh={getList} onCreate={handleCreate} />
      {total > 0 || loading ? (
        <>
          <div className={style.libList}>
            <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
              {list.map((item) => (
                <LibItem item={item} key={item.id} />
              ))}
            </Skeleton>
          </div>
          <Pagination
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger
            showTotal={(total) => `总共 ${total} 条`}
            align="end"
            style={{ marginTop: 20 }}
            onChange={handleChange}
          />
        </>
      ) : (
        <Empty style={{ marginTop: 100 }}>
          <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
            新建组件
          </Button>
        </Empty>
      )}
      <CreateLib createRef={createLibRef} update={() => getList(1, pageSize)} />
    </div>
  );
};

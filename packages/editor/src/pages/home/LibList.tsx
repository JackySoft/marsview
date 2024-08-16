import { Button, Skeleton, Space, Pagination, Form, Radio, Badge } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { UserOutlined, CodeOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getLibList } from '@/api/lib';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import style from './index.module.less';
import SearchBar from '@/components/Searchbar/SearchBar';
import CreateLib from '@/layout/components/Header/CreateLib';
import { RadioChangeEvent } from 'antd/lib';

/**
 * 组件商店
 */
export default () => {
  const [form] = Form.useForm();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { userInfo } = usePageStore((state) => ({ userInfo: state.userInfo }));
  const createLibRef = useRef<{ open: () => void }>();
  const navigate = useNavigate();

  // 展示可见items 1 个人 2 全部
  const [visitLocalGlobal, setVisitLocalGlobal] = useState('1');
  const optionsLocalGlobal = [
    { label: '个人', value: '1' },
    { label: '全部', value: '2' },
  ];

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize, visitLocalGlobal]);

  // 加载列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    try {
      setLoading(true);
      const { list, total } = await getLibList({
        pageNum,
        pageSize: size,
        keyword: form.getFieldValue('keyword'),
        type: Number(visitLocalGlobal),
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

  // 切换展示个人还是全部
  const handleVisistLocalGlobalChange = ({ target: { value } }: RadioChangeEvent) => {
    setVisitLocalGlobal(value);
  };

  const LibItem = ({ item }: { item: any }) => {
    return (
      <div className={style.item} key={item.id}>
        <div className={style.itemInfo}>
          <h2>{item.name}</h2>
          <p className={style.remark}>{item.description || '暂无描述'}</p>
          <p>
            <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
            {item.user_name} {item.created_at}
          </p>
        </div>
        <Space>
          {userInfo.userId === item.user_id ? (
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
      <SearchBar
        form={form}
        from="组件"
        submit={handleSearch}
        leftChildren={
          <Radio.Group
            style={{ marginRight: '20px' }}
            options={optionsLocalGlobal}
            onChange={handleVisistLocalGlobalChange}
            value={visitLocalGlobal}
            optionType="button"
            buttonStyle="solid"
          />
        }
        rightChildren={
          <>
            <Button type="dashed" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={handleCreate}>
              新建组件
            </Button>
            <Button shape="circle" icon={<RedoOutlined />} onClick={() => getList()}></Button>
          </>
        }
      ></SearchBar>
      <div className={style.libList}>
        <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
          {list.map((item) =>
            visitLocalGlobal === '2' && item.user_id === userInfo.userId ? (
              <Badge.Ribbon text="Me" placement="end">
                <LibItem item={item} />
              </Badge.Ribbon>
            ) : (
              <LibItem item={item} />
            ),
          )}
        </Skeleton>
      </div>
      <div className={style.paginationContainer}>
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          showTotal={(total) => `总共 ${total} 条`}
          onChange={handleChange}
          showSizeChanger
        />
      </div>
      <CreateLib createRef={createLibRef} update={() => getList(1, pageSize)} />
    </div>
  );
};

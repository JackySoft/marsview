import { Button, Skeleton, Space, Pagination, Form } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { UserOutlined, CodeOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getLibList } from '@/api/lib';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import style from './index.module.less';
import SearchBar from '@/components/Searchbar/SearchBar';
import CreateLib from '@/layout/components/Header/CreateLib';

/**
 * 组件商店
 */
export default () => {
  const [form] = Form.useForm();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const { userInfo, isUpdateList } = usePageStore((state) => ({ userInfo: state.userInfo, isUpdateList: state.isUpdateList }));
  const createLibRef = useRef<{ open: () => void }>();
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  // 加载列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    try {
      setLoading(true);
      const { list, total } = await getLibList({
        pageNum,
        pageSize: size,
        keyword: form.getFieldValue('keyword'),
      });
      setList(list);
      setTotal(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 分页事件
  const handleChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    setPageSize(pageSize || 20);
    getList(page, pageSize || 20);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrent(1);
    setPageSize(size);
    getList(1, size);
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

  const handleSearchSubmit = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  // 重置或者刷新页面
  const handleSearchReset = () => {
    form.resetFields();
    setCurrent(1);
    getList(1, pageSize);
  };

  // 新建组件
  const handleCreate = () => {
    createLibRef.current?.open();
  };

  return (
    <div className={style.libWrap}>
      <SearchBar form={form} submit={handleSearchSubmit} reset={handleSearchReset}>
        <Button type="dashed" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={handleCreate}>
          新建组件
        </Button>
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleSearchReset}></Button>
      </SearchBar>
      {/* <div className={style.search}>
        <Input.Search placeholder="输入组件名称" allowClear enterButton="Search" style={{ width: 500 }} size="large" onSearch={onSearch} />
      </div> */}
      <div className={style.libList}>
        <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
          {list.map((item) => {
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
          })}
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
          onShowSizeChange={handlePageSizeChange}
        />
      </div>
      <CreateLib createRef={createLibRef} />
    </div>
  );
};

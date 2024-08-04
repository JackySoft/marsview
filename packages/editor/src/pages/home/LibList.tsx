import { Button, Input, Skeleton, Space, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, CodeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getLibList } from '@/api/lib';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import style from './index.module.less';

/**
 * 组件商店
 */
export default () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { userInfo, isUpdateList } = usePageStore((state) => ({ userInfo: state.userInfo, isUpdateList: state.isUpdateList }));

  const navigate = useNavigate();

  useEffect(() => {
    getList(1, '');
  }, [isUpdateList]);

  // 加载列表
  const getList = async (page: number, keyword?: string) => {
    try {
      setLoading(true);
      const { list, total } = await getLibList({ pageNum: page, pageSize, keyword });
      setList(list);
      setTotal(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 搜索
  const onSearch = (value: string) => {
    setPageNum(1);
    getList(1, value);
  };

  // 分页事件
  const handleChange = (page: number) => {
    setPageNum(page);
    getList(page);
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

  return (
    <div className={style.libWrap}>
      <div className={style.search}>
        <Input.Search placeholder="输入组件名称或标识" allowClear enterButton="Search" style={{ width: 500 }} size="large" onSearch={onSearch} />
      </div>
      <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
        {list.map((item) => {
          return (
            <div className={style.item} key={item.id}>
              <div className={style.itemInfo}>
                <h2>{item.name}</h2>
                <p className={style.remark}>{item.description}</p>
                <p>
                  <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                  {item.sso_name} {item.created_at}
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
      <Pagination
        style={{ textAlign: 'right', marginTop: 16 }}
        total={total}
        current={pageNum}
        pageSize={12}
        showTotal={(total) => `总共 ${total} 条`}
        onChange={handleChange}
      />
    </div>
  );
};

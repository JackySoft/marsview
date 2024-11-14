import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Flex, List, Spin } from 'antd';
import { PlusOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import MemberSetting from './MemberSetting';
import { message } from '@/utils/AntdGlobal';
import api, { PageMember } from '@/api/pageMember';
export default () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<PageMember[]>([]);
  const memberRef = useRef<{ open: (type: 2) => void }>();
  const { id: pageId } = useParams();
  useEffect(() => {
    getMemberList();
  }, []);

  // 获取用户列表
  const getMemberList = async () => {
    if (!pageId) return message.error('当前页面不存在');
    setLoading(true);
    const res = await api.getMemberList({ pageId: parseInt(pageId as string) });
    setList(res.list);
    setLoading(false);
  };

  // 新增用户
  const handleAdd = () => {
    memberRef.current?.open(2);
  };

  // 删除用户
  const handleDelete = async (id: number) => {
    await api.deletePageMember({ id });
    setList(list.filter((item) => item.id != id));
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mars-theme-card-border-color)' }}>
        <Button type="link" icon={<PlusOutlined />} onClick={() => handleAdd()}>
          新增
        </Button>
        <Button type="link" icon={<SyncOutlined />} onClick={getMemberList}>
          刷新
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <List
          style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleDelete(item.id)}>
                    删除
                  </Button>,
                ]}
              >
                <List.Item.Meta avatar={<UserOutlined />} title={<span>{item.userName}</span>} description={item.role == 1 ? '开发者' : '体验者'} />
              </List.Item>
            );
          }}
        />
      </Spin>
      <MemberSetting ref={memberRef} update={getMemberList} />
    </>
  );
};

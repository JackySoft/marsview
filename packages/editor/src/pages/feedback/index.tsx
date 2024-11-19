import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Tag, Button, Space, List, Tabs, Input, Avatar, Pagination, Skeleton, Form, Flex } from 'antd';
import { ShareAltOutlined, SearchOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { FeedbackItem } from '../types';
import { getFeedbackList, queryFeedbackTotal } from '@/api';
import RandomAvatar from './UserDefaultAvatar';
import style from './index.module.less';

const { Title, Paragraph, Text } = Typography;

const FeedbackIndex: React.FC = () => {
  const [resolveTotal, setResolveTotal] = useState(0);
  const [bugTotal, setBugTotal] = useState(0);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 打开反馈详情
  const handleCardClick = (id: number) => {
    navigate(`/feedback/${id}/detail`);
  };

  // 去发布
  const handleNavigatePost = () => {
    navigate('/feedback/post');
  };

  // 反馈类型页签
  const tabs = useMemo(
    () => [
      {
        key: '0',
        label: '全部',
      },
      {
        key: '1',
        label: 'BUG',
      },
      {
        key: '2',
        label: '建议',
      },
      {
        key: '3',
        label: '其他',
      },
    ],
    [],
  );

  // 获取列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: { title: string; type: number }) => {
    return getFeedbackList({
      pageNum: current,
      pageSize: pageSize,
      ...formData,
    }).then((res) => {
      return {
        total: res.total,
        list: res.list,
      };
    });
  };

  const { tableProps, loading, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  });

  useEffect(() => {
    getFeedbackTotal();
  }, []);

  // 查询反馈总量
  const getFeedbackTotal = async () => {
    const res = await queryFeedbackTotal();

    setResolveTotal(res.resolveCount);
    setBugTotal(res.bugCount);
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.header}>
          <Flex justify="space-between">
            <div className={style.headerLeft}>
              <Title level={2} className={style.title}>
                问答专栏
              </Title>
              <Space className={style.tags}>
                <Tag color="#2db7f5">用户声音</Tag>
                <Tag color="#87d068">创新分享</Tag>
                <Tag color="#f50">反馈建议</Tag>
              </Space>
              <Paragraph className={style.description}>无论是解惑、反馈，还是分享创新的火花，都在此得到珍视～</Paragraph>
            </div>
            <div className={style.headerRight}>
              <div className={style.statCard}>
                <Text className={style.statNumber}>{bugTotal}</Text>
                <Text className={style.statLabel}>建议</Text>
              </div>
              <div className={style.statCard}>
                <Text className={style.statNumber}>{resolveTotal}</Text>
                <Text className={style.statLabel}>解决</Text>
              </div>
            </div>
          </Flex>
          <Space className={style.headerActions}>
            <Button type="primary" danger onClick={handleNavigatePost}>
              + 发布
            </Button>
            <Button color="default" variant="filled" icon={<ShareAltOutlined />}>
              分享
            </Button>
          </Space>
        </div>
        <div className={style.tabsContainer}>
          <Form form={form}>
            <Form.Item name="type">
              <Tabs defaultActiveKey="0" items={tabs} onChange={search.submit}></Tabs>
            </Form.Item>
            <Form.Item name="title">
              <Input.Search
                placeholder="根据标题进行检索"
                prefix={<SearchOutlined />}
                className={style.searchInput}
                size="large"
                onPressEnter={search.submit}
                onSearch={search.submit}
              />
            </Form.Item>
          </Form>
        </div>
        <div className={style.listContent}>
          <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
            <List
              itemLayout="horizontal"
              dataSource={tableProps.dataSource}
              renderItem={(item: FeedbackItem) => (
                <List.Item className={style.qaCard} key={item.id}>
                  <div className={style.cardContent} onClick={() => handleCardClick(item.id)}>
                    {item.userAvatar ? (
                      <Avatar src={item.userAvatar} size={48} className={style.avatar} />
                    ) : (
                      <RandomAvatar size={48} className={style.avatar} seed={item.nickName + ''} />
                    )}
                    <div className={style.middleContent}>
                      <div className={style.itemTitle}>{item.title}</div>
                      <Space size={[0, 8]} wrap>
                        {item.isTop === 1 ? <Tag color="#f50">置顶</Tag> : null}
                        <Tag color="#2db7f5">{tabs.find((tab) => Number(tab.key) === item.type)?.label}</Tag>
                        {item.isSolve === 1 && <Tag color="success">{item.type === 1 ? '已解决' : '已采纳'}</Tag>}
                      </Space>
                    </div>
                    <div className={style.rightContent}>
                      <div className={style.userInfo}>
                        <span className={style.username}>{item.nickName}</span>
                      </div>
                      <div className={style.publishTime}>{item.createdAt}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Skeleton>
        </div>
        {/* 分页器 */}
        {tableProps.pagination.total > 0 ? (
          <div className={style.pageControl}>
            <Pagination {...tableProps.pagination} onChange={(current, pageSize) => tableProps.onChange({ current, pageSize })} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FeedbackIndex;

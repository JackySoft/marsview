import React from 'react';
import { Layout, Typography, Tag, Button, Space, List, Tabs, Input, Avatar, Pagination } from 'antd';
import { EyeOutlined, ShareAltOutlined, CalendarOutlined, SearchOutlined, LikeOutlined, HeartOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;


interface QAItem {
  id: string;
  avatar: string;
  title: string;
  tags: string[];
  username: string;
  likes: number;
  publishTime: string;
}

const mockData: QAItem[] = [
  {
    id: '1',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '新增反馈功能',
    tags: ['Bug'],
    username: 'Garrett',
    likes: 15,
    publishTime: '2024-10-08 08:30',
  },
  {
    id: '2',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '如何提高编程效率？',
    tags: ['建议'],
    username: '白码',
    likes: 32,
    publishTime: '2024-09-29 12:01',
  },
  {
    id: '3',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '推荐一些好用的设计工具',
    tags: ['前端'],
    username: 'DesignMaster',
    likes: 28,
    publishTime: '2024-09-15 15:45',
  },
  {
    id: '4',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '推荐一些好用的设计工具',
    tags: ['设计', '工具'],
    username: 'DesignMaster',
    likes: 28,
    publishTime: '2024-09-15 15:45',
  },
  {
    id: '5',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '推荐一些好用的设计工具',
    tags: ['设计', '工具'],
    username: 'DesignMaster',
    likes: 28,
    publishTime: '2024-09-15 15:45',
  },
];
const FeedbackIndex: React.FC = () => {

  const navigate = useNavigate();
  const handleCardClick = (id: string) => {
    navigate(`/feedback/${id}/detail`);
  }

  const handleNavigatePost = () => {
    navigate('/feedback/post');
  }

  const tabs = [
    {
      key: '1',
      label: '全部',
    },
    {
      key: '2',
      label: '建议'
    },
    {
      key: '3',
      label: 'Bug'
    },
    {
      key: '4',
      label: '前端'
    },
    {
      key: '5',
      label: '设计'
    },
    {
      key: '6',
      label: '其他'
    },
    {
      key: '7',
      label: 'Github'
    }
  ]
  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style.headerContent}>
            <div className={style.headerLeft}>
              <Title level={2} className={style.title}>问答专栏</Title>
              <Space className={style.tags}>
                <Tag>用户声音</Tag>
                <Tag>创新分享</Tag>
                <Tag>反馈建议</Tag>
              </Space>
              <Paragraph className={style.description}>
              无论是解惑、反馈，还是分享创新的火花，都在此得到珍视～
              </Paragraph>
            </div>
            <div className={style.headerRight}>
              <div className={style.statCard}>
                <Text className={style.statNumber}>568</Text>
                <Text className={style.statLabel}>建议</Text>
              </div>
              <div className={style.statCard}>
                <Text className={style.statNumber}>1万</Text>
                <Text className={style.statLabel}>解决</Text>
              </div>
            </div>
          </div>
          <Space className={style.headerActions}>
            <Button type="primary" className={style.followButton} onClick={handleNavigatePost}>+ 发布</Button>
            <Button icon={<ShareAltOutlined />} className={style.shareButton}>分享</Button>
          </Space>
        </div>
        <div className={style.tabsContainer}>
          <Tabs defaultActiveKey="1" items={tabs} className={style.tabs}>

          </Tabs>
          <Input
            placeholder="搜索问题"
            prefix={<SearchOutlined />}
            className={style.searchInput}
          />
        </div>
        <div className={style.listContent}>
          <Title level={3} className={style.listTitle}>社区</Title>
          <List
            itemLayout="horizontal"
            dataSource={mockData}
            renderItem={(item) => (
              <List.Item className={style.qaCard}>
                <div className={style.cardContent} onClick={()=>handleCardClick(item.id)}>
                  <Avatar src={item.avatar} size={48} className={style.avatar} />
                  <div className={style.middleContent}>
                    <div className={style.itemTitle}>{item.title}</div>
                    <Space size={[0, 8]} wrap>
                      {item.tags.map((tag) => (
                        <Tag key={tag} className={style.tag}>
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                  <div className={style.rightContent}>
                    <div className={style.userInfo}>
                      <span className={style.username}>{item.username}</span>
                      <div>
                        <HeartOutlined />
                        <span> {item.likes}</span>
                      </div>
                    </div>
                    <div className={style.publishTime}>{item.publishTime}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
        <div className={style.pageControl}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackIndex;

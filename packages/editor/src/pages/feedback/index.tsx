import { Col, Pagination, Row } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import styles from './index.module.less';
import type { GetProps } from 'antd';
import { useEffect, useState } from 'react';
import { FeedbackItem, ItemCardProps } from '../types';
import ItemCard from './components/ItemCard';
import { useNavigate } from 'react-router-dom';
type SearchProps = GetProps<typeof Input.Search>;

const FeedbackIndex = () => {

  const navigte = useNavigate();

  const navList = [
    {
      label: '全部',
      id: 'all',
    },
    {
      label: 'Bug',
      id: 'bug',
    },
    {
      label: '建议',
      id: 'advise',
    },
    {
      label: '其他',
      id: 'other',
    },
  ];

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const [selectedId, setSelectedId] = useState('all');

  const handleItemClick = (id: string) => {
    setSelectedId(id);
  };

  const feedbackList: FeedbackItem[] = [
    {
      id: 1,
      title: '页面响应',
      content: '问题内容',
      isSolve: true,
      isTop: true,
      like: 17,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'bug',
    },
    {
      id: 2,
      title: '希望新增反馈功能',
      content: '问题内容',
      isSolve: false,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'advise',
    },
    {
      id: 3,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 4,
      title: '页面响应',
      content: '问题内容',
      isSolve: true,
      isTop: true,
      like: 20,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'bug',
    },
    {
      id: 5,
      title: '希望新增反馈功能',
      content: '问题内容',
      isSolve: false,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'advise',
    },
    {
      id: 6,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 7,
      title: '页面响应',
      content: '问题内容',
      isSolve: true,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'bug',
    },
    {
      id: 8,
      title: '希望新增反馈功能',
      content: '问题内容',
      isSolve: false,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'advise',
    },
    {
      id: 9,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 10,
      title: '页面响应',
      content: '问题内容',
      isSolve: true,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'bug',
    },
    {
      id: 11,
      title: '希望新增反馈功能',
      content: '问题内容',
      isSolve: false,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'advise',
    },
    {
      id: 12,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 13,
      title: '页面响应',
      content: '问题内容',
      isSolve: true,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'bug',
    },
    {
      id: 14,
      title: '希望新增反馈功能',
      content: '问题内容',
      isSolve: false,
      isTop: true,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'advise',
    },
    {
      id: 15,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 16,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 17,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 0,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
    {
      id: 18,
      title: '问题标题',
      content: '问题内容',
      isSolve: true,
      isTop: false,
      like: 4,
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      time: '2021-09-01',
      userName: '用户名',
      type: 'other',
    },
  ];

  const [filteredList, setFilteredList] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    if (feedbackList && feedbackList.length > 0) {
      // 将置顶的isTop放在前面
      const sortedList = feedbackList.sort((a, b) => {
        if (a.isTop && !b.isTop) return -1;
        if (!a.isTop && b.isTop) return 1;
        return 0;
      });

      // 根据时间排序
      sortedList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

      // 根据selectedId筛选列表中type符合的项
      const filteredList = sortedList.filter((item) => item.type === selectedId);

      setFilteredList(filteredList);
    }
  }, [feedbackList, selectedId]);

  useEffect(() => {
    setFilteredList(feedbackList);
  }, [feedbackList]);

  const handleIssueClick = (item: FeedbackItem) => {
    navigte(`/feedback/${item.id}/detail`);
  }

  return (
    <Row>
      <Col span={6}></Col>
      <Col span={12}>
        <div className={styles.feedback}>
          <div className={styles.title}>问答专栏</div>
          <div className={styles.navBar}>
            <div className={styles.navBody}>
              <div className={`${styles.navItem} ${selectedId === 'me' ? styles.selected : ''}`} onClick={() => handleItemClick('me')}>
                只看自己
              </div>
            </div>
            <div className={styles.navBody}>
              {navList.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.navItem} ${selectedId === item.id ? styles.selected : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className={styles.navBody}>
              <div className={`${styles.navItem} ${selectedId === 'github' ? styles.selected : ''}`} onClick={() => handleItemClick('github')}> Github</div>
            </div>
            <div className={styles.navBody}>
              <Search size="middle" placeholder="搜索问题" onSearch={onSearch} enterButton />
            </div>
          </div>
          <div className={styles.content}>
            {filteredList.map((item) => (
              <ItemCard key={item.id} info={item} click={() => handleIssueClick(item)} />
            ))}
          </div>
          <div className={styles.footer}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </Col>
      <Col span={6}></Col>
    </Row>
  );
};

export default FeedbackIndex;

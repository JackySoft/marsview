import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Input, Avatar, Spin, Badge } from 'antd';
import { CheckCircleFilled, FrownOutlined, SendOutlined } from '@ant-design/icons';
import api, { FeedbackCommentItem, FeedbackItem } from '@/api/feedback';
import RandomAvatar from '../UserDefaultAvatar';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import styles from './index.module.less';
const { TextArea } = Input;

const CommentCard = (props: { comment: FeedbackCommentItem }) => {
  const { comment } = props;
  return (
    <div key={comment.id} className={styles.commentCard}>
      <div className={styles.authorInfo}>
        <div className={styles.avatar}>
          {comment.userAvatar ? (
            <Avatar src={comment.userAvatar} size={40} className={styles.avatar} />
          ) : (
            <RandomAvatar size={40} className={styles.avatar} seed={comment.nickName + ''} />
          )}
        </div>
        <div className={styles.commentHeader}>
          <div className={styles.commentAuthor}>{comment.nickName}</div>
          <div className={styles.commentTime}>{comment.createdAt}</div>
        </div>
      </div>
      <p className={styles.commentContent}>{comment.content}</p>
    </div>
  );
};
export default function IssueDetail() {
  const { userInfo } = usePageStore((state) => {
    return {
      userInfo: state.userInfo,
    };
  });

  const [itemDetail, setItemDetail] = useState<FeedbackItem>({
    id: 0,
    title: '',
    content: '',
    isSolve: 0,
    isTop: 0,
    like: 0,
    userAvatar: '',
    createdAt: '',
    nickName: '',
    type: 1,
  });

  // 在组件内部
  const { id } = useParams<{ id: string }>();

  const [comments, setComments] = useState<FeedbackCommentItem[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchFeedbackDetail(Number(id));
  }, [id]);

  const fetchFeedbackDetail = async (id: number) => {
    const res = await api.getFeedbackDetail(id);
    setItemDetail(res);
  };

  useEffect(() => {
    fetchComments(pageNum);
  }, [pageNum]);

  const fetchComments = async (pageNum: number) => {
    setLoading(true);
    const { list, total } = await api.getFeedbackComments(Number(id), 12, pageNum);
    setHasMore(comments.length + list.length < total);
    setComments((prevComments) => [...prevComments, ...list]);
    setTotal(total);
    setLoading(false);
  };

  const [replyContent, setReplyContent] = useState('');

  const handleReply = async () => {
    if (!replyContent) {
      message.info('请输入评论内容');
      return;
    }
    if (replyContent.length > 150) {
      message.info('评论内容不能超过150字符～');
      return;
    }
    const data = {
      feedbackId: itemDetail.id,
      content: replyContent,
    };
    const res = await api.createFeedbackComment(data);

    setComments((prevComments) => [
      {
        id: res.id,
        nickName: userInfo.userName,
        content: replyContent,
        createdAt: new Date().toLocaleString(),
        feedbackId: itemDetail.id,
      },
      ...prevComments,
    ]);
    setReplyContent('');
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{itemDetail.title ? itemDetail.title : '不知名用户'}</h1>
          <div className={styles.tagContainer}>
            {itemDetail.type === 1 ? (
              <span className={`${styles.tag} ${styles.tagBug}`}>Bug</span>
            ) : itemDetail.type === 2 ? (
              <span className={`${styles.tag} ${styles.tagAdvise}`}>建议</span>
            ) : (
              <span className={`${styles.tag} ${styles.tagOther}`}>其他</span>
            )}
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.avatar}>
              {itemDetail.userAvatar ? (
                <Avatar src={itemDetail.userAvatar} size={40} className={styles.avatar} />
              ) : (
                <RandomAvatar size={40} className={styles.avatar} seed={itemDetail.nickName + ''} />
              )}
            </div>
            <div>
              <div className={styles.authorName}>{itemDetail.nickName}</div>
              <div className={styles.authorTime}>
                发布于 {itemDetail.createdAt} • {itemDetail.isTop ? '置顶' : '未置顶'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.imageGallery}>
          {itemDetail.images &&
            itemDetail.images.split(',').map((item, i) => (
              <div key={i} className={styles.imageWrapper}>
                <Image src={item} alt={`Image ${i}`} className="object-cover" />
              </div>
            ))}
        </div>

        <div className={styles.description}>
          {itemDetail && itemDetail.content
            ? itemDetail.content.split('\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))
            : null}
        </div>
      </div>

      {/* Status Card */}
      <div className={styles.status}>
        {itemDetail.isSolve ? (
          <div className={styles.statusCard}>
            <div className={styles.statusContent}>
              <div className={styles.statusText}>
                <CheckCircleFilled className={styles.solveIcon} /> <span>{itemDetail.type === 1 ? '问题已被解决' : '建议已被采纳'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.statusCard}>
            <div className={styles.statusContent}>
              <div className={styles.statusText}>
                <FrownOutlined /> <span>{itemDetail.type === 1 ? '问题还未被解决' : '建议还未被采纳'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className={styles.replyModule}>
        <RandomAvatar size={40} className={styles.userAvatar} seed={userInfo.userId + ''} />
        <div className={styles.replyInputArea}>
          <TextArea
            value={replyContent}
            showCount
            allowClear
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="写下你的评论..."
            autoSize={{ minRows: 2, maxRows: 10 }}
            maxLength={150}
          />
        </div>
        <div className={styles.action} onClick={handleReply}>
          <SendOutlined className={styles.sendIcon} />
        </div>
      </div>
      <div className={styles.commentsSection}>
        <div className={styles.commentsHeader}>
          <h2 className={styles.commentsTitle}>讨论 ({total})</h2>
        </div>

        <div>
          {comments.map((comment) =>
            comment.isTop ? (
              <Badge.Ribbon text="置顶" color="#f50">
                <CommentCard comment={comment} />
              </Badge.Ribbon>
            ) : (
              <CommentCard comment={comment} />
            ),
          )}
        </div>
        {comments.length === 0 && !hasMore && (
          <div className={styles.loadMore}>
            <span className={styles.loadMoreText}>暂无讨论，快来抢沙发吧~</span>
          </div>
        )}
        {hasMore && (
          <div className={styles.loadMore}>
            {loading ? (
              <Spin />
            ) : (
              <span className={styles.loadMoreText} onClick={() => setPageNum((prevPage) => prevPage + 1)}>
                更 多
              </span>
            )}
          </div>
        )}

        {!hasMore && comments.length > 0 && (
          <div className={styles.loadMore}>
            <span className={styles.loadMoreText}>到底啦～</span>
          </div>
        )}
      </div>
    </div>
  );
}

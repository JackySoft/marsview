import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { ItemCardProps } from '../../../types';
import { Image, Tag } from 'antd';

const ItemCard = (cardInfo: ItemCardProps) => {
  const { info, click } = cardInfo;


  return (
    <div className={styles.itemCard} onClick={click}>
      <div className={styles.itemAvatar}>
        <Image className={styles.img} src={info.userAvatar} />
      </div>
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>{info.title}</div>
        <div className={styles.tags}>
          {info.isTop && <Tag color="#f50">置顶</Tag>}
          {info.type === 'bug' ? (
            <Tag color="#cd201f">Bug</Tag>
          ) : info.type === 'advise' ? (
            <Tag color="#2f4f8b">建议</Tag>
          ) : (
            <Tag color="#006df8">其他</Tag>
          )}
          {info.isSolve && <Tag color="#87d068">已解决</Tag>}
        </div>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.itemInfoTop}>
          <div className={styles.itemAuthor}>
            <UserOutlined /> {info.userName}
          </div>
          <div className={styles.itemLike}>
            <LikeOutlined /> {info.like}
          </div>
        </div>
        <div className={styles.itemInfoTop}>
          <div className={styles.itemTime}>{info.time}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

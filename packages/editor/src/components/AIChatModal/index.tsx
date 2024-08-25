import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less';
import { spawn } from 'child_process';
import { ArrowUpOutlined, BellOutlined, RocketOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface AIChatModalProps {
  showModal: boolean;
}

interface Example {
  id: string;
  name: string;
  message: string;
}
export default function AIChatModal({ showModal }: AIChatModalProps) {
  const [message, setMessage] = useState<string>('');
  const [requestMessage, setRequestMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [sendAllow, setSendAllow] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setSendAllow(true);
    } else {
      setSendAllow(false);
    }
  }, [message]);
  const examples: Example[] = [
    {
      id: `1`,
      name: '表单生成',
      message: '帮我实现一个表单，可以输入一个学生的基本信息',
    },
    {
      id: `2`,
      name: '图表生成',
      message: '帮我实现一个图表，展示学生的成绩',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickExample = (item: Example) => {
    setMessage(item.message);
  };

  return (
    <div className={`${styles.AIChatModal} ${showModal ? styles.showModal : styles.hideModal}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span>MarsAI Code</span>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.chatContent}>
            <div className={styles.chatItem}>
              <div className={styles.chatInfo}>
                <div className={styles.chatName}>MarsUser</div>
                <div className={styles.avatar}>
                  <img src="/imgs/chatUser.png" alt="" />
                </div>
              </div>
              <div className={styles.chatText}>
                <div className={styles.chatMessage}>
                  帮我实现一个表单，可以输入一个学生的基本信息帮我实现一个表单，可以输入一个学生的基本信息帮我实现一个表单，可以输入一个学生的基本信息帮我实现一个表单，可以输入一个学生的基本信息帮我实现一个表单，可以输入一个学生的基本信息帮我实现一个表单，可以输入一个学生的基本信息
                </div>
              </div>
            </div>

            <div className={styles.chatResponce}>
              <div className={styles.chatInfo}>
                <div className={styles.avatar}>
                  <img src="/imgs/mars-logo-light.png" alt="" />
                </div>
                <div className={styles.chatName}>MarsAI</div>
              </div>
              <div className={styles.chatText}>
                <div className={styles.chatMessage}>好的，请稍等</div>
              </div>
            </div>
          </div>
          <div className={styles.chatExamples}>
            {examples.map((item) => {
              return (
                <button className={styles.chatExampleItem} key={item.id} onClick={() => handleClickExample(item)}>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
          <div className={styles.chatInput}>
            <div className={styles.chatOtherInfo}>
              <BellOutlined />
            </div>
            <div className={styles.inputBox}>
              <input type="text" placeholder="请输入消息" value={message} onChange={handleInputChange} />
            </div>
            <div className={styles.sendBtn}>
              <Button disabled={!sendAllow} shape="circle" type="primary" icon={<ArrowUpOutlined />}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

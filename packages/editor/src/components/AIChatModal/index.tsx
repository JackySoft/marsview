import { Alert, Button, Popover, Spin } from 'antd';
import styles from './index.module.less';
import { ArrowUpOutlined, BellOutlined, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useImperativeHandle, useState } from 'react';

interface AIChatModalProps {
  mRef?: any;
  onGenerateLoad: (message: string) => Promise<boolean>;
  onReloadWrite: () => void;
}

interface Example {
  id: string;
  name: string;
  message: string;
}

type StatusType = 'success' | 'info' | 'warning' | 'error';

export default function AIChatModal({ mRef, onGenerateLoad, onReloadWrite }: AIChatModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [requestMessage, setRequestMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [sendAllow, setSendAllow] = useState<boolean>(false);
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [welcomeText, setWelcomeText] = useState<string>('MarsAI为您服务~');

  const [status, setStatus] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<{ type: StatusType; msg: string; reload: boolean }>({
    type: 'success',
    msg: '生成完成',
    reload: false,
  });

  const examples: Example[] = [
    {
      id: `1`,
      name: '信息表单',
      message: '实现表单组件，展示学生的姓名、年龄、班级和成绩',
    },
    {
      id: `2`,
      name: '登录组件',
      message: '帮我实现一个登录组件，含有用户名和密码输入框，以及登录按钮',
    },
    {
      id: `3`,
      name: '日期组件',
      message: '帮我实现一个日期组件，含有日期选择器和时间选择器，以及日期格式化功能',
    },
  ];

  const popTitle = '温馨提示';

  const popContent = (
    <>
      <p>1. MarsAI是代码生成工具，不支持对话。</p>
      <p>2. 由于Mars暂不支持用户开发一些复杂的组件，故生成的代码可能存在一些问题，仅供参考。</p>
      <p>3. 请调试通过后再发布组件。</p>
    </>
  );

  useEffect(() => {
    if (message) {
      setSendAllow(true);
    } else {
      setSendAllow(false);
    }
  }, [message]);

  const openModal = () => {
    setShowModal(true);
  };

  const handleClickExample = (item: Example) => {
    setMessage(item.message);
  };

  const handleHideModal = () => {
    setMessage('');
    setShowModal(false);
  };

  const reloadStatus = async () => {
    setStatus(false);
    setShowLoad(true);
    setLoading(true);
    setLoadingText('正在重新写入代码，请稍后');
  };

  const cancelLoad = () => {
    setShowLoad(false);
    setLoading(false);
    setStatus(true);
    setStatusInfo({ type: 'info', msg: '取消写入', reload: true });
  };

  const writeCompleted = async () => {
    setShowLoad(false);
    setLoading(false);
    setStatus(true);
    setStatusInfo({ type: 'success', msg: '生成完成', reload: false });
  };

  const writeError = async () => {
    setShowLoad(false);
    setLoading(false);
    setStatus(true);
    setStatusInfo({ type: 'error', msg: '代码写入出错了', reload: false });
  };

  const requestError = async () => {
    setShowLoad(false);
    setLoading(false);
    setStatus(true);
    setStatusInfo({ type: 'error', msg: '请求出错了', reload: false });
  };

  const changeLoadInfo = async (text: string) => {
    setLoadingText(text);
    setShowLoad(true);
    setLoading(true);
  };

  useImperativeHandle(mRef, () => {
    return {
      openModal,
      handleHideModal,
      cancelLoad,
      reloadStatus,
      writeCompleted,
      writeError,
      changeLoadInfo,
      requestError,
    };
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleRequestMessage = async () => {
    setStatus(false);
    setRequestMessage(message);
    setResponseMessage('');
    setMessage('');
    setShowLoad(false);
    setLoading(false);
    setTimeout(async () => {
      setResponseMessage('好的，MarsAI为您服务~');
      await onGenerateLoad(message);
    }, 1000);
  };

  return (
    <div className={`${styles.AIChatModal} ${showModal ? styles.showModal : styles.hideModal}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.title}>
            <svg className={styles.marsailogo} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22404">
              <path
                d="M370.812121 400.290909c-21.721212 0-38.787879 17.066667-38.787879 38.787879V605.090909c0 21.721212 17.066667 38.787879 38.787879 38.787879s38.787879-17.066667 38.787879-38.787879V439.078788c0-21.721212-17.066667-38.787879-38.787879-38.787879zM712.145455 417.357576c-15.515152-15.515152-38.787879-15.515152-54.303031 0L589.575758 485.624242c-9.309091 9.309091-13.963636 21.721212-12.412122 34.133334-1.551515 12.412121 3.10303 24.824242 12.412122 32.581818l68.266666 68.266667c7.757576 7.757576 17.066667 10.860606 27.927273 10.860606s20.169697-4.654545 27.927273-10.860606 10.860606-17.066667 10.860606-27.927273-4.654545-20.169697-10.860606-27.927273l-46.545455-46.545454 46.545455-46.545455c13.963636-13.963636 13.963636-38.787879-1.551515-54.30303z"
                p-id="22405"
                fill="#7d33ff"
              ></path>
              <path
                d="M788.169697 228.072727c-57.406061-27.927273-161.357576-48.09697-273.066667-49.648485-111.709091 1.551515-217.212121 20.169697-274.618182 49.648485-88.436364 41.890909-124.121212 128.775758-124.121212 297.890909 0 134.981818 37.236364 232.727273 100.848485 266.860606 82.230303 41.890909 156.70303 55.854545 296.339394 55.854546 141.187879 0 215.660606-13.963636 294.787879-54.30303 65.163636-35.684848 102.4-134.981818 102.4-268.412122 0-167.563636-37.236364-256-122.569697-297.890909z m44.993939 296.339394c0 114.812121-31.030303 183.078788-60.509091 200.145455-58.957576 29.478788-117.915152 44.993939-259.10303 44.993939-139.636364 0-200.145455-15.515152-260.654545-44.993939-29.478788-15.515152-58.957576-85.333333-58.957576-200.145455 0-134.981818 23.272727-200.145455 79.127273-229.624242 46.545455-23.272727 142.739394-40.339394 240.484848-40.339394 97.745455 1.551515 193.939394 18.618182 240.484849 40.339394 55.854545 29.478788 79.127273 94.642424 79.127272 229.624242z"
                p-id="22406"
                fill="#7d33ff"
              ></path>
            </svg>
            <span>MarsAI</span>
          </div>
          <button className={styles.closeButton} onClick={handleHideModal}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.chatContent}>
            {!requestMessage && !responseMessage && <div className={styles.welcomeText}>{welcomeText}</div>}
            {requestMessage && (
              <div className={styles.chatItem}>
                <div className={styles.chatInfo}>
                  <div className={styles.chatName}>MarsUser</div>
                  <div className={styles.avatar}>
                    <img src="/imgs/chatUser.png" alt="" />
                  </div>
                </div>
                <div className={styles.chatText}>
                  <div className={styles.chatMessage}>{requestMessage}</div>
                </div>
              </div>
            )}

            {responseMessage && (
              <div className={styles.chatResponce}>
                <div className={styles.chatInfo}>
                  <div className={styles.avatar}>
                    <img src="/imgs/ailogo.svg" alt="" />
                  </div>
                  <div className={styles.chatName}>MarsAI</div>
                </div>
                <div className={styles.chatText}>
                  <div className={styles.chatMessage}>{responseMessage}</div>
                </div>
              </div>
            )}

            {showLoad && (
              <div className={styles.chatLoad}>
                <div className={styles.chatText}>{loadingText}</div>
                {loading && (
                  <div className={styles.load}>
                    <Spin size="small" />
                  </div>
                )}
              </div>
            )}

            {status && (
              <div className={styles.chatLoad}>
                {!statusInfo.reload ? (
                  <Alert type={statusInfo.type} showIcon message={statusInfo.msg} />
                ) : (
                  <Alert
                    type={statusInfo.type}
                    showIcon
                    message={statusInfo.msg}
                    action={
                      <Popover placement="top" content="重新写入代码">
                        <Button
                          style={{ marginLeft: '5px' }}
                          type="primary"
                          size="small"
                          shape="circle"
                          icon={<ReloadOutlined />}
                          onClick={onReloadWrite}
                        />
                      </Popover>
                    }
                  />
                )}
              </div>
            )}
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
              <Popover placement="top" title={popTitle} content={popContent} style={{ maxWidth: 200 }}>
                <BellOutlined />
              </Popover>
            </div>
            <div className={styles.inputBox}>
              <input maxLength={80} type="text" placeholder="描述组件的结构和内容" value={message} onChange={handleInputChange} />
            </div>
            <div className={styles.sendBtn}>
              <Button disabled={!sendAllow} shape="circle" type="primary" icon={<ArrowUpOutlined />} onClick={handleRequestMessage}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

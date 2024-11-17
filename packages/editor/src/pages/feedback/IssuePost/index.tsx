import React, { useState, useRef, useEffect } from 'react';
import { Input, Tabs, Card, Alert, Button, message, Image, Form, Spin } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { uploadImg, createFeedback } from '@/api';
import storage from '@/utils/storage';
import { Modal } from '@/utils/AntdGlobal';
import { userInfo } from 'os';
import { usePageStore } from '@/stores/pageStore';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TabPane } = Tabs;

const PostCreation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('1');
  const [images, setImages] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [uploadLoding, setUploadLoding] = useState(false);
  const navigate = useNavigate();
  const {
    userInfo,
  } = usePageStore((state) => {
    return {
      userInfo: state.userInfo,
    };
  });

  const tabs = [
    { key: '1', label: 'Bug' },
    { key: '2', label: '建议' },
    { key: '3', label: '其他' }
  ];

  useEffect(() => {
    // 读取草稿
    const draft = storage.get('draft');
    if (draft) {
      // 询问是否读取草稿antddesign
      Modal.confirm({
        title: '确认',
        content: '草稿未发布，是否读取？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          setTitle(draft.title);
          setContent(draft.content);
          setSelectedTab(draft.type);
          setImages(draft.images);
        },
        onCancel: async () => {
        },
      });

    }
  }, []);

   // 上传前校验
   const validateImageFile = (file: File) => {
    const accept = ['image/jpeg', 'image/png'];
    const limitSize = 500; // 500KB
    const isJpgOrPng = accept.includes(file.type);
    if (!isJpgOrPng) {
      message.error('不支持该文件格式，请重新选择');
      return false;
    }
    const isGt = file.size > limitSize * 1024;
    if (isGt) {
      message.error('图片超出最大限制');
      return false;
    }
    return true;
  };



  const handlePaste = (e: React.ClipboardEvent) => {

    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1 && images.length < 3) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file && validateImageFile(file)) {
            setUploadLoding(true);
            uploadImg({ file }).then((res) => {
              setUploadLoding(false);
              const { url = '' } = res;
              if (url) {
                setImages(prev => [...prev, url]);
              }

            }).catch(() => {
              setUploadLoding(false);
              message.error('图片上传失败');
            });
          }
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && images.length < 3) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && validateImageFile(file)) {
          setUploadLoding(true);
          uploadImg({ file }).then((res) => {
            setUploadLoding(false);
            const { url = '' } = res;
            if (url) {
              setImages(prev => [...prev, url]);
            }
          }).catch(() => {
            setUploadLoding(false);
            message.error('图片上传失败');
          });
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!title.trim()) {
      message.error('标题不能为空');
      return;
    }
    if(title.length > 30) {
      message.error('标题不能超过30个字');
      return;
    }
    if (!content.trim()) {
      message.error('内容不能为空');
      return;
    }
    const data = {
      title,
      content,
      type: Number(selectedTab),
      images: images.join(',')
    }
    createFeedback(data).then(() => {
      message.success('发布成功');
      storage.remove('draft');
      navigate('/feedback');
    }).catch(() => {
      message.error('发布失败');
    });
  };

  const handleSaveDraft = () => {
    storage.set('draft', { title, content, type: selectedTab, images });
    // 这里添加保存草稿逻辑
    message.info('草稿已保存');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>发布反馈</h1>

        <Alert
          message="注意："
          description={
            <ul className={styles.alertList}>
              <li>禁止发布违法、欺诈、诽谤、骚扰、色情或其他有害内容</li>
              <li>避免在内容中包含敏感信息，如个人身份信息、联系方式等</li>
              <li>避免使用模糊或含糊不清的描述，如"无法正常工作"或"出现错误"</li>
            </ul>
          }
          type="warning"
          showIcon
          icon={<InfoCircleOutlined />}
        />

        <div className={styles.content}>
          <Tabs activeKey={selectedTab} onChange={setSelectedTab}>
            {tabs.map(tab => (
              <TabPane tab={tab.label} key={tab.key} />
            ))}
          </Tabs>


          <Form>
          <Form.Item>
            <Input
              placeholder="填写标题，最多50个字"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              className={styles.titleInput}
            />
          </Form.Item>
          <Form.Item>
          <Input.TextArea
                ref={editorRef}
                placeholder="请输入反馈内容"
                value={content}
                onPaste={handlePaste}
                onDrop={handleDrop}
                autoSize={{ minRows: 6 }}
                onChange={(e) => setContent(e.target.value)}
                className={styles.editor}
              />
          </Form.Item>
        </Form>
           <div className={styles.imageTip}>
              <span>如需上传图像可在编辑区域粘贴or拖拽</span>
          </div>

          {/* <div
            ref={editorRef}
            contentEditable
            className={styles.editor}
            data-placeholder="请输入反馈内容"
            data-append-placeholder="如需上传图像可在编辑区域粘贴or拖拽"
            onPaste={handlePaste}
            onDrop={handleDrop}
            onInput={(e) => setContent(e.currentTarget.textContent || '')} */}
          {/* /> */}

          {images.length > 0 && (
            <div className={styles.imageGrid}>
              {images.map((image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className={styles.image}
                  />
                  <DeleteOutlined onClick={() => removeImage(index)} className={styles.removeButton} />
                </div>
              ))}
              {
                uploadLoding && (
                  <div className={styles.imageWrapper}>
                    <Spin />
                  </div>
                )
              }
            </div>
          )}

          {images.length < 3 ? (
            <div className={styles.imageUploadTip}>
              <PictureOutlined />
              <span>可以通过复制粘贴或拖拽来上传图片（最多3张）</span>
            </div>
          ) : (
            <div className={styles.imageUploadTip}>
              <PictureOutlined style={{color: '#a37163'}} />
              <span style={{color: '#a37163'}}>只允许最多上传3张图片</span>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <Button onClick={handleSaveDraft}>保存草稿</Button>
            <Button type="primary" onClick={handlePublish}>发布</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreation;

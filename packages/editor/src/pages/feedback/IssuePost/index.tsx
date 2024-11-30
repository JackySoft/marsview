import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Tabs, Card, Alert, Button, message, Image, Form, Spin, Flex } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { uploadImg } from '@/api';
import api from '@/api/feedback';
import storage from '@/utils/storage';
import { Modal } from '@/utils/AntdGlobal';
const { TabPane } = Tabs;
import styles from './index.module.less';

const PostCreation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('1');
  const [images, setImages] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [uploadLoding, setUploadLoding] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { key: '1', label: 'Bug' },
    { key: '2', label: '建议' },
    { key: '3', label: '其他' },
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
        onCancel: async () => {},
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
            uploadImg({ file })
              .then((res) => {
                setUploadLoding(false);
                const { url = '' } = res;
                if (url) {
                  setImages((prev) => [...prev, url]);
                }
              })
              .catch((error) => {
                message.error(error);
                setUploadLoding(false);
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
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/') && validateImageFile(file)) {
          setUploadLoding(true);
          uploadImg({ file })
            .then((res) => {
              setUploadLoding(false);
              const { url = '' } = res;
              if (url) {
                setImages((prev) => [...prev, url]);
              }
            })
            .catch((error) => {
              message.error(error);
              setUploadLoding(false);
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
    if (title.length > 30) {
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
      images: images.join(','),
    };
    api.createFeedback(data).then(() => {
      storage.remove('draft');
      navigate('/feedback');
    });
  };

  const handleSaveDraft = () => {
    storage.set('draft', { title, content, type: selectedTab, images });
    // 这里添加保存草稿逻辑
    message.info('草稿已保存');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>发布反馈</h1>

      <Alert
        message="注意："
        description={
          <div className={styles.alertList}>
            <p>禁止发布违法、欺诈、诽谤、骚扰、色情或其他有害内容</p>
            <p>避免在内容中包含敏感信息，如个人身份信息、联系方式等</p>
            <p>避免使用模糊或含糊不清的描述，如"无法正常工作"或"出现错误"</p>
          </div>
        }
        type="warning"
        showIcon
        icon={<InfoCircleOutlined />}
      />

      <div className={styles.content}>
        <Tabs activeKey={selectedTab} onChange={setSelectedTab}>
          {tabs.map((tab) => (
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
              showCount
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
              maxLength={200}
              showCount
              className={styles.editor}
            />
          </Form.Item>
        </Form>
        <div className={styles.imageTip}>
          <span>如需上传图像可在编辑区域粘贴或拖拽，最多支持3张</span>
        </div>
        {images.length > 0 && (
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <Image src={image} alt={`上传图片 ${index + 1}`} className={styles.image} />
                <DeleteOutlined onClick={() => removeImage(index)} className={styles.removeButton} />
              </div>
            ))}
            {uploadLoding && (
              <div className={styles.imageWrapper}>
                <Spin />
              </div>
            )}
          </div>
        )}

        <Flex justify="flex-end" gap={16}>
          <Button onClick={handleSaveDraft}>保存草稿</Button>
          <Button type="primary" danger onClick={handlePublish}>
            发布
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default PostCreation;

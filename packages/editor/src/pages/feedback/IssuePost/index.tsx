import React, { useState, useRef, useEffect } from 'react';
import { Input, Tabs, Card, Alert, Button, message, Image } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { TabPane } = Tabs;

const PostCreation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('2');
  const [images, setImages] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { key: '2', label: '建议' },
    { key: '3', label: 'Bug' },
    { key: '4', label: '前端' },
    { key: '5', label: '设计' },
    { key: '6', label: '其他' },
  ];

  useEffect(() => {
    setImages([
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ]);

  }, []);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1 && images.length < 3) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (typeof e.target?.result === 'string') {
                if (typeof e.target?.result === 'string') {
                  setImages(prev => [...prev, e.target?.result as string]);
                }
              }
            };
            reader.readAsDataURL(file);
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
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (typeof e.target?.result === 'string') {
              setImages(prev => [...prev, e.target?.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    // 这里添加发布逻辑
    message.success('帖子发布成功！');
  };

  const handleSaveDraft = () => {
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

          <Input
            placeholder="填写标题，最多50个字"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className={styles.titleInput}
          />

          <div
            ref={editorRef}
            contentEditable
            className={styles.editor}
            data-placeholder="请输入反馈内容"
            data-append-placeholder="如需上传图像可在编辑区域粘贴or拖拽"
            onPaste={handlePaste}
            onDrop={handleDrop}
            onInput={(e) => setContent(e.currentTarget.textContent || '')}
          />

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

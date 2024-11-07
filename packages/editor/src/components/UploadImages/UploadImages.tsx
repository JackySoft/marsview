import { useState, memo, useEffect } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import { uploadImg } from '@/api';
import styles from './index.module.less';

interface UploadImagesProps {
  onChange?: (value?: any) => void;
  value?: any;
  limitSize?: number;
  maxCount?: number;
  accept?: any;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  showUploadList?: boolean;
  multiple?: boolean;
  structure?: 'url' | 'file'; //返回结构
}

/**
 * 上传组件，使用方式：
 * 1. 使用默认值：<UploadImages />
 * 2. 大小限制(单位K)：<UploadImages limitSize={100} />
 * 3. 数量限制：<UploadImages maxCount={1} />
 * ... 其他方式参考上面类型定义
 */
const UploadImages: React.FC<UploadImagesProps> = memo(
  ({
    onChange = () => {},
    value,
    limitSize = 500,
    maxCount = 1,
    listType = 'picture-card',
    accept = ['image/jpeg', 'image/png'],
    showUploadList = true,
    multiple = false,
    structure = 'url',
  }) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    useEffect(() => {
      if (Array.isArray(value)) {
        setFileList(value);
      } else if (typeof value === 'string' || typeof value === 'object') {
        setFileList([{ uid: 1001, name: value.split('/').slice(-1)[0], url: value, status: 'done' }]);
      }
    }, []);
    // 上传前校验
    const beforeUpload = (file: FileType) => {
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

    // 文件删除
    const onRemove = (file: UploadFile) => {
      const files = (fileList || []).filter((v) => v.url !== file.url);
      setFileList(files);
      if (maxCount === 1) {
        onChange(null);
      } else {
        onChange(files);
      }
    };

    /**
     * 默认执行自定义上传
     */
    const uploadRequest = (options: any) => {
      setLoading(true);
      uploadImg({
        file: options.file as File, // File 对象
      })
        .then((res) => {
          const { name, url = '' } = res;
          setLoading(false);
          if (url) {
            const fileObj = { uid: options.file.uid, name, url, status: 'done' };
            const list = [...fileList, fileObj];
            // 如果是单文件上传，则直接返回url或者文件对象
            if (maxCount === 1) {
              // 如果是url结构，则直接返回url，否则返回文件对象
              if (structure === 'url') onChange(url);
              else onChange(fileObj);
            } else {
              if (structure === 'url') onChange(list.map((item) => item.url));
              else onChange(list);
            }
            setFileList(list);
          }
        })
        .catch(() => {
          setLoading(false);
          onChange(`${import.meta.env.VITE_CDN_URL}/mars-logo.png`);
          message.error('图片上传失败');
        });
    };
    // 上传按钮
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className={styles.uploadButton}>上传</div>
      </div>
    );

    return (
      <>
        <Upload
          listType={listType}
          onRemove={onRemove}
          beforeUpload={beforeUpload}
          accept={accept}
          maxCount={maxCount}
          fileList={fileList}
          showUploadList={showUploadList}
          multiple={multiple}
          customRequest={uploadRequest}
        >
          {fileList.length >= maxCount ? null : uploadButton}
        </Upload>
      </>
    );
  },
);
export default UploadImages;

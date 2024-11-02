import { ComponentType } from '@/packages/types';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Upload } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { uploadImg } from '@/api';
import { message } from '@/utils/AntdGlobal';

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MUpload = ({ id, type, config }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      enable() {
        setDisabled(false);
      },
      disable() {
        setDisabled(true);
      },
    };
  });
  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <UploadFC config={config} disabled={disabled} />
      </Form.Item>
    )
  );
};

/**
 * 独立封装上传组件
 * 需要区分listType（文件列表类型）、structure（文件结构）、maxCount（上传数量）等条件
 * listType：text（文本格式）、picture（图片列表）、picture-card（图片卡片）、picture-circle（图片圆圈）等显示类型
 * 文件结构：url（字符串）、file（文件对象）；有的时候，提交接口要求前端只提供url地址，有的时候，要求前端提供完整对象
 * maxCount：上传数量，默认1；如果为1，则上传完后，需要隐藏上传按钮
 * @returns
 */
const UploadFC = ({ config, value, disabled, onChange }: any, ref: any) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  useEffect(() => {
    if (typeof value === 'string') {
      setFileList([{ name: value.split('/').pop()?.split('.')?.[0], url: value, status: 'done' }]);
    } else if (Array.isArray(value)) {
      if (config.props.structure === 'url') {
        const list = value.map((item) => ({ name: item.split('/').pop().split('.')[0], url: item, status: 'done' }));
        setFileList(list);
      } else {
        setFileList(value);
      }
    } else {
      setFileList([]);
    }
  }, [value]);

  // 上传前校验
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = config.props.formWrap.accept.includes(file.type);
    if (!isJpgOrPng) {
      message.error('不支持该文件格式，请重新选择');
      return false;
    }
    const isGt = file.size > config.props.formWrap.limitSize * 1024;
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
    if (config.props.formWrap.maxCount === 1) {
      onChange(null);
    } else {
      if (config.props.structure === 'url') {
        onChange(files.map((item) => item.url));
      } else {
        onChange(files);
      }
    }
  };

  /**
   * 自定义上传
   * 默认特殊上传定制要求customRequestType且请求接口为COMMON
   * 如无特殊要求，传action={api}接口即可
   * @param options
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
          if (config.props.formWrap.maxCount === 1) {
            // 如果是url结构，则直接返回url，否则返回文件对象
            if (config.props.structure === 'url') onChange(url);
            else onChange(fileObj);
          } else {
            if (config.props.structure === 'url') onChange(list.map((item) => item.url));
            else onChange(list);
          }
          setFileList(list);
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('图片上传失败');
      });
  };

  // 根据listType和上传数量，动态处理上传按钮
  const formatUploadButton = () => {
    const { listType, maxCount } = config.props.formWrap;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{config.props.text}</div>
      </div>
    );
    {
      /* 文本和图片类型展示上传按钮 */
    }
    if (['text', 'picture'].includes(listType)) {
      if (fileList.length >= maxCount) {
        // 超出最大文件数量后，隐藏上传按钮
        return null;
      } else {
        // 上传多个文件，需要显示上传按钮
        return <Button icon={<UploadOutlined />}>{config.props.text}</Button>;
      }
    } else {
      // 图片卡片类型展示正方形上传
      if (fileList.length >= maxCount) {
        // 超出最大文件数量后，隐藏上传按钮
        return null;
      } else {
        // 上传多个图片，需要显示上传按钮
        return uploadButton;
      }
    }
  };

  return (
    <Upload
      {...config.props.formWrap}
      disabled={disabled}
      fileList={fileList}
      style={config.style}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      customRequest={uploadRequest}
    >
      {formatUploadButton()}
    </Upload>
  );
};
export default forwardRef(MUpload);

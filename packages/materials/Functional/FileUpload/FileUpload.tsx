import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '@materials/types';
import { message } from '@materials/utils/AntdGlobal';
import request from '@materials/utils/request';
import { usePageStore } from '@materials/stores/pageStore';
import { mergeParams } from '@materials/utils/handleApi';

/**
 * 独立封装上传组件
 * 需要区分listType（文件列表类型）、structure（文件结构）、maxCount（上传数量）等条件
 * listType：text（文本格式）、picture（图片列表）、picture-card（图片卡片）、picture-circle（图片圆圈）等显示类型
 * 文件结构：url（字符串）、file（文件对象）；有的时候，提交接口要求前端只提供url地址，有的时候，要求前端提供完整对象
 * maxCount：上传数量，默认1；如果为1，则上传完后，需要隐藏上传按钮
 * @returns
 */
const UploadButton = ({ id, type, config, onSuccess, onFail }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);

  const apis = usePageStore((state) => state.page.pageData.apis);

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

  // 上传前校验
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = config.props.upload.accept?.includes(file.type);
    if (!isJpgOrPng) {
      message.error('不支持该文件格式，请重新选择');
      return false;
    }
    const isGt = file.size > config.props.upload.limitSize * 1024 * 1024;
    if (isGt) {
      message.error('图片超出最大限制');
      return false;
    }
    return true;
  };

  // 自定义上传
  const uploadRequest = (options: any) => {
    setLoading(true);
    const { stgApi, method, replaceData, params } = apis[config.api.id];
    const { data }: any = mergeParams(method, replaceData, params, {});
    request
      .post(
        stgApi,
        {
          [config.props.upload.name || 'file']: options.file,
          ...data,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setLoading(false);
        onSuccess?.(res.data);
      })
      .catch(() => {
        onFail?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const iconsList: { [key: string]: any } = icons;
  const { button, upload } = config.props;
  return (
    visible && (
      <Upload
        {...upload}
        withCredentials={true}
        showUploadList={false}
        style={config.style}
        beforeUpload={beforeUpload}
        customRequest={uploadRequest}
      >
        <Button {...button} icon={button.icon ? React.createElement(iconsList[button.icon]) : null} loading={loading} disabled={disabled}>
          {button.text}
        </Button>
      </Upload>
    )
  );
};
export default forwardRef(UploadButton);

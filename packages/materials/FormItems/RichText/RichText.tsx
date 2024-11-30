import { Form, FormItemProps } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactQuill, { Range, UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ComponentType } from '@materials/types';
import { useFormContext } from '@materials/utils/context';
import styles from './index.module.less';
/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: {
    readOnly: boolean;
    placeholder: string;
  };
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MInput = ({ type, config, onChange, onBlur }: ComponentType<IConfig>, ref: any) => {
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, []);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.readOnly || false);
  }, [config.props.formWrap.readOnly]);

  const handleChange = (val: string) => {
    onChange?.({
      [config.props.formItem.name]: val,
    });
  };
  const handleBlur = (range: Range, val: string, editor: UnprivilegedEditor) => {
    onBlur?.({
      [config.props.formItem.name]: editor.getHTML(),
    });
  };
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
      <Form.Item {...config.props.formItem}>
        <ReactQuill
          theme="snow"
          className={styles.richTextQuill}
          {...config.props.formWrap}
          readOnly={disabled}
          style={config.style}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
    )
  );
};

export default forwardRef(MInput);

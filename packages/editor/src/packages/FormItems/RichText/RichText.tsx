import { Form, FormItemProps } from 'antd';
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import ReactQuill, { Range, UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ComponentType } from '@/packages/types';
import { isNull } from '@/packages/utils/util';
import { FormContext } from '@/packages/utils/context';
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
const MInput = ({ id, type, config, onChange, onBlur }: ComponentType<IConfig>, ref: any) => {
  const form = useContext(FormContext);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      form?.setFieldValue(name, value);
    }
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.readOnly || false);
  }, [config.props.formWrap.readOnly]);

  const handleChange = (val: string) => {
    let value = val;
    // 处理空值
    if (val === '<p><br></p>') {
      form?.setFieldValue(config.props.formItem?.name, '');
      value = '';
    }
    onChange?.({
      [config.props.formItem.name]: value,
    });
  };
  const handleBlur = (range: Range, val: string, editor: UnprivilegedEditor) => {
    let value = editor.getHTML();
    // 处理空值
    if (val === '<p><br></p>') {
      form?.setFieldValue(config.props.formItem?.name, '');
      value = '';
    }
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
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
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

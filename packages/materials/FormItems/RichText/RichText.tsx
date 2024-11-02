import { Form, FormItemProps } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactQuill, { Range, UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ComponentType } from '../../types';
import { isNull } from '../../utils/util';
import { useFormContext } from '../../utils/context';
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
  const { form, formId, setFormData } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      form?.setFieldValue(name, value);
      setFormData({ name: formId, value: { [name]: value } });
    }
  }, []);

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
      [config.props.formItem.name]: val,
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
      [config.props.formItem.name]: value,
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

import { ComponentType } from '@materials/types';
import { Form, FormItemProps } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactJsonView, { ReactJsonViewProps, InteractionProps } from 'react-json-view';
import { useFormContext } from '@materials/utils/context';
import { isNotEmpty } from '@materials/utils/util';

export interface JsonProps extends ReactJsonViewProps {
  placeholder?: string; // 占位符
  disabled?: boolean; // 是否可编辑
}

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: JsonProps;
  source: Array<{ label: string; value: any }>;
}

/**
 * ReactJsonView并没有onChange事件，所以需要自己实现表单组件的onChange
 * @returns 返回组件
 */
const JsonView = (props: JsonProps & { onChange: (v: object) => void }) => {
  const onEdit = (e: InteractionProps) => {
    props.onChange(e.updated_src);
    props.onEdit && props.onEdit(e);
  };
  const onDelete = (e: InteractionProps) => {
    props.onChange(e.updated_src);
    props.onDelete && props.onDelete(e);
  };
  const onAdd = (e: InteractionProps) => {
    props.onChange(e.updated_src);
    props.onAdd && props.onAdd(e);
  };

  return (
    <ReactJsonView
      {...props}
      onEdit={props.onEdit ? onEdit : false}
      onDelete={props.onDelete ? onDelete : false}
      onAdd={props.onAdd ? onAdd : false}
    />
  );
};

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MJson = ({ id, type, config, onAdd, onEdit, onDelete }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const { initValues } = useFormContext();

  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // JsonView 只支持对象，所以不是对象格式需要转成对象格式。
    const jsonValue = ['string', 'number', 'boolean'].includes(typeof value) ? { value } : value;
    initValues(type, name, jsonValue);
  }, [config.props.defaultValue]);

  // 启用和禁用(是否可编辑)
  useEffect(() => {
    if (typeof config.props.formWrap.disabled === 'boolean') setDisabled(config.props.formWrap.disabled);
  }, [config.props.formWrap.disabled]);

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

  const handleEdit = (e: InteractionProps) => {
    onEdit?.({
      [config.props.formItem.name]: e.updated_src,
    });
  };
  const handleDelete = (e: InteractionProps) => {
    onDelete?.({
      [config.props.formItem.name]: e.updated_src,
    });
  };
  const handleAdd = (e: InteractionProps) => {
    onAdd?.({
      [config.props.formItem.name]: e.updated_src,
    });
  };

  const { placeholder } = config.props.formWrap || {};

  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type} valuePropName="src">
        {!isNotEmpty(config.props.defaultValue) && disabled ? (
          placeholder
        ) : (
          <JsonView
            {...config.props.formWrap}
            name={false}
            style={{
              zIndex: 9, // 避免默认添加属性时被其他组件遮挡
              ...config.style,
            }}
            onEdit={!disabled ? handleEdit : false}
            onDelete={!disabled ? handleDelete : false}
            onAdd={!disabled ? handleAdd : false}
            onChange={() => {}}
          />
        )}
      </Form.Item>
    )
  );
};
export default forwardRef(MJson);

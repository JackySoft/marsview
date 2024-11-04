import { forwardRef, useEffect, useImperativeHandle, useState, useContext } from 'react';
import { Form, InputProps, Space, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Material } from '@materials/MarsRender/MarsRender';
import { useFormContext } from '@materials/utils/context';
import { ComponentType } from '@materials/types';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: {
    name: string;
    direction: 'horizontal' | 'vertical';
  };
  formWrap: InputProps;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MFormList = ({ type, config, elements }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const { initValues } = useFormContext();
  // 初始化默认值
  useEffect(() => {
    initValues(type, config.props.formItem.name, [{}]);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  });
  return (
    visible && (
      <div style={config.style}>
        <Form.List {...config.props.formItem}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8, padding: '0 10px' }} align="baseline">
                  <Space key={key} align="baseline" direction={config.props.formItem.direction}>
                    {elements?.length ? elements?.map((child) => <Material key={child.id} item={{ ...child, name }} />) : null}
                  </Space>
                  <PlusOutlined onClick={() => add({ title: '-', dataIndex: name + 1 }, name + 1)} />
                  <MinusOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  新增一条
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    )
  );
};

export default forwardRef(MFormList);

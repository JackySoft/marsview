import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, InputProps, Space, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Material } from '@/packages/MarsRender/MarsRender';
import { useFormContext } from '@/packages/utils/context';
import { ComponentType } from '@/packages/types';

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
const MFormList = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
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
      <div data-id={id} data-type={type} style={config.style}>
        <Form.List {...config.props.formItem}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8, padding: '0 10px' }} align="baseline">
                  <Space key={key} align="baseline" direction={config.props.formItem.direction}>
                    {elements?.length ? (
                      elements?.map((child) => <Material key={child.id} item={{ ...child, name }} />)
                    ) : (
                      <div className="slots" style={{ width: 300, height: 100, lineHeight: '100px' }}>
                        拖拽组件到这里
                      </div>
                    )}
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

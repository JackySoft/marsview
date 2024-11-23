import { ComponentType } from '@/packages/types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, FormItemProps, Rate, RateProps } from 'antd';
import { useFormContext } from '@/packages/utils/context';
import { iconsList } from '@/packages/components/IConSetting';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: RateProps;
}

type MRateRef = {
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
};

const MRate = forwardRef<MRateRef, ComponentType<IConfig>>(({ id, type, config, onChange, onHoverChange }, ref) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [character, setCharacter] = useState();
  const { initValues } = useFormContext();
  useImperativeHandle(ref, () => ({
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
  }));

  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.disabled || false);
  }, [config.props.formWrap.disabled]);

  // 获取对应的组件实例
  useEffect(() => {
    setCharacter(iconsList[config.props.formWrap.character as string]?.render());
  }, [config.props.formWrap.character]);

  // 输入事件
  const handleChange = (val: number) => {
    onChange?.({
      [config.props.formItem.name]: val,
    });
  };

  // 鼠标经过时数值变化的回调
  const handleHoverChange = (val: number) =>
    onHoverChange?.({
      [config.props.formItem.name]: val,
    });

  if (!visible) {
    return null;
  }

  return (
    <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
      <Rate
        {...config.props.formWrap}
        disabled={disabled}
        character={character}
        style={config.style}
        onChange={handleChange}
        onHoverChange={handleHoverChange}
      />
    </Form.Item>
  );
});

export default MRate;

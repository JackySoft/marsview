import { ComponentType } from '@materials/types';
import { forwardRef, useImperativeHandle, useState, useMemo, memo } from 'react';
import { Dropdown, MenuProps } from 'antd';
import * as icons from '@ant-design/icons';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  text: string;
  type: 'primary' | 'dashed' | 'link' | 'text' | 'default' | undefined;
  placement: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight' | undefined;
  itemConfig: any[];
}

type MDropdownRef = {
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
};

const MDropdown = forwardRef<MDropdownRef, ComponentType<IConfig>>(({ config, onMenuClick }, ref) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);

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

  const items = useMemo(() => {
    const iconsList: { [key: string]: any } = icons;
    return config.props.itemConfig.map((item: any) => ({ ...item, icon: item.icon && iconsList[item.icon].render() }));
  }, [config.props.itemConfig]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) =>
    onMenuClick?.({
      ['key']: key,
    });

  if (!visible) {
    return null;
  }

  const { itemConfig, ...rest } = config.props;

  return (
    <Dropdown.Button
      style={config.style}
      disabled={disabled}
      {...rest}
      menu={{
        items,
        onClick: handleMenuClick,
      }}
    >
      {config.props.text || ''}
    </Dropdown.Button>
  );
});
export default memo(MDropdown);

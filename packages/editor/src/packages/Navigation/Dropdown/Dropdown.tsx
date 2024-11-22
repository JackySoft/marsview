import { ComponentType, IDragTargetItem } from '@/packages/types';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import { forwardRef, useImperativeHandle, useState, memo } from 'react';
import { Dropdown, MenuProps, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  text: string;
}

type MDropdownRef = {
  show: () => void,
  hide: () => void,
  // enable: () => void,
  // disable: () => void,
}

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

const MDropdown = forwardRef<MDropdownRef, ComponentType<IConfig>>(({
  id,
  type,
  config,
  onChange,
  onHoverChange,
}, ref) => {

  const [visible, setVisible] = useState(true)

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
    // enable() {
    //     setDisabled(false);
    // },
    // disable() {
    //     setDisabled(true);
    // },
  }))

  // const renderChildren = () => {
  //   return (
  //     <a onClick={(e) => e.preventDefault()}>
  //       <Space>
  //         Hover me
  //         {/* <DownOutlined /> */}
  //       </Space>
  //     </a>
  //   )
  // }

  if (!visible) {
    return null
  }

  console.log(config.props)
  return (
    <Dropdown
      {...config.props}
      menu={{ items }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          {/* <DownOutlined /> */}
        </Space>
      </a>
    </Dropdown>
  );
});
export default MDropdown;

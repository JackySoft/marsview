import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Avatar, Button, ButtonProps, List, Tag } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '@/packages/types';
import { formatNumber, formatDate } from '@/packages/utils/util';
import { handleApi } from '@/packages/utils/handleApi';
import { handleActionFlow } from '@/packages/utils/action';
import { usePageStore } from '@/stores/pageStore';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  bordered: boolean;
  itemLayout: 'horizontal' | 'vertical';
  size: 'small' | 'default' | 'large';
  split: boolean;
  header: string;
  footer: string;
  avatar: string;
  title: {
    name: string;
    color: string;
  };
  desc: {
    name: string;
    color: string;
  };
  content: {
    name: string;
    color: string;
    type: string;
  };
  bulkActionList: Array<ButtonProps & { eventName: string; icon: string; text: string }>;
}

/**
 * 列表组件
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MList = ({ id, type, config }: ComponentType<IConfig>, ref: any) => {
  const [data, setData] = useState<Array<any>>([]);
  const [visible, setVisible] = useState(true);
  const variableData = usePageStore((state) => state.page.pageData.variableData);
  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[List]', 'data数据格式错误，请检查');
          setData([]);
        } else {
          setData(res.data);
        }
      }
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
      update: (data: any) => {
        // 重新加载表格数据
        getDataList(data);
      },
    };
  });

  // 处理内容渲染
  const handleContent = (item: any) => {
    const content = item[config.props.content?.name];
    const type = config.props.content.type;
    if (!content || !type || type === 'text') {
      return content;
    }
    if (type === 'money') return formatNumber(content, 'currency');
    if (type === 'number') return formatNumber(content);
    if (type === 'date1') return formatDate(content, 'YYYY-MM-DD');
    if (type === 'date2') return formatDate(content);
    if (type === 'tag') {
      if (Array.isArray(content)) {
        return content.map((tag, index) => <Tag key={index}>{tag}</Tag>);
      } else if (typeof content === 'string' || typeof content === 'number') {
        return <Tag>{content}</Tag>;
      }
      return content?.toString();
    }
  };

  /**
   * 操作按钮点击
   */
  const handleOperate = (eventName: string, record: any = {}) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, record);
  };
  const iconsList: { [key: string]: any } = icons;

  // 渲染头像或图标
  const renderAvatarOrIcon = (item: any, config: any) => {
    // 如果存在avatar，优先显示avatar
    if (config.props.avatar && item[config.props.avatar]) {
      return <Avatar src={item[config.props.avatar]} />;
    }

    // 如果没有avatar，显示图标
    if (config.props.useIcon && config.props.icon && iconsList[item[config.props.icon]]) {
      return React.createElement(iconsList[item[config.props.icon]]);
    }

    // 如果都没有，返回null
    return null;
  };

  return (
    visible && (
      <List
        data-id={id}
        data-type={type}
        itemLayout={config.props.itemLayout}
        style={config.style}
        bordered={config.props.bordered}
        size={config.props.size}
        split={config.props.split}
        header={config.props.header ? <div>{config.props.header}</div> : null}
        footer={config.props.footer ? <div>{config.props.footer}</div> : null}
        dataSource={data}
        renderItem={(item: any) => {
          return (
            <List.Item
              actions={
                config.props.bulkActionList?.map((btn, index) => {
                  return (
                    <Button
                      type={btn.type}
                      danger={btn.danger}
                      icon={btn.icon ? React.createElement(iconsList[btn.icon]) : null}
                      onClick={() => handleOperate(btn.eventName, item)}
                      key={btn.eventName}
                    >
                      {btn.text}
                    </Button>
                  );
                }) || []
              }
            >
              <List.Item.Meta
                avatar={renderAvatarOrIcon(item, config)}
                title={config.props.title?.name ? <span style={{ color: config.props.title.color }}>{item[config.props.title.name]}</span> : null}
                description={config.props.desc.name ? <span style={{ color: config.props.desc.color }}>{item[config.props.desc.name]}</span> : null}
              />
              {config.props.content?.name ? <div style={{ color: config.props.content.color }}>{handleContent(item)}</div> : null}
            </List.Item>
          );
        }}
      />
    )
  );
};
export default forwardRef(MList);

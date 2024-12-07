import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Avatar, Button, List, Tag, ButtonProps } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '@materials/types';
import { formatNumber, formatDate } from '@materials/utils/util';
import { handleApi } from '@materials/utils/handleApi';
import { handleActionFlow } from '@materials/utils/action';
import { usePageStore } from '@materials/stores/pageStore';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  bordered: boolean;
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
const MList = ({ config }: ComponentType<IConfig>, ref: any) => {
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
  return (
    visible && (
      <List
        style={config.style}
        bordered={config.props.bordered}
        size={config.props.size}
        split={config.props.split}
        header={<div>{config.props.header}</div>}
        footer={<div>{config.props.footer}</div>}
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
                avatar={config.props.avatar ? <Avatar src={item[config.props.avatar]} /> : null}
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

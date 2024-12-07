import { ComponentType } from '@materials/types';
import { Button, Descriptions, Image, Tag, Tooltip, Typography } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { handleApi } from '@materials/utils/handleApi';
import * as util from '@materials/utils/util';
import { handleActionFlow } from '@materials/utils/action';
import { usePageStore } from '@materials/stores/pageStore';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  items: Array<{
    key: string;
    label: string;
    name: string;
    type: string;
    ellipsis: boolean;
    copyable: boolean;
    clickable: boolean;
    eventName: string;
    render: string;
    span?: number | object;
  }>;
  empty: string;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MButton = ({ id, type, config }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const variableData = usePageStore((state) => state.page.pageData.variableData);

  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = (params: any) => {
    handleApi(config.api, params).then((res) => {
      if (res?.code === 0) {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([res.data]);
        }
      }
    });
  };

  // 对外暴露方法
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

  // 表格行中的操作按钮点击
  const handleActionClick = (eventName: string, record: any) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, record);
  };

  // 渲染内容
  const renderChildren = (txt: any, item: any, record: any) => {
    if (!util.isNotEmpty(txt)) {
      if (typeof config.props.empty === 'undefined') {
        txt = '-';
      } else if (config.props.empty) {
        txt = config.props.empty;
      }
    } else if (item.type === 'money') txt = util.formatNumber(txt, 'currency');
    else if (item.type === 'number') txt = util.formatNumber(txt);
    else if (item.type === 'date1') txt = util.formatDate(txt, 'YYYY-MM-DD');
    else if (item.type === 'date2') txt = util.formatDate(txt);

    // 文本处理完后，如果存在render，则执行render
    if (item.render) {
      try {
        const renderFn = new Function('text', 'record', `return (${item.render})(text,record);`);
        txt = renderFn(txt, record);
      } catch (error) {
        console.error(`列[${item.title}]渲染失败`, error);
        txt = '解析异常';
      }
    }
    if (item.type === 'text') {
      // 提取公共组件
      const ButtonComp = (
        <Button type="link" onClick={() => handleActionClick(item.eventName, record)}>
          {txt.toString()}
        </Button>
      );
      // 超出省略、可复制、可点击
      if (item.ellipsis && item.copyable) {
        return (
          <Tooltip title={txt}>
            <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
              {item.clickable ? ButtonComp : txt.toString()}
            </Typography.Paragraph>
          </Tooltip>
        );
      }
      // 超出省略
      if (item.ellipsis) return <Tooltip title={txt}>{item.clickable ? ButtonComp : txt.toString()}</Tooltip>;
      // 可复制
      if (item.copyable) {
        return <Typography.Paragraph copyable>{item.clickable ? ButtonComp : txt.toString()}</Typography.Paragraph>;
      }
      return item.clickable ? (
        <Button type="link" onClick={() => handleActionClick(item.eventName, record)}>
          {txt.toString()}
        </Button>
      ) : (
        txt.toString()
      );
    }
    if (item.type === 'image') return <Image src={txt} width={30} />;
    if (item.type === 'tag') {
      if (Array.isArray(txt)) {
        return txt.map((tag) => <Tag key={tag}>{tag}</Tag>);
      } else if (typeof txt === 'string' || typeof txt === 'number') {
        return <Tag>{txt}</Tag>;
      }
      return txt?.toString();
    }
    return txt;
  };

  const items = useMemo(() => {
    return config.props.items.map((item) => {
      const txt = data[0]?.[item.name] || '';
      const children = renderChildren(txt, item, data[0] || {});
      return {
        key: item.key,
        label: item.label,
        children,
        span: item.span,
      };
    });
  }, [config.props.items, data]);

  return visible && <Descriptions {...config.props} items={items} data-id={id} data-type={type} style={config.style}></Descriptions>;
};
export default forwardRef(MButton);

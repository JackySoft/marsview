import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Button, Table, Image, Tag, TablePaginationConfig, Tooltip, Typography, Badge } from 'antd';
import { useDrop } from 'react-dnd';
import { pickBy } from 'lodash-es';
import * as icons from '@ant-design/icons';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { handleApi } from '@/packages/utils/handleApi';
import { handleActionFlow } from '@/packages/utils/action';
import * as util from '@/packages/utils/util';
import { usePageStore } from '@/stores/pageStore';
import { ComponentType, IDragTargetItem } from '@/packages/types';
import { get } from 'lodash-es';
import styles from './index.module.less';

export interface IConfig {
  bordered: boolean;
  size: 'small' | 'middle' | 'large';
  rowKey: string;
  selectionType: 'checkbox' | 'radio';
  leftTitle: string;
  empty: string;
  bulkActionList: any[];
  columns: any[];
  hidePager: boolean;
  pagination: TablePaginationConfig;
  field: {
    pageNum: string;
    pageSize: string;
    total: string;
  };
  scroll?: {
    x: number;
    y: number;
  };
  sourceField: string;
  source: any;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MarsTable = ({ id, type, config, elements, onCheckedChange }: ComponentType<IConfig>, ref: any) => {
  const [searchParams, setSearchParams] = useState<{
    [key: string]: any;
  }>({});
  const [pageParams, setPageParams] = useState({
    [config.props.field.pageNum]: 1,
    [config.props.field.pageSize]: config.props.pagination.pageSize,
  });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  const { mode, addChildElements, variableData, updateToolbar } = usePageStore((state) => ({
    mode: state.mode,
    addChildElements: state.addChildElements,
    variableData: state.page.variableData,
    updateToolbar: state.updateToolbar,
  }));

  useEffect(() => {
    const params = {
      [config.props.field.pageNum]: 1,
      [config.props.field.pageSize]: config.props.pagination.pageSize,
    };
    setPageParams(params);
    getDataList(config.props.hidePager ? {} : params);
  }, [config.api, config.props.pagination.pageSize, JSON.stringify(config.props.field), config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = useCallback(
    (params: any) => {
      setLoading(true);
      handleApi(config.api, params)
        .then((res) => {
          setLoading(false);
          updateToolbar();
          if (res?.code === 0) {
            if (Array.isArray(res.data)) {
              setData(res.data);
            }
            // 解析总条数
            if (config.props.field.total) {
              setTotal(get(res.originData, config.props.field.total) || 0);
            }
          }
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [config.api],
  );

  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};
      addChildElements({
        type: item.type,
        name: item.name,
        parentId: id,
        id: item.id,
        config,
        events,
        methods,
      });
    },
    // TODO: 拖拽组件时，容器呈现背景色（后期需要判断组件是否可以拖入）
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useImperativeHandle(ref, () => {
    return {
      startLoading: () => {
        setLoading(true);
      },
      stopLoading: () => {
        setLoading(false);
      },
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      search: (params: any) => {
        // 过滤空值
        const filterParams = pickBy(params, (value: any) => util.isNotEmpty(value));

        // 搜索时，页码重置
        setPageParams({
          ...pageParams,
          [config.props.field.pageNum]: 1,
        });

        setSearchParams(filterParams);
        // 重新加载表格数据
        getDataList({ ...pageParams, [config.props.field.pageNum]: 1, ...filterParams });
      },
      reload: () => {
        // 重新加载表格数据
        getDataList({ ...pageParams, ...searchParams });
      },
      clearData: () => {
        // 清空数据
        setData([]);
      },
      // 判断当前是否选中
      checkSelectedRow: () => {
        if (selectedRowKeys.length === 0) {
          return false;
        } else {
          return true;
        }
      },
      // 设置当前默认选中的数据
      setSelectedRowKeys: (keys: React.Key[]) => {
        setSelectedRowKeys(keys);
      },
      // 获取选中的key值
      getSelectedRowKeys: () => {
        return selectedRowKeys || [];
      },
      // 获取选中的数据
      getSelectedRow: () => {
        return selectedRows;
      },
    };
  });

  // 单选或者多选事件绑定
  let rowSelection: any = null;
  if (config.props.selectionType) {
    rowSelection = {
      type: config.props.selectionType,
      selectedRowKeys,
      onChange(selectedRowKeys: React.Key[], selectedRows: any[]) {
        onCheckedChange?.(selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
      },
      // getCheckboxProps(record: any) {
      //   return {
      //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //     name: record.name,
      //   };
      // },
    };
  }

  // 表格配置
  const tableProps = useMemo(() => {
    return {
      rowSelection,
      rowKey: config.props.rowKey || 'id',
      bordered: config.props.bordered,
      size: config.props.size,
      columns: config.props.columns.map((item, index) => {
        return {
          ...item,
          key: item.dataIndex || index,
          onCell(record: any, index: number) {
            // onCell处理，用于跨行跨列展示
            if (item.onCell) {
              try {
                const renderFn = new Function('record', 'index', `return (${item.onCell})(record,index);`);
                return renderFn(record, index);
              } catch (error) {
                console.error(`列[${item.title}]渲染失败`, error);
              }
            }
            return {};
          },
          render(text: any, record: any, index: number) {
            let txt = text;
            if (!util.isNotEmpty(txt)) {
              if (typeof config.props.empty === 'undefined') {
                txt = '-';
              } else if (config.props.empty) {
                txt = config.props.empty;
              }
            } else if (item.type === 'money') txt = util.formatNumber(text, 'currency');
            else if (item.type === 'number') txt = util.formatNumber(text);
            else if (item.type === 'date1') txt = util.formatDate(text, 'YYYY-MM-DD');
            else if (item.type === 'date2') txt = util.formatDate(text);

            // 文本处理完后，如果存在render，则执行render
            if (item.render) {
              try {
                const renderFn = new Function('text', 'record', 'index', `return (${item.render})(text,record,index);`);
                txt = renderFn(txt, record, index);
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
            if (item.type === 'multiline') {
              if (Array.isArray(txt)) {
                return txt.map((item, index) => {
                  return (
                    <div key={index}>
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  );
                });
              }
              return txt.toString();
            }
            if (item.type === 'status') {
              if (Array.isArray(txt)) {
                return txt.map((item, index) => {
                  return <Badge key={index} status={item.status} text={item.text} />;
                });
              }
              if (typeof txt === 'object') {
                return <Badge status={txt.status} text={txt.text} />;
              }
              return <Badge status="success" text={txt.toString()} />;
            }
            if (item.type === 'image') {
              if (Array.isArray(txt)) {
                return (
                  <Image.PreviewGroup items={txt}>
                    <Image width={30} src={txt[0]} />
                  </Image.PreviewGroup>
                );
              }
              return (txt?.startsWith('http') && <Image src={txt} width={30} />) || txt;
            }
            if (item.type === 'tag') {
              if (Array.isArray(txt)) {
                return txt.map((tag, index) => {
                  if (typeof tag === 'object') {
                    return (
                      <Tag key={index} color={tag.color}>
                        {tag.label}
                      </Tag>
                    );
                  }
                  return (
                    <Tag key={tag} color="green">
                      {tag}
                    </Tag>
                  );
                });
              } else if (typeof txt === 'string' || typeof txt === 'number') {
                return <Tag color="green">{txt}</Tag>;
              }
              return txt?.toString();
            }
            if (item.type === 'action')
              return (
                <div className={styles.action}>
                  {item.list?.map((btn: any) => {
                    let btnTxt = '';
                    if (typeof btn.text === 'string') {
                      btnTxt = btn.text;
                    } else if (btn.text?.type === 'static') {
                      btnTxt = btn.text.value;
                    } else {
                      try {
                        const renderFn = new Function('text', 'record', 'index', `return (${btn.text.value})(text,record,index);`);
                        btnTxt = renderFn('', record, index);
                      } catch (error) {
                        console.error(`列[${btn.title}]渲染失败`, error);
                        btnTxt = '解析异常';
                      }
                    }
                    if (btnTxt === '') return;
                    return (
                      <Button
                        key={btn.eventName}
                        type="link"
                        size="small"
                        danger={btn.danger}
                        onClick={() => handleActionClick(btn.eventName, record)}
                      >
                        {btnTxt}
                      </Button>
                    );
                  })}
                </div>
              );
            return txt;
          },
        };
      }),
      dataSource: data,
      loading,
    };
  }, [config.props, data, loading]);

  // 分页配置
  const pagination: TablePaginationConfig = useMemo(() => {
    const { pageNum = 'pageNum', pageSize = 'pageSize' } = config.props.field || {};
    const { showSizeChanger, showQuickJumper, showTotal, pageSize: page_size, position } = config.props.pagination || {};
    const pageSizeOptions = page_size ? [page_size, page_size * 2, page_size * 3, page_size * 4] : [10, 20, 30, 40];
    return {
      total,
      current: pageParams[pageNum] || 1,
      pageSize: pageParams[pageSize] || 10,
      pageSizeOptions,
      showSizeChanger: showSizeChanger,
      showQuickJumper: showQuickJumper,
      showTotal: showTotal ? (total: number) => `共 ${total} 条数据` : undefined,
      position: position,
      onChange: (num: number, size: number) => {
        setPageParams({
          [pageNum]: num,
          [pageSize]: size,
        });
        getDataList({
          [pageNum]: num,
          [pageSize]: size,
          ...searchParams,
        });
      },
    };
  }, [total, config.props.field, pageParams, config.props.pagination]);

  /**
   * 操作按钮点击
   */
  const handleOperate = (eventName: string) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, searchParams);
  };

  /**
   * 表格行中的操作按钮点击
   */
  const handleActionClick = (eventName: string, record: any) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, record);
  };

  const title = config.props.leftTitle;
  const bulkActionList = config.props.bulkActionList || [];
  const iconsList: { [key: string]: any } = icons;
  return (
    visible && (
      <div data-id={id} data-type={type} style={config.style}>
        {title || elements?.length || bulkActionList.length ? (
          <div className={styles.toolbar}>
            {config.props.leftTitle && <div className={styles.title}>{config.props.leftTitle}</div>}
            <div className={styles.action} ref={drop}>
              {elements?.length ? (
                <MarsRender elements={elements} />
              ) : mode === 'edit' ? (
                <div className="slots">拖拽子元素到这里，可以考虑嵌套一个搜索表单</div>
              ) : null}
              {bulkActionList?.map((item) => {
                return (
                  <Button
                    key={item.eventName}
                    type={item.type}
                    danger={item.danger}
                    icon={item.icon ? React.createElement(iconsList[item.icon]) : null}
                    onClick={() => handleOperate(item.eventName)}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : null}

        <Table
          {...tableProps}
          scroll={{ x: config.props.scroll?.x, y: config.props.scroll?.y }}
          pagination={config.props.hidePager ? false : pagination}
        ></Table>
      </div>
    )
  );
};
export default memo(forwardRef(MarsTable));

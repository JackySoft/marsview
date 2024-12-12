import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { Button, Flex, Statistic, Tag } from 'antd';
import { ComponentType } from '@/packages/types';
import * as icons from '@ant-design/icons';
import { handleApi } from '@/packages/utils/handleApi';
import { usePageStore } from '@/stores/pageStore';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */

export interface IConfig {
  tagGap: number;
  tagSize: 'small' | 'middle' | 'large';
  useCollapse: boolean;
  useIcon: boolean;
  source: Array<{ label: string; value: any; id: any; icon: string }>;
}

const TagGroup = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const [data, setData] = useState<Array<any>>([]);
  const [selectedTags, setSelectedTags] = useState<Array<any>>([]);
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(true);
  const variableData = usePageStore((state) => state.page.pageData.variableData);

  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[TagsGroup]', 'data数据格式错误，请检查');
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

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    onChange?.(nextSelectedTags);
  };

  // 根据 tag 的 size 动态计算高度
  const getTagHeight = (size: 'small' | 'middle' | 'large') => {
    switch (size) {
      case 'small':
        return '24px'; // small 标签的高度
      case 'middle':
        return '26px'; // middle 标签的高度
      case 'large':
        return '26px'; // large 标签的高度
      default:
        return '26px'; // 默认高度
    }
  };

  const getTagSizePx = (size: 'small' | 'middle' | 'large') => {
    switch (size) {
      case 'small':
        return '12px'; // small 标签的字体大小
      case 'middle':
        return '14px'; // middle 标签的字体大小
      case 'large':
        return '16px'; // large 标签的字体大小
      default:
        return '14px'; // 默认字体大小
    }
  };

  // 默认根据 tag 的 size 设置 maxHeight
  const defaultTagHeight = getTagHeight(config?.props?.tagSize || 'middle'); // 默认使用 'middle'
  const defaultTagSize = getTagSizePx(config?.props?.tagSize || 'middle'); // 默认使用 'middle'

  const iconsList: { [key: string]: any } = icons;

  return (
    visible && (
      <div ref={ref} data-id={id} data-type={type} style={config.style}>
        <div style={{ display: 'flex' }}>
          {/* 根据 tag 的 size 设置 maxHeight */}
          <Flex
            gap={config.props.tagGap}
            wrap
            align="center"
            style={{
              flex: 1,
              maxHeight: !config.props.useCollapse || showAll ? 'none' : defaultTagHeight,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}
          >
            {data.map((tag: any) => (
              <Tag.CheckableTag
                key={tag.id}
                checked={selectedTags.includes(tag.key)}
                onChange={(checked) => handleChange(tag.key, checked)}
                style={{ fontSize: `${defaultTagSize}` }}
              >
                {config.props.useIcon && iconsList[tag.icon] ? React.createElement(iconsList[tag.icon]) : null} {tag.label}
              </Tag.CheckableTag>
            ))}
          </Flex>
          {config.props.useCollapse ? (
            <Button size="small" type="link" onClick={() => setShowAll(!showAll)}>
              {showAll ? <icons.UpOutlined /> : <icons.DownOutlined />}
              {showAll ? '收起' : '展开'}
            </Button>
          ) : null}
        </div>
      </div>
    )
  );
};

export default forwardRef(TagGroup);

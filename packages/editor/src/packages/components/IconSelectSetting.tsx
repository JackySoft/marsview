import { Form, FormInstance, Select } from "antd";
import React, { memo } from "react";
import * as icons from '@ant-design/icons';

type IconSelectSettingProps = {
    form: FormInstance,
    name: string | any[],
    label: string,
    initialValue: string
}

const IconSelectSetting = memo(({ form, name, label, initialValue }: IconSelectSettingProps) => {

    // 获取所有的antd图标，动态渲染到下拉框中
    const iconsList: { [key: string]: any } = icons;

    return (
        <Form.Item label={label} name={name} initialValue={initialValue}>
            <Select
                placeholder="请选择菜单图表"
                showSearch
                allowClear
            >
                {Object.keys(icons)
                    .filter((item) => !['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'IconProvider'].includes(item))
                    .map((key) => {
                        return (
                            <Select.Option value={key} key={key}>
                                {React.createElement(iconsList[key], {
                                    style: {
                                        fontSize: '18px',
                                        verticalAlign: 'middle',
                                    },
                                })}
                            </Select.Option>
                        );
                    })}
            </Select>
        </Form.Item>
    )
})

export default IconSelectSetting
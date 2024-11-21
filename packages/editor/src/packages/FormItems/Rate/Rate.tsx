import { ComponentType } from '@/packages/types';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Form, FormItemProps, Rate, RateProps } from 'antd';
import { FormContext } from '@/packages/utils/context';
import { isNull } from '@/packages/utils/util';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
    defaultValue: string;
    formItem: FormItemProps;
    formWrap: RateProps;
}

type MRateRef = {
    show: () => void,
    hide: () => void,
    enable: () => void,
    disable: () => void,
}

const MRate = forwardRef<MRateRef, ComponentType<IConfig>>(({
    id,
    type,
    config,
    onChange,
    onHoverChange,
}, ref) => {

    const form = useContext(FormContext)
    const [visible, setVisible] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [character, setCharacter] = useState()

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
    }))

    useEffect(() => {
        const name: string = config.props.formItem?.name
        const value = config.props.defaultValue
        name && !isNull(value) && form?.setFieldValue(name, Number(value))
    }, [config.props.defaultValue])

    // 启用和禁用
    useEffect(() => {
        setDisabled(config.props.formWrap.disabled || false);
    }, [config.props.formWrap.disabled]);

    // 获取对应的组件实例
    useEffect(() => {
        ImportCharacterFromAntdIcon(config.props.formWrap.character)
    }, [config.props.formWrap.character]);

    // 输入事件
    const handleChange = (val: number) => {
        onChange?.({
            [config.props.formItem.name]: val,
        });
    };

    // 鼠标经过时数值变化的回调
    const handleHoverChange = (val: number) => onHoverChange?.({
        [config.props.formItem.name]: val,
    })

    if (!visible) {
        return null
    }

    const ImportCharacterFromAntdIcon = async (componentName: string) => {
        try {
            // 动态导入模块
            const module: any = await import(`@ant-design/icons`);
            // 访问模块中的导出
            const dynamicImport = module[componentName];
            setCharacter(dynamicImport.render())
        } catch (error) {
            console.log(`error: ${error}`)
        }
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
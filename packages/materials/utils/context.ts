/**
 * 公共Context对象，用于跨组件通信
 * 主要用在Form、SearchForm中
 * 子表单中进行消费
 */

import { FormInstance } from 'antd';
import { createContext } from 'react';

export const FormContext = createContext<FormInstance<any> | null>(null);

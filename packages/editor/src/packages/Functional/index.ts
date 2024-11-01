import { lazy } from 'react';

export { default as ListConfig } from './List/Schema';
export { default as DescriptionsConfig } from './Descriptions/Schema';
export { default as StepsConfig } from './Steps/Schema';
export { default as ButtonConfig } from './Button/Schema';
export { default as FileUploadConfig } from './FileUpload/Schema';
export { default as TabsConfig } from './Tabs/Schema';
export { default as TabConfig } from './Tab/Schema';

const List = lazy(() => import('./List/List'));
const Descriptions = lazy(() => import('./Descriptions/Descriptions'));
const Steps = lazy(() => import('./Steps/Steps'));
const Button = lazy(() => import('./Button/Button'));
const FileUpload = lazy(() => import('./FileUpload/FileUpload'));
const Tabs = lazy(() => import('./Tabs/Tabs'));
const Tab = lazy(() => import('./Tab/Tab'));

export { List, Descriptions, Steps, Button, FileUpload, Tabs, Tab };

import { lazy } from 'react';

export { default as ModalConfig } from './Modal/Schema';
export { default as EmptyConfig } from './Empty/Schema';
export { default as DrawerConfig } from './Drawer/Schema';
export { default as ResultConfig } from './Result/Schema';

const Modal = lazy(() => import('./Modal/Modal'));
const Empty = lazy(() => import('./Empty/Empty'));
const Drawer = lazy(() => import('./Drawer/Drawer'));
const Result = lazy(() => import('./Result/Result'));

export { Modal, Empty, Drawer, Result };

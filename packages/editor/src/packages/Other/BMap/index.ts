import { lazy } from 'react';

export { default as BMapConfig } from './Schema';

const BMap = lazy(() => import('./BMap'));

export { BMap };

import { lazy } from 'react';

export { default as IFrameConfig } from './Schema';

const IFrame = lazy(() => import('./IFrame'));

export { IFrame };

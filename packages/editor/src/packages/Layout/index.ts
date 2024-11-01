import { lazy } from 'react';

export { default as SpaceConfig } from './Space/Schema';
export { default as RowConfig } from './Row/Schema';
export { default as ColConfig } from './Col/Schema';
export { default as DividerConfig } from './Divider/Schema';

const Space = lazy(() => import('./Space/Space'));
const Row = lazy(() => import('./Row/Row'));
const Col = lazy(() => import('./Col/Col'));
const Divider = lazy(() => import('./Divider/Divider'));

export { Space, Row, Col, Divider };

import { lazy } from 'react';

export { default as PieChartConfig } from './PieChart/Schema';
export { default as LineChartConfig } from './LineChart/Schema';
export { default as ColumnChartConfig } from './ColumnChart/Schema';
export { default as BarChartConfig } from './BarChart/Schema';
export { default as TinyLineConfig } from './TinyLine/Schema';
export { default as TinyColumnConfig } from './TinyColumn/Schema';
export { default as ProgressConfig } from './Progress/Schema';
export { default as RingProgressConfig } from './RingProgress/Schema';

const PieChart = lazy(() => import('./PieChart/PieChart'));
const LineChart = lazy(() => import('./LineChart/LineChart'));
const ColumnChart = lazy(() => import('./ColumnChart/ColumnChart'));
const BarChart = lazy(() => import('./BarChart/BarChart'));
const TinyLine = lazy(() => import('./TinyLine/TinyLine'));
const TinyColumn = lazy(() => import('./TinyColumn/TinyColumn'));
const Progress = lazy(() => import('./Progress/Progress'));
const RingProgress = lazy(() => import('./RingProgress/RingProgress'));

export { PieChart, LineChart, ColumnChart, BarChart, TinyLine, TinyColumn, Progress, RingProgress };

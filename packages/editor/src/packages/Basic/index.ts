import { lazy } from 'react';

export { default as ImageConfig } from './Image/Schema';
export { default as TextConfig } from './Text/Schema';
export { default as TitleConfig } from './Title/Schema';
export { default as LinkConfig } from './Link/Schema';
export { default as IconConfig } from './Icon/Schema';
export { default as AvatarConfig } from './Avatar/Schema';
export { default as StatisticConfig } from './Statistic/Schema';
export { default as CountDownConfig } from './CountDown/Schema';
export { default as QRCodeConfig } from './QRCode/Schema';

const Image = lazy(() => import('./Image/Image'));
const Text = lazy(() => import('./Text/Text'));
const Title = lazy(() => import('./Title/Title'));
const Link = lazy(() => import('./Link/Link'));
const Icon = lazy(() => import('./Icon/Icon'));
const Avatar = lazy(() => import('./Avatar/Avatar'));
const Statistic = lazy(() => import('./Statistic/Statistic'));
const CountDown = lazy(() => import('./CountDown/CountDown'));
const QRCode = lazy(() => import('./QRCode/QRCode'));

export { Image, Text, Title, Link, Icon, Avatar, Statistic, CountDown, QRCode };

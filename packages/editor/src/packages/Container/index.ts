import { lazy } from 'react';

export { default as FlexConfig } from './Flex/Schema';
export { default as FormConfig } from './Form/Schema';
export { default as CardConfig } from './Card/Schema';
export { default as DivConfig } from './Div/Schema';

const Flex = lazy(() => import('./Flex/Flex'));
const Form = lazy(() => import('./Form/Form'));
const Card = lazy(() => import('./Card/Card'));
const Div = lazy(() => import('./Div/Div'));

export { Flex, Form, Card, Div };

import { lazy } from 'react';

export { default as MarsTableConfig } from './MarsTable/Schema';
export { default as SearchFormConfig } from './SearchForm/Schema';

const MarsTable = lazy(() => import('./MarsTable/MarsTable'));
const SearchForm = lazy(() => import('./SearchForm/SearchForm'));

export { MarsTable, SearchForm };

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
}
declare module 'css';
declare module 'lodash-es';
declare module 'prettier';
declare module 'prettier/parser-babel';

interface Window {
  [key: string]: any;
}

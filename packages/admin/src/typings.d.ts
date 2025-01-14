declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'css';
declare module 'lodash-es';
declare module 'mockjs';
interface Window {
  [key: string]: any;
}

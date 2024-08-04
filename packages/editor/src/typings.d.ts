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
declare module 'prettier';
declare module 'prettier/parser-babel';
declare module '@/utils/canvas' {
  export function setNebulaCanvas();
  export function setStarryCanvas();
}
interface Window {
  [key: string]: any;
}

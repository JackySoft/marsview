const IconCard = (props: any) => {
  const { width = '40px', height = '40px' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 72 58" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="59.7381229%" y1="65.1878091%" x2="7.2850225%" y2="28.4965773%" id="linearGradient-1">
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#FAFAFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="100%" y1="49.5550018%" x2="11.5997239%" y2="50%" id="linearGradient-2">
          <stop stopColor="#FAFBFF" offset="0%"></stop>
          <stop stopColor="#F2F3FF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="组件" transform="translate(-142.000000, -404.000000)">
          <g id="编组-13备份" transform="translate(34.000000, 397.000000)">
            <g id="编组-17" transform="translate(108.000000, 7.000000)">
              <path
                d="M6,7 L66,7 C67.1045695,7 68,7.8954305 68,9 L68,48 C68,49.1045695 67.1045695,50 66,50 L6,50 C4.8954305,50 4,49.1045695 4,48 L4,9 C4,7.8954305 4.8954305,7 6,7 Z"
                id="矩形"
                stroke="#A5B1FF"
                strokeWidth="0.5"
                fill="url(#linearGradient-1)"
              ></path>
              <polygon id="矩形" fill="#D6DCFF" points="9 12 27 12 27 17 9 17"></polygon>
              <polygon id="矩形备份-8" fill="url(#linearGradient-2)" points="9 27 62 27 62 32 9 32"></polygon>
              <polygon id="矩形备份-14" fill="url(#linearGradient-2)" points="9 37 62 37 62 42 9 42"></polygon>
              <polygon id="矩形备份-9" fill="#D5DBFF" points="9 21 62 21 62 21.5 9 21.5"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default IconCard;

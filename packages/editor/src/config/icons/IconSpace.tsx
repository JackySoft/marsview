const IconSpace = (props: any) => {
  const { width = '40px', height = '40px' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 72 58" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="100%" y1="46.6701353%" x2="11.5997239%" y2="50%" id="linearGradient-1">
          <stop stopColor="#F3F5FF" offset="0%"></stop>
          <stop stopColor="#ECEEFF" offset="100%"></stop>
        </linearGradient>
        <path
          d="M6,22 L66,22 C66.5522847,22 67,22.4477153 67,23 L67,38 C67,38.5522847 66.5522847,39 66,39 L6,39 C5.44771525,39 5,38.5522847 5,38 L5,23 C5,22.4477153 5.44771525,22 6,22 Z"
          id="path-2"
        ></path>
        <mask id="mask-3" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="62" height="17" fill="white">
          <use xlinkHref="#path-2"></use>
        </mask>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="组件" transform="translate(-533.000000, -117.000000)">
          <g id="编组-37" transform="translate(523.000000, 80.000000)">
            <g id="编组-13备份-11" transform="translate(1.000000, 30.000000)">
              <g id="编组-17备份" transform="translate(9.000000, 7.000000)">
                <path
                  d="M6,6 L66,6 C66.5522847,6 67,6.44771525 67,7 L67,21 C67,21.5522847 66.5522847,22 66,22 L6,22 C5.44771525,22 5,21.5522847 5,21 L5,7 C5,6.44771525 5.44771525,6 6,6 Z"
                  id="矩形"
                  fill="url(#linearGradient-1)"
                ></path>
                <use id="矩形备份-22" stroke="#B4BEFF" mask="url(#mask-3)" strokeWidth="2" strokeDasharray="4,2" xlinkHref="#path-2"></use>
                <path
                  d="M6,39 L66,39 C66.5522847,39 67,39.4477153 67,40 L67,54 C67,54.5522847 66.5522847,55 66,55 L6,55 C5.44771525,55 5,54.5522847 5,54 L5,40 C5,39.4477153 5.44771525,39 6,39 Z"
                  id="矩形备份-21"
                  fill="url(#linearGradient-1)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default IconSpace;

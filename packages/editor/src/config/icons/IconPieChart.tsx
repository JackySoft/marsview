const IconPieChart = (props: any) => {
  const { width = '40px', height = '40px' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 72 58" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <circle id="path-1" cx="23" cy="23" r="21.16"></circle>
        <linearGradient x1="120.144232%" y1="69.8458447%" x2="3.89927905%" y2="87.7844269%" id="linearGradient-3">
          <stop stopColor="#D7DDFF" offset="0%"></stop>
          <stop stopColor="#A5B1FF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="组件" transform="translate(-533.000000, -361.000000)">
          <g id="编组-37" transform="translate(523.000000, 80.000000)">
            <g id="编组-13备份-13" transform="translate(1.000000, 274.000000)">
              <g id="编组-17备份" transform="translate(9.000000, 7.000000)">
                <g id="路径-9" transform="translate(13.000000, 6.000000)">
                  <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <use id="蒙版" fill="#E7EAFF" xlinkHref="#path-1"></use>
                  <polygon
                    fill="url(#linearGradient-3)"
                    mask="url(#mask-2)"
                    points="23 23 23 -9.41911749 54.1293495 11.384466 53.1040069 23"
                  ></polygon>
                  <circle id="蒙版" stroke="#C5CDFF" strokeWidth="0.5" cx="23" cy="23" r="23.25"></circle>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default IconPieChart;

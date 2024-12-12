const IconFormSwitch = (props: any) => {
  const { width = '50px', height = '50px' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 72 58" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="100%" y1="31.1794929%" x2="-66.3507681%" y2="31.1794929%" id="linearGradient-1">
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#F8F8FF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="179.081417%" y1="-35.0028578%" x2="12.593482%" y2="74.7538318%" id="linearGradient-2">
          <stop stopColor="#B7C1FF" offset="0%"></stop>
          <stop stopColor="#A5B1FF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="组件" transform="translate(-360.000000, -423.000000)">
          <g id="编组-13备份-6" transform="translate(252.000000, 416.000000)">
            <g id="编组-17" transform="translate(99.000000, 0.000000)">
              <g id="编组-23" transform="translate(9.000000, 7.000000)">
                <g id="编组-24" transform="translate(21.000000, 21.000000)">
                  <path
                    d="M22,0.25 C24.1401034,0.25 26.0776034,1.1174483 27.4800776,2.51992245 C28.8825517,3.92239659 29.75,5.85989659 29.75,8 C29.75,10.2505047 28.8933056,12.2415209 27.5036644,13.6745884 C26.0997042,15.1224224 24.1523158,16 22,16 L22,16 L8,16 C5.85989659,16 3.92239659,15.1325517 2.51992245,13.7300776 C1.1174483,12.3276034 0.25,10.3901034 0.25,8.25 C0.25,5.99949529 1.10669439,4.00847906 2.4963356,2.57541156 C3.90029579,1.12757761 5.8476842,0.25 8,0.25 L8,0.25 Z"
                    id="矩形"
                    stroke="#A5B1FF"
                    strokeWidth="0.5"
                    fill="url(#linearGradient-1)"
                  ></path>
                  <circle id="椭圆形" fill="url(#linearGradient-2)" cx="8.125" cy="8.125" r="6.875"></circle>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default IconFormSwitch;

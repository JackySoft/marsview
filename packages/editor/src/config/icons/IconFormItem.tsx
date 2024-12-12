const IconFormItem = (props: any) => {
  const { width = '40px', height = '40px' } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 72 58" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="100%" y1="37.4171238%" x2="16.1281407%" y2="21.875%" id="linearGradient-1">
          <stop stopColor="#DEE3FF" offset="0%"></stop>
          <stop stopColor="#CED5FF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="100%" y1="31.1794929%" x2="-82.6954384%" y2="31.1794929%" id="linearGradient-2">
          <stop stopColor="#FFFFFF" offset="0%"></stop>
          <stop stopColor="#FFFFFF" offset="34.2780808%"></stop>
          <stop stopColor="#F8F8FF" offset="100%"></stop>
          <stop stopColor="#F8F8FF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="组件" transform="translate(-360.000000, -831.000000)">
          <g id="编组-13备份-10" transform="translate(252.000000, 824.000000)">
            <g id="编组-17" transform="translate(108.000000, 7.000000)">
              <g id="编组-41" transform="translate(0.000000, 23.000000)">
                <path
                  d="M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,11 C16,11.5522847 15.5522847,12 15,12 L1,12 C0.44771525,12 6.76353751e-17,11.5522847 0,11 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"
                  id="矩形备份-8"
                  fill="url(#linearGradient-1)"
                ></path>
                <g id="编组-6" transform="translate(19.000000, 0.000000)">
                  <g id="编组-18" fill="url(#linearGradient-2)" stroke="#A5B1FF" strokeWidth="0.5">
                    <g id="编组-20">
                      <path
                        d="M52,0.25 C52.2071068,0.25 52.3946068,0.333946609 52.5303301,0.469669914 C52.6660534,0.605393219 52.75,0.792893219 52.75,1 L52.75,1 L52.75,11 C52.75,11.2071068 52.6660534,11.3946068 52.5303301,11.5303301 C52.3946068,11.6660534 52.2071068,11.75 52,11.75 L52,11.75 L1,11.75 C0.792893219,11.75 0.605393219,11.6660534 0.469669914,11.5303301 C0.333946609,11.3946068 0.25,11.2071068 0.25,11 L0.25,11 L0.25,1 C0.25,0.792893219 0.333946609,0.605393219 0.469669914,0.469669914 C0.605393219,0.333946609 0.792893219,0.25 1,0.25 L1,0.25 Z"
                        id="矩形"
                      ></path>
                    </g>
                  </g>
                  <text id="输入" fontFamily="PingFangSC-Regular, PingFang SC" fontSize="7" fontWeight="normal" line-spacing="7" fill="#1F1F1F">
                    <tspan x="4" y="10">
                      输入
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default IconFormItem;

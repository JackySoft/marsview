import{a as E,b as I,c as f,g as Z,d as U,e as j,f as nn,h as en,i as A,_ as $}from"./objectSpread2-C4CkhkJ7.js";import{U as tn}from"./UserOutlined-D3qSKySR.js";const rn=window.React.createContext;var on=rn({});const B=on;function an(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function cn(n,e){if(!n)return!1;if(n.contains)return n.contains(e);for(var t=e;t;){if(t===n)return!0;t=t.parentNode}return!1}var _="data-rc-order",O="data-rc-priority",sn="rc-util-key",T=new Map;function D(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.mark;return e?e.startsWith("data-")?e:"data-".concat(e):sn}function x(n){if(n.attachTo)return n.attachTo;var e=document.querySelector("head");return e||document.body}function ln(n){return n==="queue"?"prependQueue":n?"prepend":"append"}function N(n){return Array.from((T.get(n)||n).children).filter(function(e){return e.tagName==="STYLE"})}function L(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!an())return null;var t=e.csp,r=e.prepend,a=e.priority,o=a===void 0?0:a,i=ln(r),u=i==="prependQueue",c=document.createElement("style");c.setAttribute(_,i),u&&o&&c.setAttribute(O,"".concat(o)),t!=null&&t.nonce&&(c.nonce=t==null?void 0:t.nonce),c.innerHTML=n;var l=x(e),d=l.firstChild;if(r){if(u){var s=(e.styles||N(l)).filter(function(m){if(!["prepend","prependQueue"].includes(m.getAttribute(_)))return!1;var w=Number(m.getAttribute(O)||0);return o>=w});if(s.length)return l.insertBefore(c,s[s.length-1].nextSibling),c}l.insertBefore(c,d)}else l.appendChild(c);return c}function un(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=x(e);return(e.styles||N(t)).find(function(r){return r.getAttribute(D(e))===n})}function dn(n,e){var t=T.get(n);if(!t||!cn(document,t)){var r=L("",e),a=r.parentNode;T.set(n,a),n.removeChild(r)}}function fn(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=x(t),a=N(r),o=E(E({},t),{},{styles:a});dn(r,o);var i=un(e,o);if(i){var u,c;if((u=o.csp)!==null&&u!==void 0&&u.nonce&&i.nonce!==((c=o.csp)===null||c===void 0?void 0:c.nonce)){var l;i.nonce=(l=o.csp)===null||l===void 0?void 0:l.nonce}return i.innerHTML!==n&&(i.innerHTML=n),i}var d=L(n,o);return d.setAttribute(D(o),e),d}function Q(n){var e;return n==null||(e=n.getRootNode)===null||e===void 0?void 0:e.call(n)}function mn(n){return Q(n)instanceof ShadowRoot}function gn(n){return mn(n)?Q(n):null}var b={},Cn=function(e){};function vn(n,e){}function yn(n,e){}function pn(){b={}}function W(n,e,t){!e&&!b[t]&&(n(!1,t),b[t]=!0)}function v(n,e){W(vn,n,e)}function wn(n,e){W(yn,n,e)}v.preMessage=Cn;v.resetWarned=pn;v.noteOnce=wn;const P=window.React,hn=window.React.useContext,Tn=window.React.useEffect;function bn(n){return n.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}function Rn(n,e){v(n,"[@ant-design/icons] ".concat(e))}function M(n){return I(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(I(n.icon)==="object"||typeof n.icon=="function")}function z(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,t){var r=n[t];switch(t){case"class":e.className=r,delete e.class;break;default:delete e[t],e[bn(t)]=r}return e},{})}function R(n,e,t){return t?P.createElement(n.tag,f(f({key:e},z(n.attrs)),t),(n.children||[]).map(function(r,a){return R(r,"".concat(e,"-").concat(n.tag,"-").concat(a))})):P.createElement(n.tag,f({key:e},z(n.attrs)),(n.children||[]).map(function(r,a){return R(r,"".concat(e,"-").concat(n.tag,"-").concat(a))}))}function H(n){return Z(n)[0]}function Y(n){return n?Array.isArray(n)?n:[n]:[]}var Un={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"},xn=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,Nn=function(e){var t=hn(B),r=t.csp,a=t.prefixCls,o=xn;a&&(o=o.replace(/anticon/g,a)),Tn(function(){var i=e.current,u=gn(i);fn(o,"@ant-design-icons",{prepend:!0,csp:r,attachTo:u})},[])},kn=["icon","className","onClick","style","primaryColor","secondaryColor"];const Sn=window.React;var g={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function En(n){var e=n.primaryColor,t=n.secondaryColor;g.primaryColor=e,g.secondaryColor=t||H(e),g.calculated=!!t}function In(){return f({},g)}var y=function(e){var t=e.icon,r=e.className,a=e.onClick,o=e.style,i=e.primaryColor,u=e.secondaryColor,c=U(e,kn),l=Sn.useRef(),d=g;if(i&&(d={primaryColor:i,secondaryColor:u||H(i)}),Nn(l),Rn(M(t),"icon should be icon definiton, but got ".concat(t)),!M(t))return null;var s=t;return s&&typeof s.icon=="function"&&(s=f(f({},s),{},{icon:s.icon(d.primaryColor,d.secondaryColor)})),R(s.icon,"svg-".concat(s.name),f(f({className:r,onClick:a,style:o,"data-icon":s.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},c),{},{ref:l}))};y.displayName="IconReact";y.getTwoToneColors=In;y.setTwoToneColors=En;const k=y;function q(n){var e=Y(n),t=j(e,2),r=t[0],a=t[1];return k.setTwoToneColors({primaryColor:r,secondaryColor:a})}function An(){var n=k.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var _n=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];const C=window.React;q(nn.primary);var p=C.forwardRef(function(n,e){var t=n.className,r=n.icon,a=n.spin,o=n.rotate,i=n.tabIndex,u=n.onClick,c=n.twoToneColor,l=U(n,_n),d=C.useContext(B),s=d.prefixCls,m=s===void 0?"anticon":s,w=d.rootClassName,F=en(w,m,A(A({},"".concat(m,"-").concat(r.name),!!r.name),"".concat(m,"-spin"),!!a||r.name==="loading"),t),h=i;h===void 0&&u&&(h=-1);var G=o?{msTransform:"rotate(".concat(o,"deg)"),transform:"rotate(".concat(o,"deg)")}:void 0,J=Y(c),S=j(J,2),V=S[0],X=S[1];return C.createElement("span",$({role:"img","aria-label":r.name},l,{ref:e,tabIndex:h,onClick:u,className:F}),C.createElement(k,{icon:r,primaryColor:V,secondaryColor:X,style:G}))});p.displayName="AntdIcon";p.getTwoToneColor=An;p.setTwoToneColor=q;const On=p,K=window.React;var Pn=function(e,t){return K.createElement(On,$({},e,{ref:t,icon:tn}))};const jn=K.forwardRef(Pn);export{On as A,B as C,jn as U,q as a,An as g,Un as s,Nn as u,Rn as w};

import{a as S,b as E,c as f,g as X,d as z,e as U,f as Z,h as nn,i as A,_ as j}from"./objectSpread2-C4CkhkJ7.js";import{U as en}from"./UserOutlined-D3qSKySR.js";const tn=window.React.createContext;var rn=tn({});const $=rn;function on(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function an(n,e){if(!n)return!1;if(n.contains)return n.contains(e);for(var t=e;t;){if(t===n)return!0;t=t.parentNode}return!1}var I="data-rc-order",_="data-rc-priority",cn="rc-util-key",T=new Map;function B(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.mark;return e?e.startsWith("data-")?e:"data-".concat(e):cn}function x(n){if(n.attachTo)return n.attachTo;var e=document.querySelector("head");return e||document.body}function sn(n){return n==="queue"?"prependQueue":n?"prepend":"append"}function N(n){return Array.from((T.get(n)||n).children).filter(function(e){return e.tagName==="STYLE"})}function D(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!on())return null;var t=e.csp,r=e.prepend,a=e.priority,o=a===void 0?0:a,i=sn(r),u=i==="prependQueue",c=document.createElement("style");c.setAttribute(I,i),u&&o&&c.setAttribute(_,"".concat(o)),t!=null&&t.nonce&&(c.nonce=t==null?void 0:t.nonce),c.innerHTML=n;var l=x(e),d=l.firstChild;if(r){if(u){var s=(e.styles||N(l)).filter(function(m){if(!["prepend","prependQueue"].includes(m.getAttribute(I)))return!1;var w=Number(m.getAttribute(_)||0);return o>=w});if(s.length)return l.insertBefore(c,s[s.length-1].nextSibling),c}l.insertBefore(c,d)}else l.appendChild(c);return c}function ln(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=x(e);return(e.styles||N(t)).find(function(r){return r.getAttribute(B(e))===n})}function un(n,e){var t=T.get(n);if(!t||!an(document,t)){var r=D("",e),a=r.parentNode;T.set(n,a),n.removeChild(r)}}function dn(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=x(t),a=N(r),o=S(S({},t),{},{styles:a});un(r,o);var i=ln(e,o);if(i){var u,c;if((u=o.csp)!==null&&u!==void 0&&u.nonce&&i.nonce!==((c=o.csp)===null||c===void 0?void 0:c.nonce)){var l;i.nonce=(l=o.csp)===null||l===void 0?void 0:l.nonce}return i.innerHTML!==n&&(i.innerHTML=n),i}var d=D(n,o);return d.setAttribute(B(o),e),d}function L(n){var e;return n==null||(e=n.getRootNode)===null||e===void 0?void 0:e.call(n)}function fn(n){return L(n)instanceof ShadowRoot}function mn(n){return fn(n)?L(n):null}var b={},gn=function(e){};function Cn(n,e){}function vn(n,e){}function yn(){b={}}function Q(n,e,t){!e&&!b[t]&&(n(!1,t),b[t]=!0)}function y(n,e){Q(Cn,n,e)}function pn(n,e){Q(vn,n,e)}y.preMessage=gn;y.resetWarned=yn;y.noteOnce=pn;const O=window.React,wn=window.React.useContext,hn=window.React.useEffect;function Tn(n){return n.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}function bn(n,e){y(n,"[@ant-design/icons] ".concat(e))}function P(n){return E(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(E(n.icon)==="object"||typeof n.icon=="function")}function M(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,t){var r=n[t];switch(t){case"class":e.className=r,delete e.class;break;default:delete e[t],e[Tn(t)]=r}return e},{})}function R(n,e,t){return t?O.createElement(n.tag,f(f({key:e},M(n.attrs)),t),(n.children||[]).map(function(r,a){return R(r,"".concat(e,"-").concat(n.tag,"-").concat(a))})):O.createElement(n.tag,f({key:e},M(n.attrs)),(n.children||[]).map(function(r,a){return R(r,"".concat(e,"-").concat(n.tag,"-").concat(a))}))}function W(n){return X(n)[0]}function H(n){return n?Array.isArray(n)?n:[n]:[]}var zn={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"},Rn=`
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
`,xn=function(e){var t=wn($),r=t.csp,a=t.prefixCls,o=Rn;a&&(o=o.replace(/anticon/g,a)),hn(function(){var i=e.current,u=mn(i);dn(o,"@ant-design-icons",{prepend:!0,csp:r,attachTo:u})},[])},Nn=["icon","className","onClick","style","primaryColor","secondaryColor"];const kn=window.React;var C={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Sn(n){var e=n.primaryColor,t=n.secondaryColor;C.primaryColor=e,C.secondaryColor=t||W(e),C.calculated=!!t}function En(){return f({},C)}var g=function(e){var t=e.icon,r=e.className,a=e.onClick,o=e.style,i=e.primaryColor,u=e.secondaryColor,c=z(e,Nn),l=kn.useRef(),d=C;if(i&&(d={primaryColor:i,secondaryColor:u||W(i)}),xn(l),bn(P(t),"icon should be icon definiton, but got ".concat(t)),!P(t))return null;var s=t;return s&&typeof s.icon=="function"&&(s=f(f({},s),{},{icon:s.icon(d.primaryColor,d.secondaryColor)})),R(s.icon,"svg-".concat(s.name),f(f({className:r,onClick:a,style:o,"data-icon":s.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},c),{},{ref:l}))};g.displayName="IconReact";g.getTwoToneColors=En;g.setTwoToneColors=Sn;function Y(n){var e=H(n),t=U(e,2),r=t[0],a=t[1];return g.setTwoToneColors({primaryColor:r,secondaryColor:a})}function An(){var n=g.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var In=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];const v=window.React;Y(Z.primary);var p=v.forwardRef(function(n,e){var t=n.className,r=n.icon,a=n.spin,o=n.rotate,i=n.tabIndex,u=n.onClick,c=n.twoToneColor,l=z(n,In),d=v.useContext($),s=d.prefixCls,m=s===void 0?"anticon":s,w=d.rootClassName,K=nn(w,m,A(A({},"".concat(m,"-").concat(r.name),!!r.name),"".concat(m,"-spin"),!!a||r.name==="loading"),t),h=i;h===void 0&&u&&(h=-1);var F=o?{msTransform:"rotate(".concat(o,"deg)"),transform:"rotate(".concat(o,"deg)")}:void 0,G=H(c),k=U(G,2),J=k[0],V=k[1];return v.createElement("span",j({role:"img","aria-label":r.name},l,{ref:e,tabIndex:h,onClick:u,className:K}),v.createElement(g,{icon:r,primaryColor:J,secondaryColor:V,style:F}))});p.displayName="AntdIcon";p.getTwoToneColor=An;p.setTwoToneColor=Y;const _n=p,q=window.React;var On=function(e,t){return q.createElement(_n,j({},e,{ref:t,icon:en}))};const Un=q.forwardRef(On);export{_n as A,$ as C,Un as U,Y as a,An as g,zn as s,xn as u,bn as w};

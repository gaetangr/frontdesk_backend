(this["webpackJsonpmaterial-app"]=this["webpackJsonpmaterial-app"]||[]).push([[20],{1246:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a(7),r=a(0),c=a.n(r),i=a(130),s=a(642),l=a(661),u=a(170),p=a(623),d=a(646),m=a(683),b=a(651),f=Object(o.d)(s.a).withConfig({displayName:"Support__Divider",componentId:"sc-7m5877-0"})(b.b),h=(Object(o.d)(l.a).withConfig({displayName:"Support__Breadcrumbs",componentId:"sc-7m5877-1"})(b.b),Object(o.d)(u.a).withConfig({displayName:"Support__Typography",componentId:"sc-7m5877-2"})(b.b));t.default=function(){return Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)(i.a,{title:"Support"}),Object(n.jsx)(p.a,{container:!0,spacing:6,justify:"center",children:Object(n.jsxs)(p.a,{item:!0,xs:12,lg:9,xl:7,children:[Object(n.jsx)(h,{variant:"h2",gutterBottom:!0,display:"inline",children:"Support et assistance"}),Object(n.jsx)(f,{my:6}),Object(n.jsx)(d.a,{mb:10,children:Object(n.jsxs)(h,{variant:"subtitle1",gutterBottom:!0,my:4,children:["Pour des questions concernant l'utilisation de l'application, des suggestions ou tout autre probl\xe8me technique veuillez contacter",Object(n.jsx)(m.a,{href:"mailto:hello@front-desk.app",children:"    hello@front-desk.app"}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{})]})})]})})]})}},661:function(e,t,a){"use strict";var n=a(1),o=a(69),r=a(5),c=a(0),i=(a(214),a(3),a(6)),s=a(8),l=a(170),u=a(14),p=a(63),d=Object(p.a)(c.createElement("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),m=a(171);var b=Object(s.a)((function(e){return{root:{display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5),backgroundColor:e.palette.grey[100],color:e.palette.grey[700],borderRadius:2,cursor:"pointer","&:hover, &:focus":{backgroundColor:e.palette.grey[200]},"&:active":{boxShadow:e.shadows[0],backgroundColor:Object(u.b)(e.palette.grey[200],.12)}},icon:{width:24,height:16}}}),{name:"PrivateBreadcrumbCollapsed"})((function(e){var t=e.classes,a=Object(r.a)(e,["classes"]);return c.createElement(m.a,Object(n.a)({component:"li",className:t.root,focusRipple:!0},a),c.createElement(d,{className:t.icon}))}));var f=c.forwardRef((function(e,t){var a=e.children,s=e.classes,u=e.className,p=e.component,d=void 0===p?"nav":p,m=e.expandText,f=void 0===m?"Show path":m,h=e.itemsAfterCollapse,g=void 0===h?1:h,j=e.itemsBeforeCollapse,v=void 0===j?1:j,O=e.maxItems,x=void 0===O?8:O,y=e.separator,C=void 0===y?"/":y,N=Object(r.a)(e,["children","classes","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"]),k=c.useState(!1),S=k[0],w=k[1],B=c.Children.toArray(a).filter((function(e){return c.isValidElement(e)})).map((function(e,t){return c.createElement("li",{className:s.li,key:"child-".concat(t)},e)}));return c.createElement(l.a,Object(n.a)({ref:t,component:d,color:"textSecondary",className:Object(i.a)(s.root,u)},N),c.createElement("ol",{className:s.ol},function(e,t,a){return e.reduce((function(n,o,r){return r<e.length-1?n=n.concat(o,c.createElement("li",{"aria-hidden":!0,key:"separator-".concat(r),className:t},a)):n.push(o),n}),[])}(S||x&&B.length<=x?B:function(e){return v+g>=e.length?e:[].concat(Object(o.a)(e.slice(0,v)),[c.createElement(b,{"aria-label":f,key:"ellipsis",onClick:function(e){w(!0);var t=e.currentTarget.parentNode.querySelector("a[href],button,[tabindex]");t&&t.focus()}})],Object(o.a)(e.slice(e.length-g,e.length)))}(B),s.separator,C)))}));t.a=Object(s.a)({root:{},ol:{display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"},li:{},separator:{display:"flex",userSelect:"none",marginLeft:8,marginRight:8}},{name:"MuiBreadcrumbs"})(f)},683:function(e,t,a){"use strict";var n=a(1),o=a(5),r=a(0),c=(a(3),a(6)),i=a(9),s=a(8),l=a(99),u=a(13),p=a(170),d=r.forwardRef((function(e,t){var a=e.classes,s=e.className,d=e.color,m=void 0===d?"primary":d,b=e.component,f=void 0===b?"a":b,h=e.onBlur,g=e.onFocus,j=e.TypographyClasses,v=e.underline,O=void 0===v?"hover":v,x=e.variant,y=void 0===x?"inherit":x,C=Object(o.a)(e,["classes","className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"]),N=Object(l.a)(),k=N.isFocusVisible,S=N.onBlurVisible,w=N.ref,B=r.useState(!1),E=B[0],z=B[1],R=Object(u.a)(t,w);return r.createElement(p.a,Object(n.a)({className:Object(c.a)(a.root,a["underline".concat(Object(i.a)(O))],s,E&&a.focusVisible,"button"===f&&a.button),classes:j,color:m,component:f,onBlur:function(e){E&&(S(),z(!1)),h&&h(e)},onFocus:function(e){k(e)&&z(!0),g&&g(e)},ref:R,variant:y},C))}));t.a=Object(s.a)({root:{},underlineNone:{textDecoration:"none"},underlineHover:{textDecoration:"none","&:hover":{textDecoration:"underline"}},underlineAlways:{textDecoration:"underline"},button:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle","-moz-appearance":"none","-webkit-appearance":"none","&::-moz-focus-inner":{borderStyle:"none"},"&$focusVisible":{outline:"auto"}},focusVisible:{}},{name:"MuiLink"})(d)}}]);
//# sourceMappingURL=20.3c143e1b.chunk.js.map
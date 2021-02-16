(this["webpackJsonpmaterial-app"]=this["webpackJsonpmaterial-app"]||[]).push([[17],{1230:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(35),o=n(7),i=n(0),c=n(31),s=n(41),u=n(130),l=n(11),d=n(659),f=n(44),m=n.n(f),b=n(1265),p=n(213),j=n(786),O=n(606),h=n(170),v=n(634),g=n(651),E=n(648),x=Object(o.d)(E.a).withConfig({displayName:"SignUp__Alert",componentId:"hbxal7-0"})(g.b),y=Object(o.d)(b.a).withConfig({displayName:"SignUp__TextField",componentId:"hbxal7-1"})(g.b),w=Object(o.d)(p.a).withConfig({displayName:"SignUp__Wrapper",componentId:"hbxal7-2"})(["padding:","px;","{padding:","px;}"],(function(e){return e.theme.spacing(6)}),(function(e){return e.theme.breakpoints.up("md")}),(function(e){return e.theme.spacing(10)}));t.default=function(){var e=Object(c.g)(),t=Object(d.c)(),n=(t.register,t.handleSubmit),o=t.control,f=(t.reset,Object(i.useState)(!1)),b=Object(a.a)(f,2),p=b[0],g=b[1],E=Object(i.useState)(""),k=Object(a.a)(E,2),C=k[0],L=k[1],T=Object(i.useState)(),S=Object(a.a)(T,2),I=S[0],R=S[1],N=function(e,t){"clickaway"!==t&&g(!1)},W=Object(r.jsx)(j.a,{anchorOrigin:{vertical:"top",horizontal:"right"},open:p,autoHideDuration:3e3,onClose:N,children:Object(r.jsx)(x,{onClose:N,variant:"filled",severity:"error",children:C})}),z=function(t){m()({method:"post",url:"".concat(l.k,"/users/"),data:{username:t.username,email:t.email,password:t.password,is_admin:!0,is_staff:!0}}).then((function(n){var a,o,i;a=n.data.user,o=n.data.token,i=t.name,m()({method:"post",url:"".concat(l.k,"/property/"),data:{name:i,collaborator:[a]},headers:{Authorization:"Token ".concat(o)}}),R(Object(r.jsx)(O.a,{size:20,color:"green"})),localStorage.setItem("token",n.data.token),setTimeout((function(){e.push("/dashboard/default"),document.location.reload()}))})).catch((function(e){e.response?(e.response.data.username?L(e.response.data.username[0]):e.response.data.email?L(e.response.data.email[0]):L("Une erreur est survenue"),g(!0)):e.request}))};return Object(r.jsxs)(w,{children:[Object(r.jsx)(u.a,{title:"Inscription"}),Object(r.jsx)(h.a,{component:"h1",variant:"h4",align:"center",gutterBottom:!0,children:"Rejoignez-nous"}),Object(r.jsxs)(h.a,{component:"h2",variant:"body1",align:"center",children:["Ajoutez votre \xe9tablissement \xe0 notre plateforme en quelques secondes !",W]}),Object(r.jsx)("br",{}),Object(r.jsxs)(x,{variant:"filled",severity:"info",children:[" ","Vous allez inscrire votre \xe9tablissement sur Front Desk,"," ",Object(r.jsxs)("strong",{children:["cette page d'inscription n'est pas destin\xe9e \xe0 la cr\xe9ation de comptes collaborateurs"," "," ",Object(r.jsx)(s.b,{to:"/documentation/account-manager",children:"En savoir plus"})]})]}),Object(r.jsxs)("form",{onSubmit:n(z),children:[Object(r.jsx)(d.a,{as:Object(r.jsx)(y,{required:!0,id:"username",autoFocus:!0,label:"Pseudo",helperText:"Il sera utilis\xe9 pour vous connecter",placeholder:"Ex: H0827, DIRECTION...",fullWidth:!0,my:2}),name:"username",label:"Identifiant",control:o,defaultValue:""}),Object(r.jsx)(d.a,{as:Object(r.jsx)(y,{id:"property",required:!0,placeholder:"Ex:  Ibis Tour Eiffel",label:"Nom de votre \xe9tablissement",fullWidth:!0,my:2}),defaultValue:"",name:"name",control:o}),Object(r.jsx)(d.a,{as:Object(r.jsx)(y,{required:!0,id:"password",type:"password",label:"Mot de passe",fullWidth:!0,my:2}),defaultValue:"",name:"password",control:o}),Object(r.jsx)(d.a,{as:Object(r.jsx)(y,{id:"email",label:"Email",fullWidth:!0,my:2}),defaultValue:"",name:"email",required:!0,control:o}),Object(r.jsxs)(v.a,{fullWidth:!0,onClick:n(z),variant:"contained",color:"primary",children:["Cr\xe9er un compte propri\xe9taire ",I]})]})]})}},698:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(224);function a(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(r.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){s=!0,i=e},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}},719:function(e,t,n){"use strict";var r=n(0),a=n(18),o=(n(3),n(40)),i=n(13),c=n(59);function s(e){return e.substring(2).toLowerCase()}t.a=function(e){var t=e.children,n=e.disableReactTree,u=void 0!==n&&n,l=e.mouseEvent,d=void 0===l?"onClick":l,f=e.onClickAway,m=e.touchEvent,b=void 0===m?"onTouchEnd":m,p=r.useRef(!1),j=r.useRef(null),O=r.useRef(!1),h=r.useRef(!1);r.useEffect((function(){return setTimeout((function(){O.current=!0}),0),function(){O.current=!1}}),[]);var v=r.useCallback((function(e){j.current=a.findDOMNode(e)}),[]),g=Object(i.a)(t.ref,v),E=Object(c.a)((function(e){var t=h.current;if(h.current=!1,O.current&&j.current&&!function(e){return document.documentElement.clientWidth<e.clientX||document.documentElement.clientHeight<e.clientY}(e))if(p.current)p.current=!1;else{var n;if(e.composedPath)n=e.composedPath().indexOf(j.current)>-1;else n=!Object(o.a)(j.current).documentElement.contains(e.target)||j.current.contains(e.target);n||!u&&t||f(e)}})),x=function(e){return function(n){h.current=!0;var r=t.props[e];r&&r(n)}},y={ref:g};return!1!==b&&(y[b]=x(b)),r.useEffect((function(){if(!1!==b){var e=s(b),t=Object(o.a)(j.current),n=function(){p.current=!0};return t.addEventListener(e,E),t.addEventListener("touchmove",n),function(){t.removeEventListener(e,E),t.removeEventListener("touchmove",n)}}}),[E,b]),!1!==d&&(y[d]=x(d)),r.useEffect((function(){if(!1!==d){var e=s(d),t=Object(o.a)(j.current);return t.addEventListener(e,E),function(){t.removeEventListener(e,E)}}}),[E,d]),r.createElement(r.Fragment,null,r.cloneElement(t,y))}},786:function(e,t,n){"use strict";var r=n(5),a=n(32),o=n(1),i=n(0),c=(n(3),n(6)),s=n(8),u=n(55),l=n(719),d=n(59),f=n(9),m=n(73),b=n(329),p=n(213),j=n(14),O=i.forwardRef((function(e,t){var n=e.action,a=e.classes,s=e.className,u=e.message,l=e.role,d=void 0===l?"alert":l,f=Object(r.a)(e,["action","classes","className","message","role"]);return i.createElement(p.a,Object(o.a)({role:d,square:!0,elevation:6,className:Object(c.a)(a.root,s),ref:t},f),i.createElement("div",{className:a.message},u),n?i.createElement("div",{className:a.action},n):null)})),h=Object(s.a)((function(e){var t="light"===e.palette.type?.8:.98,n=Object(j.b)(e.palette.background.default,t);return{root:Object(o.a)({},e.typography.body2,Object(a.a)({color:e.palette.getContrastText(n),backgroundColor:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:e.shape.borderRadius,flexGrow:1},e.breakpoints.up("sm"),{flexGrow:"initial",minWidth:288})),message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}}}),{name:"MuiSnackbarContent"})(O),v=i.forwardRef((function(e,t){var n=e.action,a=e.anchorOrigin,s=(a=void 0===a?{vertical:"bottom",horizontal:"center"}:a).vertical,p=a.horizontal,j=e.autoHideDuration,O=void 0===j?null:j,v=e.children,g=e.classes,E=e.className,x=e.ClickAwayListenerProps,y=e.ContentProps,w=e.disableWindowBlurListener,k=void 0!==w&&w,C=e.message,L=e.onClose,T=e.onEnter,S=e.onEntered,I=e.onEntering,R=e.onExit,N=e.onExited,W=e.onExiting,z=e.onMouseEnter,D=e.onMouseLeave,M=e.open,A=e.resumeHideDuration,P=e.TransitionComponent,q=void 0===P?b.a:P,_=e.transitionDuration,H=void 0===_?{enter:u.b.enteringScreen,exit:u.b.leavingScreen}:_,B=e.TransitionProps,V=Object(r.a)(e,["action","anchorOrigin","autoHideDuration","children","classes","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onClose","onEnter","onEntered","onEntering","onExit","onExited","onExiting","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"]),F=i.useRef(),U=i.useState(!0),G=U[0],J=U[1],X=Object(d.a)((function(){L&&L.apply(void 0,arguments)})),Y=Object(d.a)((function(e){L&&null!=e&&(clearTimeout(F.current),F.current=setTimeout((function(){X(null,"timeout")}),e))}));i.useEffect((function(){return M&&Y(O),function(){clearTimeout(F.current)}}),[M,O,Y]);var K=function(){clearTimeout(F.current)},Q=i.useCallback((function(){null!=O&&Y(null!=A?A:.5*O)}),[O,A,Y]);return i.useEffect((function(){if(!k&&M)return window.addEventListener("focus",Q),window.addEventListener("blur",K),function(){window.removeEventListener("focus",Q),window.removeEventListener("blur",K)}}),[k,Q,M]),!M&&G?null:i.createElement(l.a,Object(o.a)({onClickAway:function(e){L&&L(e,"clickaway")}},x),i.createElement("div",Object(o.a)({className:Object(c.a)(g.root,g["anchorOrigin".concat(Object(f.a)(s)).concat(Object(f.a)(p))],E),onMouseEnter:function(e){z&&z(e),K()},onMouseLeave:function(e){D&&D(e),Q()},ref:t},V),i.createElement(q,Object(o.a)({appear:!0,in:M,onEnter:Object(m.a)((function(){J(!1)}),T),onEntered:S,onEntering:I,onExit:R,onExited:Object(m.a)((function(){J(!0)}),N),onExiting:W,timeout:H,direction:"top"===s?"down":"up"},B),v||i.createElement(h,Object(o.a)({message:C,action:n},y)))))}));t.a=Object(s.a)((function(e){var t={top:8},n={bottom:8},r={justifyContent:"flex-end"},i={justifyContent:"flex-start"},c={top:24},s={bottom:24},u={right:24},l={left:24},d={left:"50%",right:"auto",transform:"translateX(-50%)"};return{root:{zIndex:e.zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},anchorOriginTopCenter:Object(o.a)({},t,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({},c,d))),anchorOriginBottomCenter:Object(o.a)({},n,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({},s,d))),anchorOriginTopRight:Object(o.a)({},t,r,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({left:"auto"},c,u))),anchorOriginBottomRight:Object(o.a)({},n,r,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({left:"auto"},s,u))),anchorOriginTopLeft:Object(o.a)({},t,i,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({right:"auto"},c,l))),anchorOriginBottomLeft:Object(o.a)({},n,i,Object(a.a)({},e.breakpoints.up("sm"),Object(o.a)({right:"auto"},s,l)))}}),{flip:!1,name:"MuiSnackbar"})(v)}}]);
//# sourceMappingURL=17.38a17760.chunk.js.map
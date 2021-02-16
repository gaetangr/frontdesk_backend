(this["webpackJsonpmaterial-app"]=this["webpackJsonpmaterial-app"]||[]).push([[22],{1244:function(e,t,r){"use strict";r.r(t);var a=r(2),n=r(7),s=r(0),o=r.n(s),c=r(41),i=r(130),l=r(642),u=r(661),d=r(170),p=r(646),m=r(623),b=r(651),j=Object(n.d)(l.a).withConfig({displayName:"AccountManager__Divider",componentId:"b7cpd9-0"})(b.b),h=(Object(n.d)(u.a).withConfig({displayName:"AccountManager__Breadcrumbs",componentId:"b7cpd9-1"})(b.b),Object(n.d)(d.a).withConfig({displayName:"AccountManager__Typography",componentId:"b7cpd9-2"})(b.b));function g(){return Object(a.jsxs)(p.a,{mb:10,children:[Object(a.jsx)("br",{}),Object(a.jsx)(h,{variant:"h3",gutterBottom:!0,children:"Introduction"}),Object(a.jsx)(h,{variant:"subtitle1",gutterBottom:!0,children:"La page d'inscription est r\xe9serv\xe9e aux futurs comptes manager, cela peut-\xeatre un adjoint de direction, chef de bridage, directeur, ou une personne souhaitant proposer le service \xe0 son \xe9quipe. Une fois le compte finalis\xe9 vous pourrez cr\xe9er ceux de vos collaborateurs depuis l'espace manager"}),Object(a.jsxs)(h,{variant:"subtitle1",gutterBottom:!0,my:4,children:["Pour cr\xe9er votre compte vous devez vous rendre sur la page d'inscription et remplir les champs suivants:",Object(a.jsxs)("ul",{children:[Object(a.jsxs)("li",{children:[Object(a.jsx)("strong",{children:" Identifiant:"})," Il sera utilis\xe9 pour vous authentifier sur la plaforme et l'espace manager"]}),Object(a.jsxs)("li",{children:[Object(a.jsx)("strong",{children:" Nom de votre \xe9tablissement:"})," Le nom de votre h\xf4tel ou la raison sociale pour un groupe de plusieurs h\xf4tels."]}),Object(a.jsxs)("li",{children:[Object(a.jsx)("strong",{children:" Email:"})," L'email sera utilis\xe9 pour la confirmation de compte, la modification d'un mot de passe et, au besoin, une prise de contact avec l'\xe9quipe Front Desk."]}),Object(a.jsxs)("li",{children:[Object(a.jsx)("strong",{children:" Mot de passe:"})," Ce mot de passe sera utilis\xe9 pour vous identifier, g\xe9rer les comptes de votre \xe9quipe, les informations de votre \xe9tablissement"]})]})]})]})}function f(){return Object(a.jsxs)(p.a,{mb:10,children:[Object(a.jsx)(h,{variant:"h3",gutterBottom:!0,children:"En savoir plus"}),Object(a.jsxs)(h,{variant:"subtitle1",children:[" ","Un compte manager vous permet d'acc\xe9der \xe0 l'ensemble des outils Front Desk, il vous donne \xe9galement acc\xe8s \xe0 l'espage manager ",Object(a.jsx)(c.b,{to:"dashboard-manager/",children:" En savoir plus"})]})]})}t.default=function(){return Object(a.jsxs)(o.a.Fragment,{children:[Object(a.jsx)(i.a,{title:"Compte propri\xe9taire"}),Object(a.jsx)(m.a,{container:!0,spacing:6,justify:"center",children:Object(a.jsxs)(m.a,{item:!0,xs:12,lg:9,xl:7,children:[Object(a.jsx)(h,{variant:"h2",gutterBottom:!0,display:"inline",children:"Cr\xe9er un compte manager"}),Object(a.jsx)(j,{my:6}),Object(a.jsx)(g,{}),Object(a.jsx)(f,{})]})})]})}},661:function(e,t,r){"use strict";var a=r(1),n=r(69),s=r(5),o=r(0),c=(r(214),r(3),r(6)),i=r(8),l=r(170),u=r(14),d=r(63),p=Object(d.a)(o.createElement("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),m=r(171);var b=Object(i.a)((function(e){return{root:{display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5),backgroundColor:e.palette.grey[100],color:e.palette.grey[700],borderRadius:2,cursor:"pointer","&:hover, &:focus":{backgroundColor:e.palette.grey[200]},"&:active":{boxShadow:e.shadows[0],backgroundColor:Object(u.b)(e.palette.grey[200],.12)}},icon:{width:24,height:16}}}),{name:"PrivateBreadcrumbCollapsed"})((function(e){var t=e.classes,r=Object(s.a)(e,["classes"]);return o.createElement(m.a,Object(a.a)({component:"li",className:t.root,focusRipple:!0},r),o.createElement(p,{className:t.icon}))}));var j=o.forwardRef((function(e,t){var r=e.children,i=e.classes,u=e.className,d=e.component,p=void 0===d?"nav":d,m=e.expandText,j=void 0===m?"Show path":m,h=e.itemsAfterCollapse,g=void 0===h?1:h,f=e.itemsBeforeCollapse,v=void 0===f?1:f,x=e.maxItems,O=void 0===x?8:x,y=e.separator,C=void 0===y?"/":y,N=Object(s.a)(e,["children","classes","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"]),E=o.useState(!1),k=E[0],w=E[1],B=o.Children.toArray(r).filter((function(e){return o.isValidElement(e)})).map((function(e,t){return o.createElement("li",{className:i.li,key:"child-".concat(t)},e)}));return o.createElement(l.a,Object(a.a)({ref:t,component:p,color:"textSecondary",className:Object(c.a)(i.root,u)},N),o.createElement("ol",{className:i.ol},function(e,t,r){return e.reduce((function(a,n,s){return s<e.length-1?a=a.concat(n,o.createElement("li",{"aria-hidden":!0,key:"separator-".concat(s),className:t},r)):a.push(n),a}),[])}(k||O&&B.length<=O?B:function(e){return v+g>=e.length?e:[].concat(Object(n.a)(e.slice(0,v)),[o.createElement(b,{"aria-label":j,key:"ellipsis",onClick:function(e){w(!0);var t=e.currentTarget.parentNode.querySelector("a[href],button,[tabindex]");t&&t.focus()}})],Object(n.a)(e.slice(e.length-g,e.length)))}(B),i.separator,C)))}));t.a=Object(i.a)({root:{},ol:{display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"},li:{},separator:{display:"flex",userSelect:"none",marginLeft:8,marginRight:8}},{name:"MuiBreadcrumbs"})(j)}}]);
//# sourceMappingURL=22.7bb130d1.chunk.js.map
(this["webpackJsonptrue-app"]=this["webpackJsonptrue-app"]||[]).push([[0],{119:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(56),r=n.n(a),i=n(4),o=(n(23),n(57),n(64),n(2)),l=n(15),j=n(8),u=n.n(j),b=n(1),d=function(e){var t=e.addText,n=Object(c.useState)(""),s=Object(i.a)(n,2),a=s[0],r=s[1];return Object(b.jsx)("div",{className:"Texttype",onSubmit:function(e){if(e.preventDefault(),a){var n={title:a};u.a.post("http://localhost:3001/create",n),t(a),r("")}else alert("no message entered")},children:Object(b.jsxs)("form",{children:[Object(b.jsx)("input",{type:"text",placeholder:"what's on your mind?",value:a,onChange:function(e){return r(e.target.value)}}),Object(b.jsx)("input",{type:"submit"})]})})},h=function(e){var t=e.texts;return Object(b.jsx)("div",{className:"info",children:Object(b.jsx)("p",{children:t})})},O=function(){var e=Object(o.g)();return Object(b.jsx)("div",{children:Object(b.jsx)("button",{onClick:function(t){return t.target.value,localStorage.removeItem("uid"),void(null==localStorage.getItem("uid")?e.push("/"):console.log("whats up"))},children:"Logout"})})},p=function(e){var t=e.texts,n=e.uid,c=e.rmessage;return u.a.get("http://localhost:3001/create").then((function(e){console.log(e)})),Object(b.jsxs)("div",{className:"Textshow",children:[Object(b.jsx)(O,{}),Object(b.jsxs)("p",{children:["Welcome ",n,"!"]}),Object(b.jsx)(h,{texts:t}),Object(b.jsx)("h1",{children:c})]})},x=function(e){var t=e.onClick,n=Object(c.useState)(!1),s=Object(i.a)(n,2),a=s[0],r=s[1];return Object(b.jsx)("div",{className:"log-in-button",children:Object(b.jsx)("button",{onClick:function(){r(!a),t(a)},children:a?"Back":"Sign in"})})},g=function(e){var t=e.changr,n=Object(c.useState)(""),s=Object(i.a)(n,2),a=s[0],r=s[1],l=Object(c.useState)(""),j=Object(i.a)(l,2),d=j[0],h=j[1],O=Object(o.g)();Object(o.h)();return Object(b.jsx)("div",{className:"Sform",onSubmit:function(e){if(e.preventDefault(),a&&d){u.a.get("http://localhost:3001/signUp",{params:{userId:a}}).then((function(e){null==e.data?alert("this user does not exist"):e.data.password!=d?alert("The username or password is incorrect"):(u.a.get("http://localhost:3001/signIn",{params:{userId:a}}).then((function(e){t(e.data.userid),localStorage.setItem("uid",e.data.userid)})),O.push("/create"))})),r(""),h("")}else alert("no Username or Password entered")},children:Object(b.jsxs)("form",{children:[Object(b.jsx)("input",{placeholder:"Username",value:a,onChange:function(e){return r(e.target.value)}}),Object(b.jsx)("input",{placeholder:"Password",value:d,onChange:function(e){return h(e.target.value)}}),Object(b.jsx)("input",{type:"submit",value:"login"})]})})},f=function(e){var t=e.onClick,n=Object(c.useState)(!1),s=Object(i.a)(n,2),a=s[0],r=s[1];return Object(b.jsx)("div",{className:"sign-up-button",children:Object(b.jsx)("button",{onClick:function(){r(!a),t(a)},children:a?"Back":"Sign Up"})})},v=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(""),r=Object(i.a)(a,2),o=r[0],l=r[1];return Object(b.jsx)("div",{className:"Sform",onSubmit:function(e){if(e.preventDefault(),n&&o){var t={title:n,userId:n,password:o};u.a.get("http://localhost:3001/signUp",{params:{userId:n}}).then((function(e){null==e.data?u.a.post("http://localhost:3001/signUp",t):alert("this user already exists")})),s(""),l("")}else alert("no Username or Password entered")},children:Object(b.jsxs)("form",{children:[Object(b.jsx)("input",{placeholder:"Username",value:n,onChange:function(e){return s(e.target.value)}}),Object(b.jsx)("input",{placeholder:"Password",value:o,onChange:function(e){return l(e.target.value)}}),Object(b.jsx)("input",{type:"submit",value:"login"})]})})},m=n(59),S=Object(m.io)("http://localhost:3002",{withCredentials:!1,extraHeaders:{"my-custom-header":"abcd"}});S.on("connect",(function(){S.send("Hello!"),console.log(S.id)}));var w=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(!1),r=Object(i.a)(a,2),j=r[0],u=r[1],h=Object(c.useState)(""),O=Object(i.a)(h,2),m=O[0],w=O[1],C=Object(c.useState)(""),I=Object(i.a)(C,2),k=I[0],U=I[1];S.on("recieve-message",(function(e){console.log(e),U(e)}));var y=function(){u(!j)};return Object(c.useEffect)((function(){w(window.localStorage.getItem("uid"))}),[]),Object(c.useEffect)((function(){window.localStorage.setItem("uid",m)}),[m]),Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(l.a,{children:Object(b.jsxs)("div",{children:[Object(b.jsx)("nav",{children:Object(b.jsx)("ul",{children:Object(b.jsxs)("div",{children:[Object(b.jsx)("li",{children:Object(b.jsx)(l.b,{to:"/signIn",children:"Sign In"})}),Object(b.jsx)("li",{children:Object(b.jsx)(l.b,{to:"/signUp",children:"signUp"})})]})})}),Object(b.jsxs)(o.d,{children:[Object(b.jsxs)(o.b,{path:"/signUp",children:[Object(b.jsx)(f,{onClick:y}),j?Object(b.jsx)(v,{}):Object(b.jsx)("p",{})]}),Object(b.jsxs)(o.b,{path:"/signIn",children:[Object(b.jsx)(x,{onClick:y}),j?Object(b.jsx)(g,{changr:function(e){w(e)}}):Object(b.jsx)("p",{})]}),Object(b.jsxs)(o.b,{path:"/create",children:[Object(b.jsx)(p,{texts:n,uid:m,rmessage:k}),Object(b.jsx)(d,{addText:function(e){s(e),S.emit("send-message",e)}})]})]})]})})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,120)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(l.a,{children:Object(b.jsx)(w,{})})}),document.getElementById("root")),C()},64:function(e,t,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.a3ec0d87.chunk.js.map
(this.webpackJsonplab2project=this.webpackJsonplab2project||[]).push([[0],{17:function(t,e,n){},18:function(t,e,n){},22:function(t,e,n){"use strict";n.r(e);var c=n(1),o=n.n(c),i=n(11),r=n.n(i),u=(n(17),n(5)),a=n(7),s=n(3),l=n(2),d=(n.p,n(18),n(0));var b=function(t){var e=Object(c.useState)(t.completed),n=Object(l.a)(e,2),o=n[0],i=n[1],r=Object(c.useState)(!0),u=Object(l.a)(r,2),a=u[0],s=u[1],b=Object(c.useState)(t.task),j=Object(l.a)(b,2),p=j[0],f=j[1];return Object(d.jsx)("li",{children:Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{type:"checkbox",onChange:function(){i(!o),t.onTaskCompleted(t.id,"completed",!o),t.displayButtons(!o)},checked:!1,class:o?"checked":"unchecked"}),Object(d.jsx)("span",{suppressContentEditableWarning:!0,contentEditable:a,onKeyDown:function(e){return"Enter"===e.code?(s(!1),t.onTaskCompleted(t.id,"task",p),void setTimeout((function(){s(!0)}),50)):null},class:o?"checked-text":"unchecked-text",onInput:function(t){return f(t.currentTarget.textContent)},children:t.task})]})},t.key)},j=n(12),p=n.n(j),f=4;var O=function(t){var e=Object(c.useState)(null),n=Object(l.a)(e,2),o=n[0],i=n[1],r=Object(c.useState)(!0),a=Object(l.a)(r,2),j=a[0],O=a[1],h=Object(c.useState)(1),m=Object(l.a)(h,2),k=m[0],x=m[1];function C(){if(null!==o&&""!==o){var e={id:(++f).toString(),task:o,completed:!1};t.onNewItemAdded(e),i("")}}var g=function(t){var e=t.filter((function(t){return t.completed})),n=t.filter((function(t){return!t.completed}));return[].concat(Object(u.a)(n),Object(u.a)(e))}(t.list);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h1",{id:"top-title",children:"To-Do List"}),Object(d.jsxs)("div",{id:"container",children:[Object(d.jsxs)("div",{id:"enter-item",children:[Object(d.jsx)("input",{type:"text",value:o,id:"input-text",onKeyDown:function(t){return"Enter"===t.code?C():null},onChange:function(t){return i(t.target.value)},placeholder:"Add a task..."}),Object(d.jsx)("span",{id:"enter-span",children:Object(d.jsx)("button",{class:""!==o&&null!==o?"show-buttons":"grey-buttons",onClick:C,id:"enter-button",children:"+"})})]}),Object(d.jsx)("div",{class:"ListItems",children:Object(d.jsx)("ul",{id:"list",children:j?g.map((function(e){return Object(d.jsx)(b,Object(s.a)({onTaskCompleted:function(e,n,c){return t.onContentChange(e,n,c)},displayButtons:function(t){return x(t?k+1:k-1)}},e),e.id)})):g.filter((function(t){return!1===t.completed})).map((function(e){return Object(d.jsx)(b,Object(s.a)({onTaskCompleted:function(e,n,c){return t.onContentChange(e,n,c)},displayButtons:function(t){return x(t?k+1:k-1)}},e),e.id)}))})}),Object(d.jsx)("button",{class:k>0?"show-buttons":"grey-buttons",id:"hide-completed-button",onClick:function(){return O(!j)},children:j?"Hide Completed":"Show Completed"}),Object(d.jsx)("button",{class:k>0&&j?"show-buttons":"grey-buttons",id:"delete-button",onClick:function(){p()({title:"Are you sure?",text:"Once deleted, you will not be able to recover completed tasks!",icon:"warning",buttons:["No","Yes"],dangerMode:!0}).then((function(e){if(e){var n=g.filter((function(t){return!1===t.completed}));t.onDeleteItem(n),x(0)}}))},children:"Delete Completed"})]})]})};var h=function(t){var e=Object(c.useState)(t.data),n=Object(l.a)(e,2),o=n[0],i=n[1];return Object(d.jsx)(O,{list:o,onContentChange:function(t,e,n){if("task"!==e||""!=n&&null==n){var c=o.map((function(c){return c.id===t?Object(s.a)(Object(s.a)({},c),{},Object(a.a)({},e,n)):c}));i(c)}else{var r=o.filter((function(e){return e.id!=t}));i(r)}},onNewItemAdded:function(t){i([].concat(Object(u.a)(o),[t]))},onDeleteItem:function(t){i(t)}})},m=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(e){var n=e.getCLS,c=e.getFID,o=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),c(t),o(t),i(t),r(t)}))};r.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(h,{data:[{id:"1",task:"Sleep",completed:!1},{id:"2",task:"Start CS124 Lab3",completed:!1},{id:"3",task:"Submit CS124 Lab2",completed:!0},{id:"4",task:"Enjoy Fall Break!",completed:!1}]})}),document.getElementById("root")),m()}},[[22,1,2]]]);
//# sourceMappingURL=main.a81343df.chunk.js.map
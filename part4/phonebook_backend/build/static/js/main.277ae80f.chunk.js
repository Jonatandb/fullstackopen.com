(this["webpackJsonpphonebook-frontend-jonatandb"]=this["webpackJsonpphonebook-frontend-jonatandb"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=t(4),l=t(2);function i(e){var n=e.handleSubmit,t=e.handleChangeName,a=e.handleChangeNumber,o=e.newName,c=e.newNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))}function m(e){var n=e.id,t=e.name,a=e.number,o=e.handleDelete;return r.a.createElement("div",null,t," ",a," ",r.a.createElement("button",{onClick:function(){return o(n)}},"delete"))}function s(e){var n=e.persons,t=e.handleDelete;return n.map((function(e){return r.a.createElement(m,Object.assign({key:e.name},e,{handleDelete:t}))}))}function d(e){var n=e.handleChangeFilter;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n}))}var f=function(e){var n=e.message;if(null===n)return null;var t=n.error?"red":"green",a={border:"5px solid ".concat(t),color:t,backgroundColor:"#ccc",margin:5,padding:10,borderRadius:5};return r.a.createElement("div",{style:a},n.message)},h=t(3),b=t.n(h),g="/api/persons",p=function(){return b.a.get(g).then((function(e){return e.data}))},E=function(e){return b.a.post(g,e).then((function(e){return e.data}))},v=function(e){return b.a.delete("".concat(g,"/").concat(e)).then((function(e){return e}))},w=function(e){return b.a.put("".concat(g,"/").concat(e.id),e).then((function(e){return e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(null),m=Object(l.a)(c,2),h=m[0],b=m[1],g=Object(a.useState)(""),j=Object(l.a)(g,2),k=j[0],O=j[1],C=Object(a.useState)(""),N=Object(l.a)(C,2),S=N[0],y=N[1],T=Object(a.useState)(""),D=Object(l.a)(T,2),F=D[0],J=D[1],x=function(){p().then((function(e){o(e)})).catch((function(e){b({message:"Error connecting to service: ".concat(e),error:!0}),setTimeout((function(){b(null)}),5e3)}))},A=function(){E({name:k,number:S}).then((function(e){o(t.concat(e)),O(""),y(""),b({message:"Added ".concat(e.name),error:!1}),setTimeout((function(){b(null)}),5e3)})).catch((function(e){b({message:"Error adding: ".concat(e),error:!0}),setTimeout((function(){b(null)}),5e3)}))},I=function(e){var n=Object(u.a)(Object(u.a)({},e),{},{number:S});w(n).then((function(e){o(t.map((function(e){return e.id!==n.id?e:n}))),O(""),y(""),b({message:"Updated ".concat(n.name),error:!1}),setTimeout((function(){b(null)}),5e3)})).catch((function(e){b({message:"Error updating: ".concat(e),error:!0}),setTimeout((function(){b(null)}),5e3)}))};Object(a.useEffect)((function(){x()}),[]);var L=t;return F.trim().length>0&&(L=t.filter((function(e){return e.name.toLowerCase().includes(F.toLowerCase())}))),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook by ",r.a.createElement("a",{href:"https://www.github.com/jonatandb",target:"_blank",rel:"noopener noreferrer"},"Jonatandb")),r.a.createElement(f,{message:h}),r.a.createElement(d,{handleChangeFilter:function(e){return J(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(i,{handleSubmit:function(e){if(e.preventDefault(),0!==k.trim().length){var n=t.find((function(e){return e.name.trim()===k.trim()}));if(n)window.confirm("".concat(n.name,"'s is already added to phonebook, replace the old number with a new one?"))&&I(n);else A()}},handleChangeName:function(e){return O(e.target.value)},handleChangeNumber:function(e){return y(e.target.value)},newName:k,newNumber:S}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(s,{persons:L,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&v(e).then((function(e){x()})).catch((function(a){404===a.response.status?(b({message:"Information of ".concat(n.name," has already been removed from server"),error:!0}),o(t.filter((function(n){return n.id!==e?n:null})))):b({message:"Error deleting: ".concat(a),error:!0}),setTimeout((function(){b(null)}),5e3)}))}}),r.a.createElement("h5",null,"Thanks to ",r.a.createElement("a",{href:"https://fullstackopen.com/en",target:"_blank",rel:"noopener noreferrer"},"Full stack open 2020")))};t(37);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.277ae80f.chunk.js.map
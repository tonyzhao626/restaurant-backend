(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58b31a04"],{"2f752":function(e,t,n){"use strict";var a=n("4cb8"),r=n.n(a);r.a},"4cb8":function(e,t,n){},"4f85":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.value?n("div",{staticClass:"datetime-created"},[n("v-icon",{attrs:{name:"today",color:"--input-icon-color"}}),e._v(" "+e._s(e.displayValue)+" ")],1):n("v-input",{attrs:{placeholder:e.$t(e.newItem?"interfaces.datetime-created.now":"interfaces.datetime-created.unknown"),"icon-right":"today",readonly:""}})},r=[],c=n("750b"),u=n("e164"),i=n("9923"),o=i.i18n,l=Object(c["b"])({props:{value:{type:String,default:null},newItem:{type:Boolean,required:!0},options:{type:Object,required:!0}},setup:function(e){var t=Object(c["a"])((function(){if(!e.value)return null;var t=new Date(e.value);return e.options.showRelative?Object(u["a"])(t).value:o.d(t,"long")+" GMT"}));return{displayValue:t}}}),s=l,d=(n("2f752"),n("2877")),f=Object(d["a"])(s,a,r,!1,null,"5193a958",null);t["default"]=f.exports},e164:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("750b"),r=n("1556");function c(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6e4,c={addSuffix:!0},u=Object(a["f"])(Object(r["a"])(e,new Date,c));return 0!==n&&(Object(a["d"])((function(){t=setInterval((function(){u.value=Object(r["a"])(e,new Date,c)}),n)})),Object(a["e"])((function(){clearInterval(t)}))),u}}}]);
//# sourceMappingURL=chunk-58b31a04.b453347d.js.map
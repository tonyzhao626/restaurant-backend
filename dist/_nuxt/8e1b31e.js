(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{485:function(e,t,o){var content=o(528);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(11).default)("9e2832ec",content,!0,{sourceMap:!1})},527:function(e,t,o){"use strict";o(485)},528:function(e,t,o){var r=o(10)(!1);r.push([e.i,".custom-form[data-v-3ae82f8b]{border:1px solid #d3ced2;padding:20px;margin:2em 0;text-align:left;border-radius:5px}.custom-form input[data-v-3ae82f8b]{font-size:16px;font-size:1.6rem;font-family:inherit;letter-spacing:normal;background:#f5f5f5;border:0;border-radius:0;outline-style:none;padding:15px}.custom-form input[data-v-3ae82f8b],.custom-form textarea[data-v-3ae82f8b]{box-sizing:border-box;width:100%;margin:0;outline:0;line-height:normal}@media only screen and (max-width:1282px){.woocommerce-page .col2-set .col-1[data-v-3ae82f8b],.woocommerce .col2-set .col-1[data-v-3ae82f8b]{width:100%;float:none;padding-right:0}.woocommerce-page .col2-set .col-2[data-v-3ae82f8b],.woocommerce .col2-set .col-2[data-v-3ae82f8b]{float:none;width:100%}}",""]),e.exports=r},563:function(e,t,o){"use strict";o.r(t);o(23);var r=o(2),c=o(94),n={data:function(){return{error:!1,errorMessage:"No error."}},transition:{name:"fade",mode:"out-in",enterClass:"fade-enter",duration:150},methods:{register:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post(e.$store.state.apiConfiguration.baseUrl+e.$store.state.apiConfiguration.urlRegister,{email:document.getElementById("reg_email").value,password:document.getElementById("reg_password").value,status:"active"});case 2:1===t.sent.status?Object(c.loginAndGetJwt)(document.getElementById("reg_email").value,document.getElementById("reg_password").value,e.$axios,e.$store)&&e.$router.push({path:"/wizard"}):(e.error=!0,e.errorMessage="Account with this email already exists.");case 4:case"end":return t.stop()}}),t)})))()},login:function(){Object(c.loginAndGetJwt)(document.getElementById("username").value,document.getElementById("password").value,this.$axios,this.$store)?this.$router.push({path:"/wizard"}):(this.error=!0,this.errorMessage="Wrong credentials")}},mounted:function(){this.$store.state.logedIn&&this.$router.push({path:"/wizard"})}},m=(o(527),o(5)),component=Object(m.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"site-main",attrs:{id:"main"}},[o("div",{staticClass:"content-area",attrs:{id:"primary"}},[o("div",{staticClass:"site-content",attrs:{id:"content",role:"main"}},[o("article",{staticClass:"post-17 page type-page status-publish hentry",attrs:{id:"post-17"}},[e._m(0),e._v(" "),o("div",{staticClass:"entry-content"},[o("div",{staticClass:"container"},[o("div",{staticClass:"woocommerce"},[o("div",{staticClass:"woocommerce-notices-wrapper"}),e._v(" "),e.error?o("div",{staticClass:"woocommerce-notices-wrapper"},[o("ul",{staticClass:"woocommerce-error",attrs:{role:"alert"}},[o("li",[o("strong",[e._v("Error:")]),e._v(" "+e._s(e.errorMessage))])])]):e._e(),e._v(" "),o("div",{staticClass:"u-columns col2-set",attrs:{id:"customer_login"}},[o("div",{staticClass:"u-column1 col-1"},[o("h2",[e._v("Login")]),e._v(" "),o("div",{staticClass:"woocommerce-form woocommerce-form-login login custom-form",attrs:{method:"post"}},[e._m(1),e._v(" "),e._m(2),e._v(" "),o("p",{staticClass:"form-row"},[e._m(3),e._v(" "),o("input",{attrs:{type:"hidden",id:"woocommerce-login-nonce",name:"woocommerce-login-nonce",value:"b0439e0209"}}),o("input",{attrs:{type:"hidden",name:"_wp_http_referer",value:"/my-account/"}}),e._v(" "),o("button",{staticClass:"woocommerce-button button woocommerce-form-login__submit",attrs:{type:"submit",name:"login",value:"Log in"},on:{click:function(t){return e.login()}}},[e._v("\n                          Log in\n                        ")])]),e._v(" "),e._m(4)])]),e._v(" "),o("div",{staticClass:"u-column2 col-2"},[o("h2",[e._v("Register")]),e._v(" "),o("div",{staticClass:"woocommerce-form woocommerce-form-register custom-form",attrs:{method:"post"}},[e._m(5),e._v(" "),e._m(6),e._v(" "),o("div",{staticClass:"woocommerce-privacy-policy-text"}),e._v(" "),e._m(7),e._v(" "),o("p",{staticClass:"woocommerce-FormRow form-row"},[o("button",{staticClass:"woocommerce-Button woocommerce-button button woocommerce-form-register__submit",on:{click:function(t){return e.register()}}},[e._v("\n                          Register\n                        ")])])])])])])])])])])])])])}),[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("header",{staticClass:"entry-header"},[o("div",{staticClass:"container"},[o("h1",{staticClass:"entry-title"},[e._v("My Account")])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"},[o("label",{attrs:{for:"username"}},[e._v("Email address")]),e._v(" "),o("input",{staticClass:"woocommerce-Input woocommerce-Input--text input-text",attrs:{type:"text",name:"username",id:"username",autocomplete:"username",value:""}})])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"},[o("label",{attrs:{for:"password"}},[e._v("Password")]),e._v(" "),o("span",{staticClass:"password-input"},[o("input",{staticClass:"woocommerce-Input woocommerce-Input--text input-text",attrs:{type:"password",name:"password",id:"password",autocomplete:"current-password"}}),o("span",{staticClass:"show-password-input"})])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("label",{staticClass:"woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme"},[o("input",{staticClass:"woocommerce-form__input woocommerce-form__input-checkbox",staticStyle:{width:"max-content !important"},attrs:{name:"rememberme",type:"checkbox",id:"rememberme",value:"forever"}}),e._v(" "),o("span",[e._v("Remember me")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"woocommerce-LostPassword lost_password"},[o("a",{attrs:{href:""}},[e._v("Lost your password?")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"},[o("label",{attrs:{for:"reg_email"}},[e._v("Email address")]),e._v(" "),o("input",{staticClass:"woocommerce-Input woocommerce-Input--text input-text",attrs:{type:"email",name:"email",id:"reg_email",autocomplete:"email",value:""}})])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide"},[o("label",{attrs:{for:"reg_password"}},[e._v("Password")]),e._v(" "),o("span",{staticClass:"password-input"},[o("input",{staticClass:"woocommerce-Input woocommerce-Input--text input-text",attrs:{type:"password",name:"password",id:"reg_password",autocomplete:"new-password"}}),o("span",{staticClass:"show-password-input"})])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"automatewoo-optin form-row"},[o("label",{staticClass:"woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"},[o("input",{staticClass:"woocommerce-form__input woocommerce-form__input-checkbox input-checkbox",staticStyle:{width:"max-content !important"},attrs:{type:"checkbox",name:"automatewoo_optin",id:"automatewoo_optin"}}),e._v(" "),o("span",{staticClass:"automatewoo-optin__checkbox-text"},[e._v("I want to receive updates about products and\n                            promotions.")])])])}],!1,null,"3ae82f8b",null);t.default=component.exports}}]);
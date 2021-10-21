(window.webpackJsonp=window.webpackJsonp||[]).push([[45,13,30,53,58],{312:function(e,t,r){"use strict";r.r(t),r.d(t,"getProductById",(function(){return l})),r.d(t,"checkIfContains",(function(){return c})),r.d(t,"getProductByIndex",(function(){return o})),r.d(t,"getSideDishByIndex",(function(){return d})),r.d(t,"checkIfMealIsSelected",(function(){return f})),r.d(t,"checkIfMealIsDone",(function(){return v})),r.d(t,"addSelectedDish",(function(){return h})),r.d(t,"removeSelectedDish",(function(){return m})),r.d(t,"getDishesByIndexAndMealId",(function(){return C})),r.d(t,"getBreakfastCount",(function(){return w})),r.d(t,"getAllMealsByIndex",(function(){return x})),r.d(t,"getFreeIndexes",(function(){return k})),r.d(t,"checkIfSideDishIsSelected",(function(){return B})),r.d(t,"changePortionSize",(function(){return $})),r.d(t,"getBreakfastItemsTotalPrice",(function(){return D})),r.d(t,"removeBreakfastById",(function(){return M})),r.d(t,"getWholeMealCalories",(function(){return _})),r.d(t,"getWholeMealFat",(function(){return y})),r.d(t,"getWholeMealCarbs",(function(){return A})),r.d(t,"getWholeMealProtein",(function(){return S})),r.d(t,"getWholeBreakfastProtein",(function(){return N})),r.d(t,"getWholeBreakfastCarbs",(function(){return V})),r.d(t,"getWholeBreakfastFat",(function(){return I})),r.d(t,"getWholeBreakfastCalories",(function(){return z})),r.d(t,"getMealsCount",(function(){return O})),r.d(t,"getVeganBowlInOneItem",(function(){return Z})),r.d(t,"getWholeBreakfastValues",(function(){return F})),r.d(t,"getWholeSnackValues",(function(){return P})),r.d(t,"sortArray",(function(){return j})),r.d(t,"deleteMealMenu",(function(){return W})),r.d(t,"setGlobalFilters",(function(){return E}));var n=r(25);r(22),r(93),r(49),r(60),r(12),r(8),r(24),r(148);function l(e,t){for(var r=e.state.wizard.products,i=0;i<r.length;i++)if(r[i].id===t)return r[i]}function c(e,t){if(null==t)return!1;var r=Object.keys(e);for(var n in r)if(void 0!==e[r[n]]&&t.includes(e[r[n]].key)&&e[r[n]].state)return!0;return!1}function o(e,t){for(var r=e.state.cart.selectedMeals,i=0;i<r.length;i++)if(i===t-1)return r[i]}function d(e,t){for(var r=e.state.wizard.sideDishes,i=0;i<r.length;i++)if(i===t-1)return r[i]}function f(e,t){return void 0!==e.state.cart.selectedMeals[t-1]&&null!=e.state.cart.selectedMeals[t-1]}function v(e,t){if(void 0!==e.state.cart.selectedMeals[t-1]&&null!=e.state.cart.selectedMeals[t-1]){if(void 0!==e.state.cart.selectedDishes[t-1]){for(var r=0,i=0;i<e.state.cart.selectedDishes[t-1].length;i++)0!==e.state.cart.selectedDishes[t-1][i].length&&r++;return 2===r}return!1}return!1}function h(e,t,r,n){var l=[];return l.sideDish=t,l.nbr=r,l.mealIndex=n,e.commit("cart/selectSideDish",l),e.commit("wizard/addDishCount",1),!0}function m(e,t,r){var n=[];return n.nbr=t,n.mealIndex=r,e.commit("cart/removeSideDish",n),e.commit("wizard/decreaseDishCount",1),!0}function C(e,t,r){var n=[];if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)"undefined"!==e.state.cart.selectedDishes[t][i]&&e.state.cart.selectedDishes[t][i].id===r&&(n[i]=e.state.cart.selectedDishes[t][i]);return n}function w(e,t){for(var r=0,i=0;i<e.state.cart.selectedBreakfast.length;i++)"undefined"!==e.state.cart.selectedBreakfast[i].id&&e.state.cart.selectedBreakfast[i].id===t&&r++;return r}function x(e,t){var r=0,n=[];if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].id&&(n[r]=e.state.cart.selectedDishes[t][i],r++);return n}function k(e,t){var r=2;if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].id&&r--;return r}function B(e,t,r){for(var n=0,i=0;i<e.state.cart.selectedDishes[r].length;i++)void 0!==e.state.cart.selectedDishes[r].id&&e.state.cart.selectedDishes[r].id===t&&n++;return n}function $(e,t){e.commit("cart/selectPortionSize",t),e.commit("wizard/refreshPrice",e)}function D(e){return e.state.cart.selectedBreakfast.length*e.state.priceOfEachMeal}function M(e,t){}function _(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].calories),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].calories&&(r+=Number(e.state.cart.selectedDishes[t][i].calories));return r}}function y(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].fat),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].fat&&(r+=Number(e.state.cart.selectedDishes[t][i].fat));return r}}function A(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].carbs),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].carbs&&(r+=Number(e.state.cart.selectedDishes[t][i].carbs));return r}}function S(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].protein),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].protein&&(r+=Number(e.state.cart.selectedDishes[t][i].protein));return r}}function N(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].protein)),r}function V(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].carbs)),r}function I(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].fat)),r}function z(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].calories)),r}function O(e){for(var t=0,i=0;i<e.state.cart.selectedMeals.length;i++)void 0!==e.state.cart.selectedMeals[i]&&t++;return t}function Z(e){for(var t=new Object,r=0,i=0;i<e.state.cart.selectedVeganBowl.length;i++)void 0!==e.state.cart.selectedVeganBowl[i]&&(0===r?(t.name=e.state.cart.selectedVeganBowl[i].name,t.protein=Number(e.state.cart.selectedVeganBowl[i].protein),t.carbs=Number(e.state.cart.selectedVeganBowl[i].carbs),t.fat=Number(e.state.cart.selectedVeganBowl[i].fat),t.calories=Number(e.state.cart.selectedVeganBowl[i].calories)):(t.name+=" &"+e.state.cart.selectedVeganBowl[i].name,t.protein+=Number(e.state.cart.selectedVeganBowl[i].protein),t.carbs+=Number(e.state.cart.selectedVeganBowl[i].carbs),t.fat+=Number(e.state.cart.selectedVeganBowl[i].fat),t.calories+=Number(e.state.cart.selectedVeganBowl[i].calories)),r++);return t}function F(e){var t=new Object;if(t.calories=0,t.fat=0,t.carbs=0,t.protein=0,void 0!==e.state.cart.selectedBreakfast)for(var i=0;i<e.state.cart.selectedBreakfast.length;i++)Object(n.a)(e.state.cart.selectedBreakfast[i])&&(t.calories+=Number(e.state.cart.selectedBreakfast[i].calories),t.fat+=Number(e.state.cart.selectedBreakfast[i].fat),t.carbs+=Number(e.state.cart.selectedBreakfast[i].carbs),t.protein+=Number(e.state.cart.selectedBreakfast[i].protein));return t}function P(e){var t=new Object;if(t.calories=0,t.fat=0,t.carbs=0,t.protein=0,void 0!==e.state.cart.selectedSnacks)for(var i=0;i<e.state.cart.selectedSnacks.length;i++)Object(n.a)(e.state.cart.selectedSnacks[i])&&(t.calories+=Number(e.state.cart.selectedSnacks[i].calories),t.fat+=Number(e.state.cart.selectedSnacks[i].fat),t.carbs+=Number(e.state.cart.selectedSnacks[i].carbs),t.protein+=Number(e.state.cart.selectedSnacks[i].protein));return t}function j(e,t){var r=[];switch(t){case"Less calories":r=e.sort((function(a,b){return a.calories>b.calories?1:-1}));break;case"More calories":r=e.sort((function(a,b){return a.calories<b.calories?1:-1}));break;case"Lower price":r=e.sort((function(a,b){return a.additional_price>b.additional_price?1:-1}));break;case"Higher price":r=e.sort((function(a,b){return a.additional_price<b.additional_price?1:-1}));break;case null:r=e}return r}function W(e){e.commit("cart/setExplicitDishes"),e.commit("cart/setExplicitMeals"),e.commit("cart/generateSideDishes",e.state.wizard.amountOfMeals),e.commit("cart/generateMealItems",e.state.wizard.amountOfMeals)}function E(e,t){var r={},n={},l={},c={};e.forEach((function(e){r[e]={key:e,state:!0},n[e]={key:e,state:!0},l[e]={key:e,state:!0},c[e]={key:e,state:!0}})),t.commit("filters/setMealFilters",r),t.commit("filters/setBreakfastFilters",l),t.commit("filters/setSnackFilters",c),t.commit("filters/setDishesFilters",n)}},327:function(e,t,r){var content=r(364);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("5b389b1a",content,!0,{sourceMap:!1})},339:function(e,t,r){"use strict";r.r(t);var n=r(312),l={props:["dish","mealIndex","stepperIndex","selected"],mounted:function(){for(var i=0;i<this.$store.state.cart.selectedBreakfast.length;i++)void 0!==this.$store.state.cart.selectedBreakfast[i]&&this.$store.state.cart.selectedBreakfast[i].id===this.dish.id&&this.stepperValue++;if(this.stepperValue>0?this.decreaseAvailable=!1:this.decreaseAvailable=!0,2==this.$store.state.cart.selectedBreakfast.length){this.increaseAvailable=!1;for(var e=document.querySelectorAll(".plus-btn-breakfast"),t=0;t<e.length;t++)e[t].setAttribute("disabled","true")}},watch:{stepperIndex:function(){var e=Object(n.getBreakfastCount)(this.$store,this.dish.id);if(0==this.$store.state.cart.selectedBreakfast.length)this.decreaseAvailable=!1,this.$store.state.cart.selectedBreakfast.length>0?this.increaseAvailable=!0:this.increaseAvailable=!1,this.stepperValue=0;else for(var i=0;i<e.length;i++)void 0!==e[i]&&this.stepperValue++;if(2==e){this.increaseAvailable=!1;for(var t=document.querySelectorAll(".plus-btn-breakfast"),r=0;r<t.length;r++)t[r].setAttribute("disabled","true")}if(e<2){this.increaseAvailable=!0;for(var l=document.querySelectorAll(".plus-btn-breakfast"),c=0;c<l.length;c++)l[c].removeAttribute("disabled")}this.stepperValue>0?this.decreaseAvailable=!1:this.decreaseAvailable=!0,this.$store.state.cart.selectedBreakfast.length>0?this.increaseAvailable=!0:this.increaseAvailable=!1}},data:function(){return{decreaseAvailable:!0,increaseAvailable:!0,stepperValue:0}},beforeDestroy:function(){$nuxt.$emit("show-and-count-points",!1,Object(n.getBreakfastItemsTotalPrice)(this.$store))},methods:{addSelectedDishFromStepper:function(){if(this.$store.state.cart.selectedBreakfast.length<2){var e=new Object;if(e.index=this.$store.state.cart.selectedBreakfast.length,e.data=this.dish,this.$store.commit("cart/setBreakfastItem",e),this.stepperValue++,2==this.$store.state.cart.selectedBreakfast.length){this.increaseAvailable=!1;for(var t=document.querySelectorAll(".plus-btn-breakfast"),i=0;i<t.length;i++)t[i].setAttribute("disabled","true")}this.stepperValue>0?this.decreaseAvailable=!1:this.decreaseAvailable=!0,$nuxt.$emit("show-and-count-points",!0,this.$store.state.breakfastPrice),$nuxt.$emit("check-addons"),this.$store.commit("wizard/refreshPrice",this.$store),$nuxt.$emit("breakfast-values-refresh")}},removeSelectedDishFromStepper:function(){if(this.$store.state.cart.selectedBreakfast.length>0){if(this.$store.commit("cart/removeBreakfast",this.dish.id),this.stepperValue--,this.$store.state.cart.selectedBreakfast.length<2){this.increaseAvailable=!0;for(var e=document.querySelectorAll(".plus-btn-breakfast"),i=0;i<e.length;i++)e[i].removeAttribute("disabled")}0===this.stepperValue?(this.decreaseAvailable=!0,$nuxt.$emit("show-and-count-points",!0,0)):$nuxt.$emit("show-and-count-points",!0,this.$store.state.breakfastPrice),$nuxt.$emit("check-addons"),this.$store.commit("wizard/refreshPrice",this.$store),$nuxt.$emit("breakfast-values-refresh")}}}},c=r(5),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"side-meal-stepper-box"},[r("button",{staticClass:"stepper-btn",attrs:{disabled:e.decreaseAvailable},on:{click:function(t){return e.removeSelectedDishFromStepper()}}},[r("svg",{attrs:{width:"16",height:"4",viewBox:"0 0 16 4",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("rect",{attrs:{width:"16",height:"4",rx:"2",fill:"white"}})])]),e._v(" "),r("p",{staticClass:"stepper-nbr"},[e._v(e._s(e.stepperValue))]),e._v(" "),r("button",{staticClass:"stepper-btn plus-btn-breakfast",attrs:{disabled:!e.increaseAvailable},on:{click:function(t){return e.addSelectedDishFromStepper()}}},[r("svg",{attrs:{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6.66667 0C5.74619 0 5 0.746192 5 1.66667V5H1.66667C0.746192 5 0 5.74619 0 6.66667C0 7.58714 0.746192 8.33333 1.66667 8.33333H5V11.6667C5 12.5871 5.74619 13.3333 6.66667 13.3333C7.58714 13.3333 8.33333 12.5871 8.33333 11.6667V8.33333H11.6667C12.5871 8.33333 13.3333 7.58714 13.3333 6.66667C13.3333 5.74619 12.5871 5 11.6667 5H8.33333V1.66667C8.33333 0.746192 7.58714 0 6.66667 0Z",fill:"white"}})])])])}),[],!1,null,null,null);t.default=component.exports},363:function(e,t,r){"use strict";r(327)},364:function(e,t,r){var n=r(10)(!1);n.push([e.i,".view[data-v-26236bb9]{width:100%;height:100%;overflow-y:scroll}.finalize-order[data-v-26236bb9]{display:none}.side-meal-stepper-box[data-v-26236bb9]{padding:8px;background:#f6f9fc;border-radius:8px;display:inline-block;vertical-align:middle}.view-content[data-v-26236bb9]{width:calc(100% - 48px);margin-top:20px}.meal-nav[data-v-26236bb9]{height:65px;background-color:#fff;width:100%;overflow-x:scroll;overflow-y:hidden;position:relative}.return-nav-arrow[data-v-26236bb9]{height:100%;width:56px;position:relative;cursor:pointer}.return-nav-arrow svg[data-v-26236bb9]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.meal-nav-header[data-v-26236bb9]{font-family:Nunito;font-weight:800;font-size:20px;text-align:center;text-transform:uppercase;color:#3c3c3c;position:absolute}.return-nav-arrow svg path[data-v-26236bb9]{transition:.25s ease}.return-nav-arrow:hover svg path[data-v-26236bb9]{fill:#434343}.meal-nbr-index[data-v-26236bb9]{font-family:Nunito;font-style:normal;font-weight:800;font-size:18px;line-height:25px;margin-bottom:8px;margin-top:8px}.meal-nbr-index[data-v-26236bb9]:first-of-type{margin-top:0}.meal-item-icon-wrapper[data-v-26236bb9]{background:#e0e9ef;border-radius:20px;width:80px;height:80px;display:inline-block;vertical-align:middle;position:relative}.meal-item-icon-wrapper svg[data-v-26236bb9]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.meal-item-name[data-v-26236bb9]{display:inline-block;margin-top:0;margin-bottom:0}.meal-item[data-v-26236bb9]{margin-top:16px;position:relative}.meal-item[data-v-26236bb9]:first-child{margin-top:8px}.meal-info-wrapper[data-v-26236bb9]{display:inline-block;margin-left:16px;vertical-align:middle}.meal-values[data-v-26236bb9]{margin-top:6px}.value-pair[data-v-26236bb9]{display:inline-block;vertical-align:middle}.value-pair p[data-v-26236bb9]{font-style:normal;font-weight:400;font-size:16px;line-height:16px;letter-spacing:.192941px;color:#3c3c3c;margin-bottom:0;display:inline-block}.value-pair svg[data-v-26236bb9]{display:inline-block;transform:translateY(1px)}.value-spacer[data-v-26236bb9]{display:inline-block;margin-left:6px;margin-right:6px;width:2px;opacity:.1;background-color:#293f94;height:18px;vertical-align:bottom}.buttons-wrapper[data-v-26236bb9]{vertical-align:middle;position:absolute;right:16px;top:50%;transform:translateY(-50%)}.buttons-wrapper[data-v-26236bb9],.meal-info[data-v-26236bb9]{display:inline-block}.b-t[data-v-26236bb9]{color:#3c3c3c!important}@media only screen and (max-width:1282px){.nav-item[data-v-26236bb9]{width:90px;font-size:14px;line-height:19px}.view[data-v-26236bb9]{transform:translateY(-56px)}.nav-item[data-v-26236bb9]:after{width:60%}.meal-nav[data-v-26236bb9]{height:48px}.desktop-only-not-mobile[data-v-26236bb9],.meal-values[data-v-26236bb9]{display:none}.buttons-wrapper[data-v-26236bb9]{display:block;position:static;transform:none;margin-top:4px;width:100%;display:flex;flex-direction:row;justify-content:flex-end}.buttons-wrapper button[data-v-26236bb9]:first-child{margin-right:4px}.meal-item-icon-wrapper[data-v-26236bb9]{width:56px;height:56px}.ms-outlined-button[data-v-26236bb9]{padding-top:5px;padding-bottom:5px}.select-btn[data-v-26236bb9]{padding-top:6px;padding-bottom:6px}.meal-info-wrapper[data-v-26236bb9]{vertical-align:top;margin-left:4px;max-width:70%}.select-meals-dishes p[data-v-26236bb9]{font-size:14px;line-height:19px}.select-meals-dishes .arrow-dp-box[data-v-26236bb9]{height:16px}.w-meals-view-card[data-v-26236bb9]{padding-top:8px;padding-bottom:8px}.select-entry-meal[data-v-26236bb9]{padding-top:2px}.finalize-order[data-v-26236bb9]{display:block;padding:8px 16px;position:absolute;top:calc(100% - 56px);left:0;width:100%;height:56px;background:#fff;box-shadow:0 -6px 8px rgba(164,182,192,.15)}.finalize-order button[data-v-26236bb9]{font-weight:800;font-size:14px;line-height:19px;border-radius:8px!important;width:100%!important;height:40px!important;padding-top:8px;background:#34bc89;color:#fff}.add-btn[data-v-26236bb9]{margin-top:6px}.w-meals-view-card[data-v-26236bb9]{margin-left:0;margin-right:0}.meal-nav-header[data-v-26236bb9]{width:-webkit-max-content;width:-moz-max-content;width:max-content}}",""]),e.exports=n},414:function(e,t,r){"use strict";r.r(t);var n=r(339),l=r(312),c={components:{stepper:n.default},methods:{goBack:function(){$nuxt.$emit("toggle-view",3),$nuxt.$emit("last-meal-selection-enter"),$nuxt.$emit("nav-bar-toggle",!0),$nuxt.$emit("leave-view",3)},addToOrder:function(){$nuxt.$emit("toggle-view",3),$nuxt.$emit("last-meal-selection-enter"),$nuxt.$emit("nav-bar-toggle",!1),$nuxt.$emit("order-panel-mobile",!0)}},mounted:function(){$nuxt.$emit("show-and-count-points",!0,Object(l.getBreakfastItemsTotalPrice)(this.$store))}},o=(r(363),r(5)),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"view"},[r("div",{staticClass:"meal-nav"},[r("div",{staticClass:"return-nav-arrow",on:{click:function(t){return e.goBack()}}},[r("svg",{attrs:{width:"14",height:"24",viewBox:"0 0 14 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13.4142 20.5858C14.1953 21.3668 14.1953 22.6332 13.4142 23.4142C12.6332 24.1953 11.3668 24.1953 10.5858 23.4142L0.585786 13.4142C-0.195262 12.6332 -0.195262 11.3668 0.585786 10.5858L10.5858 0.585786C11.3668 -0.195262 12.6332 -0.195262 13.4142 0.585786C14.1953 1.36684 14.1953 2.63317 13.4142 3.41421L4.82843 12L13.4142 20.5858Z",fill:"#1A1A1A"}})])]),e._v(" "),r("p",{staticClass:"meal-nav-header center-abs"},[e._v("Add Breakfast ("+e._s(this.$store.state.cart.selectedBreakfast.length)+"/2)")])]),e._v(" "),r("div",{staticClass:"view-content center-hor-margin"},[r("p",{staticClass:"meal-nbr-index"},[e._v("Choose 2 items")]),e._v(" "),e._l(this.$store.state.wizard.breakfastMeals,(function(t){return r("div",{key:t.id,staticClass:"w-meals-view-card meal-item"},[r("div",{staticClass:"meal-item-icon-wrapper"},[r("svg",{attrs:{width:"22",height:"24",viewBox:"0 0 22 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{d:"M16.9421 21.208C15.1731 21.208 13.7338 19.7687 13.7338 17.9993C13.7338 17.6589 13.7878 17.3315 13.8865 17.023C14.4084 17.2447 14.9634 17.4209 15.5516 17.5464C15.6164 17.5605 15.6808 17.5669 15.7441 17.5669C16.1673 17.5669 16.5476 17.2722 16.6396 16.842C16.7458 16.347 16.4303 15.8597 15.9352 15.7536C15.5955 15.6809 15.2726 15.5886 14.9641 15.4783C15.5098 15.0492 16.1956 14.7911 16.9421 14.7911C18.711 14.7911 20.1507 16.2304 20.1507 17.9993C20.1507 19.7687 18.711 21.208 16.9421 21.208ZM18.749 10.2057C18.1366 9.87274 17.4933 9.59188 16.8604 9.31586C14.6896 8.36862 12.626 7.46868 11.5942 4.64966C15.2688 5.0363 17.9522 7.1502 18.749 10.2057ZM8.0015 16.3091C8.45296 17.0373 8.59377 17.8982 8.39821 18.7326C8.20228 19.5669 7.69345 20.275 6.96486 20.7265C6.45641 21.042 5.87309 21.2085 5.27859 21.2085C4.15776 21.2085 3.13713 20.6412 2.54748 19.6902C2.09602 18.9616 1.95522 18.1012 2.15077 17.2668C2.3467 16.4324 2.85553 15.7243 3.58412 15.2725C3.87876 15.09 4.19873 14.9588 4.531 14.8795C4.5973 15.4107 4.7232 15.9687 4.92025 16.5594C5.04802 16.9438 5.40561 17.1871 5.78965 17.1871C5.88575 17.1871 5.98334 17.1718 6.07945 17.1398C6.55959 16.9796 6.81959 16.4607 6.65942 15.9802C6.54543 15.6375 6.462 15.3108 6.40463 14.9961C7.05761 15.2404 7.62007 15.6938 8.0015 16.3091ZM16.9412 12.9578C15.4889 12.9578 14.1788 13.5758 13.2577 14.5617C12.5935 14.0533 12.0474 13.4096 11.6273 12.6307C10.8167 11.1285 10.5061 9.13007 10.6823 6.94391C12.1204 9.24629 14.288 10.1943 16.1262 10.9963C17.3327 11.5226 18.4722 12.0199 19.2611 12.8088C19.4366 12.9842 19.6709 13.0774 19.9093 13.0774H19.9182C20.4222 13.0744 20.8297 12.665 20.8297 12.1603C20.8297 12.1312 20.8282 12.1026 20.8256 12.0739C20.7824 7.05492 16.996 3.32367 11.6254 2.8141C11.7241 2.49301 11.8157 2.16224 11.8969 1.81843C11.8996 1.80874 11.8988 1.79943 11.901 1.79012C11.9078 1.75734 11.9107 1.72493 11.9137 1.69252C11.9167 1.66421 11.9197 1.6359 11.9197 1.60797C11.9197 1.57705 11.9167 1.54688 11.9133 1.51633C11.9107 1.48691 11.9081 1.45785 11.9025 1.42954C11.8966 1.40049 11.888 1.37293 11.8794 1.34499C11.8709 1.31668 11.8631 1.28837 11.8519 1.26081C11.8407 1.23361 11.8269 1.20828 11.8131 1.18221C11.7994 1.15651 11.7867 1.13081 11.7707 1.10659C11.7543 1.08164 11.7353 1.05854 11.7167 1.03545C11.6984 1.01273 11.6809 0.990004 11.6608 0.969144C11.6403 0.948285 11.6176 0.92966 11.5949 0.910291C11.5718 0.890548 11.5487 0.871179 11.5237 0.853672C11.5002 0.837655 11.4749 0.824245 11.45 0.81009C11.4216 0.794446 11.3933 0.778801 11.3632 0.765764C11.3539 0.762039 11.3464 0.756451 11.3371 0.752726C11.317 0.744904 11.2961 0.741924 11.2756 0.735592C11.2555 0.72926 11.2373 0.72032 11.2164 0.715105C11.2067 0.71287 11.1974 0.713242 11.1881 0.71138C11.1553 0.704675 11.1233 0.701695 11.0905 0.698343C11.0622 0.695735 11.0339 0.692383 11.0056 0.692383C10.975 0.692383 10.9452 0.695735 10.9147 0.698715C10.8853 0.701695 10.8558 0.704303 10.8272 0.70989C10.7985 0.715477 10.7713 0.724045 10.7437 0.732612C10.715 0.741179 10.6863 0.749374 10.6588 0.760549C10.632 0.771724 10.6066 0.785506 10.5806 0.798915C10.5549 0.812698 10.5288 0.825735 10.5042 0.841752C10.4792 0.858142 10.4565 0.876766 10.4334 0.895391C10.4107 0.913643 10.388 0.93115 10.3671 0.951637C10.3459 0.972124 10.3276 0.994846 10.3083 1.0172C10.2885 1.04066 10.2692 1.06338 10.2517 1.08871C10.2356 1.11218 10.2222 1.13714 10.2081 1.16247C10.1924 1.19078 10.1768 1.21909 10.1637 1.24926C10.16 1.25857 10.1541 1.26602 10.1507 1.27533C9.85458 2.03745 9.61097 2.79994 9.41131 3.55685C8.74939 5.15186 7.8759 6.46377 7.02177 7.74291C5.89946 9.42434 4.81848 11.0462 4.54209 13.0111C3.86304 13.1109 3.20783 13.3485 2.61743 13.7143C1.47276 14.4239 0.673021 15.5369 0.365715 16.8477C0.0580365 18.1589 0.279297 19.5114 0.988894 20.6561C1.91491 22.1502 3.51849 23.0419 5.27814 23.0419C6.21421 23.0419 7.13166 22.78 7.93065 22.2846C9.07532 21.5754 9.87506 20.4624 10.1827 19.1512C10.4904 17.84 10.2688 16.4875 9.55919 15.3432C8.83395 14.1729 7.69226 13.3746 6.38667 13.0826C6.64258 11.6138 7.50378 10.3235 8.54676 8.76093C8.62945 8.63652 8.71326 8.51136 8.79744 8.38471C8.83432 10.3038 9.23624 12.0601 10.0136 13.5013C10.5821 14.5547 11.3423 15.43 12.2683 16.1094C12.031 16.6935 11.8996 17.3312 11.8996 17.9995C11.8996 20.7798 14.161 23.0415 16.9412 23.0415C19.7215 23.0415 21.9833 20.7798 21.9833 17.9995C21.9833 15.2196 19.7215 12.9578 16.9412 12.9578Z",fill:"#293F94"}})])]),e._v(" "),r("div",{staticClass:"meal-info-wrapper"},[r("p",{staticClass:"meal-item-name"},[e._v(e._s(t.name))]),e._v(" "),r("div",{staticClass:"meal-values"},[r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"14",viewBox:"0 0 12 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{d:"M9.38761 13.0226C9.00438 13.3174 8.50324 13.5975 7.92841 13.8038C7.81049 13.848 7.69258 13.7301 7.72206 13.6122C7.81049 13.2437 7.86945 12.8605 7.86945 12.4625C7.86945 10.4137 6.42499 8.6745 5.92385 8.11441C5.82068 8.01123 5.65854 8.01123 5.57011 8.11441C5.06897 8.65976 3.62451 10.399 3.62451 12.4625C3.62451 12.9194 3.69821 13.3764 3.81612 13.7891C3.8456 13.907 3.74243 14.0249 3.62451 13.9954C2.63697 13.7301 1.84105 13.3027 1.54626 13.0668C-0.856261 11.0328 -0.0161164 7.83436 1.10408 6.15407C2.34218 4.25269 3.81612 2.63136 3.74242 0.361494C3.72769 0.0961853 4.02247 -0.0806873 4.2583 0.0372278C6.1302 0.980548 7.41253 3.02932 7.75154 4.66539C8.25267 4.19373 8.45903 3.45676 8.47377 2.80823C8.47377 2.4987 8.87173 2.33657 9.09282 2.5724C10.7731 4.38534 13.3672 9.91261 9.38761 13.0226Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(t.calories)+"g Calories")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"11",height:"14",viewBox:"0 0 11 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0 8.66807C0 5.83383 3.33024 2.16702 5.34964 0C5.57131 0.264132 5.81789 0.550545 6.08002 0.855016C7.96848 3.04852 10.6639 6.17928 10.6639 8.66807C10.6639 10.3332 9.3294 14 5.33193 14C1.33446 14 0 10.3332 0 8.66807ZM1.59364 8.60186C1.542 8.49639 1.49094 8.39208 1.43989 8.2892C0.214175 9.74708 2.65839 13.9336 6.11922 13.2047C3.26094 12.0077 2.36399 10.1755 1.59364 8.60186Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(t.fat)+"g Fat")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"16",viewBox:"0 0 12 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.98674 7.1517C6.51939 6.52504 7.49071 5.20907 7.49071 3.67376C7.49071 2.13846 6.51939 0.791152 5.98674 0.164497C5.79874 -0.0548323 5.48541 -0.0548323 5.29742 0.164497C4.76476 0.791152 3.79344 2.10713 3.79344 3.64243C3.79344 5.17773 4.76476 6.52504 5.29742 7.12036C5.48541 7.33969 5.79874 7.33969 5.98674 7.1517ZM4.80842 10.7982C5.09702 10.8109 5.31667 10.6131 5.29855 10.33C5.28052 9.50593 5.05931 7.8905 3.99766 6.74142C2.94145 5.6232 1.33154 5.33438 0.491175 5.25984C0.202582 5.2471 -0.0170669 5.44491 0.00104422 5.72806C0.01908 6.5521 0.240292 8.16753 1.30194 9.31661C2.36359 10.4657 3.99892 10.7182 4.80842 10.7982ZM5.95426 10.3613C6.00316 9.5427 6.19895 7.89097 7.25516 6.77275C8.31681 5.62367 9.95758 5.3403 10.7616 5.29118C11.0194 5.27299 11.2699 5.47624 11.2518 5.75939C11.2029 6.57799 11.0071 8.22972 9.95088 9.34794C8.89467 10.4662 7.2539 10.7495 6.4444 10.8295C6.18666 10.8477 5.93615 10.6445 5.95426 10.3613ZM4.80842 15.9994C5.09702 16.0122 5.31667 15.8144 5.29855 15.5312C5.28052 14.7072 5.05931 13.0917 3.99766 11.9427C2.94145 10.8244 1.33154 10.5356 0.491175 10.4611C0.202582 10.4483 -0.0170669 10.6461 0.00104422 10.9293C0.01908 11.7533 0.240292 13.3688 1.30194 14.5178C2.36359 15.6669 3.99892 15.9194 4.80842 15.9994ZM7.2553 11.9113C8.3115 10.7931 9.95228 10.5097 10.7618 10.4298C11.0504 10.417 11.2646 10.6457 11.2519 10.898C11.203 11.7166 11.0072 13.3683 9.95101 14.4865C8.89481 15.6047 7.25404 15.8881 6.44453 15.9681C6.1868 15.9863 5.93629 15.783 5.9544 15.4999C6.00329 14.6813 6.19909 13.0296 7.2553 11.9113Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(t.carbs)+"g Carbs")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"16",viewBox:"0 0 12 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.98674 7.1517C6.51939 6.52504 7.49071 5.20907 7.49071 3.67376C7.49071 2.13846 6.51939 0.791152 5.98674 0.164497C5.79874 -0.0548323 5.48541 -0.0548323 5.29742 0.164497C4.76476 0.791152 3.79344 2.10713 3.79344 3.64243C3.79344 5.17773 4.76476 6.52504 5.29742 7.12036C5.48541 7.33969 5.79874 7.33969 5.98674 7.1517ZM4.80842 10.7982C5.09702 10.8109 5.31667 10.6131 5.29855 10.33C5.28052 9.50593 5.05931 7.8905 3.99766 6.74142C2.94145 5.6232 1.33154 5.33438 0.491175 5.25984C0.202582 5.2471 -0.0170669 5.44491 0.00104422 5.72806C0.01908 6.5521 0.240292 8.16753 1.30194 9.31661C2.36359 10.4657 3.99892 10.7182 4.80842 10.7982ZM5.95426 10.3613C6.00316 9.5427 6.19895 7.89097 7.25516 6.77275C8.31681 5.62367 9.95758 5.3403 10.7616 5.29118C11.0194 5.27299 11.2699 5.47624 11.2518 5.75939C11.2029 6.57799 11.0071 8.22972 9.95088 9.34794C8.89467 10.4662 7.2539 10.7495 6.4444 10.8295C6.18666 10.8477 5.93615 10.6445 5.95426 10.3613ZM4.80842 15.9994C5.09702 16.0122 5.31667 15.8144 5.29855 15.5312C5.28052 14.7072 5.05931 13.0917 3.99766 11.9427C2.94145 10.8244 1.33154 10.5356 0.491175 10.4611C0.202582 10.4483 -0.0170669 10.6461 0.00104422 10.9293C0.01908 11.7533 0.240292 13.3688 1.30194 14.5178C2.36359 15.6669 3.99892 15.9194 4.80842 15.9994ZM7.2553 11.9113C8.3115 10.7931 9.95228 10.5097 10.7618 10.4298C11.0504 10.417 11.2646 10.6457 11.2519 10.898C11.203 11.7166 11.0072 13.3683 9.95101 14.4865C8.89481 15.6047 7.25404 15.8881 6.44453 15.9681C6.1868 15.9863 5.93629 15.783 5.9544 15.4999C6.00329 14.6813 6.19909 13.0296 7.2553 11.9113Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(t.protein)+"g Protein")])])])]),e._v(" "),r("div",{staticClass:"buttons-wrapper"},[r("button",{staticClass:"meal-info b-t ms-outlined-button"},[e._v("INFO")]),e._v(" "),r("stepper",{attrs:{dish:t,selected:0}})],1)])}))],2),e._v(" "),r("div",{staticClass:"finalize-order"},[r("button",{on:{click:function(t){return e.addToOrder()}}},[e._v("add to order")])])])}),[],!1,null,"26236bb9",null);t.default=component.exports}}]);
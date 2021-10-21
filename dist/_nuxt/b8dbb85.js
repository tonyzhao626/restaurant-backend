(window.webpackJsonp=window.webpackJsonp||[]).push([[29,13,53,58],{312:function(e,t,r){"use strict";r.r(t),r.d(t,"getProductById",(function(){return n})),r.d(t,"checkIfContains",(function(){return l})),r.d(t,"getProductByIndex",(function(){return o})),r.d(t,"getSideDishByIndex",(function(){return d})),r.d(t,"checkIfMealIsSelected",(function(){return f})),r.d(t,"checkIfMealIsDone",(function(){return v})),r.d(t,"addSelectedDish",(function(){return h})),r.d(t,"removeSelectedDish",(function(){return m})),r.d(t,"getDishesByIndexAndMealId",(function(){return C})),r.d(t,"getBreakfastCount",(function(){return k})),r.d(t,"getAllMealsByIndex",(function(){return w})),r.d(t,"getFreeIndexes",(function(){return B})),r.d(t,"checkIfSideDishIsSelected",(function(){return D})),r.d(t,"changePortionSize",(function(){return x})),r.d(t,"getBreakfastItemsTotalPrice",(function(){return M})),r.d(t,"removeBreakfastById",(function(){return _})),r.d(t,"getWholeMealCalories",(function(){return N})),r.d(t,"getWholeMealFat",(function(){return y})),r.d(t,"getWholeMealCarbs",(function(){return I})),r.d(t,"getWholeMealProtein",(function(){return S})),r.d(t,"getWholeBreakfastProtein",(function(){return V})),r.d(t,"getWholeBreakfastCarbs",(function(){return z})),r.d(t,"getWholeBreakfastFat",(function(){return Z})),r.d(t,"getWholeBreakfastCalories",(function(){return O})),r.d(t,"getMealsCount",(function(){return W})),r.d(t,"getVeganBowlInOneItem",(function(){return F})),r.d(t,"getWholeBreakfastValues",(function(){return P})),r.d(t,"getWholeSnackValues",(function(){return j})),r.d(t,"sortArray",(function(){return A})),r.d(t,"deleteMealMenu",(function(){return E})),r.d(t,"setGlobalFilters",(function(){return $}));var c=r(25);r(22),r(93),r(49),r(60),r(12),r(8),r(24),r(148);function n(e,t){for(var r=e.state.wizard.products,i=0;i<r.length;i++)if(r[i].id===t)return r[i]}function l(e,t){if(null==t)return!1;var r=Object.keys(e);for(var c in r)if(void 0!==e[r[c]]&&t.includes(e[r[c]].key)&&e[r[c]].state)return!0;return!1}function o(e,t){for(var r=e.state.cart.selectedMeals,i=0;i<r.length;i++)if(i===t-1)return r[i]}function d(e,t){for(var r=e.state.wizard.sideDishes,i=0;i<r.length;i++)if(i===t-1)return r[i]}function f(e,t){return void 0!==e.state.cart.selectedMeals[t-1]&&null!=e.state.cart.selectedMeals[t-1]}function v(e,t){if(void 0!==e.state.cart.selectedMeals[t-1]&&null!=e.state.cart.selectedMeals[t-1]){if(void 0!==e.state.cart.selectedDishes[t-1]){for(var r=0,i=0;i<e.state.cart.selectedDishes[t-1].length;i++)0!==e.state.cart.selectedDishes[t-1][i].length&&r++;return 2===r}return!1}return!1}function h(e,t,r,c){var n=[];return n.sideDish=t,n.nbr=r,n.mealIndex=c,e.commit("cart/selectSideDish",n),e.commit("wizard/addDishCount",1),!0}function m(e,t,r){var c=[];return c.nbr=t,c.mealIndex=r,e.commit("cart/removeSideDish",c),e.commit("wizard/decreaseDishCount",1),!0}function C(e,t,r){var c=[];if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)"undefined"!==e.state.cart.selectedDishes[t][i]&&e.state.cart.selectedDishes[t][i].id===r&&(c[i]=e.state.cart.selectedDishes[t][i]);return c}function k(e,t){for(var r=0,i=0;i<e.state.cart.selectedBreakfast.length;i++)"undefined"!==e.state.cart.selectedBreakfast[i].id&&e.state.cart.selectedBreakfast[i].id===t&&r++;return r}function w(e,t){var r=0,c=[];if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].id&&(c[r]=e.state.cart.selectedDishes[t][i],r++);return c}function B(e,t){var r=2;if(void 0!==e.state.cart.selectedDishes[t])for(var i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].id&&r--;return r}function D(e,t,r){for(var c=0,i=0;i<e.state.cart.selectedDishes[r].length;i++)void 0!==e.state.cart.selectedDishes[r].id&&e.state.cart.selectedDishes[r].id===t&&c++;return c}function x(e,t){e.commit("cart/selectPortionSize",t),e.commit("wizard/refreshPrice",e)}function M(e){return e.state.cart.selectedBreakfast.length*e.state.priceOfEachMeal}function _(e,t){}function N(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].calories),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].calories&&(r+=Number(e.state.cart.selectedDishes[t][i].calories));return r}}function y(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].fat),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].fat&&(r+=Number(e.state.cart.selectedDishes[t][i].fat));return r}}function I(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].carbs),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].carbs&&(r+=Number(e.state.cart.selectedDishes[t][i].carbs));return r}}function S(e,t){if(void 0!==e.state.cart.selectedMeals[t]){for(var r=Number(e.state.cart.selectedMeals[t].protein),i=0;i<e.state.cart.selectedDishes[t].length;i++)void 0!==e.state.cart.selectedDishes[t][i]&&void 0!==e.state.cart.selectedDishes[t][i].protein&&(r+=Number(e.state.cart.selectedDishes[t][i].protein));return r}}function V(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].protein)),r}function z(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].carbs)),r}function Z(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].fat)),r}function O(e,t){var r=0;return void 0!==e.state.cart.selectedBreakfast[t]&&(r+=Number(e.state.cart.selectedBreakfast[t].calories)),r}function W(e){for(var t=0,i=0;i<e.state.cart.selectedMeals.length;i++)void 0!==e.state.cart.selectedMeals[i]&&t++;return t}function F(e){for(var t=new Object,r=0,i=0;i<e.state.cart.selectedVeganBowl.length;i++)void 0!==e.state.cart.selectedVeganBowl[i]&&(0===r?(t.name=e.state.cart.selectedVeganBowl[i].name,t.protein=Number(e.state.cart.selectedVeganBowl[i].protein),t.carbs=Number(e.state.cart.selectedVeganBowl[i].carbs),t.fat=Number(e.state.cart.selectedVeganBowl[i].fat),t.calories=Number(e.state.cart.selectedVeganBowl[i].calories)):(t.name+=" &"+e.state.cart.selectedVeganBowl[i].name,t.protein+=Number(e.state.cart.selectedVeganBowl[i].protein),t.carbs+=Number(e.state.cart.selectedVeganBowl[i].carbs),t.fat+=Number(e.state.cart.selectedVeganBowl[i].fat),t.calories+=Number(e.state.cart.selectedVeganBowl[i].calories)),r++);return t}function P(e){var t=new Object;if(t.calories=0,t.fat=0,t.carbs=0,t.protein=0,void 0!==e.state.cart.selectedBreakfast)for(var i=0;i<e.state.cart.selectedBreakfast.length;i++)Object(c.a)(e.state.cart.selectedBreakfast[i])&&(t.calories+=Number(e.state.cart.selectedBreakfast[i].calories),t.fat+=Number(e.state.cart.selectedBreakfast[i].fat),t.carbs+=Number(e.state.cart.selectedBreakfast[i].carbs),t.protein+=Number(e.state.cart.selectedBreakfast[i].protein));return t}function j(e){var t=new Object;if(t.calories=0,t.fat=0,t.carbs=0,t.protein=0,void 0!==e.state.cart.selectedSnacks)for(var i=0;i<e.state.cart.selectedSnacks.length;i++)Object(c.a)(e.state.cart.selectedSnacks[i])&&(t.calories+=Number(e.state.cart.selectedSnacks[i].calories),t.fat+=Number(e.state.cart.selectedSnacks[i].fat),t.carbs+=Number(e.state.cart.selectedSnacks[i].carbs),t.protein+=Number(e.state.cart.selectedSnacks[i].protein));return t}function A(e,t){var r=[];switch(t){case"Less calories":r=e.sort((function(a,b){return a.calories>b.calories?1:-1}));break;case"More calories":r=e.sort((function(a,b){return a.calories<b.calories?1:-1}));break;case"Lower price":r=e.sort((function(a,b){return a.additional_price>b.additional_price?1:-1}));break;case"Higher price":r=e.sort((function(a,b){return a.additional_price<b.additional_price?1:-1}));break;case null:r=e}return r}function E(e){e.commit("cart/setExplicitDishes"),e.commit("cart/setExplicitMeals"),e.commit("cart/generateSideDishes",e.state.wizard.amountOfMeals),e.commit("cart/generateMealItems",e.state.wizard.amountOfMeals)}function $(e,t){var r={},c={},n={},l={};e.forEach((function(e){r[e]={key:e,state:!0},c[e]={key:e,state:!0},n[e]={key:e,state:!0},l[e]={key:e,state:!0}})),t.commit("filters/setMealFilters",r),t.commit("filters/setBreakfastFilters",n),t.commit("filters/setSnackFilters",l),t.commit("filters/setDishesFilters",c)}},324:function(e,t,r){var content=r(357);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(11).default)("ff6516e0",content,!0,{sourceMap:!1})},356:function(e,t,r){"use strict";r(324)},357:function(e,t,r){var c=r(10)(!1);c.push([e.i,".meal-card[data-v-affd1312]{padding:16px 32px;background:#fff;box-shadow:0 4px 8px #f0f1f5;border-radius:8px;width:100%;margin-bottom:8px}.light-bold[data-v-affd1312]{font-family:Nunito;font-style:normal;font-weight:800;font-size:16px;line-height:22px;color:#a4b6c0}.side-meal[data-v-affd1312]{margin-bottom:0}.meal-name[data-v-affd1312]{font-family:Nunito;font-style:normal;font-weight:800;font-size:18px;line-height:25px;letter-spacing:.2966px;color:#3c3c3c;margin-top:0;margin-bottom:8px}.meal-values[data-v-affd1312]{margin-top:6px}.value-pair[data-v-affd1312]{display:inline-block;vertical-align:middle}.value-pair p[data-v-affd1312]{font-style:normal;font-weight:400;font-size:16px;line-height:16px;letter-spacing:.192941px;color:#3c3c3c;margin-bottom:0;display:inline-block}.value-pair svg[data-v-affd1312]{display:inline-block;transform:translateY(1px)}.value-spacer[data-v-affd1312]{display:inline-block;margin-left:6px;margin-right:6px;width:2px;opacity:.1;background-color:#293f94;height:18px;vertical-align:bottom}.meal-nbr-index[data-v-affd1312]{font-family:Nunito;font-style:normal;font-weight:800;font-size:18px;line-height:25px;margin-bottom:8px;margin-top:8px}.meal-nbr-index[data-v-affd1312]:first-of-type{margin-top:0}",""]),e.exports=c},411:function(e,t,r){"use strict";r.r(t);r(22);var c=r(312),n={data:function(){return{calories:0,carbs:0,protein:0,fat:0,breakfastName:null}},mounted:function(){var e=Object(c.getWholeBreakfastValues)(this.$store);this.calories=e.calories,this.fat=e.fat,this.protein=e.protein,this.carbs=e.carbs,this.breakfastName=this.$store.state.cart.selectedBreakfast[0].name+" w/ "+this.$store.state.cart.selectedBreakfast[1].name}},l=(r(356),r(5)),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",[r("p",{staticClass:"meal-nbr-index"},[e._v("Breakfast")]),e._v(" "),r("div",{staticClass:"meal-card"},[r("p",{staticClass:"meal-name"},[e._v(e._s(e.breakfastName))]),e._v(" "),e._l(this.$store.state.cart.selectedBreakfast,(function(t){return r("p",{key:t.id,staticClass:"side-meal"},[void 0!==t.id?r("span",{staticClass:"light-bold"},[e._v("Breakfast item:")]):e._e(),e._v("\n      "+e._s(t.name)+"\n    ")])})),e._v(" "),r("div",{staticClass:"meal-values"},[r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"14",viewBox:"0 0 12 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{d:"M9.38761 13.0226C9.00438 13.3174 8.50324 13.5975 7.92841 13.8038C7.81049 13.848 7.69258 13.7301 7.72206 13.6122C7.81049 13.2437 7.86945 12.8605 7.86945 12.4625C7.86945 10.4137 6.42499 8.6745 5.92385 8.11441C5.82068 8.01123 5.65854 8.01123 5.57011 8.11441C5.06897 8.65976 3.62451 10.399 3.62451 12.4625C3.62451 12.9194 3.69821 13.3764 3.81612 13.7891C3.8456 13.907 3.74243 14.0249 3.62451 13.9954C2.63697 13.7301 1.84105 13.3027 1.54626 13.0668C-0.856261 11.0328 -0.0161164 7.83436 1.10408 6.15407C2.34218 4.25269 3.81612 2.63136 3.74242 0.361494C3.72769 0.0961853 4.02247 -0.0806873 4.2583 0.0372278C6.1302 0.980548 7.41253 3.02932 7.75154 4.66539C8.25267 4.19373 8.45903 3.45676 8.47377 2.80823C8.47377 2.4987 8.87173 2.33657 9.09282 2.5724C10.7731 4.38534 13.3672 9.91261 9.38761 13.0226Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(e.calories)+"g Calories")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"11",height:"14",viewBox:"0 0 11 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0 8.66807C0 5.83383 3.33024 2.16702 5.34964 0C5.57131 0.264132 5.81789 0.550545 6.08002 0.855016C7.96848 3.04852 10.6639 6.17928 10.6639 8.66807C10.6639 10.3332 9.3294 14 5.33193 14C1.33446 14 0 10.3332 0 8.66807ZM1.59364 8.60186C1.542 8.49639 1.49094 8.39208 1.43989 8.2892C0.214175 9.74708 2.65839 13.9336 6.11922 13.2047C3.26094 12.0077 2.36399 10.1755 1.59364 8.60186Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(e.fat)+"g Fat")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"16",viewBox:"0 0 12 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.98674 7.1517C6.51939 6.52504 7.49071 5.20907 7.49071 3.67376C7.49071 2.13846 6.51939 0.791152 5.98674 0.164497C5.79874 -0.0548323 5.48541 -0.0548323 5.29742 0.164497C4.76476 0.791152 3.79344 2.10713 3.79344 3.64243C3.79344 5.17773 4.76476 6.52504 5.29742 7.12036C5.48541 7.33969 5.79874 7.33969 5.98674 7.1517ZM4.80842 10.7982C5.09702 10.8109 5.31667 10.6131 5.29855 10.33C5.28052 9.50593 5.05931 7.8905 3.99766 6.74142C2.94145 5.6232 1.33154 5.33438 0.491175 5.25984C0.202582 5.2471 -0.0170669 5.44491 0.00104422 5.72806C0.01908 6.5521 0.240292 8.16753 1.30194 9.31661C2.36359 10.4657 3.99892 10.7182 4.80842 10.7982ZM5.95426 10.3613C6.00316 9.5427 6.19895 7.89097 7.25516 6.77275C8.31681 5.62367 9.95758 5.3403 10.7616 5.29118C11.0194 5.27299 11.2699 5.47624 11.2518 5.75939C11.2029 6.57799 11.0071 8.22972 9.95088 9.34794C8.89467 10.4662 7.2539 10.7495 6.4444 10.8295C6.18666 10.8477 5.93615 10.6445 5.95426 10.3613ZM4.80842 15.9994C5.09702 16.0122 5.31667 15.8144 5.29855 15.5312C5.28052 14.7072 5.05931 13.0917 3.99766 11.9427C2.94145 10.8244 1.33154 10.5356 0.491175 10.4611C0.202582 10.4483 -0.0170669 10.6461 0.00104422 10.9293C0.01908 11.7533 0.240292 13.3688 1.30194 14.5178C2.36359 15.6669 3.99892 15.9194 4.80842 15.9994ZM7.2553 11.9113C8.3115 10.7931 9.95228 10.5097 10.7618 10.4298C11.0504 10.417 11.2646 10.6457 11.2519 10.898C11.203 11.7166 11.0072 13.3683 9.95101 14.4865C8.89481 15.6047 7.25404 15.8881 6.44453 15.9681C6.1868 15.9863 5.93629 15.783 5.9544 15.4999C6.00329 14.6813 6.19909 13.0296 7.2553 11.9113Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(e.carbs)+"g Carbs")])]),e._v(" "),r("div",{staticClass:"value-spacer"}),e._v(" "),r("div",{staticClass:"value-pair"},[r("svg",{attrs:{width:"12",height:"16",viewBox:"0 0 12 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.98674 7.1517C6.51939 6.52504 7.49071 5.20907 7.49071 3.67376C7.49071 2.13846 6.51939 0.791152 5.98674 0.164497C5.79874 -0.0548323 5.48541 -0.0548323 5.29742 0.164497C4.76476 0.791152 3.79344 2.10713 3.79344 3.64243C3.79344 5.17773 4.76476 6.52504 5.29742 7.12036C5.48541 7.33969 5.79874 7.33969 5.98674 7.1517ZM4.80842 10.7982C5.09702 10.8109 5.31667 10.6131 5.29855 10.33C5.28052 9.50593 5.05931 7.8905 3.99766 6.74142C2.94145 5.6232 1.33154 5.33438 0.491175 5.25984C0.202582 5.2471 -0.0170669 5.44491 0.00104422 5.72806C0.01908 6.5521 0.240292 8.16753 1.30194 9.31661C2.36359 10.4657 3.99892 10.7182 4.80842 10.7982ZM5.95426 10.3613C6.00316 9.5427 6.19895 7.89097 7.25516 6.77275C8.31681 5.62367 9.95758 5.3403 10.7616 5.29118C11.0194 5.27299 11.2699 5.47624 11.2518 5.75939C11.2029 6.57799 11.0071 8.22972 9.95088 9.34794C8.89467 10.4662 7.2539 10.7495 6.4444 10.8295C6.18666 10.8477 5.93615 10.6445 5.95426 10.3613ZM4.80842 15.9994C5.09702 16.0122 5.31667 15.8144 5.29855 15.5312C5.28052 14.7072 5.05931 13.0917 3.99766 11.9427C2.94145 10.8244 1.33154 10.5356 0.491175 10.4611C0.202582 10.4483 -0.0170669 10.6461 0.00104422 10.9293C0.01908 11.7533 0.240292 13.3688 1.30194 14.5178C2.36359 15.6669 3.99892 15.9194 4.80842 15.9994ZM7.2553 11.9113C8.3115 10.7931 9.95228 10.5097 10.7618 10.4298C11.0504 10.417 11.2646 10.6457 11.2519 10.898C11.203 11.7166 11.0072 13.3683 9.95101 14.4865C8.89481 15.6047 7.25404 15.8881 6.44453 15.9681C6.1868 15.9863 5.93629 15.783 5.9544 15.4999C6.00329 14.6813 6.19909 13.0296 7.2553 11.9113Z",fill:"#A4B6C0"}})]),e._v(" "),r("p",[e._v(e._s(e.protein)+"g Protein")])])])],2)])}),[],!1,null,"affd1312",null);t.default=component.exports}}]);
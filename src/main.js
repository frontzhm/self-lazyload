// main.js
import Vue from "vue";
import App from "./App.vue";
import loading from "./loading.gif";

// 这里添加了自己写的VueLazyload
import VueLazyload from "./vue-lazyload";
Vue.use(VueLazyload, { preLoad: 1.3, loading });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

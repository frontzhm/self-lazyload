import Vue from "vue";
import App from "./App.vue";

// 这里添加了自己写的VueLazyload
import VueLazyload from "./vue-lazyload";
Vue.use(VueLazyload, { preload: 1.3 });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

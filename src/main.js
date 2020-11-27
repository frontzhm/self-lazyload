import Vue from "vue";
import App from "./App.vue";

import VueLazyload from "./vue-lazyload";

Vue.config.productionTip = false;
Vue.use(VueLazyload, { preload: 1.3 });

new Vue({
  render: h => h(App)
}).$mount("#app");

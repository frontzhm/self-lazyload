// vue-lazyload/index.js
export default {
  install(Vue, options) {
    console.log({ Vue, options });
    // img(v-lazy="item.src")  lazy是指令名称 el是img这个元素 binding是{value:item.src}
    Vue.directive("lazy", function(el, binding) {
      console.log({ el, binding });
    });
  }
};

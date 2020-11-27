export default {
  install(Vue) {
    Vue.mixin({
      created() {
        console.log("hello-world");
      }
    });
  }
};

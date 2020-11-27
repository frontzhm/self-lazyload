// vue-lazyload/index.js
import { throttle } from "lodash";
export default {
  install(Vue, options) {
    class ImageReactive {
      constructor({ el, url, options }) {
        this.el = el;
        this.url = url;
        this.options = options;
        this.state = "wait";
      }
      checkInView() {
        const windowHeight = window.innerHeight;
        const { top } = this.el.getBoundingClientRect();
        return top < windowHeight * this.options.preLoad;
      }
      setState() {
        if (this.checkInView()) {
          this.state = "loading";
        }
      }
      elRender() {
        // 如果不是等待状态，则图片已经加载过，不需要再次渲染了
        if (this.state !== "wait") {
          return;
        }
        this.setState();
        console.log(this.state, this.el.getBoundingClientRect().top);
        switch (this.state) {
          case "wait":
            this.el.src = this.options.loading;
            this.el.dataset.src = this.url;
            break;
          case "loading":
            this.el.src = this.url;
            break;
          default:
            break;
        }
      }
    }
    // img(v-lazy="item.src")
    // lazy是指令名称 el是img这个元素 binding是{value:item.src}
    Vue.directive("lazy", function(el, binding) {
      const img = new ImageReactive({ el, url: binding.value, options });
      // 初始的时候，先渲染一次
      Vue.nextTick(() => {
        img.elRender();
      });
      // 每次滚动，再渲染一次，这里注意滚动事件需要节流
      window.addEventListener(
        "scroll",
        throttle(() => {
          img.elRender();
        }, 1000)
      );
    });
  }
};

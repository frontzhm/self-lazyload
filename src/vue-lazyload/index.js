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
      elRender() {
        // 如果不是等待状态，则图片已经加载过，不需要再次渲染了
        if (this.state !== "wait") return;
        // 等待状态的图片，看下在不在视图内，在的话更新状态
        const isInView = this.checkInView();
        isInView && (this.state = "loading");
        console.log(this.state, this.el.getBoundingClientRect().top);
        // 不同的状态对应不同的操作
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
      const elRender = () => {
        img.elRender();
      };
      // 初始的时候，先渲染一次
      Vue.nextTick(elRender);
      // 每次滚动，再渲染一次，这里注意滚动事件需要节流
      window.addEventListener("scroll", throttle(elRender, 1000));
    });
  }
};

---
title: 怎么写一个vue插件
tags: js
categories: js
---

最近在看`vue`的课程，说到vue插件，其实还蛮希望有一天自己能写一个vue插件。

插件干嘛的呢，[官网](https://cn.vuejs.org/v2/guide/plugins.html)说有四种用途：

- 添加全局方法或者属性
- 添加全局资源，如`directives， filters，transitions`
- 全局混入添加组件选项
- 添加 Vue 实例方法，`Vue.prototype.$xx=..`

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () { }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) { }
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () { }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) { }
}
```

## 怎么安装插件

插件安装其实就两步：

- 引入`import xx from 'xx'`
- 再，`Vue.use(xx)`，有时候可能需要加一个options

## 怎么写插件

先来个简单的！  
实现开始就打印`vue-helloworld`的插件！  

官网说了，`Vue.use`其实是执行了插件的`install`方法，且给`install`传了两个参数，一个`Vue`构造器，另一个就是可选的`参数`。

那么，`vue-helloworld.js`其实就很简单啦

```js
export default {
  install(Vue) {
    Vue.mixin({
      created() {
        console.log("hello-world");
      }
    });
  }
};

```

安装下：

```js
// main.js
import Vue from "vue";
import App from "./App.vue";

// 这里
import VueHelloworld from "./vue-helloworld";
Vue.use(VueHelloworld);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

```

这样启动项目，就看到控制台打印了`hello-world`了。

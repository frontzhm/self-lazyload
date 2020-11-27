---
title: 手写实现vue-lazyload的核心逻辑
tags: js
categories: js
---

[vue-lazyload](https://github.com/hilongjw/vue-lazyload)算是常用的一个插件了，一般用于图片的懒加载。

使用也很简单：

```js
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
})

// 使用的时候，直接在想懒加载的img上，加个指令就好了
// <img v-lazy="img.src">
```

核心逻辑是： 图片在视图范围内，就显示，否则只显示加载图标。而图片在不在视图范围内，是动态变化的，比如滚动的时候，图片就可能从视图外到视图内。

在提取一层核心：怎么判断一个元素在不在视图范围内？

## 怎么判断一个元素在不在视图范围内

其实这里又是一个信息差，所谓信息差，是只要你知道了，基本就能解决问题了，而不需要高深的理解。

就像你想量体温，怎么办？如果你知道温度计的话，其实这问题就已经解决了。相反，你不知道温度计的话，问题就变得很复杂了。

这里的关键在于，知不知道[getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

这个方法，可以知道,元素相对于视图窗口的**左上角**的距离。

```js
{top,bottom,left,right} = ele.getBoundingClientRect();
```

![getBoundingClientRect](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/getBoundingClientRect.png)

**元素在不在视图内，其实本质上就是判断：`top > windowHeight`**  
`top`越大，元素离地址栏就会越来越远，当距离大于`windowHeight`就不在视图范围内。  
换算成代码：

```js
const windowHeight = window.innerHeight
// 元素离地址栏的近似距离
const {top} = ele.getBoundingClientRect()
const isInView = top<windowHeight
```

看此动画，就明白了，注意看右边代码区域的`false`，代码在文末。
![innerHeight](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/innerHeight.gif)

## 开工写插件

关键的难点搞定了，继续写插件，哦不，继续分析插件。

每个图片在不在视图范围内，主体是每个图片，按照对象方式编程的话，这边可以创建一个图片类。

这样每个图片示例，只要在合适的时机判断自己在不在视图范围内即可。同时，每个图片应该有状态，
如等待状态、加载状态、错误状态。


## 代码

### 代码：判断一个元素在不在视图范围内

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      ul,
      body {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      ul {
        margin-left: 200px;
      }
      li {
        margin-top: 100px;
      }
      img {
        height: 300px;
      }
      .window {
        position: fixed;
        top: 30px;
        left: 50px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="window">
        浏览器可视高度：
        {{innerHeight}}
      </div>
      <ul>
        <li ref="images" v-for="(item,index) in images" :key="index">
          <div>
            <span>top:{{item.top}} </span>
            <span>在视图范围内：{{item.isInView}}</span>
          </div>
          <img :src="item.url" alt="" />
        </li>
      </ul>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
      let images = [
        "https://article-fd.zol-img.com.cn/t_s627x449/g6/M00/07/00/ChMkKl-7j82IM9KTAAPn0WO6WtEAAFubAPtVd4AA-fp664.png",
        "https://article-fd.zol-img.com.cn/t_s640x560/g6/M00/07/00/ChMkKV-7j8yIfRybAAeUzN2S-GcAAFubAPUqlEAB5Tk317.png",
        "https://article-fd.zol-img.com.cn/t_s640x359/g6/M00/07/00/ChMkKV-7j8qICSISAATqB3abUOIAAFubQP1QyMABOof216.png",
      ];
      images = images.map((item) => ({ top: 0, isInView: false, url: item }));
      const vm = new Vue({
        el: "#app",
        data: {
          images,
          innerHeight: 0,
        },
        mounted() {
          this.innerHeight = window.innerHeight;
          this.getImgTop();
          window.onscroll = this.getImgTop;
        },
        methods: {
          getImgTop() {
            Vue.nextTick(() => {
              this.$refs.images.forEach((item, index) => {
                const curImage = this.images[index];
                curImage.top = item.getBoundingClientRect().top;
                curImage.isInView = curImage.top < this.innerHeight;
              });
            });
          },
        },
      });
    </script>
  </body>
</html>

```
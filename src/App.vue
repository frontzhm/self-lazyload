<!-- App.vue -->
<template lang="pug">
  div#app
    img( v-for="(item,index) in images" v-lazy="item")
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      images: [
        "https://article-fd.zol-img.com.cn/t_s627x449/g6/M00/07/00/ChMkKl-7j82IM9KTAAPn0WO6WtEAAFubAPtVd4AA-fp664.png",
        "https://article-fd.zol-img.com.cn/t_s640x560/g6/M00/07/00/ChMkKV-7j8yIfRybAAeUzN2S-GcAAFubAPUqlEAB5Tk317.png",
        "https://article-fd.zol-img.com.cn/t_s640x359/g6/M00/07/00/ChMkKV-7j8qICSISAATqB3abUOIAAFubQP1QyMABOof216.png",
        "https://article-fd.zol-img.com.cn/t_s640x481/g6/M00/07/00/ChMkKl-7j8qISTtxAAYwGecnqdsAAFubQPr_JYABjAx866.png",
        "https://article-fd.zol-img.com.cn/t_s640x709/g6/M00/07/00/ChMkKl-7j8yIWZXlAAU_dwj8c0AAAFubAPNuMAABT-P182.png",
        "https://article-fd.zol-img.com.cn/t_s640x496/g6/M00/07/00/ChMkKV-7j82IaXWcAAf1A1qo0-gAAFubAPcPzUAB_Ub040.png",
        "https://article-fd.zol-img.com.cn/t_s640x286/g6/M00/07/00/ChMkKV-7j8qIRV9LAAC1WTJ8wRUAAFubQP6LUIAALVx696.jpg"
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  display: block;
  height: 400px;
}
</style>

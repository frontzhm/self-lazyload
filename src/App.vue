<template lang="pug">
  div#app
    img(v-for="(item,index) in images" v-lazy="item")
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
        "https://article-fd.zol-img.com.cn/t_s640x481/g6/M00/07/00/ChMkKl-7j8qISTtxAAYwGecnqdsAAFubQPr_JYABjAx866.png"
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
</style>

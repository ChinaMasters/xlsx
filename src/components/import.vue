<template>
  <div class="import">
    <input type="file" ref="file" @change="importf()">
    <div>{{data}}</div>
  </div>
</template>

<script>
import excel from "@/util/excel.js"
export default {
  name: "import",
  data() {
    return {
      data:''
    };
  },
  mounted() {},
  methods: {
    importf() {
      excel.importExcel("A2:F10").then(data=>{ //A2:F10 表格数据读取范围
        console.log(data)
        this.data = data;
      })
    }
  }
};
</script>
<style  scoped>
</style>

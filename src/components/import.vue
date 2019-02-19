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
      excel.importExcel().then(data=>{
        console.log(data)
        this.data = data;
      })
    }
  }
};
</script>
<style  scoped>
</style>

require("script-loader!@static/xlsx.core.min"); // 或者引入 import XLSX from "xlsx";
import xlsxUtils from "@static/xlsx.utils.min.js"
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
function fixdata(data) {
  //文件流转BinaryString
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}
function saveAs(obj, fileName) {
  //当然可以自定义简单的下载文件实现方式
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function() {
    //延时释放
    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

export default  {
  importExcel(range){
    return new Promise(resolve =>{
      let obj = document.querySelector("input[type='file']");
      if (!obj.files) {
        return;
      }
      var f = obj.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        if (rABS) {
          wb = XLSX.read(btoa(fixdata(data)), {
            //手动转化
            type: "base64"
          });
        } else {
          wb = XLSX.read(data, {
            type: "binary"
          });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        var temp = wb.Sheets[wb.SheetNames[0]];
        temp["!ref"] = range || "A2:F10000";
        resolve(XLSX.utils.sheet_to_json(temp))
   
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    })
  },
  exportExcel(Data,filename,head,keyMap,rows) {
    var data = xlsxUtils.format2Sheet(Data, 0, rows, keyMap); //向下偏移2行 就是表头的行数
    var dataKeys = Object.keys(data);
    for (var k in head) data[k] = head[k]; //追加列头
    var wb = xlsxUtils.format2WB(data, undefined, undefined, "A1:" + dataKeys[dataKeys.length - 1]);
    saveAs(xlsxUtils.format2Blob(wb), filename+".xlsx");
  }
}
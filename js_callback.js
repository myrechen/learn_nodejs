// 注意：凡是需要得到一个函数内部异步操作的结果
//    setTimeout
//    readFile
//    writeFile
//    ajax
//   这种情况必须通过：回调函数
function add(x, y, _callback) {
  console.log(1)
  setTimeout(function () {
    var ret = x + y
    _callback(ret)
  }, 1000)
}

add(10, 20, function (ret) {
  console.log(ret)
})

var fs = require('fs')

// 创建Promise容器
// Promise容器创建后就开始执行里面的任务
var p1 = new Promise(function (resolve, reject) {
  fs.readFile('./a.txt', 'utf8', function (err, data) {
    if (err) {// 失败，改变Pending状态rejected
      reject(err)
    } else {// 成功，改变Pending状态resolved
      resolve(data)
    }
  })
})

var p2 = new Promise(function (resolve, reject) {
  fs.readFile('./b.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

var p3 = new Promise(function (resolve, reject) {
  fs.readFile('./c.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

// 当前面的p1状态为resolved
// 就会执行p1.then() 中的function，参数就是resolve传递的参数
p1
  .then(function (data) {
    console.log(data)
    // 当 p1 读取成功的时候
    // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
    // 当你 return 123 后面就接收到 123
    //      return 'hello' 后面就接收到 'hello'
    //      没有 return 后面收到的就是 undefined
    // 上面那些 return 的数据没什么卵用
    // 真正有用的是：我们可以 return 一个 Promise 对象
    // 当 return 一个 Promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2 的 resolve
    // 
    return p2
  }, function (err) {
    console.log('读取文件失败了', err)
  })
  .then(function (data) { // belong to p2
    console.log(data)
    return p3
  })
  .then(function (data) { // belong to p3
    console.log(data)
    console.log('end')
  })

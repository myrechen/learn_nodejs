var fs = require('fs')

// 抛出异常
//    1. 阻止程序的执行
//    2. 把错误消息打印到控制台
fs.readFile('./a.txt', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
  fs.readFile('./b.txt', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    console.log(data)
    fs.readFile('./c.txt', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      console.log(data)
    })
  })
})

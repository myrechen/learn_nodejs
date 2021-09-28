var express = require('express')
var fs = require('fs')

var app = express()

// 经过中间件的请求对象都是同一个
app.get('/a', function (req, res, next) {
  console.log('a')
  req.foo = 'bar'
  next()
})

app.get('/a', function (req, res, next) {
  console.log(req.foo)
  console.log('a 2')
})

app.get('/', function (req, res, next) {
  fs.readFile('./asdfasdfasf/a.txt', function (err, data) {
    if (err) {
      // return res.status(500).send('Server Error')
      // 当调用 next 的时候，如果传递了参数，则直接往后找到带有 四个参数的应用程序级别中间件
      // 当发生错误的时候，我们可以调用 next 传递错误对象
      // 然后就会被全局错误处理中间件匹配到并处理
      next(err)
    }
  })
})

app.get('/a', function (req, res, next) {
  console.log('a 3')
})



app.get('/a', function (req, res, next) {
  fs.readFile('./a.txt', function (err, data) {
    if (err) {
      // return res.status(500).send('Server Error') 
      next(err)
    }
  })
})

// 在所有请求都没匹配上时响应404
app.use(function (req, res, next) {
  res.send('404')
})

// 配置错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).send(err.message)
})

app.listen(3000, function () {
  console.log('app is running at port 3000.')
})



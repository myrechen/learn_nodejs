var express = require('express')

var app = express()

// 中间件：本质就是个处理请求的函数

// 在 Express 中，对中间件有几种分类

// 当请求进来，会从第一个中间件开始进行匹配
//    如果匹配，则进来
//       请求进入中间件之后，如果没有调用 next ，当前中间件不会放行，请求停留在此处
//       如果调用了 next 则继续向后找到第一个匹配的中间件
//    如果不匹配，则继续判断下一个中间件是否匹配
//    
// 不关心请求路径和请求方法的中间件
// 任何请求都会进入这个中间件
// 中间件本身是一个方法，该方法接收三个参数：
//    Request 请求对象
//    Response 响应对象
//   next     下一个中间件
// 
// 
app.use(function (req, res, next) {
  console.log('1')
  next()
})
// 
app.use(function (req, res, next) {
  console.log('2')
  next()
})
// 
app.use(function (req, res, next) {
  console.log('3')
  res.send('333 end.')
})
// 
app.use(function (req, res, next) {
  console.log(1)
  next()
})
// 
// 以 /xxx 开头的路径中间件
app.use('/b', function (req, res, next) {
  console.log('b')
})
// 
app.use('/a', function (req, res, next) {
  console.log('a')
  next()
})
// 
app.use(function (req, res, next) {
  console.log('2')
  next()
})
// 
app.use('/a', function (req, res, next) {
  console.log('a 2')
})
// 
// 除了以上中间件之外，还有一种最常用的
// 严格匹配请求方法和请求路径的中间件
// app.get
// app.post

app.use(function (req, res, next) {
  console.log(1)
  next()
})

app.get('/abc', function (req, res, next) {
  console.log('abc')
  next()
})

app.get('/', function (req, res, next) {
  console.log('/')
  next()
})

app.use(function (req, res, next) {
  console.log('haha')
  next()
})

app.get('/abc', function (req, res, next) {
  console.log('abc 2')
})

app.use(function (req, res, next) {
  console.log(2)
  next()
})

app.get('/a', function (req, res, next) {
  console.log('/a')
})

app.get('/', function (req, res, next) {
  console.log('/ 2')
})

// 如果没有能匹配的中间件，则 Express 会默认输出：Cannot GET 路径

app.listen(3000, function () {
  console.log('app is running at port 3000.')
})




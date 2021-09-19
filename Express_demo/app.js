var express = require('express')

//  创建服务器应用程序
//  相当于 http.createServer

var app = express()

// 当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get('/', function(req, res) {
	res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
<body>
  <h1>hello Express！你好</h1>
</body>
</html>
`)
})

app.get('/about', function(req, res) {
	// 在 Express 中可以直接 req.query 来获取查询字符串参数
	console.log(req.query)

	res.send('关于')
})

// 公开指定目录
// 可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/', express.static('./public/'))

app.listen(3000, function() {
	console.log('app is running at 3000...')
})
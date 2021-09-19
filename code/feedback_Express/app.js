var express = require('express')

var comments = [{
	name: 'Jack',
	message: 'sunshine is nice!',
	date: "2019-9-30"
}, {
	name: 'Jerry',
	message: 'sunshine is disgusting!',
	date: "2019-9-30"
}, ]

app = express()

//引入用于解析post请求的中间件
var bodyParser = require('body-parser')
// 配置 body-parser 中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// parse application/json
app.use(bodyParser.json())


app.use('/public/', express.static('./public'))

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然外面这里不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))

// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中


app.get('/', function(req, res) {
	res.render('index.html', {
		comments: comments
	})
})

app.get('/post', function(req, res) {
	res.render('post.html')
})

// method: POST, 请求路径: /post 的时, 为提交评论
app.post('/post', function(req, res) {
	// 1. 获取表单 POST 请求体数据
	// 2. 处理
	// 3. 发送响应

	// req.query 只能拿 get 请求参数
	var subComment = req.body
	subComment.date = '2000-01-01 00:00:00'
	comments.unshift(subComment)

	// res.statusCode = 302
	// res.setHeader('Location', '/') 
	// res.end()
	res.redirect('/')
})

app.listen(3000, function() {
	console.log('running at 3000...')
})
var http = require('http')
var fs = require('fs')
var tpl = require('art-template')
var url = require('url')

var comments = [{
	name: 'Jack',
	message: 'sunshine is nice!',
	date: "2019-9-30"
}, {
	name: 'Jerry',
	message: 'sunshine is disgusting!',
	date: "2019-9-30"
}, ]
// /pinglun?name=xxxx&message=xxxx
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以不可能通过去判断完整的 url 路径来处理这个请求
// 
// 结论：对于server其实只需要判定，如果请求路径是 /pinglun 的时候，那就认为有提交表单的请求


http
	.createServer(function(req, res) {
		// 使用 url.parse 方法将路径解析为一个方便操作的对象，
		// 第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
		var parseObj = url.parse(req.url, true)
		// 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
		var pathname = parseObj.pathname
		if (pathname === '/') {
			fs.readFile('./views/index.html', function(err, data) {
				if (err) {
					return res.end('404 not found')
				}
				var htmlStr = tpl.render(data.toString(), {
					comments: comments,
				})
				res.end(htmlStr)
			})
		}
		//请求资源
		else if (pathname.indexOf('/public') === 0) {
			// 统一处理：
			//    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
			//    所以我们就直接可以把请求路径当作文件路径来直接进行读取

			fs.readFile('.' + pathname, function(err, data) {
				if (err) {
					return res.end('404 not found')
				}
				res.end(data)
			})
		}
		//发表页面
		else if (pathname === '/post') {
			fs.readFile('./views/post.html', function(err, data) {
				if (err) {
					return res.end('404 not found...')
				}
				res.end(data)
			})
		}
		//提交评论
		else if (pathname === '/pinglun') {
			// 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
			// 所以接下来要做的就是：
			//    1. 获取表单提交的数据 parseObj.query
			//    2. 将当前时间日期添加到数据对象中，然后存储到数组中
			//    3. 让用户重定向跳转到首页 /
			//       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了

			var subComment = parseObj.query
			subComment.date = '2000-01-01 00:00:00'
			comments.unshift(subComment)
			//可以进行添加评论，但是数据不能保存

			// 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
			// 如何通过服务器让客户端重定向？
			//    1. 状态码设置为 302 临时重定向
			//        statusCode
			//    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
			//        setHeader
			// 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location 
			// 然后对该地址发起新的请求, 所以就能看到客户端自动跳转了
			res.statusCode = 302
			res.setHeader('Location','/')
			res.end()
		}
		//
		else {
			fs.readFile('./views/404.html', function(err, data) {
				if (err) {
					return res.end('404 not found...')
				}
				res.end(data)
			})
		}
	})
	.listen(3000, function() {
		console.log('sever is running...')
	})
//http end
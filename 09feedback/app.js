var http = require('http')
var fs = require('fs')
var tpl = require('art-template')

var comments = [{
	name:'Jack',
	message:'sunshine is nice!',
	date:"2019-9-30"},
	{
	name:'Jerry',
	message:'sunshine is disgusting!',
	date:"2019-9-30"},
]

http
	.createServer(function(req, res) {
		var url = req.url
		if (url === '/') {
			fs.readFile('./views/index.html', function(err, data) {
				if (err) {
					return res.end('404 not found')
				}
				var htmlStr = tpl.render(data.toString(),{
					comments: comments,
				})
				res.end(htmlStr)
			})
		}
		//请求资源
		else if (url.indexOf('/public') === 0) {
			fs.readFile('.' + url, function(err, data) {
				if (err) {
					return res.end('404 not found')
				}
				res.end(data)
			})
		}
		//发表页面
		else if (url === '/post') {
			fs.readFile('./views/post.html', function(err, data) {
				if (err) {
					return res.end('404 not found...')
				}
				res.end(data)
			})
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
var http = require('http')
var server = http.createServer()

var fs = require('fs')

var wwwDir = './www'

server.on('request', function(req, res) {
	var url = req.url
	// if (url === '/') {
	// 	fs.readFile(wwwDir + '/index.html', function(err, data) {
	// 		if (err) {
	// 			// return 有两个作用：
	// 			//  1. 方法返回值
	// 			//  2. 阻止代码继续往后执行
	// 			return res.end('404 Not Found.')
	// 		}
	// 		res.end(data)
	// 	})

	// } else if (url === '/login') {
	// 	fs.readFile(wwwDir + '/login.html', function(err, data) {
	// 		if (err)
	// 			return res.end('404 Not Found.')
	// 		res.end(data)
	// 	})
	// }
	var filePath = '/index.html'
	if (url !== '/') {
		filePath = url
	}
	//filepath = ./www + /resource/...
	fs.readFile(wwwDir + filePath, function(err, data) {
		if (err) {
			return res.end('404 Not Found.')
		}
		res.end(data)
	})
})

server.listen(3000, function() {
	console.log('server is running...')
})
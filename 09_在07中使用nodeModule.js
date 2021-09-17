var http = require('http')
var server = http.createServer()
var fs = require('fs')

var template = require('art-template')

var wwwDir = './www'

server.on('request', function(req, res) {
	var url = req.url
	fs.readFile('./testIndex09.html', function(err, data) {
		if (err) {
			return res.end('404 Not Found.')
		}


		fs.readdir(wwwDir, function(err, files) {
			if (err) {
				return res.end('Can not find www dir.')
			}

			var htmlStr = template.render(data.toString(), {
				title: '哈哈',
				files: files,
			})

			//响应发送到浏览器
			res.end(htmlStr)

		})
	})
})
server.listen(3000, function() {
	console.log('running...')
})
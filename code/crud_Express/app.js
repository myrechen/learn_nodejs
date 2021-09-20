//	require
var express = require('express')
var fs = require('fs')

var app = express()

//	配置使用模板引擎
app.engine('html', require('express-art-template'))

//	开放要使用的资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))


app.get('/', function(req, res) {
	fs.readFile('./db.json', 'utf8', function(err, data) {
		if (err) {
			//readFile 的第二个参数是可选的，传入 utf8 把读取到的文件按照 utf8 编码转成字符
			//除了这样来转换之外，也可以通过 data.toString() 的方式
			return res.status(500).send('server error!')
		}
		// 从文件中读取到的数据一定是字符串, 所以这里转成对象
		var students = JSON.parse(data).students
		res.render('index.html', {
			fruits: ['Apple','Banana','orange','grape'],
			students: students
		})
	})
})

app.listen(3000, function() {
	console.log('running at 3000...')
})
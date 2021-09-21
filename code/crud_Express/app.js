/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */
//	require
var express = require('express')
var router = require('./router.js')

var bodyParser = require('body-parser')

var app = express()

//post
app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//	配置使用模板引擎
app.engine('html', require('express-art-template'))

//	开放要使用的资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.use(router)

app.listen(3000, function() {
	console.log('running at 3000...')
})
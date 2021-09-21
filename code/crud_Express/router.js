/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
var express = require('express')

var student = require('./student.js')

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

var fs = require('fs')

/* 渲染学生列表页面 */
router.get('/', function(req, res) {
	student.get(function(err, data) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('index.html', {
			fruits: ['Apple', 'Banana', 'orange', 'grape'],
			students: data
		})
	})
})

//转到添加界面
router.get('/addStu', function(req, res) {
	res.render('add.html')
})

//提交添加信息
router.post('/addStu', function(req, res) {
	// 1. 获取表单数据
	// 2. 处理
	//    将数据保存到 db.json 文件中用以持久化
	// 3. 发送响应

	//console.log(req.body)
	student.save(req.body, function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/')
	})
})

//提交编辑请求
router.get('/edit', function(req, res) {
	student.getById(parseInt(req.query.id), function(err, findStu) {
		if (err) {
			return res.status(500).send('Server error.')
		} //获取要修改的信息，渲染到编辑页面
		res.render('edit.html')
	})
})

//提交编辑信息
router.post('/edit', function(req, res) {
	student.editById(req.body, function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/')
	})
})

//提交删除请求
router.get('/delete', function(req, res) {
	student.delById(req.query.id, function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/')
	})
})

// 3. 把 router 导出
module.exports = router
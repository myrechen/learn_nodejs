/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * Node 的重要部分: 封装异步 API
 */

var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.get = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) { // 读取失败
            return callback(err)
        } // 成功返回JSON对象
        callback(null, JSON.parse(data).students)
    })
}


/**
 * 添加保存学生
 * @param  {Object}   stu  学生对象
 * @param  {Function} callback 回调函数
 */

exports.save = function(stu, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) { // 读取失败
            return callback(err)
        }
        // 读取成功
        var studentsGet = JSON.parse(data).students

        // 添加 id
        stu.id = parseInt(studentsGet[studentsGet.length - 1].id) + 1
        // 把用户传递的对象保存到数组中
        studentsGet.push(stu)
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: studentsGet
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功错误对象是 null
            callback(null)
        })
    })
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.getById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) { // 读取失败
            return callback(err)
        }
        var studentsGet = JSON.parse(data).students

        //find() 方法返回通过测试（函数内判断）的数组的第一个元素的值
        var findStu = studentsGet.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, findStu)
    })
}

//根据id修改信息并保存
exports.editById = function(editStu, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) { // 读取失败
            return callback(err)
        }
        var studentsGet = JSON.parse(data).students

        //找到要修改的
        var findStu = studentsGet.find(function(item) {
            return item.id === parseInt(editStu.id)
        })

        //遍历更新
        for (var key in findStu) {
            findStu[key] = editStu[key]
        }

        //写回文件
        var fileData = JSON.stringify({
            students: studentsGet
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功错误对象是 null
            callback(null)
        })
    })
}


/**
 * 删除学生
 */
exports.delById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) { // 读取失败
            return callback(err)
        }
        var studentsGet = JSON.parse(data).students

        // findIndex 方法
        // 找到studentsGet数组中 item.id 为 id 的元素的下标
        var deleteId = studentsGet.findIndex(function(item) {
            return item.id === parseInt(id)
        })

        // 根据下标从数组中删除对应的学生对象
        studentsGet.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students: studentsGet
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功错误对象是 null
            callback(null)
        })
    })
}
// 使用模板】引擎art-template

// npm install art-template
// 默认会下载到 node_modules 目录中
// 在需要使用的文件模块中加载 art-template
// 使用 require 方法加载
// 查文档，使用模板引擎的 API


var template = require('art-template')
var fs = require('fs')

fs.readFile('./tpl08.html', function(err, data) {
  if (err) {
    return console.log('读取文件失败了')
  }

  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '光之国',
    hobbies: [
      '写代码',
      '打游戏'
    ],
    title: '个人信息'
  })

  console.log(ret)
})
//静态显示www文件夹
var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = './www'

server.on('request', function(req, res) {
  var url = req.url
  fs.readFile('./testIndex06.html', function(err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 如何得到 www 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 将得到的文件名和目录名替换到 testIndex06.html 中
    //    2.1 在 testIndex06.html 中需要替换的位置预留一个特殊的标记
    //    2.2 根据 files 生成需要的 HTML 内容

    fs.readdir(wwwDir, function(err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 2.1 生成需要替换的内容
      var content = ''
      files.forEach(function(item) {
        // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
        content += `
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">。。。。</td>
          </tr>
        `
      })

      // 2.3 替换
      data = data.toString()
      data = data.replace('^_^', content)

      // 3. 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})
server.listen(3000, function() {
  console.log('running...')
})
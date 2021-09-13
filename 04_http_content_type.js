var http = require('http')
var server = http.createServer()

server.on('request', function (req, res) {
    // 在服务端默认发送的数据是utf8编码
    // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
    // 中文操作系统默认是gbk
    // 解决方法就是正确的告诉浏览器发送的内容是什么编码
    // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // res.end('hello 世界')
    var url = req.url

    if (url === '/plain') {
        // text/plain 普通文本
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('hello 世界')
    } else if (url === '/html') {
        // 如果发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<div> <script>window.onload=function(){alert("页面加载完成！跳转到小米？");window.location.href="https://www.mi.com";}</script> </div>')
    }
})

server.listen(3000, function () {
    console.log('server is running...')
})
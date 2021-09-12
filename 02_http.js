//使用node构建简单web服务器
//node中的核心模块http

var http = require("http")

//使用http.creatServer创建web服务器，返回server实例
var server = http.createServer()

//    接收请求
//    处理请求
//    发送响应
//    注册 request 请求事件
//    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数

// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息

server.on('request', function (request, response) {
    console.log('收到客户端的请求了，请求路径是：' + request.url)

    // response 对象有一个方法：write 可以用来给客户端发送响应数据
    // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
    response.write('hello')
    response.write(' nodejs')

    // 告诉客户端结束
    response.end()

})

// 4. 绑定端口号，启动服务器
server.listen(3002, function () {
    console.log('server running at http://127.0.0.1:3002/')
})

const http = require('http')
const path = require('path')
const express = require('express')

// 处理multipart/form-data数据格式(主要用在上传功能中)的中间件
// 文档：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const multer = require('multer')

const app = express()
// 配置express的静态目录
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


var storage = multer.diskStorage({
    // 图片存储的位置
    destination: function (req, file, cb){
        cb(null, './public/uploads')
    },

    filename: function (req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
});

var upload = multer({storage: storage});

// 接收上传图片请求的接口
app.post('/upload', upload.single('file'), function (req, res, next) {
    
    // 服务器中的图片的绝对地址
    var url = '/uploadImgs/' + req.file.filename
    res.json({
        code : 200,
        data : url
    })
});


http.createServer(app).listen(3000,()=>{
    console.log('server is listening')
})

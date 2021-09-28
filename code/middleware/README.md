# express-middleware

## 中间件
中间件是能够访问request object (), response object ()和应用程序请求响应周期中的下一个中间件的方法。

把很复杂的事情分割成单个，然后依次有条理的执行。就是一个中间处理环节，有输入，有输出。

经过中间件的请求对象都是同一个。

## 中间件的分类:

### 应用程序级别的中间件

不关心任何请求路径和请求方法的中间件：

```javascript
app.use(function(req,res,next){
    console.log('Time',Date.now());
    next();
});
```

关心请求路径和请求方法的中间件：

```javascript
app.use('/a',function(req,res,next){
    console.log('Time',Date.now());
    next();
});
```

### 路由级别的中间件

严格匹配请求路径和请求方法的中间件

get:

```javascript
app.get('/',function(req,res){
	res.send('get');
});
```

post：

```javascript
app.post('/a',function(req,res){
	res.send('post');
});
```

put:

```javascript
app.put('/user',function(req,res){
	res.send('put');
});
```

delete:

```javascript
app.delete('/delete',function(req,res){
	res.send('delete');
});
```


## 错误处理中间件

```javascript
app.use(function(err,req,res,next){
    console.error(err,stack);
    res.status(500).send('Something broke');
});
```

配置全局错误处理中间件:

```javascript
app.get('/a', function(req, res, next) {
	fs.readFile('.a/bc', funtion() {
		if (err) {
        	// 当调用next()传参后，则直接进入到全局错误处理中间件方法中
        	// 当发生全局错误的时候，我们可以调用next传递错误对象
        	// 然后被全局错误处理中间件匹配到并进行处理
			next(err);
		}
	})
});
//全局错误处理中间件
app.use(function(err,req,res,next){
    res.status(500).json({
        err_code:500,
        message:err.message
    });
});
```


## 内置中间件

- express.static(提供静态文件)
  - http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

## 第三方中间件

> 参考文档：http://expressjs.com/en/resources/middleware.html

- body-parser
- compression
- cookie-parser
- mogran
- response-time
- server-static
- session



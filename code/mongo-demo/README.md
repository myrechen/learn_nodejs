# mongoDB安装

## 启动
```shell
mongod
```

## 连接
```shell
mongo
```

结束连接
```shell
exit
```

- MongoDB 数据库
  + MongoDB 的数据存储结构
    * 数据库
    * 集合（表）
    * 文档（表记录）

- 显示所有数据库
  + show dbs
- 当前操作数据库
  + db
- 切换数据库
  + use 库名
-show collections
  +显示当前db的所有集合
- db.集合名.insertOne({ })
- db.集合名.find()
  + 查询所有文档

## node中使用mongoDB
- MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
  + 强大，但是比较原始
- mongoose
  + 使用的是 mongoose 这个第三方包
  + 它是基于 MongoDB 官方的 mongodb 包进一步做了封装
  + 可以提高开发效率,操作 MongoDB 数据库更方便

**注意mongoDB, mongoose, node.js版本需要兼容,否则会报错**

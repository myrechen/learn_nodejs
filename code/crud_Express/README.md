# express 做json文件增删改查

## 做了什么

- 使用已有的bootstrap模板html
	+ 将部分css文件保存在本地
- 创建json文件

- 将json文件中的内容渲染到html
	+ 读取json文件中的字符串
	+ 转成对象

- router设计

| 请求方法 | 请求路径 | get 参数 |     post 参数     |     功能     |
|----------|----------|----------|-------------------|--------------|
| GET      | /        |          |                   | 渲染首页     |
| GET      | /addStu  |          |                   | 进入添加页   |
| POST     | /addStu  |          | name, age,gender  | 提交添加请求 |
| GET      | /edit    | id       |                   | 编辑请求     |
| POST     | /edit    |          | name, age, gender | 提交编辑请求 |
| GET      | /delete  | id       |                   | 提交删除请求 |
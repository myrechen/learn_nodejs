# callback-hell 和 Promise 容器

## 1.calback-hell 回调地狱

回调函数中套了回调函数

当需要异步执行的函数按我们想要的顺序来执行时，可以一层一层地嵌套调用执行

**但是代码嵌套太深会使代码变得臃肿，不易维护**

为了解决以上编码方式带来的问题, 所以在ES6中新增了Promise API


## 2.Promise容器
promise本身不是异步的，但是往往封装一个异步任务

- 容器中存放了一个异步任务，初始状态Pending，只能转化为以下两种中的一种
	+ Resolved
	+ Rejected

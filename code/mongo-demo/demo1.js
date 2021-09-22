var mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/myCats', { useMongoClient: true });

mongoose.Promise = global.Promise;

// 创建一个模型
// 就是在设计数据库, 在代码中设计数据库
// 会生成小写复数表名：cats
var Cat = mongoose.model('Cat', { name: String });


var kitty = new Cat({ name: '喵喵' });

// 持久化保存 kitty 实例
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
})

//myCats数据库 --> cats集合 --> 有一个name为‘喵喵’的对象
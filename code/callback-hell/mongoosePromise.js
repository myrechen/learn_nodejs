//mongoose的所有API都支持Promise
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myUser', { useMongoClient: true });

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: { type: String }
});

var User = mongoose.model('User', userSchema)


User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})

// 用户注册
// 1. 判断用户是否存在
//    如果已存在，结束注册
//    如果不存在，注册（保存一条用户信息）

User.findOne({
    name: 'aaa'
  })
  .then(function (user) {
    if (user) {
      // 用户已存在，不能注册
      console.log('用户已存在')
    } else {
      // 用户不存在，可以注册
      return new User({
        name: 'aaa',
        password: '123',
        email: 'dsadas'
      }).save()
    }
  })
  .then(function (ret) {
  })

// 如果使用callback的嵌套实现
User.findOne({ name: 'aaa' }, function (user) {
  if (user) {
    console.log('已存在')
  } else {
    new User({
      username: 'aaa',
      password: '12345678',
      email: 'abcd@xxx.com'
    }).save(function () {
     
    })
  }
})



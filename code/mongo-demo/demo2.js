var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/myUser', { useMongoClient: true });

mongoose.Promise = global.Promise;

// 2. 设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    name: {
        type: String,
        // 必须有
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: { type: String }
});

// 3. 将文档结构发布为模型
//    mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//   
//    返回值：模型构造函数
var User = mongoose.model('User', userSchema);

// 4. 有了模型构造函数之后，可以使用这个构造函数对 users 集合中的数据进行增删改查
// 新增数据
// **********************
var admin = new User({
    name: 'Fu',
    password: '1234',
    email: "Fu@xxx.com"
});

admin.save(function(err, ret) {
    if (err)
        console.log(err);
    else {
        console.log(ret);
        console.log('success!');
    }
})

// 查询数据
// **********************
User.find(function(err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})

// 根据条件查询匹配项
User.find({
    username: 'Fu'
}, function(err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})

// 根据条件查询匹配的第一个
User.findOne({
    username: 'Fu'
}, function(err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})

// 删除数据
// **********************
User.remove({
    username: 'Fu'
}, function(err, ret) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
        console.log(ret)
    }
})

// 更新数据
// **********************
User.findByIdAndUpdate('614c0cdb37fe481e85edc81a', {
    password: '123456'
}, function(err, ret) {
    if (err) {
        console.log('更新失败')
    } else {
        console.log('更新成功')
    }
})
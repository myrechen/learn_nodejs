var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接mongoDB
mongoose.connect('mongodb://localhost/Students', {useMongoClient: true})

mongoose.Promise = global.Promise

// 2. 设计文档结构
var stuSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
	},
	gender: {
		type: Number,
		enum: [0, 1],
		default: 0
	}
})

// 3. 将文档结构发布为模型
var Student = mongoose.model('Student',stuSchema)

var stu = new Student({
	name:'Ma',
	age:19,
	gender:0
})

stu.save(function(err,ret){
	if (err)
        console.log(err);
    else {
        console.log(ret);
        console.log('success!');
    }
})

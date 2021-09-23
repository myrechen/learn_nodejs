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

// 3. 导出模型构造函数
module.exports = mongoose.model('Student',stuSchema)

const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please give a fruit name!"]
	},
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	review: String
})

module.exports = {
	fruitSchema
}
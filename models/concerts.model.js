const mongoose = require('mongoose')

const concertsSchema = new mongoose.Schema({
	id: { type: Number },
	performer: { type: String, required: true },
	genre: { type: String, required: true },
	price: { type: Number, required: true },
	day: { type: Number, required: true },
	image: { type: String, required: true },
	tickets: { type: Number },
})

module.exports = mongoose.model('Concert', concertsSchema)

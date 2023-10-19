const mongoose = require('mongoose')

const testimonialsSchema = new mongoose.Schema({
	id: { type: Number },
	author: { type: Number, required: true },
	text: { type: Number, required: true },
})

module.exports = mongoose.model('Testimonial', testimonialsSchema)

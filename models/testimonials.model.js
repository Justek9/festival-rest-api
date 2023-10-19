const mongoose = require('mongoose')

const testimonialsSchema = new mongoose.Schema({
	id: { type: Number },
	author: { type: String, required: true },
	text: { type: String, required: true },
})

module.exports = mongoose.model('Testimonial', testimonialsSchema)

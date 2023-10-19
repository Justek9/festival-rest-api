const mongoose = require('mongoose')

const seatsSchema = new mongoose.Schema({
	id: { type: Number },
	day: { type: Number, required: true, ref: 'Day' },
	seat: { type: Number, required: true },
	client: { type: Number, required: true },
	email: { type: String, required: true },
})

module.exports = mongoose.model('Seat', seatsSchema)

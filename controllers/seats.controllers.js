const Seat = require('../models/seats.model')

exports.getAll = async (req, res) => {
	try {
		res.json(await Seat.find())
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.getById = async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.id)
		if (!seat) res.status(404).json({ message: 'Not found...' })
		else res.json(seat)
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.post = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body
		const newSeat = new Seat({ day: day, seat: seat, client: client, email: email })
		await newSeat.save()
		const seats = await Seat.find()
		req.io.emit('seatsUpdated', seats)
		res.json({ message: 'OK' })
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.put = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body
		const changedSeat = await Seat.findById(req.params.id)
		if (changedSeat) {
			await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client, email } })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.delete = async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.id)
		if (seat) {
			await Seat.deleteOne({ _id: req.params.id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
}
const Concert = require('../models/concerts.model')
const Seats = require('../models/seats.model')

exports.getAll = async (req, res) => {
	try {
		const ticketsLeftDay1 = 50 - (await Seats.find({ day: { $eq: 1 } }).countDocuments())
		const ticketsLeftDay2 = 50 - (await Seats.find({ day: { $eq: 2 } }).countDocuments())
		const ticketsLeftDay3 = 50 - (await Seats.find({ day: { $eq: 3 } }).countDocuments())
		await Concert.updateOne({ id: 1 }, { $set: { tickets: ticketsLeftDay1 } })
		await Concert.updateOne({ id: 2 }, { $set: { tickets: ticketsLeftDay2 } })
		await Concert.updateOne({ id: 3 }, { $set: { tickets: ticketsLeftDay3 } })

		res.json(await Concert.find())
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.getById = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id)
		if (!concert) res.status(404).json({ message: 'Not found...' })
		else res.json(concert)
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.post = async (req, res) => {
	try {
		const { performer, genre, price, day, image } = req.body
		const newConcert = new Concert({ performer, genre, price, day, image })
		await newConcert.save()
		res.json({ message: 'OK' })
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.put = async (req, res) => {
	try {
		const { performer, genre, price, day, image } = req.body
		const concert = await Concert.findById(req.params.id)
		if (concert) {
			await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image } })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.delete = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id)
		if (concert) {
			await Concert.deleteOne({ _id: req.params.id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

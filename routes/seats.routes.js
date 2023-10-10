const express = require('express')
const router = express.Router()
const db = require('../db')

router.route('/seats').get((req, res) => {
	res.json(db.seats)
})

router.route('/seats/:id').get((req, res) => {
	const id = Number(req.params.id)
	const seat = db.seats.find(el => el.id === id)
	if (!seat) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(seat)
})

router.route('/seats').post((req, res) => {
	const { day, seat } = req.body
	const isTaken = db.seats.some(el => el.day === day && el.seat === seat)

	if (isTaken) {
		res.status(409).json({ message: 'The slot is already taken...' })
	} else {
		const id = db.seats[db.seats.length - 1].id + 1
		const newSeat = Object.assign({ id: id }, req.body)
		db.seats.push(newSeat)
		res.status(201).json({ message: 'OK' })
	}
})

router.route('/seats/:id').delete((req, res) => {
	const id = Number(req.params.id)
	const seat = db.seats.find(el => el.id === id)
	const index = db.seats.indexOf(seat)

	if (!seat) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.seats.splice(index, 1)
		res.json({ message: 'OK, deleted' })
	}
})

router.route('/seats/:id').put((req, res) => {
	const { day, seat, client, email } = req.body
	const id = Number(req.params.id)
	const seatChanged = db.seats.find(el => el.id === id)
	const index = db.seats.indexOf(seatChanged)
	if (!seatChanged) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.seats[index] = { ...seat, day, seat, client, email }
		res.json({ message: 'data changed' })
	}
})

module.exports = router

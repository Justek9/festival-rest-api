// concert.routes.js

const express = require('express')
const router = express.Router()
const db = require('../db')



router.route('/concerts').get((req, res) => {
	res.json(db.concerts)
})

router.route('/concerts/:id').get((req, res) => {
	const id = Number(req.params.id)
	const concert = db.concerts.find(el => el.id === id)
	if (!concert) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(concert)
})

router.route('/concerts').post((req, res) => {
	const id = db.concerts[db.concerts.length - 1].id + 1
	const newConcert = Object.assign({ id: id }, req.body)
	db.concerts.push(newConcert)
	res.status(201).json({ message: 'OK' })
})

router.route('/concerts/:id').delete((req, res) => {
	const id = Number(req.params.id)
	const concert = db.concerts.find(el => el.id === id)
	const index = db.concerts.indexOf(concert)

	if (!concert) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.concerts.splice(index, 1)
		res.json({ message: 'OK, deleted' })
	}
})

router.route('/concerts/:id').put((req, res) => {
	const { performer, genre, price, day, image } = req.body
	const id = Number(req.params.id)
	const concert = db.concerts.find(el => el.id === id)
	const index = db.concerts.indexOf(concert)
	if (!concert) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.concerts[index] = { ...concert, performer, genre, price, day, image }
		res.json({ message: 'data changed' })
	}
})


module.exports = router

// testimonials.routes.js

const express = require('express')
const router = express.Router()
const db = require('../db')


router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials)
})
router.route('/testimonials/random').get((req, res) => {
	const random = Math.floor(Math.random() * db.testimonials.length)
	res.json(db.testimonials[random])
})

router.route('/testimonials/:id').get((req, res) => {
	const id = Number(req.params.id)
	const testimonial = db.testimonials.find(el => el.id === id)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(testimonial)
})

router.route('/testimonials').post((req, res) => {
	const id = db.testimonials[db.testimonials.length - 1].id + 1
	const newTestimonial = Object.assign({ id: id }, req.body)
	db.testimonials.push(newTestimonial)
	res.status(201).json({ message: 'OK' })
})

router.route('/testimonials/:id').put((req, res) => {
	const { author, text } = req.body
	const id = Number(req.params.id)
	const testimonial = db.testimonials.find(el => el.id === id)
	const index = db.testimonials.indexOf(testimonial)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.testimonials[index] = { ...testimonial, author, text }
		res.json({ message: 'data changed' })
	}
})

router.route('/testimonials/:id').delete((req, res) => {
	const id = Number(req.params.id)
	const testimonial = db.testimonials.find(el => el.id === id)
	const index = db.testimonials.indexOf(testimonial)

	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.testimonials.splice(index, 1)
		res.json({ message: 'OK, deleted' })
	}
})

module.exports = router

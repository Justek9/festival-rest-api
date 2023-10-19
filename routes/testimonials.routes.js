const express = require('express')
const router = express.Router()
const Testimonial = require('../models/testimonials.model')

router.get('/testimonials', async (req, res) => {
	try {
		res.json(await Testimonial.find())
	} catch (err) {
		res.status(500).json({ message: err })
	}
})

router.get('/testimonials/:id', async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id)
		if (!testimonial) res.status(404).json({ message: 'Not found...' })
		else res.json(testimonial)
	} catch (err) {
		res.status(500).json({ message: err })
	}
})

router.post('/testimonials', async (req, res) => {
	try {
		const { author, text } = req.body
		const newTestimonial = new Testimonial({ author, text })
		await newTestimonial.save()
		res.json({ message: 'OK' })
	} catch (err) {
		res.status(500).json({ message: err })
	}
})

router.put('/testimonials/:id', async (req, res) => {
	try {
		const { author, text } = req.body
		const testimonial = await Testimonial.findById(req.params.id)
		if (testimonial) {
			await Testimonial.updateOne({ _id: req.params.id }, { $set: { author, text } })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
})

router.delete('/testimonials/:id', async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id)
		if (testimonial) {
			await Testimonial.deleteOne({ _id: req.params.id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
})

module.exports = router

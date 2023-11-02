const Testimonial = require('../models/testimonials.model')
const sanitize = require('mongo-sanitize')

exports.getAll = async (req, res) => {
	try {
		res.json(await Testimonial.find())
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.getById = async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id)
		if (!testimonial) res.status(404).json({ message: 'Not found...' })
		else res.json(testimonial)
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.post = async (req, res) => {
	try {
		const cleanAuthor = sanitize(req.body.author)
		const cleanText = sanitize(req.body.text)
		console.log(cleanAuthor, cleanText);
		const newTestimonial = new Testimonial({ author: cleanAuthor, text: cleanText })
		await newTestimonial.save()
		res.json({ message: 'OK' })
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.put = async (req, res) => {
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
}

exports.delete = async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id)
		if (testimonial) {
			await Testimonial.deleteOne({ _id: req.params.id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

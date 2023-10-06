const express = require('express')
const path = require('path')
const db = require('./db')

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/testimonials', (req, res) => {
	res.json(db.testimonials)
})
app.get('/testimonials/random', (req, res) => {
	const random = Math.floor(Math.random() * db.testimonials.length)
	res.json(db.testimonials[random])
})

app.get('/testimonials/:id', (req, res) => {
	const id = Number(req.params.id)
	const testimonial = db.testimonials.find(el => el.id === id)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(testimonial)
})

app.post('/testimonials', (req, res) => {
	const id = db.testimonials[db.testimonials.length - 1].id + 1
	const newTestimonial = Object.assign({ id: id }, req.body)
	db.testimonials.push(newTestimonial)
	res.status(201).json({ message: 'OK' })
})

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
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

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})
app.listen('8000')

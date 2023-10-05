const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const db = [
	{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
	{ id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
]

app.get('/testimonials', (req, res) => {
	res.json(db)
})
app.get('/testimonials/random', (req, res) => {
	const random = Math.floor(Math.random() * db.length)
	res.json(db[random])
})

app.get('/testimonials/:id', (req, res) => {
	const id = Number(req.params.id)
	const testimonial = db.find(el => el.id === id)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(testimonial)
})

app.post('/testimonials', (req, res) => {
	const id = db[db.length - 1].id + 1
	const newTestimonial = Object.assign({ id: id }, req.body)
	db.push(newTestimonial)
	res.status(201).json({ message: 'OK' })
})

app.put('/testimonials/:id', (req, res) => {
	const { author, text } = req.body
	const id = Number(req.params.id)
	const testimonial = db.find(el => el.id === id)
	const index = db.indexOf(testimonial)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db[index] = { ...testimonial, author, text }
		res.json({ message: 'data changed' })
	}
})

app.delete('/testimonials/:id', (req, res) => {
	const id = Number(req.params.id)
	const testimonial = db.find(el => el.id === id)
	if (!testimonial) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json({ message: 'OK', data: [...db, req.body] })
})

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})
app.listen('8000')

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

// concerts
app.get('/concerts', (req, res) => {
	res.json(db.concerts)
})

app.get('/concerts/:id', (req, res) => {
	const id = Number(req.params.id)
	const concert = db.concerts.find(el => el.id === id)
	if (!concert) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(concert)
})

app.post('/concerts', (req, res) => {
	const id = db.concerts[db.concerts.length - 1].id + 1
	const newConcert = Object.assign({ id: id }, req.body)
	db.concerts.push(newConcert)
	res.status(201).json({ message: 'OK' })
})

app.delete('/concerts/:id', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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

//seats
app.get('/seats', (req, res) => {
	res.json(db.seats)
})

app.get('/seats/:id', (req, res) => {
	const id = Number(req.params.id)
	const seat = db.seats.find(el => el.id === id)
	if (!seat) {
		return res.status(404).json({ message: 'Invalid ID' })
	}
	res.json(seat)
})

app.post('/seats', (req, res) => {
	const id = db.seats[db.seats.length - 1].id + 1
	const newSeat = Object.assign({ id: id }, req.body)
	db.seats.push(newSeat)
	res.status(201).json({ message: 'OK' })
})

app.delete('/seats/:id', (req, res) => {
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

app.put('/seats/:id', (req, res) => {
	const { day, seat, client, email } = req.body
	const id = Number(req.params.id)
	const seatChanged = db.seats.find(el => el.id === id)
	const index = db.coseatsncerts.indexOf(seatChanged)
	if (!seatChanged) {
		return res.status(404).json({ message: 'Invalid ID' })
	} else {
		db.seats[index] = { ...seat, day, seat, client, email }
		res.json({ message: 'data changed' })
	}
})

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})
app.listen('8000')

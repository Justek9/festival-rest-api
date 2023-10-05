const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))

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
	const id = Number(req.params.id) - 1
	res.json(db[id])
})

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})
app.listen('8000')

const express = require('express')
const path = require('path')
const cors = require('cors')

// import routes
const testimonialRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', testimonialRoutes) // add testimonial routes to server
app.use('/api', concertsRoutes) // add concerts routes to server
app.use('/api', seatsRoutes) // add seats routes to server

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})
app.listen('8000')

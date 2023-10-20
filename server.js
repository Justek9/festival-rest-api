const express = require('express')
const path = require('path')
const cors = require('cors')
const socket = require('socket.io')
const app = express()
app.use(cors())

const mongoose = require('mongoose')

// import routes
const testimonialRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000')
})
const io = socket(server)

app.use(express.static(path.join(__dirname, '/public')))
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
	req.io = io
	next()
})

app.use('/api', testimonialRoutes) // add testimonial routes to server
app.use('/api', concertsRoutes) // add concerts routes to server
app.use('/api', seatsRoutes) // add seats routes to server

// connects our backend code with the database
const uri = 'mongodb+srv://zagorskaj:EightXYZ@cluster0.gh0ncql.mongodb.net/NewWaveDB?retryWrites=true&w=majority'
mongoose.connect(uri, {
	useNewUrlParser: true,
})
const db = mongoose.connection

db.once('open', () => {
	console.log('Connected to the database')
	
})
db.on('error', err => console.log('Error ' + err))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' })
})

io.on('connection', socket => {
	console.log('New client! Its id – ' + socket.id)
})

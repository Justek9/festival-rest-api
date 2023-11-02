const express = require('express')
const path = require('path')
const cors = require('cors')
const socket = require('socket.io')
const app = express()
const helmet = require('helmet')

require('dotenv').config()
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
app.use(helmet())

app.use((req, res, next) => {
	req.io = io
	next()
})

app.use('/api', testimonialRoutes) // add testimonial routes to server
app.use('/api', concertsRoutes) // add concerts routes to server
app.use('/api', seatsRoutes) // add seats routes to server

const NODE_ENV = process.env.NODE_ENV
let dbUri = ''
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://zagorskaj:${password}@cluster0.gh0ncql.mongodb.net/NewWaveDB?retryWrites=true&w=majority`
if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/neWaveDBtest'
else dbUri = uri

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
	console.log('Connected to the database')
})
db.on('error', err => console.log('Error ' + err))

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

module.exports = server

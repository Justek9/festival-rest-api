const express = require('express')
const { Socket } = require('socket.io')
const router = express.Router()
const Seats = require('../controllers/seats.controllers')

router.get('/seats', Seats.getAll)

router.get('/seats/:id', Seats.getById)

router.post('/seats', Seats.post)

router.delete('/seats/:id', Seats.delete)

router.put('/seats/:id', Seats.put)

module.exports = router

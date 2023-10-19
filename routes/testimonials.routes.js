const express = require('express')
const router = express.Router()
const Testimonials = require('../controllers/testimonials.controllers')

router.get('/testimonials', Testimonials.getAll)

router.get('/testimonials/:id', Testimonials.getById)

router.post('/testimonials', Testimonials.post)

router.put('/testimonials/:id', Testimonials.put)

router.delete('/testimonials/:id', Testimonials.delete)

module.exports = router

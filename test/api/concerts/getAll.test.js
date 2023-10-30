const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const request = chai.request
const server = require('../../../server')
const Concert = require('../../../models/concerts.model')

describe('GET /api/concerts', () => {
	before(async () => {
		const concertOne = new Concert({
			performer: 'Test',
			genre: 'test2',
			price: 20,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			tickets: 50,
		})

		await concertOne.save()

		const concertTwo = new Concert({
			performer: 'tttt',
			genre: 'test4',
			price: 30,
			day: 3,
			image: '/img/uploads/1fsd324fsdg.jpg',
			tickets: 50,
		})
		await concertTwo.save()
	})

	after(async () => {
		await Concert.deleteMany()
	})

	it('/ should return all concerts', async () => {
		const res = await request(server).get('/api/concerts')
		expect(res.status).to.be.equal(200)
		expect(res.body).to.be.an('array')
		expect(res.body.length).to.be.equal(2)
	})
})

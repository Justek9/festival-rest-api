const daysSchema = new mongoose.Schema({
	day: { type: Number, required: true },
})

module.exports = mongoose.model("Day", daysSchema)

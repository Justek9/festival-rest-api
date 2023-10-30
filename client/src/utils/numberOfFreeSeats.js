export const numberOfFreeSeats = (seats, chosenDay) => {
	let total = 50
	let seatsTaken = []
	for (let seat of seats) {
		if (seat.day === chosenDay) {
			seatsTaken.push(seat)
		}
	}

	const freeSeats = total - seatsTaken.length
	return freeSeats
}

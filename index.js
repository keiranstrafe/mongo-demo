const mongoose = require('mongoose')
const prompt = require('prompt')

prompt.message = null

const { fruitSchema } = require('./schemas')

const Fruit = mongoose.model("Fruit", fruitSchema)

const start = async () => {
	await mongoose.connect('mongodb://localhost:27017/fruitsDB')

	console.log('connected to DB')

	promptForOperation()
}

const promptForOperation = async () => {
	console.log('Please select an operation:')
	console.log('1.\t List fruits')
	console.log('2.\t Add a new fruit')

	prompt.start()

	try {
		const result = await prompt.get({
			description: 'Option',
			name: 'Option',
			type: 'integer',
		})

		if (result.Option === 1) {
			await listFruits()
			await promptForOperation()
		} else if (result.Option === 2) {
			const fruit = await promptForNewFruit()
			await addFruit(fruit)
			await promptForOperation()
		}
	} catch {
		prompt.stop()
		console.log('Cancelled')
	}

	return
}

const promptForNewFruit = async () => {
	prompt.start()

	const fruit = await prompt.get(['name', 'rating', 'review'])

	return fruit
}

const listFruits = async () => {
	const result = await Fruit.find()
	const fruits = result.map(f => ({ name: f.name, rating: f.rating, review: f.review }))
	console.log(fruits)
}

const addFruit = async (fruit) => {
	const existing = await Fruit.exists({ name: fruit.name })

	if (existing) {
		console.log(`"${fruit.name}" already exists, please try another.`)
		return
	}

	console.log(`Added ${fruit.name} successfully!`)
}

start().catch(err => console.log(err))
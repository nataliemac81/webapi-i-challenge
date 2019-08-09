// implement your API here

// require the express module
const express = require('express')

// Middleware
const bodyParser = require('body-parser')

// create the server
const server = express()

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

// require the db file
const db = require('./data/db')


server.get('/', (req, res) => {
  res.send('Hello from my Express App!')
})

// GET /users
server.get('/users', (req, res) => {
	db.find()
	.then (users => {
		res.json(users)
	})
	.catch (err => {
		res.status(500).json({
			err: err
		})
	})
})

// POST /users
server.post('/users', (req, res) => {
	const newUser = req.body
	db.insert(newUser)
		.then(user => {
			res.status(201).json(user)	
		})
		.catch(err => {
			res.status(500).json({
				err: err,
				message: 'There was an error while saving the user to the database'
			})
		})
})

// GET /users/:id
server.get('/users/:id', (req, res) => {
	const { id } = req.params
	db.findById(id)
	.then(user => {
		if (user) {
			res.json(user)
		} else {
			res.status(404).json({
				message: "The user with the specified ID does not exist." 
			})
		}
	}) 
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The user information could not be retrieved."
		})
	})
})

// DELETE users/:id
server.delete('/users/:id', (req, res) => {
	const { id } = req.params
	
	db.remove(id)
	.then(user => {
		if (user) {
			res.json(user)
		} else {
			res.status(404).json({
				message: "The user with the specified ID does not exist."
			})
		}
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The user could not be removed"
		})
	})
})

// PUT users/:id
server.put('/users/:id', (req, res) => {
	const { id } = req.params
	const changed = req.body

	db.update(id, changed)
	.then(updated => {
		if (updated) {
			res.json(updated)
		} else {
			res.status(404).json({
				message: "The user with the specified ID does not exist."
			})
		}
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The user information could not be modified."
		})
	})
})

server.listen(4000, () => console.log('API running on port 4000'))
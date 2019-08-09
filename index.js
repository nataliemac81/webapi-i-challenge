// implement your API here

// require the express module
const express = require('express')

// create the server
const server = express()

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
	.catch (error => {
		res.status(500).json({
			error: error
		})
	})
})


// POST /users
server.post('/users', (req, res) => {
	
})



server.listen(4000, () => console.log('API running on port 4000'))
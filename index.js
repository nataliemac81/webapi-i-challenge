// implement your API here

// require the express module
const express = require('express')

// create the server
const server = express()

server.get('/', (req, res) => {
  res.send('Hello from my Express App!')
})

server.listen(4000, () => console.log('API running on port 4000'))
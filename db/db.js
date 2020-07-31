// REQUIRE STATEMENTS
const mongoose = require('mongoose')

// Connect to MongoDB through a connection URI/URL
const connectionString = 'mongodb://localhost/fruit'
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// Provide messages for successful connections, errors, and disconnections
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to: ' + connectionString)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')    
})

mongoose.connection.on('error', (error) => {
    console.error('Mongoose error', error)
})
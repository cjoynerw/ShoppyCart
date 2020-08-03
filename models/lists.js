// REQUIRES
const mongoose = require('mongoose')
const Item = require('./item')

// SCHEMA
const listSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
})

// CREATE MODEL
const List = mongoose.model("List", listSchema)

// EXPORT
module.exports = List
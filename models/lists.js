// REQUIRES
const mongoose = require('mongoose')
const Item = require('./items')

// SCHEMA
const listSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

// CREATE MODEL
const List = mongoose.model("List", listSchema)

// EXPORT
module.exports = List
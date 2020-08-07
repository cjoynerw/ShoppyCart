// REQUIRES
const mongoose = require('mongoose')

// SCHEMA
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: String,
    notes: String,
    date: String,
    store: String,
})

// CREATE MODEL

// Update Items
// const updateItemsSchema = new mongoose.Schema({
//     name: String, 
//     quantity: Number,
//     unit: String,
//     notes: String,
//     date: String,
//     store: String,
// })
const Item = mongoose.model("Item", itemSchema)

// EXPORT
module.exports = Item
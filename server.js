const express = require('express')
const app = express();
// const methodOverride = require("method-override")
require('./db/db')


// app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }))

//ROUTES

app.listen(3000, () => {
    console.log("I'm listening")
})
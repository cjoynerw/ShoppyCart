const express = require('express')
const app = express();
const ejsLayouts = require('express-ejs-layouts')
// const methodOverride = require("method-override")
require('./db/db')


// app.use(methodOverride('_method'))

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({ extended: false }))

//ROUTES
const router = require('./routes/routes.js');
app.use('/', router)

app.listen(3000, () => {
    console.log("I'm listening")
})
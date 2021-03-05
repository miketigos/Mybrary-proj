if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}

const express = require('express') // import express from lib
const app = express() // get express app
const expressLayouts = require('express-ejs-layouts') // get layouts
const bodyParser = require('body-parser')

// ./ refers to our relative path (where we are now)
// from __dirname we will go into the routes folder and get the index file
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// set view engine 
app.set('view engine', 'ejs')
    // set where server views come from thisdir/views
    // create views folder in this directory
app.set('views', __dirname + '/views')
    // setup layout file, every file will be put in this file
    // so we dont have to duplicate html
    // we can find in the layouts folder in a folder called layout
app.set('layout', 'layouts/layout')
    // tell express we want to use the layouts we imported
app.use(expressLayouts)
    // where public files: stylesheets, assets, js, etc
    // a folder in our application called public (create it)
    // public is the stadard public file name
app.use(express.static('public'))
    // here we will just use the indexRouter file we required 
    // '/' refers to the root of our application
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
    //set listening port
    // process.env.PORT will receive port number once we connect our database
    // if false(not up yet) we will just call localhost:3000
app.listen(process.env.PORT || 3000)
    // in nodejs-land people call controllers routes
    // models folder is for database models
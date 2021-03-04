// this folder will set up all the routes/controllers 
// for our application
const express = require('express')
// create a router from built in express function
const router = express.Router()

// form the root directory 
router.get('/', (req, res) => {
    // send a response to the browser
    // render will render a view from our views folder
    res.render('index')
})
// since this is required by the server, we need to export the router
// so that it can be required by the server.js file
// this is how modules work in node
module.exports = router
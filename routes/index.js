// index.js is our router

const express = require('express') //imports express
const router = express.Router()    //gets router portion of express variable so we call router function on express and creates router variable we can use it to create our routes


router.get('/', (req, res) => {   // uses get action to create a route the very route of our application "localhost:3000 the main page front end of server" also pass into it a function with 2 parameters request and response
 //   res.send('hello')           // should send hello to front end
      res.render('index')       //renders our view passes it into page
})

module.exports = router //exports router to server.js 
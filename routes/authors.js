// index.js is our router

const express = require('express') //imports express
const router = express.Router()    //gets router portion of express variable so we call router function on express and creates router variable we can use it to create our routes
const Author = require('../models/author') // imports author require file from designated folder

//this route is for getting all of our authors all authors route
router.get('/', async (req, res) => {   // uses get action to create a route the very route of our application "localhost:3000 the main page front end of server" also pass into it a function with 2 parameters request and response
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, "i")
  }
  try {
    const authors = await Author.find({searchOptions})
    res.render('authors/index',{
       authors: authors,
       searchOptions: req.query })       //renders our view passes it into page
  } catch {
    res.redirect('/')
  }
  //   res.send('hello')           // should send hello to front end
      
})

//New Author Route this route is for creating a new authors 
router.get('/new', (req, res) => {          //creates a new route and page for new authors
  res.render('authors/new', { author: new Author() })  //pass variables int onew author route this variables will be sent to ejs file
})

//Create author route
router.post('/', async (req, res) => {          //creates the author route use post to create route route is same as index and this posts to a new collection to create author
   // res.send('Create')                   // instead of render we do creation so use send information to client to create
      const author = new Author({     // were going to use the input name to create a new author and add it our database so set const author to new
         name: req.body.name           // pass to our variables to new author specifiing name
      })   
      try {
        const newAuthor = await author.save //
         //   res.redirect(`authors/${newAuthor.id}`)  //if no error render user back to page with all authors and in paticular the new author and to do this we use teh newauthor id with string interpolation
            res.redirect(`authors`)
      } catch {                                     // if error caught
          res.render('authors/new', {               // if theres an error on authors/new page
          author: author,                         //pass author back so if they go back to page the name will remain
          errorMessage: 'Error creating Author'  // displays an error message if failure
      })        
   //   author.save((err, newAuthor) => { // call the save method on author to save author or error  => use callback
   //     if (err) {
   //       res.render('authors/new', {    // if theres an error on authors/new page
   //         author: author,               //pass author back so if they go back to page the name will remain
   //         errorMessage: 'Error creating Author'  // displays an error message if failure
   //       })
   //     } else {
   //       //res.redirect(`authors/${newAuthor.id}`)  //if no error render user back to page with all authors and in paticular the new author and to do this we use teh newauthor id with string interpolation
   //         res.redirect(`authors`)
   //     }
   //   })                      
      //res.send(req.body.name)           //instead of sending the text create we send request the body of the input name
  })                 


module.exports = router //exports router to server.js 
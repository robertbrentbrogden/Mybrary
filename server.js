if (process.env.node_ENV !== 'production') {   //if not in production environemnt load .env
    require('dotenv').config()                  //loads variables from .env, imports into process.env below
}

const express = require('express') // imports javascript express into server.js
const app = express()   // calls app portion of express into server
const expresslayouts = require('express-ejs-layouts') // imports express layouts

const indexRouter = require('./routes/index') // imports index.js into server ./ means a relative to this file  

app.set('view engine', 'ejs')  //sets our view engine to express javascript
app.set('views', __dirname + '/views') //sets where our views are coming from in this case the directory name /views
app.set('layout', 'layouts/layout') // hooksup express layouts into our server sets layout file which includes alot of our basic html like header and footer
app.use(expresslayouts)          //tell our application to use express layouts passes in expresslauout we included from our require library above
app.use(express.static('public')) // tell express where our public files are going to be stylesheets javascript images etc

const mongoose = require('mongoose'); //setting up databse .. import mongoose into application THIS IS THE NEWER VERSION OF REQUIRE MONGOOSE
mongoose.connect(process.env.DATABASE_URL, {        //sets up connection to/for database places url for connection setup string for url so it will work once live on internet comes from environment variables
    useNewUrlParser: true                       //uses the new url parser of mongoosedb
})
const db = mongoose.connection                 //creates variable db which allows us to access connection to database
db.on('error', error => console.error(error))  //database on error print to console error
db.once('open', () => console.log('conncted to mongoose')) // db.once runs only one time once connected print console connected to monggoose

app.use('/', indexRouter) // tell app to use indexrouter / means the very root path of application we use indexrouter to handle this route?

app.listen(process.env.PORT || 3000) // tell out app to listen to a certain port in the case port 3000 process.env.port pulls from the environtment variable for when we deploy just settign default port for 3000


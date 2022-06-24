//models is usually just singular form of routes in this case authors to author
const mongoose = require('mongoose') // imports mongoose into the file so we can use mongoose

const authorSchema = new mongoose.Schema({ // creates a scheme a schema is practially the same thing as a table in sql database 
    name: {                                 // here we define the different columns of our schema as json objects
        type: String,                       //columns will be a string
        required: true                      // it is required meaning it is created
    }
}) 

module.exports = mongoose.model('Author', authorSchema) //export schema to  new mongoose model named Author with paremater of previous schema function above
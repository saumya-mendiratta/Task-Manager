// ---Taken these lines from mongoose documentation--

// Require the Library
const mongoose = require ('mongoose');

//Connect to DB
// mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb+srv://saumya2828:9871535223@cluster0.zovc5.mongodb.net/saumya-todo-db?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false ,useCreateIndex:true}).then(()=>{
    console.log("Mongodb connected");
});

//Acquire the connection (to check if it is succesful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//up and running then print the message 
db.once('open', function() {
   console.log("we're connected!");
});
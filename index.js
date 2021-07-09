const { profile } = require('console');
const { response } = require('express');
const express = require('express');
const { homedir } = require('os');

const path = require('path');
const port =9000;

//For requiring mongoose database
const db = require('./config/mongoose');

//For requiring task.js file
const Task =require('./models/task');

const app = express();

// ---For using middleware Parser----
app.use(express.urlencoded());

app.use(express.static('assests'));


// --------Setting up EJS--------
app.set('view engine','ejs');
// --------Setting path in views folder--------
app.set('views', path.join(__dirname,'views'));



// -----------For home.ejs-------------
app.get('/', function(req, res){


    //After attaching database to it
    Task.find({} , function(err,tasks){

        if(err){
            console.log("Error in fetching Task");
            return;
        }

        return res.render('home', 
        {
            title : "TO-DO",
            task_list : tasks
        });

    });

});


// ---------For Creating Task in List dynamically-------
app.post('/create-task', function(req, res){
    
    Task.create({
        name: req.body.name,
        Category: req.body.Category,
        due_date: req.body.due_date

    } , function(err , newTask){

        if(err){
        console.log("There's and error in Adding Task");
        return;
        }

        console.log("*******", newTask);
        return res.redirect('back');
    });

});


// -----For checking Tasks--------
app.get('/delete-todo', function(req , res) {
    
    // --------WITH DATABASE-------

    let id = req.query.id;
   
    console.log(id);
    //Storing checked tasks in array


    Task.deleteMany({_id:{$in:id}},(err,todo)=>{
        if(err){
            console.log("error in deleting a task",err);return;
        }
        console.log(todo);
        return res.redirect('back');
        //now try deleting the multiple todo
    })

});




app.listen(process.env.PORT || 9000 , function(err){

    if(err){
        console.log("error in running the server",err);
    }

    console.log("Yup my Express server is running on port: ", port);

});
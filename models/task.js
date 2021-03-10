const mongoose = require('mongoose');

//To Create a schema 
const taskSchema = new mongoose.Schema({

    name:{
        type: String ,
        required: true
    },
    Category:{
        type: String ,
        required:true
    },
    due_date:{
        type: String ,
        required:true
    }
});

const Task = mongoose.model('Task' , taskSchema);

//Export
module.exports = Task;
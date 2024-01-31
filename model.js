const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Todos = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
        
    },
    id:{
        type:String,
        required:true,
        
    },
   
});

//Export the model
module.exports = mongoose.model('Todos', Todos);
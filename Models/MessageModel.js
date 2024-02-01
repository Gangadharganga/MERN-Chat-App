const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userMessage = new mongoose.Schema({
    login_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'registeruser'
    },
    username:{
        type:String,
        required:true,
        
    },
    text:{
        type:String,
        required:true,
       
    },
    date:{
        type:Date,
        default: Date.now()
    },
    
});

//Export the model
module.exports = mongoose.model('userMessage', userMessage);
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var RegisterUser = new mongoose.Schema({
    user:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
       
    },
    mobile:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('registeruser', RegisterUser);
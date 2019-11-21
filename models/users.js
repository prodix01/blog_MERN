const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true     //필수값
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    date : {
        type : String,
        default : Date.now
    }

});


module.exports = mongoose.model("user", userSchema);
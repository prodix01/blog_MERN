const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    handle : {
        type : String,
        required : true,
        max : 40
    },
    company : {
        type : String
    },
    website : {
        type : String
    },
    location : {
        type : String
    },
    status : {
        type : String,
        required : true,
    },
    skills : {
        type : [String],
        required : true
    },
    bio : {
        type : String
    },
    githubusername : {
        type : String
    },
    experience : [
        {
            title : {
                type : String,
                required :true
            },
            company : {
                type : String,
                required : true
            },
            location : {
                type : String
            },
            from : {
                type : Date,
                required : true
            },
            to : {
                type : String
            },
            current : {
                type : Boolean,
                default :false
            },
            description : {
                type : String
            }
        }
    ],
    education : [
        {
            school : {
                type : String,
                required :true
            },
            degree : {
                type : String,
                required : true
            },
            major : {
                type : String,
                required : true
            },
            from : {
                type : Date,
                required : true
            },
            to : {
                type : Date
            },
            current : {
                type : Boolean,
                default : false
            },
            description : {
                type : String
            }
        }
    ],
    social : {},
    date : {
        type : Date,
        default : Date.now
    }
});



module.exports = mongoose.model("profile", profileSchema);
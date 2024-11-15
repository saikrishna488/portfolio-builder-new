const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,

    },
    description : {
        type : String,

    },
    field : {
        type : String,

    },
    role : {
        type : String,

    },
    skills : {
        type : [String],

    },
    certifications : {
        type : [String],

    },
    projects : {
        type : [String],

    },
    college : {
        type : String,

    },
},{
    timestamps : true
});

const User = mongoose.model('User',userSchema);

module.exports = User
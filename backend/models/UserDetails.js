const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    field : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    skills : {
        type : String,
        required : true
    },
    certifications : {
        type : String,
        required : true
    },
    projects : {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const UserDetails = mongoose.model('UserDetails',userSchema);

module.exports = UserDetails;
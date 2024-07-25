const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
},{
    timestamps : true
});

const Templates = mongoose.model('Templates',userSchema);


module.exports = Templates;
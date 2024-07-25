const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
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
})



const resume = mongoose.model('resumeTemplates',resumeSchema);


module.exports =  resume


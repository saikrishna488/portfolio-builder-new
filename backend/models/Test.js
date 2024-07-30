const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    
    role : {
        type: String,
        required : true
    },

    question : {
        type : String,
        required : true
    } ,
    
    options : {
        type :[String],
        required : true
    },
    
    answer : {
        type : String,
        required : true
    }
})

const TestModel = mongoose.model('Test',TestSchema)

module.exports = TestModel;
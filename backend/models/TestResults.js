const mongoose = require('mongoose');

const TestResultSchema = mongoose.Schema({
    
    role : {
        type: String,
        required : true
    },

    username :{
        type: String,
        required : true
    },

    result : {
        type : String,
        required : true
    } ,
    
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

const TestResultModel = mongoose.model('Testresult',TestResultSchema)

module.exports = TestResultModel;
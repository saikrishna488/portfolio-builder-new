const mongoose = require('mongoose')


const resultSchema = mongoose.Schema({

    email : {
        type: String,
        required : true
    },

    question : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const resultModel = mongoose.model('result',resultSchema)

module.exports = resultModel
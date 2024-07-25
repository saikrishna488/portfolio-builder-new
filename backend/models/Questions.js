const mongoose = require('mongoose')


const questionSchema = mongoose.Schema({

    role : {
        type: String,
        required : true
    },

    question : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const questionModel = mongoose.model('questions',questionSchema)

module.exports = questionModel
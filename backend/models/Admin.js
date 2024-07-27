const mongoose =require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    key: {
        type: String,
        required : true
    }
},{
    timestamps : true
})

const adminModel = mongoose.model('admin',adminSchema);

module.exports = adminModel;
const mongoose = require('mongoose');

const conn = async ()=>{
    try{
        let con = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected")
    }
    catch(err){
        console.log("error db not connected", err);
    }
}

module.exports= conn;
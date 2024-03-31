//import mongoose
const mongoose = require('mongoose')

//create scheme
const discription = new mongoose.Schema({
    title:{
        type:String,
        require:true

    },
    images: [{
        type: String,
        required: true
    }],
    description:{
        type:String,
        require:true
       
    },
    text:{
        type:String,
        require:true
    }
   

})


//create modal
const words = mongoose.model("words",discription)

//export
module.exports = words
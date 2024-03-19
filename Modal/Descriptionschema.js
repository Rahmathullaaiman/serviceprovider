//import mongoose
const mongoose = require('mongoose')

//create scheme
const discription = new mongoose.Schema({
    title:{
        type:String,
        require:true

    },
    image:{
      type:String,
      require:true
    },
    description:{
        type:String
       
    }
   

})


//create modal
const words = mongoose.model("words",discription)

//export
module.exports = words
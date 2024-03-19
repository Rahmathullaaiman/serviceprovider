const mongoose = require('mongoose')



const providerSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     mobileno:{
        type:Number,
        required:true
     },
     image:{
        type:String,
        required:true
     },
     district:{
        type:String,
        required:true
     },
     worktype:{
        type:String,
        required:true
     },
     description:{
      type:String,
      required:true
     },
     password:{
        type:String,
        required:true
     }
})


const providers = mongoose.model("providers",providerSchema)

module.exports = providers
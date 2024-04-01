const mongoose = require('mongoose')



const providerSchema = new mongoose.Schema({
     
    name:{
        type:String,
        require:true
     },
     email:{
        type:String,
        require:true
     },
     contactnumber:{
        type:Number,
        require:true
     },
     userimage:{
        type:String,
        require:true
     },
     district:{
        type:String,
        require:true
     },
     worktype:{
        type:String,
        require:true
     },
     description:{
      type:String,
      require:true
     },
     password:{
        type:String,
        require:true
     },
     price:{
      type:Number,
      require:true
     },
     organisation:{
      type:String,
      require:true
     }
})


const providers = mongoose.model("providers",providerSchema)

module.exports = providers
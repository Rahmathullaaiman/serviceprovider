const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  
   workername:{
      type:String,
     
   }, 
   workerid:{
      type:String,
  
   },   
   package:{
      type:String,
   
   }, 
   service:{
        type:String,
     },
     workimage:{
        type:String,
    
     },
    price:{
        type:String,
      
     }

})


const packages = mongoose.model("packages",packageSchema)

module.exports = packages
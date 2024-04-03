const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  
   bookersusername:{
      type:String,
      require:true
   },  
   bookingworkername:{
      type:String,
      require:true
   }, 
   date:{
        type:String,
        require:true
     },
     service:{
        type:String,
        require:true
     },
     location:{
        type:String,
        require:true
     },
     locationURL:{
      type:String,
      require:true
     },
     userId:{
        type:String,
        require:true
     },
     workerid:{
        type:String,
        require:true
     },
     review:{
      type:String
   },
     status:{
        type:Boolean
     },
     workstatus:{
      type:Boolean
   },
     time:{
          type:String,
        require:true
     },
     price:{
      type:String,
      require:true
     },
     payment:{
      type:Boolean
     }
})


const bookings = mongoose.model("bookings",BookingSchema)

module.exports = bookings
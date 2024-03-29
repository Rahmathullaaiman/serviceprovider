const mongoose = require('mongoose')



const BookingSchema = new mongoose.Schema({
   bookersusername:{
      type:String,
      required:true
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
     }
})


const bookings = mongoose.model("bookings",BookingSchema)

module.exports = bookings
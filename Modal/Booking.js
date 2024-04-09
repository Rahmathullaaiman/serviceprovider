const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  
   bookersusername:{
      type:String,
   },  
   bookingworkername:{
      type:String,
   }, 
   date:{
        type:String,
     },
     service:{
        type:String,
     },
     location:{
        type:String,
     },
     locationURL:{
      type:String,
     },
     userId:{
        type:String,
     },
     workerid:{
        type:String,
     },
     review:{
      type:String
   },
     status:{
        type:Boolean
     },
     workstatus:{
      type:String
   },
     time:{
          type:String,
        require:true
     },
     payment:{
      type:Boolean
     },
     package: {
      type: String
  },
  packageid: {
    type: String
},
  description: {
      type: String
  },
  price: {
      type: Number
  }
})


const bookings = mongoose.model("bookings",BookingSchema)

module.exports = bookings

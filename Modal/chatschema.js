const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    senderId:{
      type:String
   },   
   receiverId:{
        type:String
     },
     message:{
        type:String
     },
     timestamp:{
        type: Date, default: Date.now 
     }

})


const chats = mongoose.model("chats",chatSchema)

module.exports = chats










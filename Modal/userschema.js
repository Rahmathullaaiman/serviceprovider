//import mongoose
const mongoose = require('mongoose')

//create scheme
const usersheme = new mongoose.Schema({
    userimage:{
        type:String,
        require:true

    },
    address:{
        type:String,
        require:true

    },
    contactnumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        }
    },

    organisation:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 character but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        valdator(value){
            if(!validator.isEmail(value))
            {throw new Error('invalid Email')}
        }
    },
    password:{
        type:String
       
    }
   

})


//create modal
const users = mongoose.model("users",usersheme)

//export
module.exports = users
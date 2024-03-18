
const mongoose = require('mongoose')

const connectionstring = process.env.database
mongoose.connect(connectionstring).then(()=>{
    console.log('DATABASE CONNECTED AAYI');
}).catch((err)=>{
    console.log(`mongo db connection failed due to :${err}`);
})
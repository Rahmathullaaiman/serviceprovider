
require('dotenv').config() 


const express = require('express')

const cors = require('cors')

const router = require('./Router/router')


//import connection.js file
require('./Database/connection')


const server = express()

server.use(cors())

server.use(express.json())


server.use(router)

server.use('/uploads',express.static('./uploads'))

//7 customize the port  - by default 3000
const PORT = 9000 || process.env

//8)to run server
server.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})




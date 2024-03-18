const express = require('express')


const usercontroll = require('../Controlls/usercontroll')

const providercontroll = require('../Controlls/providercontroll')



const multerconfig = require('../Middlewares/multer')


const router = new express.Router()


//register
router.post('/user/register',multerconfig.single('userimage'), usercontroll.registeruser)
//login
router.post('/user/login', usercontroll.loginuser)

//service provider register
router.post('/provider/register',multerconfig.single('userimage'),providercontroll.registerprovider)
//service provider login
router.post('/provider/login',providercontroll.loginprovider)





module.exports=router

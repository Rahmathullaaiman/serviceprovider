const express = require('express')



const usercontroll = require('../Controlls/usercontroll')

const providercontroll = require('../Controlls/providercontroll')

const wordcontroll = require('../Controlls/descriptions')



const multerconfig = require('../Middlewares/multer')
const jwtmiddleware = require('../Middlewares/jwttoken')




const router = new express.Router()


//register
router.post('/user/register',multerconfig.single('userimage'), usercontroll.registeruser)
//login
router.post('/user/login', usercontroll.loginuser)

//service provider register
router.post('/provider/register',multerconfig.single('image'),providercontroll.Registerprovider)
//service provider login
router.post('/provider/login',providercontroll.workerLogin)
//added description
router.post('/description/add', multerconfig.array('images', 5), wordcontroll.descriptions);
//get descriptions
router.get('/description/get',wordcontroll.getDescriptions)
//get workers
router.get('/provider/get',providercontroll.getAllWorkers)
// delete worker
router.delete('/deleteworker/:id',jwtmiddleware,providercontroll.deleteWorker)
//get all users
router.get('/user/get', usercontroll.getAllusers)
//delete users
router.delete('/deleteuser/:id',jwtmiddleware,usercontroll.deleteuser)
//search providers
router.get('/search',providercontroll.searchProviders);














module.exports=router

const express = require('express')



const usercontroll = require('../Controlls/usercontroll')

const providercontroll = require('../Controlls/providercontroll')

const wordcontroll = require('../Controlls/descriptions')

const bookingcontroll = require('../Controlls/bookingcontroller')

const chatcontroll = require('../Controlls/chatcontroll')



const multerconfig = require('../Middlewares/multer')
const jwtmiddleware = require('../Middlewares/jwttoken')




const router = new express.Router()


//register
router.post('/user/register',multerconfig.single('userimage'), usercontroll.registeruser)

//login
router.post('/user/login', usercontroll.loginUser)

//service provider register
router.post('/provider/register',multerconfig.single('userimage'),providercontroll.Registerprovider)

//service provider login
router.post('/provider/login',providercontroll.workerLogin)

//added description
router.post('/description/add', multerconfig.array('images', 5), wordcontroll.descriptions);

//get descriptions
router.get('/description/get',wordcontroll.getDescriptions)

//get workers
router.get('/provider/get',providercontroll.getAllWorkers)

// delete worker
router.delete('/deleteworker/:id',providercontroll.deleteWorker)

//get all users
router.get('/user/get', usercontroll.getAllusers)

//delete users
router.delete('/deleteuser/:id',usercontroll.deleteuser)

//search providers
router.get('/search',providercontroll.searchProviders);

//booking workers
router.post('/user/booking/:id',jwtmiddleware,bookingcontroll.bookingworker)

//approve booking
router.put('/worker/approvetrue/:id',jwtmiddleware,bookingcontroll.bookingapprove)

// workdone
router.put('/worker/workdone/:id',jwtmiddleware,bookingcontroll.Workdone)

// payment
router.put('/worker/payment/:id',jwtmiddleware,bookingcontroll.paymentdone)

//decline booking
router.put('/worker/approvefalse/:id',jwtmiddleware,bookingcontroll.bookingdecline)

//get all booking requests
router.get('/getAllRequestsByworker/:workerid',jwtmiddleware,bookingcontroll.getAllRequestsByWorkerId); 

//get all bookings for user
router.get('/getBookingsByUserId',jwtmiddleware,bookingcontroll.getBookingsByUserId); 

//edit the worker
router.put('/worker/update/:id',jwtmiddleware,multerconfig.single('userimage'),providercontroll.editWorker)

//edit user
router.put('/user/update/:id',jwtmiddleware,multerconfig.single('userimage'),usercontroll.edituser)

//cancel booking
router.delete('/delete/booking/:id',jwtmiddleware,bookingcontroll.cancelbooking)

//add reviews
router.post('/user/addreview/:id',jwtmiddleware,bookingcontroll.AddReview)

//chat
router.post('/user/sendchat',jwtmiddleware,chatcontroll.sendMessage)
//get message
router.get('/getMessages/:userId1/:userId2',jwtmiddleware,chatcontroll.getMessages);
// get workers by worktype
router.get('/getbyworktype/:worktype',providercontroll.getbyworktype)

















module.exports=router

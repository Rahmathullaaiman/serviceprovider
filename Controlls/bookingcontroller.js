const bookings = require('../Modal/Booking')
const providers = require('../Modal/provider')


exports.bookingworker = async(req,res)=>{

    const { date, service, location, locationURL } = req.body;
    const { id } = req.params;
    const userId = req.payload;
    try {
        const existingBooking = await bookings.findOne({ date, workerid: id });
    
        if (existingBooking) {
            return res.status(400).json({ message: "This worker is already booked for this date." });
        }
        const newBooking = new bookings({
            date, service, location, locationURL, userId, workerid: id, status: null
        });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: `Booking failed due to ${error}` });
    }
    

}

//booking te worker

// exports.bookingworker = async (req, res) => {
//     const { date, service, location, locationURL, workerId } = req.body; 
//     const userId = req.payload;
//     try {
//         const newBooking = new bookings({
//             date, service, location, locationURL, workerid: workerId, userId, status: null
//         });
//         await newBooking.save();
//         res.status(200).json(newBooking);
//     } catch (error) {
//         res.status(401).json(`Booking failed due to ${error}`);
//     }
// }


//approving booking 
exports.bookingapprove = async(req,res)=>{
    const {id} = req.params
    try {
     const trueBook = await bookings.updateOne({_id:id},{$set:{status:true}})
     console.log(trueBook);
     res.status(200).json(trueBook)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }

 //cancel approve
 exports.bookingdecline = async(req,res)=>{
    const {id} = req.params
    try {
     const falseBook = await bookings.updateOne({_id:id},{$set:{status:false}})
     res.status(200).json(falseBook)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }

 
 // get all bookings by worker id
exports.getAllRequestsByWorkerId = async (req, res) => {
    const { workerId } = req.params;
    try {
        const allBookings = await providers.find({ workerid: workerId });
        res.status(200).json(allBookings);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}

//get all bookings for user
exports.getBookingsByUserId = async (req, res) => {
    //const { userId } = req.params;
    const userId = req.payload
    try {
        const userBookings = await bookings.find({ userId });
        res.status(200).json(userBookings);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}


//cancel booking

exports.cancelbooking = async(req,res)=>{
    const {id} = req.params
    try {
        const cancel = await bookings.findByIdAndDelete({_id:id})
        res.status(200).json(cancel)
    } catch (error) {
        res.status(401).json(error)
    }
  }

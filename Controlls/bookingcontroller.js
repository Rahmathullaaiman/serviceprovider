const bookings = require('../Modal/Booking')


exports.bookingworker = async(req,res)=>{

    const { bookersusername,bookingworkername,date, service, location, locationURL } = req.body;
    const { id } = req.params;
    const userId = req.payload;
    try {
        const existingBooking = await bookings.findOne({ date, workerid: id });
    
        if (existingBooking) {
            return res.status(400).json({ message: "This worker is already booked for this date.Please choose another date" });
        }
        const newBooking = new bookings({
            bookersusername,bookingworkername,date, service, location, locationURL, userId, workerid: id, review: '', status: null
        });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: `Booking failed due to ${error}` });
    }
    

}

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
    try {
        const allBookings = await bookings.find();
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

  //add review
  exports.AddReview = async (req, res) => {
    const { id, feedback } = req.body

    try {
        const workerreview = await bookings.updateOne({ _id: id }, { $set: { review: feedback } })
        res.status(200).json(workerreview)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }

}

const bookings = require('../Modal/Booking')


exports.bookingworker = async(req,res)=>{

    console.log('inside booking worker');


    const { bookersusername,bookingworkername,date,time, service, location, locationURL,price } = req.body;
    const { id } = req.params;
    const userId = req.payload;
    try {
        const existingBooking = await bookings.findOne({ date, workerid: id });
    
        if (existingBooking) {
            return res.status(250).json({ message: "This worker is already booked for this date.Please choose another date" });
        }
        const newBooking = new bookings({
            bookersusername,bookingworkername,date,time, service, location, locationURL,price,payment:null, userId, workerid: id, review: '',workstatus: 'pending', status: null
        });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: `Booking failed due to ${error}` });
    }
    

}

//approving booking 
exports.bookingapprove = async(req,res)=>{
    console.log('inside booking approve');
    const {workstatus} = req.body;
    const {id} = req.params;
    try {
        const updatedBooking = await bookings.findOneAndUpdate({_id:id}, 
            {$set:{status:true, workstatus: "work accepted"}},
            {new: true});
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}
 //cancel approve
 exports.bookingdecline = async(req,res)=>{
    console.log('inside decline work');
    const {id} = req.params;
    try {
        const updatedBooking = await bookings.findOneAndUpdate({_id:id}, 
            {$set:{status:false,workstatus: "work Declined"}},
            {new: true});
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}
//  start work
 exports.startwork = async(req,res)=>{
    console.log('inside start work');
    const {id} = req.params;
    try {
        const updatedBooking = await bookings.findOneAndUpdate({_id:id}, 
            {$set:{workstatus: "work Started"}},
            {new: true});
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}

exports.Workdone = async(req,res)=>{
    console.log('inside Complete work');
    const {id} = req.params;
    try {
        const updatedBooking = await bookings.findOneAndUpdate({_id:id}, 
            {$set:{workstatus: "work completed"}},
            {new: true});
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}
//  payment
 exports.paymentdone = async(req,res)=>{
    console.log('inside payment ');

    const {id} = req.params
    try {
     const trueBook = await bookings.updateOne({_id:id},{$set:{payment:true}})
     console.log(trueBook);
     res.status(200).json(trueBook)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }
 // get all bookings by worker id
exports.getAllRequestsByWorkerId = async (req, res) => {

    console.log('inside get all request workers');
    const {workerid} = req.params
    console.log(workerid);
    try {
        const allBookings = await bookings.find({workerid:workerid});
        res.status(200).json(allBookings);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}

//get all bookings for user
exports.getBookingsByUserId = async (req, res) => {
    console.log('inside user request ');

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

    console.log('inside cancel booking');

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
      const id = req.params.id; // Assuming your route parameter is 'id'
      console.log('inside add review');
      const { feedback } = req.body;
  
      console.log(id, feedback);
      try {
          const workerReview = await bookings.updateOne(
              { _id: id }, // Filter based on the booking ID
              { $set: { review: feedback } } // Update to add review
          );
          res.status(200).json(workerReview);
      } catch (err) {
          res.status(401).json(`Request failed due to ${err}`);
      }
  };
  

const packages = require('../Modal/packagesschema')
const bookings = require('../Modal/Booking')



exports.Addpackage = async (req, res) => {
    console.log('inside adding package');

    const { workername, package, service, price } = req.body;
    const { id } = req.params;
    const workimage = req.file.filename;

    try {
        
        const existingPackage = await packages.findOne({ workerid: id, package: package });

        if (existingPackage) {
            return res.status(250).json({ message: "Worker already added this package" });
        }

        const newPackage = new packages({
            workername,
            workerid: id,
            package,
            service,
            workimage,
            price
        });

        await newPackage.save();
        res.status(200).json(newPackage);
    } catch (error) {
        res.status(500).json({ error: `Package creation failed due to ${error}` });
    }
}


//add package to bookings 
exports.CreateBooking = async (req, res) => {
    console.log('inside creating booking');

    const { bookersusername, bookingworkername, workerid, date,time, location, locationURL, package, service, price } = req.body;
    console.log(bookersusername, bookingworkername, workerid, date,time, location, locationURL, package, service, price );
    const { id } = req.params;
    const userId = req.payload;

    try {
        // Check if there is already a booking for the same user and date
        const existingBooking = await bookings.findOne({  date: date });

        if (existingBooking) {
            return res.status(400).json({ message: "You have already booked a package for this date" });
        }

        const addedpackage = new bookings({
            bookersusername,
            bookingworkername,
            workerid,
            date,
            time,
            location,
            locationURL,
            userId,
            packageid: id,
            package,
            service,
            price,
            review: '',
            status: null,
            workstatus:'pending'
        });

        await addedpackage.save();

        res.status(200).json(addedpackage);
    } catch (error) {
        res.status(500).json({ error:` Booking creation failed due to ${error}` });
    }
}

//get all packages
exports.getAllpackages = async (req, res) => {
    const {id} = req.params
    console.log('inside get all packages');

    try {
        const allpackages = await packages.find({workerid:id});
        res.status(200).json(allpackages);
    } catch (err) {
        res.status(401).json(Request` failed due to ${err}`);
    }
}

//get all packages
exports.deletepackage = async (req, res) => {
    const {id} = req.params
    console.log('inside delete package');

    try {
        const allpackages = await packages.findByIdAndDelete({_id:id});
        res.status(200).json(allpackages);
    } catch (err) {
        res.status(401).json(Request` failed due to ${err}`);
    }
}
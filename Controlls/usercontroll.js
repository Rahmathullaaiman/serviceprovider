const users = require('../Modal/userschema')


const jwt = require('jsonwebtoken')


//register user
exports.registeruser = async (req, res) => {
    console.log('register inside');

    const userimage = req.file.filename;
    console.log(userimage);

    const { address, contactnumber, organisation, email, password } = req.body;
    console.log(`${address},${contactnumber},${organisation},${email},${password}`);

    try {
        const userreg = await users.findOne({ email });
        if (userreg) {
            res.status(406).json('Account already exists. Please login.');
        } else {
            
            if (!/^\d{10}$/.test(contactnumber)) {
                res.status(400).json('Please enter a 10-digit contact number.');
                return; 
            }

            const newuser = new users({
                userimage,
                address,
                contactnumber,
                organisation,
                email,
                password
            });

            await newuser.save();

            res.status(200).json(newuser);
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

//login user

exports.loginuser =async (req,res)=>{
    const{email,password} = req.body

   try{ 
      const existuser =await users.findOne({email,password})
    console.log(existuser);

    if(existuser){
          //jwt token
        //payload-information is secretely transmitted
        //secret or private
        const token = jwt.sign({userId:existuser._id},"supersecretkey")

        res.status(200).json({
            existuser,
            token
        })
    }
    else{
        res.status(404).json('invalid emailID or password')
    }
}catch(err){
    res.status(401).json(`login request failed due to ${err}`);
}
}


//admin
// exports.adminLogin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await users.findOne({ Adminemail: email, Adminpswd: password });

//         if (admin) {
//             // Generating JWT token
//             const token = jwt.sign({ userId: admin._id }, "secretkey");

//             res.status(200).json({ admin, token });
//         } else {
//             res.status(404).json('Invalid email or password');
//         }
//     } catch (err) {
//         res.status(500).json(`Login failed due to ${err}`);
//     }
// };

//get alluser
exports.getAllusers = async(req,res)=>{
    try {
     const allusers = await users.find()
     res.status(200).json(allusers)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
  }

  //delete user
  exports.deleteuser = async(req,res)=>{
    const {id} = req.params
    try {
        const deleteuser = await users.findByIdAndDelete({_id:id})
        res.status(200).json(deleteuser)
    } catch (error) {
        res.status(401).json(error)
    }
  }
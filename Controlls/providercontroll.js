const providers = require('../Modal/provider')


const jwt = require('jsonwebtoken')


//register user
exports.registerprovider = async (req, res) => {
    console.log('register inside');

    const userimage = req.file.filename;
    console.log(userimage);

    const { address, contactnumber, organisation, email, password } = req.body;
    console.log(`${address},${contactnumber},${organisation},${email},${password}`);

    try {
        const userreg = await providers.findOne({ email });
        if (userreg) {
            res.status(406).json('Account already exists. Please login.');
        } else {
            
            if (!/^\d{10}$/.test(contactnumber)) {
                res.status(400).json('Please enter a 10-digit contact number.');
                return; 
            }

            const newuser = new providers({
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

exports.loginprovider =async (req,res)=>{
    const{email,password} = req.body

   try{ 
      const existuser =await providers.findOne({email,password})
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
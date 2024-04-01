const providers = require('../Modal/provider')


const jwt = require('jsonwebtoken')


//register provider
exports.Registerprovider = async(req,res)=>{

  console.log('inside  register  worker');


    const {name,email,mobileno,district,worktype,description,password,price,organisation} = req.body
    const image = req.file.filename
    
    try {
        const provider = await providers.findOne({email})
        if(provider){
            res.status(406).json('Account already exist...Please Login')
        }
        else{
            const newprovider = new providers({
                name,email,mobileno,image,district,worktype,description,password,price,organisation
            })
            await newprovider.save()
            res.status(200).json(newprovider)
        }
        
    } catch (error) {
        res.status(401).json(`Registration failed due to ${error}`)
    }

}

//login worker

exports.workerLogin = async(req,res)=>{
  
  console.log('inside the worker login');
    const {email,password} = req.body
    const logger = 'worker'
  
   try{ 
    const existingUser = await providers.findOne({email,password})
  
    if(existingUser){
      const token = jwt.sign({userid:existingUser._id},"supersecretkey")
      res.status(200).json({existingUser,token,logger})
    }
    else{
  res.status(404).json('Invalid email or password')
    }}catch(err){
      res.status(401).json(`login failed due to ${err}`)
    }
  }

  //get all providers
  exports.getAllWorkers = async(req,res)=>{
    console.log('inside getall  worker');

    try {
     const allWorkers = await providers.find()
     res.status(200).json(allWorkers)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
  }

  exports.deleteWorker = async(req,res)=>{
    console.log('inside delete worker');

    const {id} = req.params
    try {
        const removeWorker = await providers.findByIdAndDelete({_id:id})
        res.status(200).json(removeWorker)
    } catch (error) {
        res.status(401).json(error)
    }
  }

  //search workers
  exports.searchProviders = async (req, res) => {

    console.log('inside search worker');

    
    const { worktype, district } = req.query;

    try {
        // Search providers based on worktype and district
        const searchResults = await providers.find({
            worktype: { $regex: new RegExp(worktype, "i") },
            district: { $regex: new RegExp(district, "i") }  
        });

        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ error: 'Search failed', message: error.message });
    }
};

//update worker details
exports.editWorker = async(req,res)=>{
  console.log('inside edit worker');

  const {id} = req.params
  const {name,contactnumber,district,worktype,description,price,organisation} = req.body
  const uploadedimage = req.file?req.file.filename:image

  try {
      const updateWorker = await providers.findByIdAndUpdate({_id:id},{name,contactnumber,userimage:uploadedimage,district,worktype,description,price,organisation
      },{new:true})

      await updateWorker.save()
      res.status(200).json(updateWorker)
  } catch (error) {
      res.status(401).json(error)
  }
}
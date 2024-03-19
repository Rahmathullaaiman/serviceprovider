const providers = require('../Modal/provider')


const jwt = require('jsonwebtoken')


//register provider
exports.Registerprovider = async(req,res)=>{

    const {name,email,mobileno,district,worktype,description,password} = req.body
    const image = req.file.filename
    
    try {
        const provider = await providers.findOne({email})
        if(provider){
            res.status(406).json('Account already exist...Please Login')
        }
        else{
            const newprovider = new providers({
                name,email,mobileno,image,district,worktype,description,password
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
    const {email,password} = req.body
  
   try{ 
    const existworker = await providers.findOne({email,password})
  
    if(existworker){
      const token = jwt.sign({userid:existworker._id},"supersecretkey")
      res.status(200).json({existworker,token})
    }
    else{
  res.status(404).json('Invalid email or password')
    }}catch(err){
      res.status(401).json(`login failed due to ${err}`)
    }
  }

  //get all providers
  exports.getAllWorkers = async(req,res)=>{
    try {
     const allWorkers = await providers.find()
     res.status(200).json(allWorkers)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
  }

  exports.deleteWorker = async(req,res)=>{
    const {id} = req.params
    try {
        const removeWorker = await providers.findByIdAndDelete({_id:id})
        res.status(200).json(removeWorker)
    } catch (error) {
        res.status(401).json(error)
    }
  }
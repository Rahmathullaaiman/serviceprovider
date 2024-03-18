const multer = require('multer')

//diskstorage is used tostore
const storage = multer.diskStorage({
    //destination to store
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //filename to stored file name
    filename:(req,file,callback)=>{
        const filename =`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }

})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only png,jpg,jpeg files are not allowed'))
    }
}

const multerconfig = multer({
    storage,
    fileFilter
})

module.exports = multerconfig
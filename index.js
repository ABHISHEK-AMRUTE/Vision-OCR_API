const tesseract = require("node-tesseract-ocr")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs');
const multer = require('multer')
const upload = multer({
   
  limits :{
      fileSize : 4000000

  },
  fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
      {
          return cb(new Error('File must be .jpg,.jpeg or .png'))
      }
      cb(undefined,true)
  }
 
})

app.use(express.json())
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
        }
//  GET {{url}}/ocr?lang=eng

app.post('/ocr',upload.single('image'),(req,res)=>
{ 
   if(req.query.lang){
     config.lang=req.query.lang
   }

  fs.writeFile("./image.png", req.file.buffer, function(err) {
    if(err) {
        return console.log(err);
        
    }
    console.log("The file was saved!");
    tesseract.recognize("image.png", config)
  .then(text => {
    console.log("Result:", text)
    res.send(text)
  })
  .catch(error => {
    console.log(error.message)
  })
  }); 
  
})


app.listen(port,()=>{
    console.log('Server is up on port :'+port)
})
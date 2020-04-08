const tesseract = require("node-tesseract-ocr")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
 
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}
 
app.get('/ocr',(req,res)=>
{
  tesseract.recognize("image.jpg", config)
  .then(text => {
    console.log("Result:", text)
    res.send(text)
  })
  .catch(error => {
    console.log(error.message)
  })
  
})
app.listen(port,()=>{
    console.log('Server is up on port :'+port)
})
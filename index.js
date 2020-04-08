const tesseract = require("node-tesseract-ocr")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs');

fs.writeFile("./test.text", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 


app.use(express.json())
 
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}


///  GET {{url}}/user

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
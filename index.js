const express= require("express");
const app=express();
const cors=require("cors");
const QRCode=require("qrcode");
app.use(cors()) ;   
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/generate-qrcode",async(req,res,next)=>{
  try{
    const {text}=req.body;
    if(!text){
      return res.status(400).json({message:"text is required"});
    }
    QRCode.toDataURL(text,(err,url)=>{ 
      if(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
      }

      res.status(200).json({data:url});
    })



  }
  catch(error){
    console.log(error);
    next(error);
  } 
})



app.listen(port,()=>{
    console.log(`server is running on the ${port}`);
})
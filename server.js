const express = require("express");
const mongoose = require("mongoose");
const Videos = require("./dbModel")


//app config
const app = express();
const PORT = process.env.PORT || 8080;
//middleware
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next()
})

//DB Config
const URL = `mongodb+srv://gagu:gagu123456@cluster0.ydy00.mongodb.net/tiktok-clone-DB?retryWrites=true&w=majority`;
mongoose.connect(URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("is this thing on");
});

app.get("/v2/posts",(req,res)=>{
    Videos.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


app.post("/v2/posts",(req,res)=>{
    const dbVideos = req.body;
    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(PORT, () => console.log(`server is live on ${PORT}`));

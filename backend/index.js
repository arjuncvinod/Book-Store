import express from "express" 
import {PORT,mongoURL} from "./config.js"

const app = express()


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})
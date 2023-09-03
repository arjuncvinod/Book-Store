import express, { request } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello")
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "all fields sent" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.get('/books',async(req,res)=>{
  try{
    const books= await Book.find({})
   return res.status(200).json({
    count:books.length,
    data:books
  })
  }catch(error){
    res.status(500).send({message:error.message})
  }
})

app.get('/books/:id', async (req,res)=>{
  try {
    const id =req.params.id
    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    res.status(500).send({message:error.message})
  }
})

app.put('/books/:id',async (req,res)=>{
  try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(404).send("Title , Author name and publish year are required ")
    }
      const id = req.params.id
      const result = await Book.findByIdAndUpdate(id,req.body)
      if(!result){
        return res.status(404).send("book not found")
      }
      return res.status(200).send("book updated")

  } catch (error) {
    console.log(error);
    return res.status(500).send({message:error.message})    
  }
})

app.delete('/books/:id',async (req,res)=>{
try {
  const id=req.params.id
  const result= await Book.findByIdAndDelete(id)
  if(!result){
    return res.status(404).send({message:"Book not found"})
  }
  return res.status(200).send({message:"Book deleted"})
} catch (error) {
  return res.status(500).send({message:error.message})
}
})

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

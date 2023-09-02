import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

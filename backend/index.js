import express, { request } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/book", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: "all fields sent" });
    }
      const newBook= {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
    

    const book = await Book.create(newBook);
    return res.status(200).send(book)

  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
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

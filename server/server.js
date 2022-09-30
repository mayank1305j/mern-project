import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const port = 4000;

const app = express();

app.use(cors());

await mongoose.connect(
  "mongodb+srv://mayank:090770@mayank-mern.wspjwvh.mongodb.net/?retryWrites=true&w=majority"
);
console.log("mongodb connected");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/transaction", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server is running at http://localhost:4000");
});

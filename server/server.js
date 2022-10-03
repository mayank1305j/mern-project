import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/TransactionsApi.js";
import connect from "./database/MongoDb.js";

const Port = 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

await connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/transaction", TransactionsApi);

app.listen(Port, () => {
  console.log("server is running at http://localhost:4000");
});

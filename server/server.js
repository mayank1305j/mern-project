import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/TransactionsApi.js";
import authApi from "./routes/authApi.js";
import connect from "./database/MongoDb.js";
import passport from "passport";

const Port = 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

await connect();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/transaction", TransactionsApi);
app.use("/auth", authApi);

app.listen(Port, () => {
  console.log("server is running at http://localhost:4000");
});

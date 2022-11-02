import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/TransactionsApi.js";
import authApi from "./routes/authApi.js";
import userApi from "./routes/userApi.js";
import connect from "./database/MongoDb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
dotenv.config();

const Port = 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

await connect();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.use("/transaction", TransactionsApi);
app.use("/auth", authApi);
app.use("/user", userApi);

app.listen(Port, () => {
  console.log("server is running at http://localhost:4000");
});

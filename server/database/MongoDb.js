import mongoose from "mongoose";

async function connect() {
  const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
  const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
  const MONGO_DB_URL = process.env.MONGO_DB_URL;
  await mongoose.connect(
    `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_URL}/?retryWrites=true&w=majority`
  );
  console.log("mongodb connected");
}

export default connect;

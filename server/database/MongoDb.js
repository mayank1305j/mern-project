import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://mayank:090770@mayank-mern.wspjwvh.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("mongodb connected");
}

export default connect;

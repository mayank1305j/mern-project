import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["firstName is a required field"] },
    lastName: { type: String, required: ["lastName is a required field"] },
    email: { type: String, required: ["email is a required field"] },
    password: { type: String, required: ["password is a required field"] },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("user", userSchema);

import { Router } from "express";
import userModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  //checking if user exists

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists" });
    return;
  }

  //hashing the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  //creating the user

  const user = await userModel({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);

  res.status(201).json({ message: "user is created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //checking if user exists in database

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "Email not found" });
    return;
  }

  //matching the password with the hashed password

  const Match = await bcrypt.compareSync(password, user.password);

  if (!Match) {
    res.status(406).json({ message: "Wrong credentials" });
    return;
  }

  //create JWT
  const payload = {
    username: email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ message: "successfully logged in", token });
});

export default router;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import { generateToken } from '../utils/token.js';
// const secret = process.env.SECRET;

export const signin = async (req, res) => {

  try {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await UserModal.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ message: "User not registered!" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return res.status(400).json({ message: "Invalid credentials" });
    console.log(user)
    const token = generateToken(user);
    delete user["password"]
    res.status(200).json({ user: user, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name)

  try {
    const user = await UserModal.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: name, success: 0, failed: 0 });

    // const token = generateToken(user);

    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const refreshToken = async (req, res) => {
  // const { email, password } = req.body;

  try {
    const userId = req.userId;
    const user = await UserModal.findOne({ _id: userId }, { password: 0});
    // if (!user) return res.status(400).json({ message: "User not registered!" });

    // const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if (!isPasswordMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.status(200).json({ user: user, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Something went wrong" });
  }
};
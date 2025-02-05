import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users, hashPassword } from "../models/userModel.js";

import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidator.js";
import { connectDB } from "../drizzle/db.js";

export const registerUser = async (req, res) => {
  const db = await connectDB();

  try {
    const validatedData = registerUserValidator.parse(req.body);

    const {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      // role_id, organization_id
    } = validatedData;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.email === email);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const password_hash = await hashPassword(password);

    await db.insert(users).values({
      email,
      password: password_hash,
      first_name,
      last_name,
      phone_number,
      // role_id,
      // organization_id,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const loginUser = async (req, res) => {
  const db = await connectDB();

  try {
    const validatedData = loginUserValidator.parse(req.body);

    const { email, password } = validatedData;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.email === email);
    if (existingUser.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = existingUser[0];
    const password_hash = user.password;
    const isPasswordValid = await bcrypt.compare(password, password_hash);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid password" });
    }
    const jwt_secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        user: user.user_id,
      },
      jwt_secret,
      { expiresIn: "1M" }
    );

    res.status(201).json({ message: "User logged in successfully", token });
  } catch (error) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

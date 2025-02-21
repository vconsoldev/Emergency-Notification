import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users, hashPassword } from "../models/user.model.js";
import {loginUserValidator,registerUserValidator,} from "../validators/user.validator.js";
import { connectDB } from "../drizzle/db.js";
import { logger } from "../utils/logger.js";
import { register_success_template } from "../utils/emailtemplate/template.js";
import sendMail from "../utils/sendverification/email.js";
// importing logger

export const registerUser = async (req, res) => {
  const db = await connectDB();
  let logger_target;
  try {
    const validatedData = registerUserValidator.parse(req.body);

    const {
      email,
      password,
      name,
      contact_number,
      // role_id, organization_id
    } = validatedData;
    // adding email for logging to global context
    logger_target = email;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.email === email);
    console.log(existingUser);
    if (existingUser.length > 0) {
      const errorMessage = "Email already registered";
      logger.error(errorMessage, { email });
      return res.status(400).json({ error: "Email already registered" });
    }

    const password_hash = await hashPassword(password);

    await db.insert(users).values({
      email,
      password: password_hash,
      name,
      contact_number,
      //   role_id,
      //   organization_id,
    });

    logger.info("User registered successfully", { email });
    let data = await sendMail(
      "Apptiv",
      email,
      "Registration Success",
      register_success_template
    );

    console.log(data);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error?.errors) {
      return res.status(400).json({ error: error?.errors });
    } else {
      console.error(error);
      const server_error = "Internal Server Error";
      logger.error(server_error, { email: logger_target });

      return res.status(500).json({ error: server_error });
    }
  }
};

export const loginUser = async (req, res) => {
  const db = await connectDB();
  let logger_target;
  try {
    const validatedData = loginUserValidator.parse(req.body);

    const { email, password } = validatedData;

    // adding email to global context for logging
    logger_target = email;
    const user = await db
      .select()
      .from(users)
      .where(users.email === email)
      .limit(1);

    if (user.length === 0) {
      logger.error("User loggged in successfully", { email });

      return res.status(401).json({ error: "User not found" });
    }

    const userData = user[0];

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      const validation_error = "Incorrect email or password";
      logger.error(validation_error, { email });
      return res.status(400).json({ error: validation_error });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(
      { user_id: userData.user_id, email: userData.email },
      JWT_SECRET,
      { expiresIn: "1M" }
    );
    const success_message = "Login successful";
    logger.info(success_message, { email });

    return res.status(200).json({ message: success_message, token });
  } catch (error) {
    console.error(error);
    const server_error = "Internal Server Error";
    logger.error(server_error, { email: logger_target });

    return res.status(500).json({ error: server_error });
  }
};

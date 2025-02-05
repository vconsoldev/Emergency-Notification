import jwt from "jsonwebtoken";
import { users,hashPassword } from '../models/userModel.js';
import { userValidator } from '../validators/userValidator.js';
import { connectDB } from '../drizzle/db.js';

export const registerUser = async (req, res) => {
  const db = await connectDB();

  try {
    const validatedData = userValidator.parse(req.body);

    const { email, password, first_name, last_name, phone_number, 
        // role_id, organization_id 
           } = validatedData;

    const existingUser = await db.select().from(users).where(users.email===email);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const password_hash = await hashPassword(password);

    await db.insert(users).values({
      email,
      password:password_hash,
      first_name,
      last_name,
      phone_number,
    //   role_id,
    //   organization_id,
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


export const loginUser = async (req, res) => {
  const db = await connectDB();
  const { email, password } = req.body;

  try {

    const user = await db.select().from(users).where(users.email===email).limit(1);
    
    if (user.length === 0) {
      return res.status(400).json({ error: 'user not found' });
    }

    const userData = user[0];


    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
   const JWT_SECRET = process.env.JWT_SECRET;

    const token =  jwt.sign({ user_id: userData.user_id, email: userData.email },JWT_SECRET,{ expiresIn: '1M' } );

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
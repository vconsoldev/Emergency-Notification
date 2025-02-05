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

    // const existingUser = await db.select().from(users).where(users.email.eq(email));
    // if (existingUser.length > 0) {
    //   return res.status(400).json({ error: 'Email already registered' });
    // }

    const password_hash = await hashPassword(password);

    await db.insert(users).values({
      email,
      password_hash,
      first_name,
      last_name,
      phone_number,
      role_id,
      organization_id,
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

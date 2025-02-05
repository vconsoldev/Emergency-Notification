import { z } from 'zod';

export const userValidator = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  phone_number: z.string().min(7, { message: 'Phone number must be at least 7 digits' }),
//   role_id: z.string().uuid({ message: 'Invalid role ID' }),
//   organization_id: z.number().int({ message: 'Organization ID must be an integer' }),
});

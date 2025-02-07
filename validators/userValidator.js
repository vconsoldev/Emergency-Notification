import { z } from "zod";

export const registerUserValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty(),
  name: z.string().min(1, { message: "First name is required" }),
  contact_number: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" }),
  //   role_id: z.string().uuid({ message: 'Invalid role ID' }),
  //   organization_id: z.number().int({ message: 'Organization ID must be an integer' }),
});

export const loginUserValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

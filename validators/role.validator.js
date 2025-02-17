import { z } from 'zod';

export const roleValidator = z.object({
  role_name: z.string()
    .min(1, { message: "Role name is required" })
    .max(50, { message: "Role name cannot exceed 50 characters" }),
  description: z.string().max(255, { message: "Description cannot exceed 255 characters" }).optional(),
});

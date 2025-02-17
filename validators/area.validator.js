import { z } from 'zod';

export const areaValidator = z.object({
  site_id: z.string().uuid({ message: "Invalid site ID format" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

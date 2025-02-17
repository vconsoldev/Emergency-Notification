import { z } from 'zod';

export const siteValidator = z.object({
  organization_id: z.string().uuid({ message: "Invalid organization ID format" }),
  name: z.string().min(1, { message: "Name is required" }),
  address_line_1: z.string().min(1, { message: "Address line 1 is required" }),
  address_line_2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z.string().regex(/^\d{5,10}$/, { message: "Invalid ZIP code format" }),
  contact_email: z.string().email({ message: "Invalid email address" }),
  contact_phone: z.string().regex(/^\d{7,15}$/, { message: "Invalid phone number format" }).optional(),
});

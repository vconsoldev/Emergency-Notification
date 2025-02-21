import { z } from 'zod';

export const organizationValidator = z.object({
  name: z.string().min(1, { message: 'Organization name is required' }),
  email_domain: z.string()
    .min(1, { message: 'Email domain is required' })
    .regex(/^@[\w.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid email domain format (e.g., @org.com)' }),
  industry_type: z.string( { message: 'Industry type is required' })
});

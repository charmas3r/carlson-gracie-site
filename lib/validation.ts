import { z } from 'zod';

// Exit-Intent Form Schema
export const exitIntentFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type ExitIntentFormData = z.infer<typeof exitIntentFormSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  freeTrialRequest: z.boolean().optional(),
  source: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Kids Trial Form Schema
export const kidsTrialFormSchema = z.object({
  parentName: z.string().min(2, 'Parent name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[\d\s\(\)\-\+]+$/, 'Please enter a valid phone number'),
  childName: z.string().min(2, 'Child name is required'),
  childAge: z
    .number()
    .min(4, 'Child must be at least 4 years old')
    .max(15, 'Please contact us for adult programs'),
  preferredDays: z.array(z.string()).optional(),
  comments: z.string().optional(),
});

export type KidsTrialFormData = z.infer<typeof kidsTrialFormSchema>;

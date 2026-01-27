# Form Validation Skill

## Overview

Complete patterns for form handling, client and server-side validation, error display, and submission states. Use this for all forms: contact, exit-intent, kids trial, newsletter signup.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Validation | Zod | Latest |
| Forms | React Hook Form | Latest |
| UI Components | shadcn/ui | Latest |
| Language | TypeScript | 5.x |

## Directory Structure

```
components/
└── forms/
    ├── ContactForm.tsx
    ├── ExitIntentForm.tsx
    └── KidsTrialForm.tsx
lib/
└── validation.ts          # Zod schemas
```

## Core Patterns

### Pattern: Validation Schemas

**When to use:** Define validation rules for all forms

**File Location:** `lib/validation.ts`

```typescript
import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  source: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Exit-Intent Form Schema
export const exitIntentFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
});

export type ExitIntentFormData = z.infer<typeof exitIntentFormSchema>;

// Kids Trial Form Schema
export const kidsTrialFormSchema = z.object({
  parentName: z.string().min(2, 'Parent name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  childName: z.string().min(2, 'Child name is required'),
  childAge: z.number().min(4, 'Child must be at least 4 years old').max(15, 'Please contact us for adult programs'),
  preferredDays: z.array(z.string()).optional(),
  comments: z.string().optional(),
});

export type KidsTrialFormData = z.infer<typeof kidsTrialFormSchema>;
```

### Pattern: Contact Form Component

**When to use:** Main contact form on contact page

**File Location:** `components/forms/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';

interface ContactFormProps {
  source?: string;
  onSuccess?: () => void;
}

export function ContactForm({ source = 'contact-page', onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll be in touch soon.',
      });
      
      trackEvent('form_submit', { form: 'contact', source });
      reset();
      onSuccess?.();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone (optional)
        </label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          rows={5}
          {...register('message')}
          className={errors.message ? 'border-red-500' : ''}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Status */}
      {submitStatus && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
```

### Pattern: Exit-Intent Form Component

**When to use:** Simplified form for exit-intent modal

**File Location:** `components/forms/ExitIntentForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exitIntentFormSchema, type ExitIntentFormData } from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';

interface ExitIntentFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function ExitIntentForm({ onSuccess, onClose }: ExitIntentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExitIntentFormData>({
    resolver: zodResolver(exitIntentFormSchema),
  });

  async function onSubmit(data: ExitIntentFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/exit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      trackEvent('form_submit', { form: 'exit_intent', source: 'exit-modal' });
      onSuccess();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Wait! Your First Class is FREE
        </h2>
        <p className="text-gray-600 mb-6">
          No strings attached. Come see what BJJ is all about.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            {isSubmitting ? 'Claiming...' : 'CLAIM MY FREE CLASS'}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

### Pattern: Server-Side Validation (API Route)

**When to use:** Validate data on server before processing

**File Location:** `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendContactConfirmation, sendAdminNotification } from '@/lib/email';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const validatedData = contactFormSchema.parse(body);
    
    // Process form
    await Promise.all([
      sendContactConfirmation(validatedData),
      sendAdminNotification(validatedData, validatedData.source || 'contact-page'),
    ]);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch soon.',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

## Common Validation Patterns

### Email Validation

```typescript
z.string().email('Please enter a valid email address')
```

### Phone Validation (Flexible)

```typescript
z.string()
  .regex(/^[\d\s\(\)\-\+]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits')
  .optional()
```

### Age Validation

```typescript
z.number()
  .min(4, 'Must be at least 4 years old')
  .max(15, 'Please contact us for adult programs')
```

### Conditional Fields

```typescript
z.object({
  hasAllergies: z.boolean(),
  allergyDetails: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasAllergies) {
      return data.allergyDetails && data.allergyDetails.length > 0;
    }
    return true;
  },
  {
    message: 'Please provide allergy details',
    path: ['allergyDetails'],
  }
)
```

## Error Display Patterns

### Inline Field Errors

```tsx
{errors.fieldName && (
  <p className="text-red-600 text-sm mt-1">
    {errors.fieldName.message}
  </p>
)}
```

### Form-Level Errors

```tsx
{submitStatus?.type === 'error' && (
  <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-lg">
    {submitStatus.message}
  </div>
)}
```

### Success Messages

```tsx
{submitStatus?.type === 'success' && (
  <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-lg">
    <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    {submitStatus.message}
  </div>
)}
```

## Loading States

### Button Loading State

```tsx
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" /* ... */>
        {/* spinner SVG */}
      </svg>
      Sending...
    </>
  ) : (
    'Send Message'
  )}
</Button>
```

## Gotchas & Best Practices

- **DO:** Validate on both client and server (never trust client-only validation)
- **DO:** Use Zod for type-safe validation schemas
- **DO:** Show inline errors immediately (on blur or change)
- **DO:** Disable form during submission to prevent double-submits
- **DO:** Clear form after successful submission
- **DO:** Provide clear, actionable error messages
- **AVOID:** Generic error messages ("Invalid input" - be specific!)
- **AVOID:** Blocking form submission silently (always show feedback)
- **AVOID:** Losing user input on validation errors
- **AVOID:** Complex validation logic in components (keep in schemas)

## Related Skills

- `email-resend` - Send emails after form validation
- `api-routes` - Server-side validation in API endpoints
- `analytics-tracking` - Track form submissions and errors
- `ui-components` - shadcn/ui form components

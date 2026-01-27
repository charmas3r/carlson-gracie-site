# API Routes Skill

## Overview

Complete patterns for Next.js 15 App Router API routes including form handlers, data fetching, error handling, rate limiting, and Edge Functions. Use this for all server-side API endpoints.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.x |
| Runtime | Node.js / Edge | - |
| Language | TypeScript | 5.x |

## Directory Structure

```
app/
└── api/
    ├── contact/
    │   └── route.ts          # Contact form handler
    ├── exit-intent/
    │   └── route.ts          # Exit-intent modal handler
    └── reviews/
        └── route.ts          # Google Reviews fetch
```

## Core Patterns

### Pattern: Basic POST Handler

**When to use:** Simple form submission endpoint

**File Location:** `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendContactConfirmation, sendAdminNotification } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(body);
    
    // Process form (send emails in parallel)
    await Promise.all([
      sendContactConfirmation(validatedData),
      sendAdminNotification(validatedData, validatedData.source || 'contact-page'),
    ]);
    
    // Track analytics event
    await trackEvent('form_submit', { 
      form: 'contact', 
      source: validatedData.source 
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch soon.',
    });
  } catch (error) {
    // Handle validation errors
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
    
    // Handle unexpected errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request' 
      },
      { status: 500 }
    );
  }
}
```

### Pattern: GET Handler with Caching

**When to use:** Fetch external data with caching (e.g., Google Reviews)

**File Location:** `app/api/reviews/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID!;
const GOOGLE_API_KEY = process.env.GOOGLE_BUSINESS_API_KEY!;
const CACHE_KEY = 'google-reviews';
const CACHE_TTL = 86400; // 24 hours

export async function GET(request: Request) {
  try {
    // Try to get from cache first
    const cachedReviews = await kv.get(CACHE_KEY);
    
    if (cachedReviews) {
      return NextResponse.json({
        success: true,
        data: cachedReviews,
        cached: true,
      });
    }
    
    // Fetch from Google Business API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews from Google');
    }
    
    const data = await response.json();
    
    // Transform data
    const reviews = {
      aggregateRating: {
        ratingValue: data.result.rating,
        reviewCount: data.result.user_ratings_total,
      },
      reviews: data.result.reviews?.slice(0, 5).map((review: any) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        date: new Date(review.time * 1000).toISOString(),
      })) || [],
    };
    
    // Cache for 24 hours
    await kv.set(CACHE_KEY, reviews, { ex: CACHE_TTL });
    
    return NextResponse.json({
      success: true,
      data: reviews,
      cached: false,
    });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    
    // Return cached data if available, even if stale
    const staleCache = await kv.get(CACHE_KEY);
    if (staleCache) {
      return NextResponse.json({
        success: true,
        data: staleCache,
        cached: true,
        warning: 'Using stale cache due to API error',
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews' 
      },
      { status: 500 }
    );
  }
}
```

### Pattern: Rate Limiting

**When to use:** Prevent abuse on form submissions

**File Location:** `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const RATE_LIMIT_MAX = 10; // Max requests
const RATE_LIMIT_WINDOW = 60; // Per 60 seconds

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate-limit:${ip}`;
  const count = await kv.incr(key);
  
  if (count === 1) {
    // Set expiry on first request
    await kv.expire(key, RATE_LIMIT_WINDOW);
  }
  
  return count <= RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // Get IP address
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Check rate limit
  const allowed = await checkRateLimit(ip);
  
  if (!allowed) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.' 
      },
      { status: 429 }
    );
  }
  
  // Continue with normal processing
  // ... rest of handler
}
```

### Pattern: Edge Function

**When to use:** For lowest latency responses (form handlers, redirects)

**File Location:** `app/api/exit-intent/route.ts`

```typescript
import { NextResponse } from 'next/server';

// Edge runtime for faster responses
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;
    
    // Simple validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email required' },
        { status: 400 }
      );
    }
    
    // Call Resend API (works in Edge runtime)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Your Free BJJ Class Awaits!',
        html: '<p>Thank you for your interest...</p>',
      }),
    });
    
    if (!response.ok) {
      throw new Error('Email send failed');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Exit-intent error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

### Pattern: CORS Headers

**When to use:** Allow requests from specific origins

```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = { message: 'Hello from API' };
  
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

## Error Handling Patterns

### Structured Error Responses

```typescript
// Success response
return NextResponse.json({
  success: true,
  data: result,
  message: 'Operation completed successfully',
});

// Client error (400-499)
return NextResponse.json(
  {
    success: false,
    error: 'Invalid request',
    details: ['Email is required', 'Name must be at least 2 characters'],
  },
  { status: 400 }
);

// Server error (500-599)
return NextResponse.json(
  {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong. Please try again later.',
  },
  { status: 500 }
);
```

### Error Logging

```typescript
try {
  // ... operation
} catch (error) {
  // Log full error details
  console.error('API error:', {
    endpoint: '/api/contact',
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });
  
  // Return user-friendly message
  return NextResponse.json(
    { 
      success: false, 
      error: 'Failed to process request' 
    },
    { status: 500 }
  );
}
```

## Security Patterns

### CSRF Protection (Cookie-based)

```typescript
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const csrfToken = request.headers.get('x-csrf-token');
  const sessionToken = cookieStore.get('csrf-token')?.value;
  
  if (!csrfToken || csrfToken !== sessionToken) {
    return NextResponse.json(
      { success: false, error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }
  
  // Continue processing
}
```

### Input Sanitization

```typescript
import { contactFormSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Zod validates and strips unknown fields
    const validatedData = contactFormSchema.parse(body);
    
    // Additional sanitization if needed
    const sanitized = {
      ...validatedData,
      message: validatedData.message.trim(),
    };
    
    // Process sanitized data
  } catch (error) {
    // Handle validation errors
  }
}
```

## Response Patterns

### JSON Response with Headers

```typescript
return NextResponse.json(
  { success: true, data: result },
  {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/json',
    },
  }
);
```

### Redirect Response

```typescript
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Perform some logic
  
  // Redirect to another page
  redirect('/thank-you');
}

// Or with NextResponse
return NextResponse.redirect(new URL('/thank-you', request.url));
```

## Testing API Routes

```typescript
// test/api/contact.test.ts
import { POST } from '@/app/api/contact/route';

describe('/api/contact', () => {
  it('should validate required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
  
  it('should accept valid form data', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I am interested in BJJ classes',
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

## Environment Variables

```bash
# API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxx
GOOGLE_BUSINESS_API_KEY=AIzaxxxxxxxxxxxxx
GOOGLE_PLACE_ID=ChIJxxxxxxxxxxxxx

# Email
FROM_EMAIL=noreply@academy.com

# Vercel KV (for caching and rate limiting)
KV_REST_API_URL=https://xxxxx.upstash.io
KV_REST_API_TOKEN=Axxxxxxxxxxxxx
```

## Gotchas & Best Practices

- **DO:** Always validate input with Zod on server-side
- **DO:** Use Edge runtime for form handlers (faster response)
- **DO:** Implement rate limiting on public endpoints
- **DO:** Return consistent error response format
- **DO:** Log errors with context (endpoint, timestamp, error details)
- **DO:** Use Vercel KV for caching to reduce external API calls
- **AVOID:** Exposing sensitive data in error messages
- **AVOID:** Trusting client-provided data without validation
- **AVOID:** Blocking responses on slow external APIs (use caching)
- **AVOID:** Missing error handling (always wrap in try/catch)

## Related Skills

- `form-validation` - Validation schemas used in API routes
- `email-resend` - Email sending from API endpoints
- `vercel-storage` - KV storage for caching and rate limiting
- `analytics-tracking` - Track API events

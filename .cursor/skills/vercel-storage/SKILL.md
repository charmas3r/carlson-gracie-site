# Vercel Storage Skill

## Overview

Complete patterns for Vercel KV (Redis) and Vercel Blob storage including caching, rate limiting, session management, and media uploads. Use this for performance optimization and data persistence.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| KV Store | Vercel KV (Redis) | - |
| Blob Storage | Vercel Blob | - |
| Language | TypeScript | 5.x |

## Directory Structure

```
lib/
├── kv.ts                      # KV helper functions
└── blob.ts                    # Blob helper functions
app/
└── api/
    └── upload/
        └── route.ts           # Blob upload endpoint
```

## Core Patterns

### Pattern: Vercel KV Setup

**When to use:** Required for all KV operations

**File Location:** `lib/kv.ts`

```typescript
import { kv } from '@vercel/kv';

// Cache with TTL
export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  await kv.set(key, value, { ex: ttlSeconds });
}

// Get from cache
export async function getCache<T>(key: string): Promise<T | null> {
  return await kv.get<T>(key);
}

// Delete from cache
export async function deleteCache(key: string): Promise<void> {
  await kv.del(key);
}

// Increment counter (for rate limiting)
export async function incrementCounter(key: string, ttlSeconds: number): Promise<number> {
  const count = await kv.incr(key);
  
  if (count === 1) {
    // Set expiry on first increment
    await kv.expire(key, ttlSeconds);
  }
  
  return count;
}

// Get counter value
export async function getCounter(key: string): Promise<number> {
  const count = await kv.get<number>(key);
  return count || 0;
}
```

### Pattern: Cache Google Reviews

**When to use:** Cache expensive API calls

**File Location:** `lib/google-apis.ts`

```typescript
import { setCache, getCache } from './kv';

const CACHE_KEY = 'google-reviews';
const CACHE_TTL = 86400; // 24 hours

export async function fetchGoogleReviews() {
  // Try cache first
  const cached = await getCache<ReviewsData>(CACHE_KEY);
  if (cached) {
    console.log('Serving reviews from cache');
    return cached;
  }
  
  // Fetch from API
  const reviews = await fetchFromGoogleAPI();
  
  // Cache for 24 hours
  await setCache(CACHE_KEY, reviews, CACHE_TTL);
  
  return reviews;
}
```

### Pattern: Rate Limiting

**When to use:** Prevent API abuse on form endpoints

**File Location:** `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { incrementCounter } from '@/lib/kv';

const RATE_LIMIT_MAX = 10; // requests
const RATE_LIMIT_WINDOW = 60; // seconds

export async function POST(request: Request) {
  // Get IP address
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const rateLimitKey = `rate-limit:${ip}`;
  
  // Increment counter
  const count = await incrementCounter(rateLimitKey, RATE_LIMIT_WINDOW);
  
  // Check if over limit
  if (count > RATE_LIMIT_MAX) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.' 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(RATE_LIMIT_WINDOW),
        },
      }
    );
  }
  
  // Process request
  // ...
}
```

### Pattern: Session Management

**When to use:** Store user sessions (future dashboard feature)

**File Location:** `lib/session.ts`

```typescript
import { kv } from '@vercel/kv';

const SESSION_PREFIX = 'session:';
const SESSION_TTL = 2592000; // 30 days

export interface SessionData {
  userId: string;
  email: string;
  createdAt: number;
}

export async function createSession(userId: string, email: string): Promise<string> {
  // Generate session ID
  const sessionId = crypto.randomUUID();
  const key = `${SESSION_PREFIX}${sessionId}`;
  
  // Store session data
  const sessionData: SessionData = {
    userId,
    email,
    createdAt: Date.now(),
  };
  
  await kv.set(key, sessionData, { ex: SESSION_TTL });
  
  return sessionId;
}

export async function getSession(sessionId: string): Promise<SessionData | null> {
  const key = `${SESSION_PREFIX}${sessionId}`;
  return await kv.get<SessionData>(key);
}

export async function deleteSession(sessionId: string): Promise<void> {
  const key = `${SESSION_PREFIX}${sessionId}`;
  await kv.del(key);
}

export async function refreshSession(sessionId: string): Promise<void> {
  const key = `${SESSION_PREFIX}${sessionId}`;
  await kv.expire(key, SESSION_TTL);
}
```

### Pattern: Vercel Blob Setup

**When to use:** Upload and store media files

**File Location:** `lib/blob.ts`

```typescript
import { put, del, list } from '@vercel/blob';

export async function uploadImage(
  file: File,
  filename: string
): Promise<{ url: string; pathname: string }> {
  const blob = await put(filename, file, {
    access: 'public',
    addRandomSuffix: true,
  });
  
  return {
    url: blob.url,
    pathname: blob.pathname,
  };
}

export async function deleteImage(pathname: string): Promise<void> {
  await del(pathname);
}

export async function listImages(prefix?: string) {
  const { blobs } = await list({
    prefix: prefix || '',
  });
  
  return blobs.map((blob) => ({
    url: blob.url,
    pathname: blob.pathname,
    uploadedAt: blob.uploadedAt,
  }));
}
```

### Pattern: Image Upload API Route

**When to use:** Handle image uploads from client

**File Location:** `app/api/upload/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }
    
    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    
    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

### Pattern: Client-Side Upload

**When to use:** Upload images from forms

**File Location:** `components/forms/ImageUpload.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      setImageUrl(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }
  
  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button asChild disabled={uploading}>
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
        </Button>
      </label>
      
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-xs rounded-lg" />
        </div>
      )}
    </div>
  );
}
```

### Pattern: Cache Invalidation

**When to use:** Clear cache after content updates

```typescript
import { deleteCache } from '@/lib/kv';

// After updating content in Sanity
export async function invalidateCache() {
  await Promise.all([
    deleteCache('google-reviews'),
    deleteCache('instructors'),
    deleteCache('classes'),
    deleteCache('achievements'),
  ]);
}
```

### Pattern: List Operations

**When to use:** Get all keys matching a pattern

```typescript
import { kv } from '@vercel/kv';

// Get all rate limit keys
export async function listRateLimitKeys(): Promise<string[]> {
  const keys = await kv.keys('rate-limit:*');
  return keys;
}

// Clear all rate limits (admin function)
export async function clearAllRateLimits(): Promise<void> {
  const keys = await listRateLimitKeys();
  await Promise.all(keys.map((key) => kv.del(key)));
}
```

## Common Operations

### Cache Pattern

```typescript
async function getData() {
  const cached = await getCache<DataType>('cache-key');
  if (cached) return cached;
  
  const fresh = await fetchFreshData();
  await setCache('cache-key', fresh, 3600);
  
  return fresh;
}
```

### Rate Limit Pattern

```typescript
const ip = getIP(request);
const count = await incrementCounter(`rate-limit:${ip}`, 60);

if (count > 10) {
  return rateLimitedResponse();
}
```

### Session Pattern

```typescript
// Login
const sessionId = await createSession(user.id, user.email);
cookies().set('session', sessionId, { httpOnly: true, secure: true });

// Verify
const sessionId = cookies().get('session')?.value;
const session = await getSession(sessionId);
if (!session) return unauthorized();

// Logout
await deleteSession(sessionId);
cookies().delete('session');
```

## Environment Variables

```bash
# Vercel KV (auto-configured in Vercel)
KV_REST_API_URL=https://xxxxx.upstash.io
KV_REST_API_TOKEN=Axxxxxxxxxxxxx

# Vercel Blob (auto-configured in Vercel)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx
```

## Pricing Considerations

### Vercel KV
- **Free tier:** 30K commands/day, 256MB storage
- **Pro tier:** 500K commands/day, 1GB storage
- **Operations:** GET (1 command), SET (1 command), INCR (1 command)

### Vercel Blob
- **Free tier:** 500GB bandwidth/month, 5GB storage
- **Pro tier:** 1TB bandwidth/month, 100GB storage

## Gotchas & Best Practices

- **DO:** Use appropriate TTL values (24h for reviews, 60s for rate limits)
- **DO:** Set expiry on first increment in rate limiting
- **DO:** Validate file types and sizes before uploading
- **DO:** Use caching aggressively for expensive operations
- **DO:** Implement cache invalidation after content updates
- **DO:** Use descriptive key prefixes (`rate-limit:`, `session:`, `cache:`)
- **AVOID:** Storing large objects in KV (use Blob for files)
- **AVOID:** Missing error handling on KV operations
- **AVOID:** Forgetting to set TTL (data persists forever)
- **AVOID:** Exposing `BLOB_READ_WRITE_TOKEN` to client (server-only)

## Related Skills

- `api-routes` - Use KV in API endpoints
- `google-apis` - Cache Google API responses
- `form-validation` - Rate limit form submissions

# Next.js 15 App Router Skill

## Overview

Comprehensive patterns for Next.js 15 App Router including Server Components, Client Components, layouts, routing, data fetching, and metadata management. Use this skill when implementing any page or route in the application.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.x |
| React | React | 19.x |
| Language | TypeScript | 5.x |

## Directory Structure

```
app/
├── (public)/              # Route group (no URL segment)
│   ├── page.tsx          # Server Component by default
│   └── layout.tsx        # Shared layout
├── api/
│   └── route.ts          # API Route handler
├── layout.tsx            # Root layout
└── globals.css           # Global styles
```

## Core Patterns

### Pattern: Server Component (Default)

**When to use:** For any component that doesn't need client-side interactivity, state, or browser APIs

**File Location:** `app/(public)/page.tsx` or any component file

```typescript
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchClasses } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Classes | San Diego BJJ Academy',
  description: 'Explore our Brazilian Jiu-Jitsu classes for all ages and skill levels',
};

// Async Server Component - can fetch data directly
export default async function ClassesPage() {
  // Direct async data fetching (no useEffect needed)
  const classes = await fetchClasses();
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Our Classes</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((class) => (
          <div key={class.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold">{class.title}</h2>
            <p className="text-gray-600 mt-2">{class.description}</p>
            <Link 
              href={`/classes/${class.slug}`}
              className="text-red-600 hover:underline mt-4 inline-block"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pattern: Client Component (Interactive)

**When to use:** When you need state, effects, event handlers, or browser APIs

**File Location:** Any component needing interactivity

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface ExitIntentModalProps {
  onSubmit: (email: string) => void;
}

export function ExitIntentModal({ onSubmit }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        trackEvent('exit_intent_triggered');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Wait! Your First Class is FREE</h2>
        <p className="text-gray-600 mb-6">
          No strings attached. Come see what BJJ is all about.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <Button onClick={() => onSubmit(email)} className="w-full">
          CLAIM MY FREE CLASS
        </Button>
      </div>
    </div>
  );
}
```

### Pattern: Route Groups (No URL Segment)

**When to use:** To organize routes without affecting the URL structure

**File Location:** `app/(public)/` or `app/(dashboard)/`

```typescript
// app/(public)/layout.tsx
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

// Routes in (public):
// app/(public)/page.tsx → /
// app/(public)/classes/page.tsx → /classes
// app/(public)/kids/page.tsx → /kids
```

### Pattern: Dynamic Metadata

**When to use:** When metadata depends on dynamic data (URL params, database content)

**File Location:** Any `page.tsx`

```typescript
import { Metadata } from 'next';
import { fetchInstructor } from '@/lib/sanity';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const instructor = await fetchInstructor(params.slug);
  
  return {
    title: `${instructor.name} | Instructors | San Diego BJJ`,
    description: `Learn from ${instructor.name}, ${instructor.credentials}`,
    openGraph: {
      title: instructor.name,
      description: instructor.bio,
      images: [{ url: instructor.photoUrl }],
    },
  };
}

export default async function InstructorPage({ params }: PageProps) {
  const instructor = await fetchInstructor(params.slug);
  
  return (
    <div>
      <h1>{instructor.name}</h1>
      <p>{instructor.bio}</p>
    </div>
  );
}
```

### Pattern: Static Metadata

**When to use:** For pages with fixed metadata

**File Location:** Any `page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | San Diego BJJ Academy',
  description: 'Get in touch with San Diego\'s premier Brazilian Jiu-Jitsu academy',
  openGraph: {
    title: 'Contact Us | San Diego BJJ Academy',
    description: 'Schedule your free trial class today',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | San Diego BJJ Academy',
    description: 'Schedule your free trial class today',
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### Pattern: Root Layout with Theme Provider

**When to use:** For app-wide providers (theme, analytics, etc.)

**File Location:** `app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Analytics } from '@/components/Analytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'San Diego BJJ Academy | Brazilian Jiu-Jitsu',
    template: '%s | San Diego BJJ Academy',
  },
  description: 'Transform your body, sharpen your mind, build confidence. Premier Brazilian Jiu-Jitsu in San Diego.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Pattern: Loading State

**When to use:** To show loading UI while page/route segment loads

**File Location:** `app/(public)/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600" />
    </div>
  );
}
```

### Pattern: Error Boundary

**When to use:** To handle errors in route segments

**File Location:** `app/(public)/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

## Type Definitions

```typescript
// Type for page props with params
interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Type for layout props
interface LayoutProps {
  children: React.ReactNode;
  params: { [key: string]: string };
}

// Metadata type (imported from next)
import { Metadata } from 'next';
```

## Common Operations

### Navigate Between Pages

**Purpose:** Client-side navigation with prefetching

```typescript
import Link from 'next/link';

// Simple link
<Link href="/classes">View Classes</Link>

// Link with styling
<Link 
  href="/classes"
  className="text-red-600 hover:underline"
>
  View Classes
</Link>

// Programmatic navigation (client component only)
'use client';
import { useRouter } from 'next/navigation';

function Component() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/classes');
  };
  
  return <button onClick={handleClick}>Go</button>;
}
```

### Fetch Data in Server Component

**Purpose:** Server-side data fetching without client-side overhead

```typescript
// Direct async/await in Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Cache for 1 hour
  }).then(res => res.json());
  
  return <div>{data.title}</div>;
}

// Or using custom data layer
import { fetchClasses } from '@/lib/sanity';

export default async function Page() {
  const classes = await fetchClasses();
  return <div>{/* render classes */}</div>;
}
```

### Access Search Params

**Purpose:** Read URL query parameters

```typescript
// Server Component
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  
  return <div>Searching for: {query}</div>;
}

// Client Component
'use client';
import { useSearchParams } from 'next/navigation';

export function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  return <div>Searching for: {query}</div>;
}
```

## Gotchas & Best Practices

- **DO:** Use Server Components by default for better performance
- **DO:** Add `'use client'` only when you need interactivity
- **DO:** Use `async/await` directly in Server Components for data fetching
- **DO:** Use route groups `(name)` to organize without affecting URLs
- **DO:** Export `metadata` object or `generateMetadata` function for SEO
- **AVOID:** Using `useEffect` for data fetching in Server Components (unnecessary)
- **AVOID:** Making entire pages Client Components when only part needs interactivity
- **AVOID:** Forgetting `suppressHydrationWarning` on `<html>` with theme providers
- **AVOID:** Using `next/router` (use `next/navigation` in App Router)

## Related Skills

- `api-routes` - For creating API endpoints in `app/api/`
- `seo-metadata` - For advanced SEO and Schema.org markup
- `ui-components` - For reusable UI components used in pages
- `sanity-cms` - For fetching content in Server Components

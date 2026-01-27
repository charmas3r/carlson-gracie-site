# SEO & Metadata Skill

## Overview

Complete patterns for SEO optimization including meta tags, Open Graph, Schema.org structured data, sitemaps, and local SEO. Use this for all pages to maximize search visibility and social sharing.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.x |
| Structured Data | Schema.org | Latest |
| Language | TypeScript | 5.x |

## Directory Structure

```
app/
├── page.tsx                    # Homepage with metadata
├── (public)/
│   ├── escondido-bjj/
│   │   └── page.tsx           # Local SEO page
│   └── north-county-san-diego-bjj/
│       └── page.tsx           # Local SEO page
├── sitemap.ts                  # Dynamic sitemap generation
└── robots.ts                   # Robots.txt configuration
```

## Core Patterns

### Pattern: Static Page Metadata

**When to use:** For pages with fixed metadata

**File Location:** `app/(public)/contact/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | San Diego BJJ Academy',
  description: 'Get in touch with San Diego\'s premier Brazilian Jiu-Jitsu academy. Schedule your free trial class today.',
  keywords: ['contact bjj san diego', 'bjj academy contact', 'schedule bjj class'],
  openGraph: {
    title: 'Contact Us | San Diego BJJ Academy',
    description: 'Schedule your free trial class today',
    url: 'https://academy.com/contact',
    siteName: 'San Diego BJJ Academy',
    images: [
      {
        url: 'https://academy.com/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'San Diego BJJ Academy Contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | San Diego BJJ Academy',
    description: 'Schedule your free trial class today',
    images: ['https://academy.com/og-image-contact.jpg'],
  },
  alternates: {
    canonical: 'https://academy.com/contact',
  },
};

export default function ContactPage() {
  return <div>{/* Page content */}</div>;
}
```

### Pattern: Dynamic Metadata

**When to use:** When metadata depends on dynamic data

**File Location:** `app/(public)/instructors/[slug]/page.tsx`

```typescript
import { Metadata } from 'next';
import { fetchInstructor } from '@/lib/sanity';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const instructor = await fetchInstructor(params.slug);
  
  if (!instructor) {
    return {
      title: 'Instructor Not Found',
    };
  }
  
  return {
    title: `${instructor.name} | Instructors | San Diego BJJ Academy`,
    description: `Learn from ${instructor.name}, ${instructor.credentials}. ${instructor.bio.slice(0, 150)}...`,
    openGraph: {
      title: `${instructor.name} - BJJ Instructor`,
      description: instructor.bio,
      images: [{ url: instructor.photoUrl }],
      type: 'profile',
    },
    alternates: {
      canonical: `https://academy.com/instructors/${params.slug}`,
    },
  };
}

export default async function InstructorPage({ params }: PageProps) {
  const instructor = await fetchInstructor(params.slug);
  return <div>{/* Instructor content */}</div>;
}
```

### Pattern: Local SEO Page Metadata

**When to use:** For location-specific landing pages

**File Location:** `app/(public)/escondido-bjj/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brazilian Jiu-Jitsu Classes in Escondido | San Diego BJJ Academy',
  description: 'Premier Brazilian Jiu-Jitsu training serving Escondido and North County San Diego. World-class instruction, family-friendly environment. Free trial class available.',
  keywords: [
    'bjj escondido',
    'brazilian jiu jitsu escondido',
    'martial arts escondido',
    'jiu jitsu near escondido',
    'escondido bjj classes',
  ],
  openGraph: {
    title: 'BJJ Classes in Escondido | San Diego BJJ Academy',
    description: 'Premier Brazilian Jiu-Jitsu training serving Escondido and North County San Diego',
    url: 'https://academy.com/escondido-bjj',
    siteName: 'San Diego BJJ Academy',
    images: [
      {
        url: 'https://academy.com/og-image-escondido.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://academy.com/escondido-bjj',
  },
};
```

### Pattern: Schema.org LocalBusiness

**When to use:** Homepage and location pages for local SEO

**File Location:** `app/(public)/page.tsx`

```typescript
export default function HomePage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'San Diego BJJ Academy',
    description: 'Premier Brazilian Jiu-Jitsu training in San Diego',
    image: 'https://academy.com/images/academy-exterior.jpg',
    '@id': 'https://academy.com',
    url: 'https://academy.com',
    telephone: '+1-555-123-4567',
    email: 'info@academy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Academy Street',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      postalCode: '92101',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7157,
      longitude: -117.1611,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Escondido',
      },
      {
        '@type': 'City',
        name: 'San Diego',
      },
      {
        '@type': 'City',
        name: 'San Marcos',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '182',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Pattern: Schema.org Course (Kids Program)

**When to use:** Kids program page for enhanced search results

**File Location:** `app/(public)/kids/page.tsx`

```typescript
export default function KidsPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Kids Brazilian Jiu-Jitsu Program',
    description: 'Age-appropriate BJJ training for children ages 4-15. Build confidence, discipline, and self-defense skills.',
    provider: {
      '@type': 'Organization',
      name: 'San Diego BJJ Academy',
      sameAs: 'https://academy.com',
    },
    courseCode: 'KIDS-BJJ',
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT30M', // 30 minutes
        name: 'Little Champions (Ages 4-7)',
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT45M', // 45 minutes
        name: 'Kids BJJ (Ages 8-12)',
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT60M', // 60 minutes
        name: 'Teens BJJ (Ages 13-15)',
      },
    ],
    offers: {
      '@type': 'Offer',
      category: 'Free Trial',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Pattern: Schema.org Review Aggregate

**When to use:** Display reviews in search results

**File Location:** Component or page with reviews

```typescript
export function ReviewsWidget({ reviews }: { reviews: any }) {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'San Diego BJJ Academy',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.aggregateRating.ratingValue,
      reviewCount: reviews.aggregateRating.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.reviews.map((review: any) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {/* Reviews display */}
    </>
  );
}
```

### Pattern: Dynamic Sitemap

**When to use:** Auto-generate sitemap with all routes

**File Location:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { fetchInstructors, fetchClasses } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.com';
  
  // Fetch dynamic routes
  const instructors = await fetchInstructors();
  const classes = await fetchClasses();
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kids`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instructors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wall-of-champions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Local SEO pages
    {
      url: `${baseUrl}/escondido-bjj`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/north-county-san-diego-bjj`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
  
  // Dynamic instructor routes
  const instructorRoutes: MetadataRoute.Sitemap = instructors.map((instructor) => ({
    url: `${baseUrl}/instructors/${instructor.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  // Dynamic class routes
  const classRoutes: MetadataRoute.Sitemap = classes.map((classItem) => ({
    url: `${baseUrl}/classes/${classItem.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [...staticRoutes, ...instructorRoutes, ...classRoutes];
}
```

### Pattern: Robots.txt Configuration

**When to use:** Control search engine crawling

**File Location:** `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

## Common SEO Patterns

### Canonical URLs

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://academy.com/classes',
  },
};
```

### No-Index for Private Pages

```typescript
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
```

### Breadcrumbs Schema

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://academy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Classes',
      item: 'https://academy.com/classes',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Kids Program',
      item: 'https://academy.com/kids',
    },
  ],
};
```

## Local SEO Content Structure

### Location Page Template

```typescript
// app/(public)/escondido-bjj/page.tsx
export default function EscondidoBJJPage() {
  return (
    <div>
      {/* Hero with location-specific headline */}
      <h1>Brazilian Jiu-Jitsu Classes in Escondido</h1>
      <p>Serving Escondido, Rancho Bernardo, and surrounding North County communities</p>
      
      {/* Location-specific content */}
      <section>
        <h2>About Our Escondido BJJ Academy</h2>
        <p>
          Located just off I-15 with easy access from Escondido, our academy serves
          students throughout North County San Diego. Many of our members commute from
          Escondido and appreciate our convenient location and flexible schedule.
        </p>
      </section>
      
      {/* Local testimonials */}
      <section>
        <h2>What Escondido Students Say</h2>
        {/* Testimonials from Escondido area students */}
      </section>
      
      {/* Driving directions */}
      <section>
        <h2>Directions from Escondido</h2>
        <p>
          From Escondido, take I-15 South to exit X. Turn right onto Academy Street.
          We're located next to [local landmark].
        </p>
      </section>
      
      {/* Local references */}
      <p>
        We're proud to serve families from Escondido High School, Del Lago Academy,
        and the surrounding communities.
      </p>
    </div>
  );
}
```

## Gotchas & Best Practices

- **DO:** Include unique, location-specific content on local SEO pages (500-800 words)
- **DO:** Use Schema.org structured data on all pages
- **DO:** Set canonical URLs to avoid duplicate content penalties
- **DO:** Create dynamic sitemaps that update with new content
- **DO:** Test structured data with Google Rich Results Test
- **DO:** Use descriptive, keyword-rich titles under 60 characters
- **DO:** Write meta descriptions between 150-160 characters
- **AVOID:** Keyword stuffing (write naturally for users)
- **AVOID:** Duplicate content across local pages (make each unique)
- **AVOID:** Missing alt text on images
- **AVOID:** Forgetting to submit sitemap to Google Search Console

## Related Skills

- `next-app-router` - Metadata patterns in App Router
- `sanity-cms` - Fetch content for dynamic metadata
- `google-apis` - Google Business integration for local SEO

# Sanity CMS Skill

## Overview

Complete patterns for Sanity CMS v3 integration including client setup, schema definitions, GROQ queries, content fetching, and mutations. Use this for all content management operations.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| CMS | Sanity.io | 3.x |
| Query Language | GROQ | - |
| Language | TypeScript | 5.x |

## Directory Structure

```
lib/
└── sanity.ts              # Client config and helper functions
sanity/
├── config.ts              # Sanity project configuration
└── schemas/               # Content type schemas
    ├── instructor.ts
    ├── class.ts
    ├── achievement.ts
    └── announcement.ts
```

## Core Patterns

### Pattern: Sanity Client Setup

**When to use:** Required for all Sanity operations

**File Location:** `lib/sanity.ts`

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create client instance
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads
  token: process.env.SANITY_API_TOKEN, // Only needed for mutations
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Type-safe query helper
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags,
    },
  });
}
```

### Pattern: Schema Definition (Instructor)

**When to use:** Defining content types in Sanity Studio

**File Location:** `sanity/schemas/instructor.ts`

```typescript
import { defineType, defineField } from 'sanity';

export const instructorSchema = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'e.g., "Black Belt under Roberto Gordo"',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'credentials',
      media: 'photo',
    },
  },
});
```

### Pattern: Schema Definition (Class)

**File Location:** `sanity/schemas/class.ts`

```typescript
import { defineType, defineField } from 'sanity';

export const classSchema = defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'All Levels', value: 'all' },
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'Little Champions (4-7)', value: '4-7' },
          { title: 'Kids (8-12)', value: '8-12' },
          { title: 'Teens (13-15)', value: '13-15' },
          { title: 'Adults (16+)', value: '16+' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'string', title: 'Day' },
            { name: 'time', type: 'string', title: 'Time' },
          ],
        },
      ],
    }),
  ],
});
```

### Pattern: Schema Definition (Achievement)

**File Location:** `sanity/schemas/achievement.ts`

```typescript
import { defineType, defineField } from 'sanity';

export const achievementSchema = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Competition', value: 'competition' },
          { title: 'Promotion', value: 'promotion' },
          { title: 'Student Spotlight', value: 'spotlight' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
```

### Pattern: Sanity Config

**File Location:** `sanity/config.ts`

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { instructorSchema } from './schemas/instructor';
import { classSchema } from './schemas/class';
import { achievementSchema } from './schemas/achievement';

export default defineConfig({
  name: 'default',
  title: 'San Diego BJJ Academy',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [instructorSchema, classSchema, achievementSchema],
  },
});
```

## GROQ Query Patterns

### Fetch All Instructors

```typescript
import { sanityFetch } from '@/lib/sanity';

interface Instructor {
  _id: string;
  name: string;
  slug: { current: string };
  bio: string;
  credentials: string;
  photo: any;
  specialties: string[];
  order: number;
}

export async function fetchInstructors(): Promise<Instructor[]> {
  const query = `*[_type == "instructor"] | order(order asc) {
    _id,
    name,
    slug,
    bio,
    credentials,
    photo,
    specialties,
    order
  }`;
  
  return sanityFetch<Instructor[]>({
    query,
    tags: ['instructor'],
  });
}
```

### Fetch Single Instructor by Slug

```typescript
export async function fetchInstructor(slug: string): Promise<Instructor | null> {
  const query = `*[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    credentials,
    photo,
    specialties
  }`;
  
  return sanityFetch<Instructor | null>({
    query,
    params: { slug },
    tags: [`instructor:${slug}`],
  });
}
```

### Fetch Classes by Age Group

```typescript
interface Class {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  level: string;
  ageGroup: string;
  duration: number;
  schedule: Array<{ day: string; time: string }>;
}

export async function fetchClassesByAgeGroup(ageGroup: string): Promise<Class[]> {
  const query = `*[_type == "class" && ageGroup == $ageGroup] {
    _id,
    title,
    slug,
    description,
    level,
    ageGroup,
    duration,
    schedule
  }`;
  
  return sanityFetch<Class[]>({
    query,
    params: { ageGroup },
    tags: ['class'],
  });
}
```

### Fetch Featured Achievements

```typescript
interface Achievement {
  _id: string;
  studentName: string;
  category: string;
  title: string;
  date: string;
  description: string;
  photos: any[];
  featured: boolean;
}

export async function fetchFeaturedAchievements(limit = 5): Promise<Achievement[]> {
  const query = `*[_type == "achievement" && featured == true] | order(date desc) [0...$limit] {
    _id,
    studentName,
    category,
    title,
    date,
    description,
    photos,
    featured
  }`;
  
  return sanityFetch<Achievement[]>({
    query,
    params: { limit },
    tags: ['achievement'],
  });
}
```

### Fetch Achievements with Filtering

```typescript
export async function fetchAchievements(category?: string): Promise<Achievement[]> {
  const query = category
    ? `*[_type == "achievement" && category == $category] | order(date desc) {
        _id,
        studentName,
        category,
        title,
        date,
        description,
        photos
      }`
    : `*[_type == "achievement"] | order(date desc) {
        _id,
        studentName,
        category,
        title,
        date,
        description,
        photos
      }`;
  
  return sanityFetch<Achievement[]>({
    query,
    params: category ? { category } : {},
    tags: ['achievement'],
  });
}
```

## Image URL Generation

```typescript
import { urlFor } from '@/lib/sanity';

// In component
function InstructorCard({ instructor }: { instructor: Instructor }) {
  // Generate optimized image URL
  const imageUrl = urlFor(instructor.photo)
    .width(400)
    .height(400)
    .fit('crop')
    .url();
  
  return (
    <img
      src={imageUrl}
      alt={instructor.name}
      width={400}
      height={400}
    />
  );
}

// With Next.js Image component
import Image from 'next/image';

function InstructorCard({ instructor }: { instructor: Instructor }) {
  const imageUrl = urlFor(instructor.photo).url();
  
  return (
    <Image
      src={imageUrl}
      alt={instructor.name}
      width={400}
      height={400}
      className="rounded-lg"
    />
  );
}
```

## Mutations (Create/Update)

```typescript
import { client } from '@/lib/sanity';

// Create new achievement
export async function createAchievement(data: {
  studentName: string;
  category: string;
  title: string;
  date: string;
  description: string;
  featured?: boolean;
}) {
  return client.create({
    _type: 'achievement',
    ...data,
  });
}

// Update existing document
export async function updateAchievement(id: string, updates: Partial<Achievement>) {
  return client.patch(id).set(updates).commit();
}

// Delete document
export async function deleteAchievement(id: string) {
  return client.delete(id);
}
```

## Environment Variables

```bash
# Required
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token  # Only for mutations

# Optional (for public client-side access)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Gotchas & Best Practices

- **DO:** Use GROQ projections `{ _id, field1, field2 }` to fetch only needed fields
- **DO:** Add cache tags for granular revalidation
- **DO:** Use `urlFor()` helper for optimized image URLs
- **DO:** Define TypeScript interfaces matching your schemas
- **DO:** Use `order()` in GROQ queries for consistent sorting
- **AVOID:** Fetching entire documents when you only need a few fields
- **AVOID:** Missing `useCdn: true` in client config (slower reads)
- **AVOID:** Hardcoding API version (use env vars or constants)
- **AVOID:** Exposing `SANITY_API_TOKEN` to client (keep server-only)

## Related Skills

- `next-app-router` - For fetching Sanity data in Server Components
- `api-routes` - For mutations via API endpoints
- `seo-metadata` - For using Sanity content in meta tags

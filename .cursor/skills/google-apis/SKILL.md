# Google APIs Skill

## Overview

Complete patterns for Google Maps and Google Business APIs including location display, directions, reviews fetching, and structured data integration. Use this for contact page maps and reviews widgets.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Maps | Google Maps JavaScript API | - |
| Reviews | Google Business API | - |
| Language | TypeScript | 5.x |

## Directory Structure

```
components/
├── maps/
│   ├── GoogleMap.tsx          # Interactive map
│   └── DirectionsMap.tsx      # Map with directions
└── reviews/
    ├── ReviewsWidget.tsx       # Reviews display
    └── ReviewsCarousel.tsx     # Animated carousel
lib/
└── google-apis.ts              # API helper functions
```

## Core Patterns

### Pattern: Google Maps Component

**When to use:** Display academy location on contact page

**File Location:** `components/maps/GoogleMap.tsx`

```typescript
'use client';

import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markerLabel?: string;
  className?: string;
}

export function GoogleMap({ 
  center, 
  zoom = 15, 
  markerLabel = 'San Diego BJJ Academy',
  className = 'w-full h-96'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });
    
    // Add marker
    new google.maps.Marker({
      position: center,
      map,
      title: markerLabel,
      animation: google.maps.Animation.DROP,
    });
    
    mapInstanceRef.current = map;
  }, [center, zoom, markerLabel]);
  
  return <div ref={mapRef} className={className} />;
}
```

### Pattern: Load Google Maps Script

**When to use:** Required before using Google Maps

**File Location:** `components/maps/GoogleMapsLoader.tsx`

```typescript
'use client';

import Script from 'next/script';

export function GoogleMapsLoader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="afterInteractive"
        onLoad={() => console.log('Google Maps loaded')}
      />
      {children}
    </>
  );
}

// Usage in page
<GoogleMapsLoader>
  <GoogleMap center={{ lat: 32.7157, lng: -117.1611 }} />
</GoogleMapsLoader>
```

### Pattern: Directions Link

**When to use:** One-tap directions on mobile

**File Location:** `components/maps/DirectionsButton.tsx`

```typescript
'use client';

import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface DirectionsButtonProps {
  address: string;
  latitude: number;
  longitude: number;
}

export function DirectionsButton({ address, latitude, longitude }: DirectionsButtonProps) {
  function handleClick() {
    trackEvent('mobile_action_map', { address });
    
    // Generate platform-specific directions URL
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    let url: string;
    
    if (isMobile) {
      if (isIOS) {
        // Apple Maps
        url = `maps://maps.apple.com/?daddr=${latitude},${longitude}`;
      } else {
        // Google Maps (Android)
        url = `google.navigation:q=${latitude},${longitude}`;
      }
    } else {
      // Desktop: Google Maps web
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    }
    
    window.open(url, '_blank');
  }
  
  return (
    <Button onClick={handleClick} variant="outline">
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      Get Directions
    </Button>
  );
}
```

### Pattern: Fetch Google Reviews

**When to use:** Load reviews from Google Business

**File Location:** `lib/google-apis.ts`

```typescript
import { kv } from '@vercel/kv';

const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID!;
const GOOGLE_API_KEY = process.env.GOOGLE_BUSINESS_API_KEY!;
const CACHE_KEY = 'google-reviews';
const CACHE_TTL = 86400; // 24 hours

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface ReviewsData {
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
  };
  reviews: Review[];
}

export async function fetchGoogleReviews(): Promise<ReviewsData> {
  try {
    // Try cache first
    const cached = await kv.get<ReviewsData>(CACHE_KEY);
    if (cached) {
      return cached;
    }
    
    // Fetch from Google Business API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status}`);
    }
    
    // Transform data
    const reviews: ReviewsData = {
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
    
    return reviews;
  } catch (error) {
    console.error('Failed to fetch Google reviews:', error);
    
    // Return cached data if available (even if stale)
    const staleCache = await kv.get<ReviewsData>(CACHE_KEY);
    if (staleCache) {
      return staleCache;
    }
    
    throw error;
  }
}
```

### Pattern: Reviews Widget

**When to use:** Display reviews on homepage

**File Location:** `components/reviews/ReviewsWidget.tsx`

```typescript
import { fetchGoogleReviews } from '@/lib/google-apis';
import { ReviewsCarousel } from './ReviewsCarousel';

export async function ReviewsWidget() {
  const reviews = await fetchGoogleReviews();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-bold text-red-600">
              {reviews.aggregateRating.ratingValue}
            </span>
            <div>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {reviews.aggregateRating.reviewCount}+ reviews
              </p>
            </div>
          </div>
        </div>
        
        <ReviewsCarousel reviews={reviews.reviews} />
        
        <div className="text-center mt-8">
          <a
            href={`https://search.google.com/local/writereview?placeid=${process.env.GOOGLE_PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline"
          >
            Leave us a review →
          </a>
        </div>
      </div>
    </section>
  );
}
```

### Pattern: Reviews Carousel

**When to use:** Animated review display

**File Location:** `components/reviews/ReviewsCarousel.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Review } from '@/lib/google-apis';

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [reviews.length]);
  
  const currentReview = reviews[currentIndex];
  
  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          {/* Star rating */}
          <div className="flex text-yellow-500 mb-4">
            {[...Array(currentReview.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          {/* Review text */}
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
            "{currentReview.text}"
          </p>
          
          {/* Author */}
          <p className="text-gray-600 dark:text-gray-400 font-semibold">
            — {currentReview.author}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
            }`}
            aria-label={`View review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Pattern: Embedded Google Map

**When to use:** Simple map embed without JavaScript

```typescript
export function EmbeddedGoogleMap({ placeId }: { placeId: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`;
  
  return (
    <iframe
      src={src}
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Academy Location"
    />
  );
}
```

## Environment Variables

```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxxxxxxx

# Google Business
GOOGLE_BUSINESS_API_KEY=AIzaxxxxxxxxxxxxx
GOOGLE_PLACE_ID=ChIJxxxxxxxxxxxxx

# Public (for embeds and client-side use)
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJxxxxxxxxxxxxx
```

## API Key Restrictions

### Google Maps API Key
- **Application restrictions:** HTTP referrers (websites)
- **Allowed referrers:** 
  - `https://yourdomain.com/*`
  - `https://*.vercel.app/*` (for preview deployments)
- **API restrictions:** Maps JavaScript API, Maps Embed API

### Google Business API Key
- **Application restrictions:** IP addresses (Vercel IPs) or None
- **API restrictions:** Places API

## Gotchas & Best Practices

- **DO:** Cache Google Business reviews for 24 hours (reduce API costs)
- **DO:** Restrict API keys to specific domains/IPs
- **DO:** Use Next.js Script component for loading Google Maps
- **DO:** Provide fallback data if API fails
- **DO:** Track map/directions interactions in analytics
- **DO:** Use embedded map for simple use cases (no JavaScript needed)
- **AVOID:** Exposing unrestricted API keys
- **AVOID:** Making API calls on every page load (use caching)
- **AVOID:** Missing error handling for API failures
- **AVOID:** Blocking page render on Google Maps script load

## Related Skills

- `api-routes` - Fetch reviews via API endpoint
- `vercel-storage` - Cache reviews in Vercel KV
- `analytics-tracking` - Track map/directions clicks
- `seo-metadata` - Schema.org LocalBusiness with reviews

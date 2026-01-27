# Analytics Tracking Skill

## Overview

Complete patterns for privacy-focused analytics using Umami including page views, custom events, conversion tracking, and user behavior analysis. Use this to measure site performance and optimize conversions.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Analytics | Umami | Latest |
| Language | TypeScript | 5.x |

## Directory Structure

```
lib/
└── analytics.ts              # Analytics helper functions
components/
└── Analytics.tsx             # Analytics component
app/
└── layout.tsx                # Install analytics in root layout
```

## Core Patterns

### Pattern: Analytics Setup

**When to use:** Required for all analytics operations

**File Location:** `lib/analytics.ts`

```typescript
// Track custom events
export async function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) {
  // Only track in production or when explicitly enabled
  if (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_ANALYTICS) {
    console.log('[Analytics] Event:', eventName, eventData);
    return;
  }
  
  try {
    // Umami tracking via window.umami
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

// Track page views (automatic with Umami, but can be manual too)
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track((props) => ({ ...props, url }));
  }
}

// Identify user (for future dashboard use)
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.identify({
      userId,
      ...properties,
    });
  }
}

// Type definitions
declare global {
  interface Window {
    umami?: {
      track: (eventName: string | ((props: any) => any), eventData?: any) => void;
      identify: (data: any) => void;
    };
  }
}
```

### Pattern: Analytics Component

**When to use:** Install Umami tracking script

**File Location:** `components/Analytics.tsx`

```typescript
'use client';

import Script from 'next/script';

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  
  // Don't load in development unless explicitly enabled
  if (!websiteId || (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_ANALYTICS)) {
    return null;
  }
  
  return (
    <Script
      async
      src="https://analytics.umami.is/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
```

### Pattern: Root Layout Integration

**When to use:** Enable analytics site-wide

**File Location:** `app/layout.tsx`

```typescript
import { Analytics } from '@/components/Analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Pattern: Form Submission Tracking

**When to use:** Track all form submissions with source attribution

**File Location:** `components/forms/ContactForm.tsx`

```typescript
'use client';

import { trackEvent } from '@/lib/analytics';

export function ContactForm({ source = 'contact-page' }: { source?: string }) {
  async function handleSubmit(data: FormData) {
    // Submit form
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      // Track successful submission
      await trackEvent('form_submit', {
        form: 'contact',
        source: source,
        hasPhone: !!data.phone,
      });
    } else {
      // Track failed submission
      await trackEvent('form_error', {
        form: 'contact',
        source: source,
      });
    }
  }
  
  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### Pattern: CTA Button Tracking

**When to use:** Track click-through rates on CTAs

**File Location:** `components/ui/CTAButton.tsx`

```typescript
'use client';

import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  eventName: string;
  eventData?: Record<string, any>;
}

export function CTAButton({ href, children, eventName, eventData }: CTAButtonProps) {
  function handleClick() {
    trackEvent(eventName, {
      destination: href,
      ...eventData,
    });
  }
  
  return (
    <Button asChild onClick={handleClick}>
      <a href={href}>{children}</a>
    </Button>
  );
}

// Usage
<CTAButton
  href="/classes"
  eventName="cta_click"
  eventData={{ location: 'hero', cta: 'start_journey' }}
>
  START YOUR JOURNEY
</CTAButton>
```

### Pattern: Video Engagement Tracking

**When to use:** Measure video background engagement

**File Location:** `components/hero/VideoBackground.tsx`

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function VideoBackground({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedPlay = useRef(false);
  const hasTrackedComplete = useRef(false);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    function handlePlay() {
      if (!hasTrackedPlay.current) {
        trackEvent('video_play', { video: 'hero' });
        hasTrackedPlay.current = true;
      }
    }
    
    function handleTimeUpdate() {
      const progress = (video.currentTime / video.duration) * 100;
      
      // Track 75% completion
      if (progress >= 75 && !hasTrackedComplete.current) {
        trackEvent('video_complete', { video: 'hero', progress: 75 });
        hasTrackedComplete.current = true;
      }
    }
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);
  
  return (
    <video ref={videoRef} autoPlay muted loop playsInline>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
```

### Pattern: Exit-Intent Tracking

**When to use:** Track exit-intent modal triggers and completions

**File Location:** `components/ExitIntentModal.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
        trackEvent('exit_intent_triggered');
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isOpen]);
  
  async function handleSubmit(email: string) {
    // Submit form
    const response = await fetch('/api/exit-intent', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (response.ok) {
      trackEvent('exit_intent_completed', { hasEmail: true });
      setIsOpen(false);
    }
  }
  
  function handleClose() {
    trackEvent('exit_intent_dismissed');
    setIsOpen(false);
  }
  
  if (!isOpen) return null;
  
  return (
    <div>
      {/* Modal content */}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
```

### Pattern: Mobile Action Tracking

**When to use:** Track one-tap mobile actions (call, map, email)

**File Location:** `components/MobileActions.tsx`

```typescript
'use client';

import { trackEvent } from '@/lib/analytics';

export function MobileActions() {
  function handleAction(action: string) {
    trackEvent(`mobile_action_${action}`, {
      platform: /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'ios' : 'android',
    });
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="flex justify-around py-3">
        <a
          href="tel:+15551234567"
          onClick={() => handleAction('call')}
          className="flex flex-col items-center"
        >
          {/* Call Icon */}
          <span>Call</span>
        </a>
        <a
          href="sms:+15551234567"
          onClick={() => handleAction('text')}
          className="flex flex-col items-center"
        >
          {/* Text Icon */}
          <span>Text</span>
        </a>
        <a
          href="https://maps.google.com/?q=Academy+Address"
          onClick={() => handleAction('map')}
          className="flex flex-col items-center"
        >
          {/* Map Icon */}
          <span>Map</span>
        </a>
        <a
          href="mailto:info@academy.com"
          onClick={() => handleAction('email')}
          className="flex flex-col items-center"
        >
          {/* Email Icon */}
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
```

### Pattern: Scroll Depth Tracking

**When to use:** Measure content engagement

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function ScrollDepthTracker({ pageName }: { pageName: string }) {
  const milestones = useRef({
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  });
  
  useEffect(() => {
    function handleScroll() {
      const scrollPercent = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Check milestones
      Object.entries(milestones.current).forEach(([milestone, tracked]) => {
        if (!tracked && scrollPercent >= parseInt(milestone)) {
          trackEvent('scroll_depth', {
            page: pageName,
            depth: parseInt(milestone),
          });
          milestones.current[milestone as keyof typeof milestones.current] = true;
        }
      });
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
  
  return null; // No visual component
}

// Usage in page
export default function HomePage() {
  return (
    <>
      <ScrollDepthTracker pageName="home" />
      {/* Page content */}
    </>
  );
}
```

## Event Naming Convention

### Standard Events

| Event Name | When to Track | Data Properties |
|------------|---------------|-----------------|
| `form_submit` | Form successfully submitted | `form`, `source`, optional fields |
| `form_error` | Form submission failed | `form`, `source`, `error` |
| `cta_click` | CTA button clicked | `location`, `cta`, `destination` |
| `video_play` | Video started playing | `video` |
| `video_complete` | Video watched to completion | `video`, `progress` |
| `exit_intent_triggered` | Exit-intent modal shown | none |
| `exit_intent_completed` | Exit-intent form submitted | `hasEmail` |
| `exit_intent_dismissed` | Exit-intent modal closed | none |
| `mobile_action_call` | Mobile call button clicked | `platform` |
| `mobile_action_text` | Mobile text button clicked | `platform` |
| `mobile_action_map` | Mobile map button clicked | `platform` |
| `mobile_action_email` | Mobile email button clicked | `platform` |
| `scroll_depth` | User scrolled to milestone | `page`, `depth` |
| `navigation_click` | Nav link clicked | `page`, `destination` |
| `wall_view` | Wall of Champions viewed | none |
| `review_click` | Google review link clicked | `source` |
| `local_page_view` | Local SEO page viewed | `location` |

## Conversion Funnel Tracking

```typescript
// Homepage visit (automatic page view)
// ↓
trackEvent('cta_click', { location: 'hero', cta: 'start_journey' });
// ↓
trackEvent('form_submit', { form: 'contact', source: 'contact-page' });
// ↓
// Backend: Email sent successfully
// ↓
// Google Analytics Goal: New lead acquired
```

## Environment Variables

```bash
# Public (client-side accessible)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id

# Optional: Enable analytics in development
ENABLE_ANALYTICS=true
```

## Testing Analytics

```typescript
// lib/__tests__/analytics.test.ts
import { trackEvent } from '@/lib/analytics';

describe('Analytics', () => {
  beforeEach(() => {
    // Mock window.umami
    window.umami = {
      track: jest.fn(),
      identify: jest.fn(),
    };
  });
  
  it('should track events', () => {
    trackEvent('test_event', { foo: 'bar' });
    
    expect(window.umami.track).toHaveBeenCalledWith('test_event', { foo: 'bar' });
  });
});
```

## Gotchas & Best Practices

- **DO:** Use consistent event naming (snake_case)
- **DO:** Track both successes and failures (conversions and errors)
- **DO:** Add meaningful event properties for filtering
- **DO:** Test analytics in development with console logging
- **DO:** Document all custom events for team reference
- **DO:** Use Umami's privacy-focused approach (no cookies, GDPR-compliant)
- **AVOID:** Tracking PII (personally identifiable information)
- **AVOID:** Over-tracking (too many events = noisy data)
- **AVOID:** Blocking page load on analytics (use `strategy="afterInteractive"`)
- **AVOID:** Forgetting to track error states

## Related Skills

- `form-validation` - Track form submissions and errors
- `api-routes` - Track API endpoint usage
- `next-app-router` - Page view tracking

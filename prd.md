# Product Requirements Document
## San Diego Brazilian Jiu-Jitsu Academy Website

**Version**: 1.0  
**Date**: January 25, 2026  
**Status**: Ready for Development

---

## 1. Executive Summary

This PRD defines requirements for building a world-class, conversion-optimized website for a San Diego Brazilian Jiu-Jitsu academy. The site will leverage cutting-edge web technologies (Next.js 15, Framer Motion) to create an immersive, cinematic experience that differentiates the academy from local competition.

The website focuses on acquiring new students through exceptional UX, aggressive SEO, and conversion-optimized design. With a target conversion rate of 8-12% (vs. industry standard 0.2-0.5%), the site is projected to generate $60,000-100,000 in additional annual revenue.

**Core Value Proposition**: The fastest, most visually stunning, and highest-converting BJJ website in San Diego, featuring a dedicated kids program page, system-aware dark mode, and personalized lead capture—all while maintaining sub-2-second load times.

---

## 2. Mission

**Product Mission**: Create a digital experience so compelling and user-friendly that it becomes the academy's #1 source of new student acquisition while simultaneously building community and retention among existing members.

### Core Principles

1. **Performance is Non-Negotiable**: Every feature must maintain sub-2-second load times
2. **Mobile-First Always**: 60-70% of traffic will be mobile; optimize accordingly
3. **Conversion Over Beauty**: Aesthetic serves conversion, not vice versa
4. **Data-Driven Decisions**: Use analytics to optimize continuously
5. **Simplicity & Focus**: Launch with core features that drive acquisition

---

## 3. Target Users

### Primary User Personas

#### Persona A: "The Curious Beginner" (Adult, 25-45)
- **Technical Comfort**: Moderate (uses smartphone daily, browses on mobile)
- **Key Needs**: 
  - Clear explanation of what BJJ is and what to expect
  - Transparent pricing and class schedule
  - Low-friction way to try a class
  - Reassurance about safety and skill level
- **Pain Points**: 
  - Fear of being out of shape or too old
  - Uncertainty about first class experience
  - Intimidation about martial arts in general

#### Persona B: "The Parent Researcher" (30-45, with kids 4-15)
- **Technical Comfort**: High (researches extensively online before decisions)
- **Key Needs**:
  - Detailed information about kids programs and safety
  - Age-appropriate program details
  - Parent testimonials and success stories
  - Clear communication about costs and commitment
- **Pain Points**:
  - Concerns about safety and injury risk
  - Uncertainty if their child will enjoy it
  - Questions about bullying prevention effectiveness
  - Need for flexible scheduling around school

#### Persona C: "The Experienced Practitioner" (20-50, looking to switch gyms)
- **Technical Comfort**: High
- **Key Needs**:
  - Instructor credentials and lineage
  - Competition team information
  - Class schedule and training philosophy
  - Academy culture and values
- **Pain Points**:
  - Evaluating quality of instruction
  - Finding academy that matches training intensity preference
  - Community fit and gym culture

---

## 4. MVP Scope

### ✅ In Scope (Launch Day)

#### Core Functionality
- ✅ Responsive website with 9 pages (7 core + 2 local SEO)
- ✅ Cinematic hero section with full-screen video background
- ✅ System-aware theming (automatic dark mode detection + manual toggle)
- ✅ Exit-intent modal for lead capture
- ✅ Google Reviews integration widget
- ✅ Wall of Champions showcase
- ✅ Local SEO landing pages (Escondido + North County San Diego)
- ✅ Contact forms with validation
- ✅ One-tap mobile actions (call, map, email)

#### Technical Requirements
- ✅ Sub-2-second page load times (LCP < 1.8s)
- ✅ Lighthouse score 98+ across all metrics
- ✅ Mobile-first responsive design
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Schema.org markup (LocalBusiness, Course, Review)
- ✅ Comprehensive SEO optimization
- ✅ Privacy-focused analytics (Umami)

#### Integration Requirements
- ✅ Sanity CMS for content management
- ✅ Resend for email delivery
- ✅ Vercel Blob for media storage
- ✅ Cloudinary for video optimization
- ✅ Google Maps API integration
- ✅ Google Business API for reviews

#### Deployment
- ✅ Vercel hosting with Edge Functions
- ✅ Staging and production environments
- ✅ CI/CD pipeline
- ✅ SSL certificate and domain configuration

### ❌ Out of Scope (MVP)

#### Deferred to Phase 2
- ❌ Student dashboard with authentication and progress tracking
- ❌ Smart Intake Quiz (personalized recommendations)
- ❌ Additional local SEO pages (3 more: Pacific Beach, La Jolla, Downtown)
- ❌ Enhanced A/B testing framework
- ❌ Local backlink building strategy

#### Postponed to Future Phases (Month 3+)
- ❌ Interactive 3D elements (belt visualizer or rotating logo)
- ❌ Advanced heatmap analytics (Microsoft Clarity)
- ❌ AI Chatbot (cost and complexity)
- ❌ Intelligent class matching algorithm
- ❌ Member technique library (content-intensive)
- ❌ Referral program (need established member base)
- ❌ Progressive Web App features
- ❌ YouTube/Podcast integration
- ❌ Payment processing (Stripe)
- ❌ Advanced booking system
- ❌ Community forum features

#### Optional Features (Evaluate Based on Performance)
- ❌ Video testimonials (if budget allows)
- ❌ SMS integration via Twilio (if email underperforms)
- ❌ Social media wall (Instagram feed)

---

## 5. User Stories

### Epic 1: New Student Acquisition

**US-1.1**: As a potential BJJ student, I want to immediately understand what makes this academy different, so I can decide if it's worth visiting.

**Example**: Hero section shows cinematic video of training, bold headline "BRAZILIAN JIU-JITSU" with tagline "Transform your body, sharpen your mind, build confidence." CTA button: "START YOUR JOURNEY"

**US-1.2**: As a parent researching kids programs, I want detailed age-appropriate program information and safety details, so I can make an informed decision about enrolling my child.

**Example**: Dedicated Kids Program page with sections for ages 4-7, 8-12, 13-15, parent testimonials, safety protocols, and "Is BJJ Safe for Kids?" FAQ

**US-1.3**: As a website visitor about to leave, I want a compelling reason to stay engaged, so I don't miss out on a great opportunity.

**Example**: Exit-intent modal triggers with "Wait! Your First Class is FREE" and simple email capture form (name + email only)

**US-1.4**: As a mobile user, I want to contact the academy instantly, so I don't have to navigate through multiple pages or remember information.

**Example**: Sticky mobile footer with one-tap buttons: Call, Text, Map, Email

### Epic 2: Information & Trust Building

**US-2.1**: As a beginner with no BJJ experience, I want to see social proof from real students, so I know others like me have succeeded.

**Example**: Google Reviews widget on homepage showing 4.9/5 star rating, recent reviews with names and photos, parent testimonials on Kids page

**US-2.2**: As a comparison shopper, I want to understand what makes this academy unique, so I can differentiate it from other BJJ gyms.

**Example**: "Why Choose Us" page with lineage, instructor credentials, clean facility photos, community culture, student success stories, values statement

**US-2.3**: As a visual learner, I want to see the academy atmosphere and training in action, so I can envision myself training there.

**Example**: Full-screen video background showing slow-motion technique execution, sparring intensity, students helping each other, smiling faces

### Epic 3: Technical Excellence

**US-3.1**: As a user who prefers dark mode, I want the website to automatically match my system preference, so I have a comfortable viewing experience.

**Example**: Site automatically detects `prefers-color-scheme: dark` and applies dark theme with adjusted colors, video overlay, and contrast ratios

**US-3.2**: As a mobile user on a slow connection, I want pages to load instantly, so I don't abandon the site.

**Example**: Optimized video (< 2MB mobile), lazy-loaded images, AVIF/WebP formats, edge caching results in < 2s load time

---

## 6. Core Architecture & Patterns

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel Edge CDN                      │
│              (Global Edge Functions & Caching)           │
└─────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js 15 Application (SSR/SSG)            │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │   Pages     │  │  Components  │  │   API Routes   │ │
│  │  (App       │  │  (shadcn/ui  │  │  (Resend,      │ │
│  │  Router)    │  │   + custom)  │  │   Analytics)   │ │
│  └─────────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ▼
       ┌────────────────────┴────────────────────┐
       ▼                                          ▼
┌─────────────────┐                    ┌─────────────────┐
│   Sanity CMS    │                    │  Vercel Blob    │
│  (Content +     │                    │  + Cloudinary   │
│   Student Data) │                    │  (Media Assets) │
└─────────────────┘                    └─────────────────┘
       │
       └──────┬─────────────────────────────────────────┐
              ▼                                          ▼
       ┌─────────────────┐                    ┌─────────────────┐
       │  Vercel KV      │                    │   Resend Email  │
       │  (Sessions/     │                    │   (Transactional│
       │   Cache)        │                    │    + Marketing) │
       └─────────────────┘                    └─────────────────┘
```

### Directory Structure

```
carlson-gracie-site/
├── app/                          # Next.js 15 App Router
│   ├── (public)/                 # Public pages (no auth)
│   │   ├── page.tsx              # Home/Landing
│   │   ├── classes/page.tsx      # Classes overview
│   │   ├── kids/page.tsx         # Kids Program (dedicated)
│   │   ├── schedule/page.tsx     # Interactive schedule
│   │   ├── instructors/page.tsx  # Instructor profiles
│   │   ├── why-choose-us/page.tsx# Differentiation page
│   │   ├── contact/page.tsx      # Contact + one-tap actions
│   │   ├── escondido-bjj/page.tsx# Local SEO: Escondido
│   │   └── north-county-san-diego-bjj/page.tsx # Local SEO: North County
│   ├── wall-of-champions/page.tsx# Wall of Champions (public page)
│   ├── api/                      # API routes
│   │   ├── contact/route.ts      # Form submissions
│   │   ├── exit-intent/route.ts  # Lead capture
│   │   └── reviews/route.ts      # Google Reviews fetch
│   ├── layout.tsx                # Root layout (theme provider)
│   └── globals.css               # Global styles + theme variables
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── hero/                     # Cinematic hero components
│   │   ├── VideoBackground.tsx   # Optimized video player
│   │   └── ParallaxLayers.tsx    # Parallax scrolling
│   ├── forms/                    # Form components
│   ├── navigation/               # Header, footer, mobile nav
│   ├── theme/                    # Theme toggle, provider
│   ├── champions/                # Wall of Champions components
│   └── reviews/                  # Google Reviews widget
├── lib/                          # Utility functions
│   ├── sanity.ts                 # Sanity client config
│   ├── email.ts                  # Resend integration
│   ├── analytics.ts              # Umami setup
│   └── utils.ts                  # Shared utilities
├── sanity/                       # Sanity CMS config
│   ├── schemas/                  # Content schemas
│   │   ├── instructor.ts
│   │   ├── class.ts
│   │   ├── achievement.ts
│   │   └── announcement.ts
│   └── config.ts
├── public/                       # Static assets
│   ├── videos/                   # Hero videos (optimized)
│   ├── images/                   # Optimized images
│   └── fonts/                    # Custom fonts
└── styles/                       # Additional styles
    └── animations.css            # Framer Motion presets
```

### Key Design Patterns

#### 1. Component Composition Pattern
- Small, reusable components composed into larger features
- shadcn/ui provides base components; custom components extend them
- Example: `<Button>` from shadcn + custom `<CTAButton>` with red accent and animations

#### 2. Server-Side Rendering (SSR) with Static Generation
- Use SSG for static pages (home, classes, why-choose-us) → faster load times
- Use SSR for dynamic pages (dashboard, schedule) → real-time data
- Use ISR (Incremental Static Regeneration) for content-heavy pages → balance performance and freshness

#### 3. Optimistic UI Updates
- Form interactions provide immediate feedback before server confirmation
- Example: Form submission → instant loading state → success animation

#### 4. Edge-First Architecture
- Route handlers on Vercel Edge Functions for lowest latency
- Form submissions, exit-intent capture processed at edge
- Analytics events sent to edge endpoints

#### 5. Progressive Enhancement
- Core functionality works without JavaScript (forms submit, navigation works)
- Animations enhance but aren't required
- Video background falls back to static image on slow connections

### Technology-Specific Patterns

#### Next.js 15 App Router
- Server Components by default (reduce client bundle)
- Client Components only where interactivity needed (`'use client'`)
- Intercepting routes for modals (exit-intent, instructor profiles)

#### Framer Motion
- Shared layout animations for smooth page transitions
- Scroll-triggered animations using `useScroll` and `useTransform`
- Reusable animation variants defined in `styles/animations.css`

#### Sanity CMS
- GROQ queries for content fetching
- Sanity Studio hosted at `/studio` route
- Content schemas enforce data consistency
- Webhook integration for cache invalidation on publish

---

## 7. Features

### Feature 1: Cinematic Landing Experience

**Purpose**: Create an unforgettable first impression that differentiates the academy from all local competitors.

**Operations**:
1. Full-screen video background auto-plays (muted) on page load
2. Parallax scrolling creates depth as user scrolls
3. Micro-animations trigger on user interactions (button hovers, scroll reveals)
4. Bold typography with kinetic effects draws attention to key messaging

**Key Features**:
- **Video Background**: 
  - 20-30 second loop of high-quality training footage
  - Compressed to < 5MB desktop, < 2MB mobile
  - Preloaded poster image for instant visual
  - Respects `prefers-reduced-motion` for accessibility
  
- **Parallax Layers**:
  - 3 layers: background video (0.8x speed), text overlay (1.0x), foreground elements (1.2x)
  - GPU-accelerated transforms for 60fps smoothness
  - Disabled on mobile if performance issues detected
  
- **Micro-interactions**:
  - CTA button: Scale + glow on hover, subtle bounce on click
  - Scroll indicator: Animated arrow that pulses
  - Form fields: Smooth focus states with color transitions
  - Loading states: Lottie animations (spinning gi, belt tying)

**Success Criteria**:
- Video loads and plays within 1.5 seconds on desktop
- Parallax scrolling maintains 60fps on all devices
- < 5% bounce rate on hero section (measured via scroll depth)
- Hero section engagement > 70% (users scroll past hero)

---

### Feature 2: System-Aware Theming (Dark Mode)

**Purpose**: Provide modern, accessible theming that respects user preferences and reduces eye strain.

**Operations**:
1. On page load, detect OS-level color scheme preference
2. Apply appropriate theme (light or dark) automatically
3. Provide manual toggle for user override
4. Store preference in localStorage for persistence
5. Smooth transition between themes (no jarring flash)

**Key Features**:
- **Automatic Detection**: 
  - CSS `@media (prefers-color-scheme: dark)` triggers dark mode
  - JavaScript fallback for browsers without support
  
- **Manual Toggle**:
  - Sun/moon icon in navigation header
  - Click toggles between light/dark
  - Overrides system preference
  - Persisted in localStorage
  
- **Theme Adjustments**:
  - Dark mode uses lighter grays, brighter accent red
  - Video overlay opacity adjusted for better contrast
  - All text maintains WCAG AA contrast ratios (4.5:1 minimum)
  
- **Smooth Transitions**:
  - CSS transitions for color changes (200ms ease-in-out)
  - Framer Motion for icon swap animation
  - No flash of unstyled content (FOUC)

**Success Criteria**:
- Theme correctly applies on first load based on system preference
- Manual toggle works instantly with smooth transition
- Preference persists across sessions
- All text passes WCAG AA contrast checks in both modes
- No FOUC or theme flickering

---

### Feature 3: Exit-Intent Lead Capture

**Purpose**: Recover 10-15% of abandoning visitors by presenting a compelling offer at the moment they try to leave.

**Operations**:
1. Detect when user's mouse leaves viewport (desktop) or scrolls to bottom without interaction (mobile)
2. Show modal with "Wait! Your First Class is FREE" offer
3. Capture name + email with minimal friction form
4. Send confirmation email via Resend
5. Set cookie to prevent showing modal again this session

**Key Features**:
- **Trigger Logic**:
  - Desktop: Mouse exits top boundary of viewport
  - Mobile: Scroll to bottom + no form submission in 30+ seconds
  - Show only once per session (cookie-based)
  - 2-second delay before showing (not instant)
  
- **Modal Design**:
  - Backdrop blur with darkened overlay
  - Bold headline: "Wait! Your First Class is FREE"
  - Subheadline: "No strings attached. Come see what BJJ is all about."
  - Form: Name (text), Email (email), "CLAIM MY FREE CLASS" button
  - Close button (X) in corner
  
- **Form Validation**:
  - Client-side validation (email format, required fields)
  - Server-side validation via API route
  - Inline error messages
  - Success animation (Lottie celebration)
  
- **Email Automation**:
  - Immediate confirmation email via Resend
  - Subject: "Your Free BJJ Class at [Academy Name]"
  - Body: Thank you, what to expect, instructor introduction, address/parking
  - Follow-up email 24 hours later with class schedule

**Success Criteria**:
- Modal triggers correctly on exit intent (95%+ accuracy)
- 10-15% of users who see modal complete form
- No modal shown to users who already submitted contact form
- Confirmation email delivered within 30 seconds
- No false positives (triggering when user not actually leaving)

---

### Feature 4: Kids Program Page (Dedicated)

**Purpose**: Convert parents searching for youth martial arts programs at 2-3x higher rate than general visitors.

**Operations**:
1. Dedicated `/kids` route with full page experience
2. Parent-focused messaging addressing safety, confidence, bullying
3. Age-specific program sections (4-7, 8-12, 13-15)
4. Video testimonials from parents and kids
5. Comprehensive FAQ answering all parent concerns
6. Multiple CTAs: "Book Free Kids Trial"

**Key Features**:
- **Hero Section**:
  - Headline: "Building Confident, Disciplined, and Resilient Kids Through Brazilian Jiu-Jitsu"
  - Hero image: Kids training together, smiling, having fun
  - Age group badges: "Little Champions 4-7" | "Kids 8-12" | "Teens 13-15"
  - Primary CTA: "Book a FREE Kids Trial Class"
  
- **Program Benefits** (Parent-Focused Copy):
  1. Confidence Building: Overcoming challenges → confidence in school
  2. Bully Prevention: Self-defense skills + confidence to handle situations
  3. Physical Fitness: Fun alternative to screen time
  4. Discipline & Focus: Structured environment teaches respect and listening
  5. Social Skills: Teamwork, making friends, supportive community
  6. Life Skills: Goal-setting (belt progression), perseverance
  
- **Age-Specific Programs**:
  - **Little Champions (4-7)**: 30min classes, fundamentals, games, motor skills
  - **Kids BJJ (8-12)**: 45min structured, belt progression, light sparring
  - **Teens (13-15)**: 60min advanced, competition optional, mentorship
  
- **Safety & Supervision**:
  - Dedicated instructor + assistant per class
  - Age-appropriate skill progressions
  - CPR/First Aid certified instructors
  - Parent viewing area always available
  
- **Parent Testimonials**:
  - 3-5 video testimonials (15-30s each)
  - Before/after stories: "My shy son is now confident"
  - Academic improvement stories
  - Bully resolution examples
  
- **Kids-Specific FAQs**:
  - "Is BJJ safe for kids?" (Yes, safest martial art)
  - "What should my child wear?" (Athletic clothes, loaner gis available)
  - "Will my child get hurt?" (Safety protocols, supervision)
  - "How long until results?" (Confidence within weeks, skills over months)
  - "What if my child is shy?" (Beginner-friendly, supportive environment)
  - "Special needs accommodation?" (Individualized attention)
  - "Cost and family discounts?" (Transparent pricing)
  
- **Trial Process**:
  1. Book free trial (simple form: parent name, child name, age)
  2. Come 10 minutes early for orientation
  3. Watch warm-up games
  4. Learn 2-3 basic techniques
  5. Brief parent meeting after class
  6. No pressure, no obligation

**Success Criteria**:
- Kids Program page ranks on page 1 for "kids BJJ San Diego" within 3 months
- 15-20% of parents who visit page complete trial booking form
- Average time on page > 3 minutes (high engagement)
- Parent testimonial videos have 70%+ completion rate
- 10-15 kids trial bookings per month from this page

---

### Feature 5: Google Reviews Integration

**Purpose**: Build trust immediately by showcasing real 5-star reviews from satisfied students and parents.

**Operations**:
1. Fetch reviews from Google Business API on server-side
2. Cache reviews in Vercel KV (refresh every 24 hours)
3. Display aggregate rating (4.9/5) prominently on homepage
4. Show carousel of recent 5-star reviews with names and dates
5. Link to Google Business Profile for full review list

**Key Features**:
- **Aggregate Rating Display**:
  - Large "4.9/5" rating with star icons
  - "(180+ reviews)" count
  - Positioned in hero section or immediately below
  
- **Review Carousel**:
  - Displays 5 most recent 5-star reviews
  - Each review shows:
    - Reviewer name and initial (avatar)
    - Star rating (visual stars)
    - Review excerpt (150 characters max)
    - Date posted
  - Auto-rotates every 5 seconds
  - Manual navigation arrows
  - Pause on hover
  
- **Review Schema Markup**:
  - Structured data (Schema.org Review) for SEO
  - Enables rich snippets in Google search results
  - Includes aggregate rating, review count
  
- **CTA to Leave Review**:
  - "Leave us a review!" button on homepage and contact page
  - Links to Google Business Profile review submission page
  - Incentive: "Help us grow! Leave a review" (no monetary incentive)

**Success Criteria**:
- Reviews load within 2 seconds on initial page load (from cache)
- Reviews update daily with new submissions from Google
- Review carousel maintains 60fps animation smoothness
- "Leave a review" CTA generates 5+ new reviews per month
- Aggregate rating displayed prominently on homepage (above fold)

---

### Feature 6: One-Tap Mobile Actions

**Purpose**: Make it trivially easy for mobile users to contact the academy without typing or navigating.

**Operations**:
1. Detect mobile device (via user agent or viewport width)
2. Display sticky footer bar with action buttons
3. Buttons use native device protocols (tel:, sms:, geo:, mailto:)
4. Track button clicks as custom events in analytics

**Key Features**:
- **Sticky Mobile Footer**:
  - Fixed position at bottom of screen on mobile only
  - 4 large, touch-friendly buttons:
    - **Call**: `tel:+15551234567` → Opens phone dialer
    - **Text**: `sms:+15551234567` → Opens SMS app
    - **Map**: `geo:` or Google Maps URL → Opens maps app
    - **Email**: `mailto:info@academy.com` → Opens email client
  - Each button has icon + label
  - Red accent color on primary CTA (Call)
  
- **Alternative Placement**:
  - Also display as button group on Contact page
  - Desktop: Display as larger buttons with more spacing
  - Mobile: Sticky footer always accessible
  
- **Analytics Tracking**:
  - Track clicks as custom events: "Mobile: Call Clicked", "Mobile: Map Clicked"
  - Measure conversion funnel: Page view → Button click → (estimate) call/visit
  - A/B test button order and labels

**Success Criteria**:
- 15-20% of mobile users click at least one action button
- "Call" button has highest click rate (40-50% of action button clicks)
- Action buttons load within 1 second on mobile
- No false triggers (buttons don't open on accidental scroll/touch)
- Analytics correctly tracks all action button clicks

---

### Feature 7: Wall of Champions

**Purpose**: Build credibility, showcase student success, and motivate current students with visible achievements.

**Operations**:
1. CMS-managed via Sanity (instructors/admins add entries)
2. Display competition results, belt promotions, student achievements
3. Filter/sort by category: Competitions, Promotions, Student Spotlights
4. Photo gallery with captions and dates
5. Featured on homepage with link to dedicated page

**Key Features**:
- **Categories**:
  - **Competition Results**: Tournament names, medal placements, student names, photos
  - **Belt Promotions**: Belt ceremony photos, student name, date promoted, quote from instructor
  - **Student Spotlights**: "Student of the Month" features, transformation stories, testimonials
  - **Achievements**: First competition, weight loss milestones, attendance records
  
- **Layout**:
  - Card grid layout (responsive: 3 cols desktop, 2 cols tablet, 1 col mobile)
  - Each card: Photo, student name, achievement title, date, short description
  - Click card → Opens modal with full details and more photos
  
- **Sanity Schema**:
  ```typescript
  {
    type: 'achievement',
    fields: [
      { name: 'studentName', type: 'string' },
      { name: 'category', type: 'string', options: ['competition', 'promotion', 'spotlight'] },
      { name: 'title', type: 'string' },
      { name: 'date', type: 'date' },
      { name: 'description', type: 'text' },
      { name: 'photos', type: 'array', of: [{ type: 'image' }] },
      { name: 'featured', type: 'boolean' }
    ]
  }
  ```
  
- **Homepage Integration**:
  - Featured achievements section (3-5 most recent or featured)
  - "View All Achievements" CTA linking to `/wall-of-champions`

**Success Criteria**:
- Wall of Champions page has 20+ entries at launch
- New entries added at least weekly (automated reminder to instructors)
- 40%+ of homepage visitors click "View All Achievements"
- Average time on Wall of Champions page > 2 minutes
- Student testimonials reference Wall of Champions as motivating factor (qualitative)

---

### Feature 8: Local SEO Landing Pages

**Purpose**: Dominate local search results for Escondido and North County San Diego by ranking for neighborhood-specific BJJ searches.

**Operations**:
1. Create dedicated pages with unique, location-specific content (500-800 words each)
2. Include local landmarks, driving directions, and community references
3. Implement Schema.org LocalBusiness markup with geo-targeting
4. Feature local student testimonials when available
5. Link prominently from main site footer and location sections

**Key Features**:
- **Escondido BJJ Page** (`/escondido-bjj`):
  - Hero: "Brazilian Jiu-Jitsu Classes in Escondido"
  - Local context: "Serving Escondido, Rancho Bernardo, and surrounding North County communities"
  - Driving directions from Escondido (I-15 access)
  - Local landmarks: Escondido High School, Westfield North County shopping
  - Community connection: Mention local partnerships or Escondido residents training
  - Schedule highlights convenient for Escondido commuters
  - Testimonials from Escondido-area students (if available)
  
- **North County San Diego BJJ Page** (`/north-county-san-diego-bjj`):
  - Hero: "North County San Diego Brazilian Jiu-Jitsu Classes"
  - Coverage area: Escondido, San Marcos, Vista, Carlsbad, Encinitas, Oceanside, Rancho Bernardo
  - Family-friendly emphasis (North County demographic)
  - Weekend class availability highlighted
  - Youth program emphasis (families in North County)
  - Easy freeway access (I-15, I-5, 78)
  - Community feel messaging
  
- **Content Structure** (Both Pages):
  - Unique 500-800 words of location-specific content
  - H1: "[Location] Brazilian Jiu-Jitsu Classes"
  - H2 sections: About Our Academy, Why Choose Us, Classes We Offer, Schedule, Get Started
  - Neighborhood-specific keywords naturally integrated
  - Unique meta descriptions per page
  - Custom images (if available: photos near local landmarks)
  - Embedded Google Maps with directions from that area
  - Local testimonials (2-3 per page if available)
  - "Serving [Location]" statement in footer
  
- **Schema Markup**:
  - LocalBusiness with `areaServed` property for each location
  - Geo-coordinates for target area (approximate center)
  - Service area definitions
  - Same aggregate review rating as main site
  
- **Internal Linking**:
  - Link from homepage: "Serving Escondido & North County" section
  - Link from footer: "Locations" or "Areas We Serve"
  - Cross-link between local pages
  - Link to main Classes and Kids Program pages
  
- **SEO Keywords** (Target per page):
  - **Escondido**: "BJJ Escondido", "Brazilian Jiu-Jitsu Escondido", "martial arts Escondido", "BJJ near Escondido"
  - **North County**: "North County BJJ", "North County San Diego Brazilian Jiu-Jitsu", "BJJ San Marcos", "BJJ Vista", "martial arts North County"

**Success Criteria**:
- Both pages rank on page 1 for primary local keywords within 3-6 months
- Local pages generate 15-20% additional organic traffic
- 5-10 trial bookings per month attributed to local pages (tracked via form source)
- Average time on page > 2 minutes (indicates engagement with local content)
- 10-15% conversion rate on local pages (equal to or better than homepage)

---

## 8. Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | React framework with App Router, SSR/SSG |
| **React** | 19.x | UI library (included with Next.js 15) |
| **TypeScript** | 5.x | Type safety and developer experience |
| **TailwindCSS** | 3.x | Utility-first CSS framework |
| **shadcn/ui** | Latest | Pre-built accessible UI components |
| **RemixUI** | Latest | Additional UI component library |
| **Framer Motion** | 11.x | Animation library for smooth transitions |
| **Three.js** | 0.160+ | 3D graphics library |
| **React Three Fiber** | 8.x | React renderer for Three.js |
| **Lottie React** | 2.x | Micro-animations and loading states |

### Backend & Infrastructure

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vercel** | - | Hosting, Edge Functions, CI/CD |
| **Sanity.io** | 3.x | Headless CMS for content management |
| **Vercel KV** | - | Redis-compatible key-value store (sessions, cache) |
| **Vercel Blob** | - | Object storage for media assets |

### Media & Assets

| Technology | Version | Purpose |
|------------|---------|---------|
| **Cloudinary** | - | Video optimization and streaming |
| **Sharp** | Latest | Image optimization (AVIF, WebP) |

### Communication

| Technology | Version | Purpose |
|------------|---------|---------|
| **Resend** | 2.x | Email delivery API (transactional + marketing) |

### Analytics & Monitoring

| Technology | Version | Purpose |
|------------|---------|---------|
| **Umami** | Latest | Privacy-focused web analytics |

### Integrations

| Technology | Version | Purpose |
|------------|---------|---------|
| **Google Maps API** | - | Location maps and directions |
| **Google Business API** | - | Reviews integration and display |

### Optional Dependencies (Evaluate Post-Launch)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Twilio** | - | SMS notifications and reminders |
| **Stripe** | Latest | Payment processing (future phase) |

---

## 9. Security & Configuration

### Authentication & Authorization

**Approach**: Session-based authentication for student dashboard

- **Registration**: Email + password with bcrypt hashing (10 rounds)
- **Login**: Email + password or magic link (passwordless)
- **Sessions**: Stored in Vercel KV with 30-day expiration
- **Authorization**: Middleware checks for valid session on protected routes
- **Password Reset**: Magic link sent via Resend
- **No Admin Panel** (MVP): Sanity Studio for content management (instructors access via separate authentication)

### Configuration Management

**Environment Variables** (Vercel):
```bash
# Database
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
SANITY_API_TOKEN=xxx (write access for mutations)

# Media
BLOB_READ_WRITE_TOKEN=xxx
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Email
RESEND_API_KEY=xxx
FROM_EMAIL=noreply@academy.com

# Analytics
UMAMI_WEBSITE_ID=xxx

# Google APIs
GOOGLE_MAPS_API_KEY=xxx
GOOGLE_BUSINESS_API_KEY=xxx
GOOGLE_PLACE_ID=xxx (for reviews)

# Auth
SESSION_SECRET=xxx (random 32-byte hex)
NEXT_PUBLIC_SITE_URL=https://academy.com
```

**Security Best Practices**:
- Environment variables never exposed to client (only `NEXT_PUBLIC_*` vars)
- Secrets rotated quarterly
- API keys scoped to minimum required permissions
- Rate limiting on form submissions (10 req/min per IP)

### Security Scope

#### ✅ In-Scope Security Requirements (MVP)
- SSL/TLS encryption (automatic via Vercel)
- CSRF protection on all forms
- Input validation (client + server-side)
- Secure HTTP headers (CSP, X-Frame-Options, etc.)
- Rate limiting on form endpoints
- Sanitized database queries (Sanity client handles this)

#### ❌ Out-of-Scope (Future Phases)
- Session-based authentication (dashboard deferred to Phase 2)
- Password management and reset flows
- Two-factor authentication (2FA)
- OAuth social login (Google, Facebook)
- Advanced role-based access control (RBAC)
- SOC 2 compliance
- Payment Card Industry (PCI) compliance (Stripe handles this when added)

### Deployment Configuration

**Vercel Settings**:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Framework Preset**: Next.js
- **Node Version**: 20.x
- **Environment**: 
  - **Preview**: Staging environment (PRs deploy here)
  - **Production**: Main branch auto-deploys

**Custom Domains**:
- Production: `academy.com` + `www.academy.com`
- Staging: `staging.academy.com`

**Edge Functions**:
- Contact form handler: `/api/contact`
- Exit-intent capture: `/api/exit-intent`
- Reviews fetch: `/api/reviews`

---

## 10. API Specification

### Endpoint: `POST /api/contact`

**Purpose**: Handle contact form submissions from all pages

**Authentication**: None (public endpoint)

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "message": "I'm interested in trying a class",
  "source": "contact-page" // or "exit-intent", "kids-page"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Thank you! We'll be in touch soon."
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

**Rate Limiting**: 10 requests per minute per IP

**Side Effects**:
1. Validates input (email format, required fields)
2. Sends email to academy via Resend (`info@academy.com`)
3. Sends confirmation email to user
4. Logs submission to Sanity (for CRM)
5. Tracks custom event in Umami

---

### Endpoint: `GET /api/reviews`

**Purpose**: Fetch recent Google Business reviews (cached)

**Authentication**: None (public endpoint)

**Request**: No body

**Response**:
```json
{
  "aggregateRating": {
    "ratingValue": 4.9,
    "reviewCount": 182
  },
  "reviews": [
    {
      "author": "Sarah M.",
      "rating": 5,
      "text": "Amazing academy! The instructors are patient and knowledgeable. My son loves the kids program.",
      "date": "2026-01-15T00:00:00Z"
    },
    {
      "author": "Mike T.",
      "rating": 5,
      "text": "Best BJJ gym in San Diego. Clean facility, great atmosphere, world-class instruction.",
      "date": "2026-01-10T00:00:00Z"
    }
    // ... 3 more recent reviews
  ]
}
```

**Caching**: 24-hour cache in Vercel KV (refresh daily at midnight)

**Error Handling**: If Google API fails, returns cached data + warning in dev logs

---

## 11. Success Criteria

### MVP Success Definition

The MVP is successful if, after initial development and post-launch optimization:

1. **All pages are live and functional** (9 pages: 7 core + 2 local SEO)
   - Core: Home, Classes, Kids Program, Schedule, Instructors, Why Choose Us, Contact
   - Local SEO: Escondido BJJ, North County San Diego BJJ
2. **Performance targets met**: Lighthouse score 98+, LCP < 1.8s, sub-2-second load times
3. **Conversion rate > 8%**: At least 8% of visitors complete a form (contact, exit-intent, or trial booking)
4. **No critical bugs**: Zero P0/P1 bugs reported in first two weeks post-launch

---

### Measurable KPIs

#### Primary Conversion Metrics

| KPI | Target Value | Measurement Method | Success/Failure Threshold |
|-----|--------------|-------------------|---------------------------|
| **Visitor-to-Lead Conversion** | 8-12% | (Form submissions / Unique visitors) × 100 | Success: ≥8%, Failure: <5% |
| **Lead-to-Trial Conversion** | 15-20% | (Trial class bookings / Form submissions) × 100 | Success: ≥15%, Failure: <10% |
| **Trial-to-Member Conversion** | 50%+ | (New members / Trial attendees) × 100 | Success: ≥50%, Failure: <40% |
| **Exit-Intent Capture Rate** | 10-15% | (Exit modal completions / Exit modal views) × 100 | Success: ≥10%, Failure: <5% |
| **Kids Page Conversion** | 15-20% | (Kids trial forms / Kids page visitors) × 100 | Success: ≥15%, Failure: <8% |

#### Performance Metrics

| KPI | Target Value | Measurement Method | Success/Failure Threshold |
|-----|--------------|-------------------|---------------------------|
| **Page Load Time (LCP)** | < 1.8s | Lighthouse + RUM via Vercel Analytics | Success: <2s, Failure: >3s |
| **Lighthouse Score** | 98+ | Lighthouse CI on deploy | Success: ≥95, Failure: <90 |
| **Mobile Performance Score** | 95+ | Lighthouse mobile test | Success: ≥90, Failure: <85 |
| **Cumulative Layout Shift (CLS)** | < 0.05 | Core Web Vitals via RUM | Success: <0.1, Failure: >0.15 |
| **First Input Delay (FID)** | < 50ms | Core Web Vitals via RUM | Success: <100ms, Failure: >200ms |

#### Engagement Metrics

| KPI | Target Value | Measurement Method | Success/Failure Threshold |
|-----|--------------|-------------------|---------------------------|
| **Average Session Duration** | 90+ seconds | Umami Analytics | Success: ≥60s, Failure: <30s |
| **Bounce Rate** | < 40% | Umami Analytics (single-page sessions) | Success: <50%, Failure: >65% |
| **Pages Per Session** | 3+ | Umami Analytics | Success: ≥2.5, Failure: <2 |
| **Dashboard Logins Per Week** | 80%+ of students | Sanity DB query (user sessions) | Success: ≥70%, Failure: <50% |
| **Hero Video Completion Rate** | 50%+ | Custom tracking (video progress events) | Success: ≥40%, Failure: <25% |

#### SEO & Visibility Metrics

| KPI | Target Value | Measurement Method | Success/Failure Threshold |
|-----|--------------|-------------------|---------------------------|
| **Organic Search Ranking** (San Diego BJJ) | Page 1 (within 6 months) | Google Search Console + manual check | Success: Page 1 position 1-10, Failure: Page 3+ |
| **Organic Traffic Growth** | 50%+ increase in 3 months | Google Search Console | Success: ≥40%, Failure: <20% |
| **Kids Program Page Ranking** (kids BJJ San Diego) | Page 1 (within 3 months) | Google Search Console | Success: Page 1, Failure: Page 2+ |
| **Backlinks Acquired** | 10+ quality backlinks in 6 months | Ahrefs or Google Search Console | Success: ≥8, Failure: <5 |

#### Business Impact Metrics

| KPI | Target Value | Measurement Method | Success/Failure Threshold |
|-----|--------------|-------------------|---------------------------|
| **New Adult Trial Signups Per Month** | 40-60 | CRM/Sanity records + form submissions | Success: ≥35, Failure: <25 |
| **New Kids Trial Signups Per Month** | 15-25 | CRM/Sanity records (kids-specific forms) | Success: ≥10, Failure: <5 |
| **New Adult Members Per Month** | 20-30 | CRM/business records | Success: ≥15, Failure: <10 |
| **New Kids Enrollments Per Month** | 10-15 | CRM/business records | Success: ≥8, Failure: <5 |
| **Additional Monthly Revenue** | $4,500-6,000 | (New members × $150-200 avg) | Success: ≥$3,000, Failure: <$1,500 |

---

### Telemetry & Analytics Instrumentation

#### Tools & Implementation

1. **Umami Analytics** (Privacy-Focused Web Analytics)
   - Installed via `<Script>` tag in root layout
   - Tracks: Page views, unique visitors, referrers, session duration, bounce rate
   - Custom events: Form submissions, CTA clicks, video plays, exit-intent triggers
   
2. **Vercel Analytics** (Real User Monitoring)
   - Automatically installed with Vercel deployment
   - Tracks: Core Web Vitals (LCP, FID, CLS), page load times, geographic distribution
   - Provides performance scores and recommendations
   
3. **Custom Event Tracking** (via Umami)
   - Implemented with `trackEvent()` function wrapper
   - Events tracked:
     - `form_submit: contact` (contact form completion)
     - `form_submit: exit_intent` (exit-intent modal completion)
     - `form_submit: kids_trial` (kids trial booking)
     - `cta_click: start_journey` (hero CTA clicked)
     - `cta_click: call` (mobile call button clicked)
     - `cta_click: map` (mobile map button clicked)
     - `video_play: hero` (hero video started)
     - `video_complete: hero` (hero video watched to end)
     - `review_click: google` (Google review link clicked)
     - `wall_view` (Wall of Champions page viewed)
     - `local_page_view: escondido` (Escondido BJJ page viewed)
     - `local_page_view: north_county` (North County page viewed)
     - `navigation_click: [page]` (navigation link clicked)

#### Measurement Methodology

**Conversion Rate Calculation**:
```typescript
// Visitor-to-Lead Conversion
const visitorToLeadRate = 
  (contactForms + exitIntentForms + kidsTrialForms) / uniqueVisitors * 100;

// Exit-Intent Capture Rate
const exitIntentRate = 
  exitIntentFormsCompleted / exitIntentModalsViewed * 100;

// Kids Page Conversion
const kidsPageConversion = 
  kidsTrialForms / kidsPageVisitors * 100;
```

**Performance Monitoring**:
- Lighthouse CI runs on every deploy (automated)
- Real User Monitoring (RUM) via Vercel Analytics captures 75th percentile metrics
- Weekly performance reports generated from Vercel dashboard
- Alerts configured for performance regressions (LCP > 2.5s)

**SEO Tracking**:
- Google Search Console connected to property
- Weekly export of search analytics data
- Manual ranking checks monthly for top 20 keywords
- Automated rank tracking via Ahrefs (optional paid tool)

**Business Metrics**:
- Form submissions synced to Sanity CMS (source of truth)
- Monthly reports generated from Sanity database queries
- Trial-to-member conversion tracked manually in CRM/spreadsheet
- Revenue calculations based on new member counts × average membership price

---

### Functional Requirements

**Core Functionality** (Must Work Perfectly):
- ✅ All pages load within 2 seconds on 4G mobile connection
- ✅ Forms submit successfully and send confirmation emails within 30 seconds
- ✅ Exit-intent modal triggers correctly 95%+ of the time
- ✅ Video background plays automatically (muted) on desktop
- ✅ Dark mode switches smoothly with no FOUC
- ✅ Google Reviews display correctly with accurate aggregate rating
- ✅ Mobile action buttons (call, map, email) open correct native apps
- ✅ All images are optimized (AVIF/WebP with fallbacks)
- ✅ Schema markup validates without errors (Google Rich Results Test)
- ✅ Site is accessible (passes WCAG 2.1 AA automated tests)

---

### Quality Indicators

**Technical Excellence**:
- Zero critical (P0) bugs at launch
- < 5 medium (P1) bugs at launch
- All Lighthouse metrics in green (90+)
- No console errors on production build
- TypeScript strict mode with zero `any` types in core logic
- 80%+ test coverage on critical paths (forms, auth, data fetching)

---

### User Experience Goals

**Qualitative Measures** (Validated via User Testing):
- First-time visitors immediately understand the site's purpose within 5 seconds
- Contact form feels "effortless" to complete (no confusion or abandonment)
- Kids Program page addresses parent concerns without requiring FAQ search
- Navigation is intuitive (users find target page without using search)
- Average scroll depth > 60% on homepage (indicates engagement)
- Wall of Champions creates positive impression of academy community

---

## 12. Implementation Phases

### Phase 1: Foundation & Core Setup

**Goal**: Establish technical foundation and design system

**Deliverables**:
- ✅ Next.js 15 project scaffolding with TypeScript
- ✅ TailwindCSS configuration with custom color palette
- ✅ shadcn/ui and RemixUI installation
- ✅ System-aware theming implementation (light/dark modes)
- ✅ Sanity CMS setup with initial schemas
- ✅ Vercel deployment pipeline (staging + production)
- ✅ Environment variables and secrets management
- ✅ Component library structure and foundations
- ✅ Animation utilities (Framer Motion presets)

**Validation Criteria**:
- Build succeeds with zero TypeScript errors
- Staging site deploys successfully on Vercel
- Dark mode switches correctly based on system preference
- TailwindCSS custom colors render correctly

---

### Phase 2: Cinematic Landing Experience

**Goal**: Build the standout hero section and homepage core sections

**Deliverables**:
- ✅ Full-screen video background component with optimization
- ✅ Parallax scrolling implementation (multi-layer depth)
- ✅ Micro-interactions (button hovers, scroll reveals, Lottie animations)
- ✅ Bold typography with kinetic effects
- ✅ Exit-intent modal system with lead capture
- ✅ Google Reviews integration widget
- ✅ Value proposition section with scroll-triggered animations
- ✅ Kids Program highlight section on homepage
- ✅ Wall of Champions preview section
- ✅ One-tap mobile action buttons

**Validation Criteria**:
- Hero section loads with video playing within 1.5 seconds
- Parallax scrolling maintains 60fps on desktop
- Exit-intent modal triggers correctly on mouse exit
- Google Reviews display with accurate rating
- Lighthouse Performance score remains 95+ with all additions

---

### Phase 3: Core Pages & Navigation

**Goal**: Complete all public-facing pages and navigation system

**Deliverables**:
- ✅ Global navigation (sticky header with CTA, theme toggle)
- ✅ Mobile navigation menu with smooth animations
- ✅ Footer with all essential links and contact info
- ✅ Classes page with filterable program cards
- ✅ **Kids Program page (dedicated, high priority)**
  - Hero, age-specific programs, parent testimonials, FAQs, trial process
- ✅ Schedule page with interactive calendar
- ✅ Instructors page with profile cards and modals
- ✅ Why Choose Us page (differentiation, social proof, values)
- ✅ Contact page with form, map, one-tap actions
- ✅ All forms wired to API routes and Resend email

**Validation Criteria**:
- All 7 core pages accessible and responsive
- Navigation works on mobile and desktop
- Kids Program page has all required sections and testimonials
- Forms submit successfully and send confirmation emails
- Contact page one-tap actions open native apps on mobile
- Average page load time < 2 seconds across all pages

---

### Phase 4: Local SEO Pages

**Goal**: Create neighborhood-specific landing pages for Escondido and North County

**Deliverables**:
- ✅ Escondido BJJ page (`/escondido-bjj`)
  - 500-800 words unique, location-specific content
  - Local landmarks and driving directions
  - H1, H2 structure optimized for local keywords
- ✅ North County San Diego BJJ page (`/north-county-san-diego-bjj`)
  - 500-800 words unique content covering wider North County area
  - Family-friendly emphasis and community messaging
  - Multiple city references (San Marcos, Vista, Carlsbad, etc.)
- ✅ Schema.org LocalBusiness markup with `areaServed` for both pages
- ✅ Unique meta descriptions and titles per page
- ✅ Internal linking from homepage footer ("Areas We Serve" section)
- ✅ Cross-linking between local pages
- ✅ Embedded Google Maps with location-specific directions
- ✅ Contact forms with source tracking ("escondido-page", "north-county-page")

**Validation Criteria**:
- Both pages pass Google Rich Results Test for LocalBusiness schema
- Unique content per page (no duplication detected)
- Pages load within 2 seconds
- Local keywords naturally integrated (not keyword-stuffed)
- Forms track source correctly in Umami
- Internal links work correctly

---

### Phase 5: Wall of Champions & Community

**Goal**: Showcase student success and build credibility

**Deliverables**:
- ✅ Wall of Champions public page
- ✅ Filterable achievement categories (competitions, promotions, spotlights)
- ✅ Sanity CMS schema for achievements
- ✅ Card grid layout (responsive)
- ✅ Modal view for full achievement details
- ✅ Homepage integration (featured achievements section)
- ✅ CMS workflow for instructors to add entries

**Validation Criteria**:
- Wall of Champions loads 20+ sample entries
- Filtering works correctly (all categories)
- Modal opens with full achievement details
- Homepage features 3-5 recent achievements
- Sanity Studio allows easy entry creation

---

### Phase 6: SEO, Analytics & Optimization

**Goal**: Maximize visibility, trackability, and performance

**Deliverables**:
- ✅ Schema.org markup (LocalBusiness, Course, Review) on all pages
- ✅ Sitemap.xml generation (dynamic, includes all pages)
- ✅ robots.txt configuration
- ✅ Meta tags and Open Graph tags on all pages
- ✅ Image optimization (AVIF/WebP with Sharp)
- ✅ Video optimization (compressed, lazy-loaded)
- ✅ Route preloading for critical paths
- ✅ Umami analytics installation and custom event tracking
- ✅ Performance audit and optimization pass
- ✅ Accessibility audit (automated + manual)

**Validation Criteria**:
- All pages validate in Google Rich Results Test
- Sitemap includes all pages and updates automatically
- Lighthouse scores: Performance 98+, SEO 100, Accessibility 100
- AVIF images serve on supporting browsers (90%+ smaller than JPEG)
- Custom events tracked correctly in Umami

---

### Phase 7: Content Population & Testing

**Goal**: Populate with real content and conduct comprehensive testing

**Deliverables**:
- ✅ Content population via Sanity CMS
  - Instructor profiles and bios
  - Class descriptions and schedules
  - Academy story and mission
  - FAQ content (general + kids-specific)
  - Blog/guide articles (beginner's guide, kids benefits, etc.)
- ✅ Media assets upload (photos, videos, logos)
- ✅ Google Reviews imported and cached
- ✅ Student dashboard dummy data (for demo purposes)
- ✅ Cross-browser testing (Chrome, Safari, Firefox, Edge)
- ✅ Mobile device testing (iOS Safari, Android Chrome)
- ✅ Performance testing (Lighthouse, WebPageTest)
- ✅ Accessibility testing (WAVE, axe DevTools, screen reader)
- ✅ User acceptance testing (internal team walkthrough)
- ✅ Bug fixes and polish

**Validation Criteria**:
- All content pages have real text and images (no lorem ipsum)
- Videos optimized and play correctly on all devices
- Site works correctly on 5 most popular browsers
- No critical bugs reported in UAT
- Performance targets met on all tested devices

---

### Phase 8: Launch Preparation

**Goal**: Prepare for public launch and go live

**Deliverables**:
- ✅ Domain configuration and DNS setup
- ✅ SSL certificate verification (automatic via Vercel)
- ✅ Email domain authentication (SPF, DKIM for Resend)
- ✅ Production environment configuration
- ✅ Backup and monitoring setup (Vercel monitoring)
- ✅ Final performance optimization pass
- ✅ Security audit (headers, CSP, rate limiting)
- ✅ Soft launch to test audience (friends, family, current students)
- ✅ Google Business Profile update with new website link
- ✅ Submit sitemap to Google Search Console and Bing Webmaster Tools
- ✅ Launch checklist completion
- ✅ **PUBLIC LAUNCH**

**Validation Criteria**:
- Production site accessible at custom domain
- SSL certificate valid and HTTPS enforced
- Emails send correctly from custom domain (not flagged as spam)
- No critical bugs reported during soft launch
- Analytics tracking correctly in production
- Google Search Console verifies site ownership

**Note**: Timeline will be determined during project planning and sprint scheduling

---

## 13. Future Considerations

### Post-MVP Enhancements (Phase 2)

**Student Dashboard with Progress Tracking** (High Priority):
- Authentication system (email/password + magic link)
- Dashboard home with personalized stats
- Progress tracking (classes attended, belt timeline)
- Academy feed (announcements, events)
- Personal goals and achievement badges
- Expected 10% improvement in retention rate

**Additional Local SEO Pages** (Medium Priority):
- 3 more pages targeting specific San Diego neighborhoods
- Pacific Beach BJJ, La Jolla BJJ, Downtown San Diego BJJ
- 500-800 words unique content per page with local references
- Expected additional 20-30% increase in organic traffic within 6 months
- Builds on success of initial Escondido and North County pages

**Smart Intake Quiz**:
- 5-7 question quiz to match visitors with ideal class/instructor
- Personalized recommendations based on experience, goals, schedule, concerns
- Expected 5-10% increase in trial booking conversion

**Enhanced A/B Testing**:
- Framework for testing headlines, CTA text, form layouts
- Edge Middleware for server-side A/B tests
- Continuous optimization of conversion funnel

---

### Integration Opportunities (Month 3-6)

**Video Testimonials** (If High Engagement):
- 3-5 student video testimonials (15-30s each)
- 2-3 parent video testimonials for kids program
- Embedded throughout site with autoplay on scroll

**SMS Integration** (If Email Underperforms):
- Twilio integration for SMS reminders
- Class confirmations, schedule changes, special offers
- "Text JOIN to [number]" campaigns

**Social Media Wall**:
- Live Instagram feed on homepage or community page
- User-generated content from students (with permission)
- Shows vibrant, active community

**Blog Section Expansion**:
- Weekly blog posts for ongoing SEO
- Technique tips, academy news, student spotlights, local BJJ events
- Content marketing to drive organic traffic

---

### Advanced Features (Year 2+)

**Interactive 3D Elements**:
- 3D belt rank progression visualizer
- WebGL-powered with React Three Fiber
- Mouse/device tilt interactions
- When budget allows and performance permits

**Progressive Web App (PWA)**:
- When mobile usage reaches 70%+
- Installable app, offline support, push notifications
- App-like experience without app store

**Member Technique Library**:
- Video library of techniques taught in class
- Searchable by position, type, instructor
- Competitive differentiator, study at home between classes

**Referral Program**:
- When member base is established (100+ students)
- Unique referral links, automatic tracking, reward fulfillment
- Gamification: leaderboard of top referrers

**Native Mobile App**:
- If budget and scale justify ($50K+ project)
- iOS and Android apps with native features
- Advanced booking, check-in, technique library, social features

**AI-Powered Features**:
- Chatbot for 24/7 engagement (when budget allows)
- Intelligent class matching based on ML algorithms
- Personalized content recommendations

---

## 14. Risks & Mitigations

### Risk 1: Video Background Negatively Impacts Performance

**Severity**: High  
**Likelihood**: Medium

**Mitigation Strategy**:
- Compress video to < 5MB desktop, < 2MB mobile using Cloudinary
- Lazy-load video (preload poster image only)
- Provide static image fallback for slow connections (< 3G)
- Use `prefers-reduced-motion` to disable for users with motion sensitivity
- Monitor Core Web Vitals in production; if LCP > 2.5s, switch to static hero

---

### Risk 2: Exit-Intent Modal Annoys Users, Increases Bounce Rate

**Severity**: Medium  
**Likelihood**: Low

**Mitigation Strategy**:
- Show only once per session (cookie-based)
- 2-second delay before triggering (not instant)
- Only show to users who spent 30+ seconds on site (engaged users)
- A/B test modal vs. no modal to measure impact on bounce rate
- Provide easy close button (X in corner)
- Monitor bounce rate in Umami; if increases > 5%, disable modal

---

### Risk 3: Kids Program Page Doesn't Rank Due to Competition

**Severity**: Medium  
**Likelihood**: Low

**Mitigation Strategy**:
- Comprehensive keyword research before writing content
- Target long-tail keywords with lower competition ("kids BJJ San Diego ages 4-7")
- Create supporting blog content linking to kids page
- Build backlinks via local parenting blogs, school partnerships
- Implement Course schema markup for structured data advantage
- Monitor rankings monthly; if no progress in 3 months, adjust SEO strategy

---

### Risk 4: Local SEO Pages Don't Generate Enough Unique Content

**Severity**: Low  
**Likelihood**: Medium

**Mitigation Strategy**:
- Research each location thoroughly (landmarks, demographics, commute patterns)
- Interview students from those areas for authentic testimonials
- Create location-specific value propositions (e.g., "Easy I-15 access for Escondido residents")
- Use local photos when possible (near landmarks, with permission)
- Avoid templated language; write each page from scratch
- Have non-technical person read both pages to confirm they feel distinct
- Monitor Google Search Console for duplicate content warnings

---

### Risk 5: Wall of Champions Content Not Updated Regularly

**Severity**: Low  
**Likelihood**: Medium

**Mitigation Strategy**:
- Set up automated weekly reminders to instructors/admins
- Make Sanity CMS entry creation as simple as possible (minimal fields)
- Provide templates for common achievement types
- Train 2-3 staff members on CMS usage
- Initial content population (20+ entries) before launch
- Monitor update frequency; if < 1 per week, conduct training session

---

## 15. Appendix

### Related Documents

- **Project Planning Document**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/project-planning.md`  
  (Comprehensive 1,335-line planning doc with all technical details)

- **Feature Priorities Quick Reference**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/feature-priorities-quick-ref.md`  
  (Condensed priority list for quick lookup during development)

- **Competitive Advantage Analysis**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/competitive-advantage-analysis.md`  
  (Market analysis showing why this will dominate local competition)

- **Planning Changelog**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/CHANGELOG.md`  
  (Version history of all planning document updates)

- **Planning Critique & Enhancements**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/planning-critique-v2-enhancements.md`  
  (World-class feature ideas and "what makes this amazing")

- **Documentation README**: `/Users/esmith/CursorProjects/carlson-gracie-site/.cursor/docs/references/README.md`  
  (Overview of all documentation files and quick facts)

---

### Key Dependencies

**Critical Path Dependencies**:
- **Sanity CMS**: Required for all content pages (Classes, Instructors, Kids Program, etc.)
- **Resend**: Required for all form submissions and email confirmations
- **Vercel**: Required for hosting, deployment, Edge Functions, Blob storage
- **Cloudinary**: Required for video optimization (hero background video)
- **Google Maps API**: Required for Contact page map and directions
- **Google Business API**: Required for Reviews widget

**Optional Dependencies** (Can Be Added Post-Launch):
- **Twilio**: SMS integration (Phase 2 or later)
- **Stripe**: Payment processing (future phase)
- **Microsoft Clarity**: Heatmaps and session recordings (Phase 2 if needed)

---

### Repository & Project Structure

**GitHub Repository**: To be created  
**Project Management**: To be determined (Linear, GitHub Projects, or Notion)

**Branch Strategy**:
- `main`: Production branch (auto-deploys to production)
- `staging`: Staging branch (auto-deploys to staging.academy.com)
- `feature/*`: Feature branches (deploy to preview URLs)

**Commit Convention**: Conventional Commits  
Example: `feat(hero): add parallax scrolling to hero section`

**Code Review**: Required for all PRs to `main` and `staging`

**CI/CD Pipeline**:
- On PR: Lighthouse CI runs automated checks
- On merge to `staging`: Auto-deploy to staging environment
- On merge to `main`: Auto-deploy to production

---

## Document Maintenance

**Version**: 1.0  
**Date**: January 25, 2026  
**Status**: Ready for Development  
**Last Updated By**: AI Assistant (synthesized from 6 reference documents)

**Sources**:
- `project-planning.md` (1,335 lines)
- `feature-priorities-quick-ref.md` (325 lines)
- `README.md` (355 lines)
- `CHANGELOG.md` (504 lines)
- `competitive-advantage-analysis.md` (306 lines)
- `planning-critique-v2-enhancements.md` (798 lines)

**Total Reference Documentation**: 3,623 lines synthesized into this PRD

---

## Summary & Next Steps

This PRD defines a world-class, conversion-optimized website for a San Diego BJJ academy with:

- **$11,000-19,000 investment** (includes 2 local SEO pages)
- **9 pages total** (7 core + 2 local SEO)
- **Target conversion rate: 8-12%** (vs. industry 0.2-0.5%)
- **Projected ROI: 300-500% in first year**

**Key Differentiators**:
1. Cinematic video background (first in San Diego BJJ)
2. System-aware dark mode
3. Dedicated Kids Program page (high conversion)
4. Exit-intent lead capture (10-15% additional conversions)
5. Local SEO pages for Escondido & North County (launch day)
6. Wall of Champions (community credibility)
7. Sub-2-second load times (fastest in market)
8. Privacy-focused analytics (Umami)

**Immediate Next Steps**:
1. **Review & approve this PRD** with stakeholders
2. **Finalize budget** ($11K-19K) and project timeline
3. **Schedule video/photo shoot** for hero content and kids program
4. **Begin content gathering**:
   - Academy story, instructor bios, FAQs, kids program content
   - **Local content research**: Escondido and North County specific details
   - Testimonials from students in Escondido/North County areas (if available)
5. **Set up development environment** (GitHub repo, Vercel, Sanity)
6. **Kick off Phase 1** (Foundation & Core Setup)

---

**This PRD is ready for development. Let's build the best BJJ website in San Diego. 🥋**

# Feature Priorities - Quick Reference

## Launch Day Features (Phases 1-4, Weeks 1-7)

### 🎬 Cinematic Landing Experience (PRIORITY #1)
- ✅ Full-screen video background (20-30s loop, optimized)
- ✅ Parallax scrolling (multi-layer depth)
- ✅ Interactive 3D elements (belt visualizer or rotating logo)
- ✅ Micro-interactions (button hovers, scroll reveals, Lottie animations)
- ✅ Bold typography with kinetic effects

### 🎯 Conversion Optimization (PRIORITY #2)
- ✅ Exit-intent modal (lead capture, "show once" logic)
- ✅ Google Reviews integration (homepage widget with ratings)
- ✅ One-tap mobile actions (call, map, email) - **CRITICAL**
- ✅ Minimal friction forms (name + email max)
- ✅ Clear CTAs throughout (red accent color)

### 👥 Community Features (PRIORITY #3)
- ✅ Student Dashboard (login, progress tracking, class counter)
- ✅ Wall of Champions (competition results, belt promotions)
- ✅ Academy announcements feed
- ✅ Personal goals tracking

### 📄 Core Pages (PRIORITY #4)
- ✅ Landing/Home (with cinematic hero + kids program highlight)
- ✅ Classes (filterable, with CTA)
- ✅ Kids Program (dedicated page - HIGH CONVERSION)
- ✅ Schedule (interactive calendar with age filters)
- ✅ Instructors (profiles, credentials, kids program director)
- ✅ Why Choose Us (differentiation, social proof, values)
- ✅ Contact (one-tap actions, form, map, FAQ)

### 🚀 Performance & SEO (PRIORITY #5)
- ✅ Core Web Vitals: LCP <1.8s, FID <50ms, CLS <0.05
- ✅ Schema.org markup (LocalBusiness, Review)
- ✅ Beginner's guide content (SEO-optimized)
- ✅ Mobile-first responsive design
- ✅ AVIF/WebP image optimization
- ✅ Lazy loading for videos/images
- ✅ System-aware dark mode (auto-detects OS preference)
- ✅ Optional manual theme toggle

### 📊 Analytics (PRIORITY #6)
- ✅ Umami (web analytics)
- ✅ Microsoft Clarity (heatmaps, session recordings)
- ✅ Custom event tracking (video plays, CTA clicks, form submissions)

---

## 🥋 Kids Program - Special Emphasis (Launch Day)

**Why This Matters**:
- Parents convert at 2-3x higher rate than general visitors
- Average family lifetime value: 3-5 years
- Often leads to parent enrollment too
- Strong word-of-mouth marketing
- Less seasonal fluctuation than adult programs

### Kids Program Page Components (CRITICAL):
1. **Hero Section**
   - "Building Confident, Disciplined Kids Through BJJ"
   - Hero image: kids training and smiling
   - Free trial CTA
   - Age group badges (4-7, 8-12, 13-15)

2. **Program Benefits** (Parent-Focused)
   - Confidence building
   - Bully prevention
   - Physical fitness (screen time alternative)
   - Discipline & focus
   - Social skills & friendship
   - Life skills (goal-setting, perseverance)

3. **Age-Specific Programs**
   - Little Champions (4-7) - 30min classes
   - Kids BJJ (8-12) - 45min structured
   - Teens (13-15) - 60min advanced

4. **Safety & Supervision**
   - Dedicated instructor + assistant
   - Safe training protocols
   - Parent viewing area
   - CPR/First Aid certified

5. **Parent Testimonials**
   - Video testimonials (3-5)
   - Written testimonials (5-10)
   - Before/after stories

6. **Kids-Specific FAQs**
   - "Is BJJ safe for kids?"
   - "What should my child wear?"
   - "Will my child get hurt?"
   - "What if my child is shy?"
   - Family discounts?

7. **SEO Optimization**
   - "kids BJJ San Diego"
   - "children's martial arts San Diego"
   - "youth BJJ classes"
   - "bully prevention program"
   - Course schema for age groups

### Content Needed (Kids Program):
- 800-1000 words main content
- 600 words age-specific descriptions
- 10-15 FAQs for parents
- 5-10 parent testimonials
- 3-5 success stories
- Downloadable "Parents' Guide to Kids BJJ" PDF
- 20-30 professional photos of kids training
- Video: Kids class in action (20-30s)
- Video: Parent testimonials (3-5 clips)

### Homepage Integration:
- Prominent kids program section on homepage
- Equal visual weight with adult program
- Separate CTAs for kids trial classes
- Kids photos featured prominently

---

## Phase 2 Features (Weeks 9-10)

### 📍 Local SEO Neighborhood Landing Pages (PRIORITY)
- ✅ Pacific Beach BJJ (`/pacific-beach-bjj`)
- ✅ La Jolla Brazilian Jiu-Jitsu (`/la-jolla-bjj`)
- ✅ Downtown San Diego BJJ (`/downtown-san-diego-bjj`)
- ✅ North County BJJ Classes (`/north-county-bjj`)
- ✅ Mission Valley / Hillcrest BJJ (`/mission-valley-hillcrest-bjj`)

**Each page includes:**
- 500-800 words unique, location-specific content
- Neighborhood-specific photos and landmarks
- Local testimonials from students in that area
- Driving directions from the neighborhood
- Schema markup with geo-targeting
- Unique meta descriptions and keywords
- Links from main site and Google Business

### 🧠 Smart Intake Quiz
- Questions about experience, goals, concerns, schedule
- Algorithm matches to ideal class/instructor
- Personalized landing experience
- Direct booking from results

---

## Optional Features (Evaluate Budget/Performance)

### 🎥 Video Testimonials
- IF hero video shows high engagement
- 15-30 second clips from students
- Embedded throughout site
- Autoplay (muted) on scroll

### 📱 SMS Integration
- IF email engagement is low (<20% open rate)
- Class reminders
- Trial booking confirmations
- "Text JOIN to..." campaigns
- Requires Twilio (~$50-100/month)

---

## Nice to Have (Month 3+)

### 📸 Social Wall
- Live Instagram feed
- Student-generated content
- Shows vibrant community
- Requires active social media presence

### 📝 Blog/Resources
- Ongoing content marketing
- Technique tips
- Academy news
- Local event coverage

---

## Postponed Features (Year 2+)

### ❌ NOT in Initial Launch
- AI Chatbot (expensive, complex)
- Intelligent class matching (covered by Phase 2 quiz)
- Member technique library (content-intensive)
- Referral program (need established member base first)
- Progressive Web App (when mobile usage justifies)
- YouTube integration (requires content strategy)
- Podcast (requires ongoing production)

---

## Tech Stack Summary

### Core
- Next.js 15 + TypeScript
- TailwindCSS + shadcn/ui + RemixUI
- Sanity CMS
- Vercel hosting

### Animation & Interaction
- Framer Motion (page animations)
- Three.js / React Three Fiber (3D elements)
- Lottie (micro-animations)

### Media
- Vercel Blob (storage)
- Cloudinary (video optimization)

### Communication
- Resend (email)
- Twilio (SMS - optional)

### Analytics
- Umami
- Microsoft Clarity

### Integrations
- Google Maps API
- Google Business API (reviews)

---

## Key Performance Targets

| Metric | Target | Industry Avg | Multiplier |
|--------|--------|--------------|------------|
| Visitor-to-Lead | 8-12% | 2-5% | 2-3x |
| Lead-to-Trial | 15-20% | 10-15% | 1.5x |
| Trial-to-Member | 50%+ | 30-40% | 1.5x |
| Page Load Time | <1.8s | 3-5s | 2-3x faster |
| Mobile Traffic | 60-70% | 50-60% | Higher quality |
| Lighthouse Score | 98+ | 80-90 | World-class |

---

## Budget Quick Reference

### Initial Investment: $10K-18K
- Development: $8K-12K (80-100 hours)
- Assets: $2K-6K (video, photos, content)

### Monthly Operating: $40-400
- Hosting: $20 (Vercel Pro)
- Email: $0-20 (Resend)
- Video: $0-99 (Cloudinary)
- CMS: $0-99 (Sanity)
- SMS: $0-100 (Twilio, optional)
- Analytics: Free (Umami + Clarity)

### ROI Projection
- Monthly Revenue Impact: $3K-6K
- Payback Period: 2-3 months
- 12-Month ROI: 300-500%

---

## Critical Path Items

### Pre-Development (Week 0)
1. Budget approval
2. Video/photo shoot scheduling
3. Content gathering started
4. Logo/brand assets collected

### Week 1
1. Project setup
2. Tech stack initialization
3. System-aware theming (light/dark mode)
4. Sanity schema design
5. Component library foundation

### Week 2-3 (HIGHEST PRIORITY)
1. Cinematic hero development
2. Video optimization
3. Parallax implementation
4. 3D elements integration

### Week 4
1. Core pages (Classes, Schedule, Instructors, Why Choose Us, Contact)
2. Navigation with theme toggle
3. One-tap actions
4. Exit-intent modal

### Week 5
1. Student dashboard
2. Wall of Champions
3. Google Reviews integration

### Week 6
1. SEO optimization
2. Performance tuning
3. Analytics setup

### Week 7
1. Content population
2. Testing
3. Bug fixes

### Week 8
1. Launch preparation
2. Domain setup
3. Final optimizations
4. **GO LIVE**

---

## Questions to Answer

- [ ] Professional video shoot or DIY?
- [ ] When will written content be ready?
- [ ] Logo finalized?
- [ ] Domain name decided?
- [ ] Hard launch deadline or flexible?
- [ ] Who handles post-launch content updates?
- [ ] Budget flexibility for optional features?

---

**Last Updated**: January 24, 2026  
**Version**: 2.0 (Prioritized for world-class execution)

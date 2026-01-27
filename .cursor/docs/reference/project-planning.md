# San Diego BJJ Academy Website - Project Planning Document

## Project Overview

### Mission Statement
Create a high-performance, conversion-optimized website for a San Diego Brazilian Jiu-Jitsu academy that attracts new students while serving existing community needs through exceptional user experience and local SEO optimization.

### Target Audience
- **Primary A**: Adults (25-45) interested in starting BJJ training
- **Primary B**: Parents (30-45) seeking youth martial arts programs for their children (ages 4-15)
- **Secondary**: Experienced practitioners looking for a new academy
- **Tertiary**: Teens (13-17) interested in martial arts
- **Geographic**: San Diego metropolitan area (all neighborhoods)

**Why Kids Program is Critical**:
- Parents searching for kids programs convert at 2-3x higher rates
- Average family stays 3-5 years (high lifetime value)
- Often leads to parent enrollment ("I want to train too!")
- Strong word-of-mouth marketing (parents talk to other parents)
- Sibling enrollments common (family discounts drive revenue)
- Year-round consistency (kids programs less affected by seasonality)

### Business Objectives
1. **Lead Generation**: Convert 8-12% of visitors into leads (trial class interest)
2. **Trial Conversion**: Convert 15-20% of leads into actual trial class attendance
3. **Member Acquisition**: Convert 50%+ of trial attendees into paying members
4. **Local Market Dominance**: Rank #1 for "BJJ San Diego" and 20+ related terms
5. **Community Building**: Showcase academy culture, retain members via dashboard
6. **Revenue Growth**: 50-100% increase in new member acquisition
7. **Brand Authority**: Position as the premier, most professional BJJ academy in San Diego

### Competitive Differentiators (Why This Will Be World-Class)
1. **Cinematic Experience**: First BJJ site with video background and 3D interactions
2. **Performance**: Fastest-loading BJJ website in San Diego (<2s)
3. **Mobile Excellence**: One-tap actions, optimized for local search
4. **Exit-Intent Capture**: Recover 10-15% of abandoning visitors
5. **Student Dashboard**: Build community and retention from day one
6. **Dedicated Kids Program Page**: Comprehensive youth program showcase (most competitors bury this)
7. **Data-Driven**: Advanced analytics to optimize continuously
8. **Content Authority**: Launch with comprehensive beginner resources
9. **Google Reviews**: Prominent social proof on homepage
10. **Wall of Champions**: Showcase success stories and credibility
11. **Parent-Focused Content**: Address concerns, build trust with families

## Technical Architecture

### Core Technology Stack
- **Framework**: Next.js 15 (App Router with TypeScript)
- **Styling**: TailwindCSS + shadcn/ui + RemixUI
- **Animation**: Framer Motion + Lottie (cinematic effects)
- **3D Graphics**: Three.js or React Three Fiber (hero interactions)
- **CMS**: Sanity.io (headless)
- **Media Storage**: Vercel Blob + Cloudinary (video optimization)
- **Email**: Resend (contact forms, newsletters, exit-intent capture)
- **Analytics**: Umami (privacy-focused) + Microsoft Clarity (heatmaps/session recordings)
- **Hosting**: Vercel (with Edge Functions)
- **Database**: Sanity (content) + Vercel KV (sessions/cache)

### Performance Requirements (Aggressive Targets)
- **Core Web Vitals**: 
  - LCP < 1.8s (faster than industry standard)
  - FID < 50ms
  - CLS < 0.05
- **Lighthouse Score**: 98+ (Performance, SEO, Accessibility)
- **Mobile-First**: < 800KB initial bundle size
- **Image Optimization**: AVIF with WebP fallback, responsive sizing
- **Video Optimization**: Lazy-loaded, preloaded hero video

### SEO Architecture
- **Local SEO**: Schema.org markup for LocalBusiness
- **Technical SEO**: Sitemap, robots.txt, structured data
- **Performance SEO**: Edge caching, image optimization
- **Content SEO**: Optimized page titles, meta descriptions, H1-H6 structure

## Design System

### Color Palette & Theming

#### Light Mode (Default)
```css
:root {
  --primary: #787878;      /* Primary gray */
  --white: #FFFFFF;        /* Pure white */
  --secondary: #797979;    /* Secondary gray */
  --light-gray: #D4D4D4;   /* Light gray */
  --accent: #782626;       /* Deep red accent */
  --black: #000000;        /* True black for contrast */
  
  --background: #FFFFFF;
  --foreground: #000000;
  --card: #FFFFFF;
  --card-foreground: #000000;
}
```

#### Dark Mode (System-Aware)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary: #9A9A9A;      /* Lighter gray for dark mode */
    --white: #0A0A0A;        /* Near black */
    --secondary: #8A8A8A;    /* Lighter secondary */
    --light-gray: #404040;   /* Darker light-gray */
    --accent: #A83232;       /* Brighter red for dark mode */
    --black: #FFFFFF;        /* White for text on dark */
    
    --background: #0A0A0A;
    --foreground: #FFFFFF;
    --card: #1A1A1A;
    --card-foreground: #FFFFFF;
  }
}
```

#### Theme Implementation
- **System-Aware**: Automatically detects user's OS preference
- **Manual Toggle**: Optional user override (stored in localStorage)
- **Smooth Transition**: CSS transitions between theme switches
- **Video Handling**: Adjust video overlay opacity for dark mode
- **Accessibility**: Maintain WCAG contrast ratios in both modes
- **Persistence**: Remember user's manual preference across sessions

### Typography System
- **Headings**: Bold, sans-serif (Inter/System fonts)
- **Body**: Clean, readable (16px base, 1.5 line height)
- **Hierarchy**: H1 (48px+), H2 (36px), H3 (28px), H4 (20px)

### Visual Design Principles
1. **Cinematic Experience**: Full-screen video, parallax effects, smooth animations
2. **Minimalism**: Clean layouts with generous whitespace
3. **Athletic Aesthetic**: Strong, bold imagery showcasing technique
4. **Conversion Focus**: Clear CTAs with red accent color, exit-intent capture
5. **Professional Authority**: Build trust through design choices
6. **Mobile-First**: Touch-friendly interfaces, readable text, one-tap actions
7. **Micro-interactions**: Purposeful animations that enhance UX

### Animation & Motion Design Strategy
- **Framer Motion**: Page transitions, scroll-triggered animations
- **Parallax Effects**: Layered depth on hero section and key pages
- **Hover States**: Subtle transformations on interactive elements
- **Lottie Animations**: Loading states, success confirmations, decorative elements
- **3D Elements**: Interactive belt rank visualizer or logo treatment
- **Scroll Reveals**: Elements fade/slide in as user scrolls
- **Video Integration**: Autoplay (muted) background video on hero

### Component Library (shadcn/ui + Custom)
- Navigation (sticky header with CTA, smooth scroll, theme toggle)
- Theme toggle component (sun/moon icon, system-aware)
- Cinematic hero with video background and parallax
- Exit-intent modal with lead capture
- Class cards with scheduling integration
- Instructor profiles with modal details
- Contact forms with validation and micro-interactions
- Image galleries with lightbox
- Google Reviews integration widget
- Wall of Champions showcase
- Student dashboard components
- Pricing tables with comparison
- Schedule components with filtering
- One-tap action buttons (call, map, text)
- Neighborhood page template (reusable for local SEO pages)

## Content Strategy & Site Structure

### Page Architecture

#### 1. Landing/Home Page

##### Cinematic Hero Section
**Full-Screen Video Background**
- High-quality training footage (slow-motion technique, sparring intensity)
- Optimized for performance (compressed, lazy-loaded)
- Fallback to static image for slower connections
- Muted autoplay with optional sound toggle

**Parallax Scrolling Effects**
- Multi-layer depth (video background, text overlay, foreground elements)
- Smooth scroll-triggered movements
- Creates sense of immersion and dimensionality

**Interactive 3D Elements**
- 3D belt rank progression visualizer (or rotating academy logo)
- WebGL-powered smooth interactions
- Responds to mouse movement/device tilt
- Subtle, not distracting

**Bold Typography Treatment**
- Oversized "BRAZILIAN JIU-JITSU" headline (reference design)
- Kinetic typography effects on scroll
- High contrast white text on dark background
- Mobile-optimized sizing

**Micro-interactions**
- CTA button hover effects (scale, glow, color shift)
- Scroll indicator with animation
- Smooth page transitions
- Loading animations

**Primary CTA**: "START YOUR JOURNEY" (red accent, prominent)
**One-Tap Actions**: Call, Text, Map buttons for mobile

##### Core Content Sections
- **Value Proposition**: Why choose BJJ + this academy (scroll-reveal animations)
- **Kids Program Highlight**: Prominent section showcasing youth programs
  - Hero image of kids training/smiling
  - "Building Confident Kids" headline
  - Quick overview of age groups (4-7, 8-12, 13-15)
  - Free trial CTA specifically for kids program
  - Link to dedicated Kids page
  - Parent testimonials
- **Google Reviews Integration**: 5-star rating display with recent reviews (include parent reviews)
- **Wall of Champions**: Competition results, belt promotions, achievements (kids AND adults)
- **Class Preview**: Featured programs with quick enrollment (Adult + Kids side-by-side)
- **Instructor Spotlight**: Build authority and trust (include kids program director)
- **Student Dashboard Preview**: "For Members" section teaser
- **Location & Contact**: Easy access with one-tap mobile actions

##### Exit-Intent Technology
- Triggered when user attempts to leave page
- Lightbox modal with compelling offer
- "Wait! Your First Class is FREE" headline
- Minimal form (Name + Email only)
- 10-15% additional conversion capture

#### 2. Classes Page
- **Program Overview**: All available programs
- **Age Groups**: Kids, Teens, Adults, Seniors (link to dedicated Kids page)
- **Skill Levels**: Beginner, Intermediate, Advanced
- **Specialty Programs**: Women's classes, competition team
- **Class Descriptions**: What to expect, benefits
- **Pricing**: Transparent membership options
- **Trial Class CTA**: Easy signup process

#### 3. Kids Program Page (Dedicated)
**Purpose**: Convert parents searching for youth martial arts programs

**Target Audience**: 
- Parents of children ages 4-15
- High-intent searchers ("kids BJJ San Diego", "children's martial arts")
- Often first point of contact for families

**Hero Section**:
- Headline: "Building Confident, Disciplined, and Resilient Kids Through Brazilian Jiu-Jitsu"
- Hero image: Kids training together, smiling, having fun
- Primary CTA: "Book a FREE Kids Trial Class"
- Age-specific program badges (Little Champions 4-7, Kids 8-12, Teens 13-15)

**Program Benefits** (Parent-Focused):
1. **Confidence Building**: Overcoming challenges on the mat translates to confidence in school and life
2. **Bully Prevention**: Practical self-defense skills and the confidence to handle difficult situations
3. **Physical Fitness**: Fun alternative to screen time, develops coordination and strength
4. **Discipline & Focus**: Structured environment teaches respect, listening, and concentration
5. **Social Skills**: Teamwork, making friends, supportive community
6. **Life Skills**: Goal-setting (belt progression), perseverance, problem-solving

**Age-Specific Programs**:

**Little Champions (Ages 4-7)**
- 30-minute classes designed for short attention spans
- Focus on fundamentals: basic positions, movements, coordination
- Games and activities that build motor skills
- Introduction to martial arts etiquette and respect
- Parent viewing area
- Schedule: Mon/Wed/Fri 4:00pm

**Kids BJJ (Ages 8-12)**
- 45-minute structured classes
- Technique-focused curriculum with belt progression
- Light sparring appropriate for age
- Anti-bullying and self-defense components
- Character development emphasis
- Competition team optional
- Schedule: Mon/Wed/Fri 5:00pm, Sat 10:00am

**Teens Program (Ages 13-15)**
- 60-minute classes (can train with adults if skill appropriate)
- Full BJJ curriculum with advanced techniques
- Competition preparation available
- Mentorship from adult students and instructors
- Bridge to adult program
- Schedule: Tue/Thu 6:00pm, Sat 11:00am

**Safety & Supervision**:
- All kids classes have dedicated instructor + assistant
- Age-appropriate skill progressions
- Safe training environment with padded mats
- Strict supervision and safety protocols
- CPR/First Aid certified instructors
- Parent viewing area always available

**What Parents Say** (Testimonials):
- Video testimonials from parents
- Before/after stories (shy kid → confident)
- Academic improvement stories
- Bully situation resolutions
- Direct quotes with photos

**FAQs for Parents**:
- "Is BJJ safe for kids?" (Yes, one of the safest martial arts)
- "What should my child wear?" (Comfortable athletic clothes, we provide loaner gis)
- "Will my child get hurt?" (Safety protocols, appropriate techniques)
- "How long until they see results?" (Confidence within weeks, skills develop over months)
- "What if my child is shy/nervous?" (We specialize in beginners, supportive environment)
- "Do you have programs for kids with special needs?" (Individualized attention available)
- "What's the cost?" (Transparent pricing, family discounts)

**Trial Class Process**:
1. Book free trial (simple form: parent name, child name, age)
2. Come 10 minutes early for brief orientation
3. Watch or participate in warm-up games
4. Learn 2-3 basic techniques
5. Brief parent meeting after class
6. No pressure, no obligation

**Instructor Spotlight**:
- Kids program director profile and credentials
- Teaching philosophy for youth
- Own children training (if applicable)
- Years of experience with kids

**Visual Gallery**:
- Kids training photos (with parent permission)
- Belt promotion ceremonies
- Kids smiling and having fun
- Birthday parties (if offered)
- Competition team photos (optional program)

**Pricing & Enrollment**:
- Kids-specific pricing (often different from adults)
- Family discount (siblings train together)
- Uniform/gi included or available
- No long-term contracts
- Month-to-month flexibility

**CTAs Throughout**:
- "Book Free Trial" (primary)
- "Download Kids Program Info PDF"
- "Call/Text to Speak with Instructor"
- "Watch a Kids Class" (schedule a visit)

**SEO Optimization**:
- **Primary Keywords**:
  - "kids BJJ San Diego"
  - "children's Brazilian Jiu-Jitsu San Diego"
  - "youth martial arts San Diego"
  - "kids self-defense classes San Diego"
  - "after school martial arts program"
  - "bully prevention San Diego"
  
- **Schema Markup**: 
  - LocalBusiness with kids program emphasis
  - Course schema for each age group
  - Review schema with parent testimonials
  
- **Content Strategy**:
  - Blog articles: "Benefits of BJJ for Kids", "Is My Child Ready for Martial Arts?"
  - Video content: Kids class highlights, parent testimonials
  - Downloadable parent guide

**Design Considerations**:
- Bright, energetic colors (while maintaining brand)
- More photos of kids than text
- Simple language (parent-readable in 2-3 minutes)
- Mobile-optimized (parents browse on phones)
- Video autoplay (muted) showing kids class in action
- Trust signals (safety certifications, instructor credentials)

#### 4. Schedule Page
- **Interactive Calendar**: Real-time class schedules
- **Filter Options**: By instructor, level, class type, age group
- **Highlight Kids Classes**: Separate section or color-coded
- **Mobile-Optimized**: Easy viewing on phones
- **Integration**: Direct booking/reservation system
- **Instructor Info**: Quick access to teacher profiles

#### 5. Instructors Page
- **Head Instructor Profile**: Academy founder/leader
- **Kids Program Director**: Dedicated section highlighting youth instructor credentials
- **Teaching Staff**: Individual instructor pages
- **Credentials**: Belt ranks, competition history, youth teaching experience
- **Teaching Philosophy**: Personal approach to BJJ (adults) and kids
- **Student Testimonials**: Specific to each instructor (include parent testimonials)

#### 6. Why Choose Us Page
**Purpose**: Differentiation and conversion page highlighting unique value propositions

**Content Sections**:
- **Hero Section**: Bold statement of academy philosophy
- **Our Difference**: 5-7 key differentiators with icons/visuals
  - Lineage and credentials (Carlson Gracie heritage)
  - Instructor experience and competition success
  - Clean, professional facility
  - Community culture and values
  - Proven track record (student success stories)
  - Beginner-friendly approach
  - Flexible schedule options
  
- **Comparison Section** (Tactful):
  - "What Makes a Great BJJ Academy" checklist
  - Highlight academy strengths without naming competitors
  - Address common concerns beginners have
  
- **Social Proof**:
  - Google Reviews showcase (5-star testimonials)
  - Student transformation stories
  - Competition team achievements
  - Retention statistics ("Average student trains with us for 3+ years")
  
- **Academy Values**:
  - Mission statement
  - Teaching philosophy
  - Community culture
  - Commitment to student growth
  
- **Trial Class CTA**: 
  - "Experience the Difference"
  - Free trial class offer
  - No pressure, just come see

**SEO Optimization**:
- Target keywords: "best BJJ gym San Diego", "top Brazilian Jiu-Jitsu academy"
- Structured data for Organization
- Rich content for link-building
- FAQ schema for common "why choose" questions

#### 7. Contact Page
- **One-Tap Mobile Actions** (PRIORITY):
  - Click-to-call phone number (tel: link)
  - Click-to-text SMS (sms: link) - OPTIONAL feature
  - Click-to-navigate (maps: link)
  - Click-to-email (mailto: link)
  - Large, touch-friendly buttons
- **Multiple Contact Methods**: Phone, email, form
- **Academy Location**: Interactive map integration with directions
- **Hours of Operation**: Clear scheduling information
- **FAQ Section**: Common questions answered
- **Trial Class Booking**: Prominent signup form with exit-intent backup

#### 8. Local SEO Landing Pages (Phase 2 Priority)
**Purpose**: Rank for neighborhood-specific searches and capture hyper-local traffic

##### Page Structure (Template for Each Location)
Each neighborhood page follows consistent structure but with unique content:

**a) Pacific Beach BJJ** (`/pacific-beach-bjj`)
- **Hero**: "Brazilian Jiu-Jitsu Classes in Pacific Beach"
- **Local Context**: 
  - "Located in the heart of Pacific Beach, just minutes from [local landmarks]"
  - Driving/parking directions from PB
  - Transit options (bus lines serving PB)
- **Community Connection**:
  - "Serving the Pacific Beach community since [year]"
  - Local partnerships (surf shops, cafes)
  - Students from PB neighborhoods
- **Schedule Highlights**: Classes convenient for PB residents
- **Local Testimonials**: Reviews from PB students
- **Local SEO**: Schema with geo-coordinates, neighborhood references
- **Call to Action**: Trial class with PB-specific offer

**b) La Jolla Brazilian Jiu-Jitsu** (`/la-jolla-bjj`)
- Emphasis on professional community (UCSD, biotech)
- Upscale positioning to match La Jolla demographic
- Convenient to UTC/La Jolla Village
- Parking and facility amenities highlighted

**c) Downtown San Diego BJJ** (`/downtown-san-diego-bjj`)
- Target working professionals
- Lunchtime and evening class focus
- Metro accessibility
- Quick training sessions for busy schedules

**d) North County BJJ Classes** (`/north-county-bjj`)
- Serving Carmel Valley, Del Mar, Encinitas, Carlsbad
- Family-friendly emphasis
- Weekend class availability
- Youth program highlights

**e) Mission Valley / Hillcrest BJJ** (`/mission-valley-hillcrest-bjj`)
- Central San Diego location
- Easy freeway access (I-5, I-8, 163)
- Serving multiple neighborhoods
- Diverse community focus

##### Implementation Strategy
- **Phase 2 Feature** (Weeks 9-10): Create 3-5 neighborhood pages
- **Unique Content**: Each page has 500-800 words of unique, location-specific content
- **Internal Linking**: Link from main site with "Serving [Neighborhood]" sections
- **Google Business Posts**: Highlight each page when created
- **Local Backlinks**: Reach out to neighborhood blogs, business associations
- **Geo-Targeting**: Implement hreflang and geo meta tags
- **Schema Markup**: LocalBusiness with specific service area definitions

##### Content Requirements Per Page
- 1-2 photos featuring local landmarks or PB-specific content
- Unique headline and meta description
- Neighborhood-specific keywords (naturally integrated)
- Driving directions from that neighborhood
- 2-3 testimonials from students in that area
- Local class schedule emphasis
- Unique CTA reflecting neighborhood culture

### SEO Content Strategy

#### Local SEO Focus

**Adult Program Keywords**: 
  - "San Diego BJJ"
  - "Brazilian Jiu-Jitsu San Diego"
  - "BJJ classes San Diego"
  - "Martial arts San Diego"
  - "BJJ near me" (location-aware)
  - "[Neighborhood] Brazilian Jiu-Jitsu"

**Kids Program Keywords** (HIGH PRIORITY):
  - "kids BJJ San Diego"
  - "children's Brazilian Jiu-Jitsu San Diego"
  - "youth martial arts San Diego"
  - "kids self-defense classes San Diego"
  - "martial arts for kids San Diego"
  - "after school martial arts San Diego"
  - "bully prevention San Diego"
  - "kids BJJ [Neighborhood]"
  - "best kids martial arts San Diego"
  - "Brazilian Jiu-Jitsu for children"
  
  **Why Kids Keywords Matter**:
  - Parents searching for kids programs have 2-3x higher intent
  - Less competition than adult BJJ keywords
  - Higher lifetime value (kids train for years)
  - Family enrollment opportunities
  - Strong word-of-mouth potential
  
- **Google Business Profile Optimization**:
  - Integrated Google Reviews display on homepage
  - Dynamic review feed (latest 5-star reviews)
  - Aggregate rating prominent (Schema markup)
  - Link to leave review (for students)
  - Weekly Google Business posts
  
- **Neighborhood-Specific Landing Pages** (Phase 2):
  - Pacific Beach BJJ
  - La Jolla Brazilian Jiu-Jitsu
  - Downtown San Diego BJJ
  - North County BJJ classes
  - Each with unique content, local references

#### Content Marketing (Launch Day Focus)

**Essential Guide Content** (Launch Day):
  - "Complete Beginner's Guide to BJJ in San Diego"
  - "What to Expect in Your First BJJ Class"
  - "BJJ Frequently Asked Questions"
  - "Why Choose [Academy Name]"
  - **"Parents' Guide to Kids BJJ"** (dedicated resource)
  - **"Is BJJ Safe for Kids?"** (address #1 parent concern)
  - **"Benefits of BJJ for Children"** (SEO + parent education)
  
**Kids Program Content** (Priority):
  - Downloadable PDF: "Parents' Guide to Kids Brazilian Jiu-Jitsu"
  - Video: "A Day in Our Kids BJJ Class"
  - Article: "How BJJ Helps with Bullying"
  - Article: "Building Confidence Through Martial Arts"
  - FAQ specifically for parents
  - Age-appropriate curriculum overview
  
**Blog/Resources** (Phase 3):
  - Academy news and events
  - Student success stories (adults AND kids)
  - Kids program highlights and achievements
  - Parent testimonials and stories
  - Local community involvement
  - Technique tips (basic level)

## User Experience (UX) Strategy

### Conversion Optimization
1. **Clear Value Proposition**: Immediate understanding of benefits
2. **Reduced Friction**: Minimal form fields, easy navigation
3. **Social Proof**: Testimonials, reviews, success stories
4. **Urgency/Scarcity**: Limited trial slots, special offers
5. **Mobile Experience**: Touch-friendly, fast loading

### User Journey Mapping
1. **Awareness**: SEO traffic, referrals, social media
2. **Interest**: Hero section, value proposition, class overview
3. **Consideration**: Instructor profiles, testimonials, pricing
4. **Action**: Trial class signup, contact form submission
5. **Retention**: Email follow-up, member portal (future)

### Accessibility Standards
- **WCAG 2.1 AA Compliance**: Color contrast, keyboard navigation
- **Screen Reader Support**: Proper semantic HTML
- **Mobile Accessibility**: Touch targets, readable text
- **Performance**: Fast loading for all devices

## Technical Implementation Plan

### Phase 1: Foundation & Core Setup (Week 1)
**Tech Stack Initialization**
- [ ] Next.js 15 project setup with TypeScript
- [ ] TailwindCSS configuration with custom color scheme
- [ ] shadcn/ui installation and theming
- [ ] Framer Motion setup for animations
- [ ] Three.js/React Three Fiber setup for 3D elements
- [ ] Sanity CMS setup and schema design
- [ ] Vercel deployment pipeline (staging + production)
- [ ] Environment variables and secrets management

**Design System Foundation**
- [ ] Color palette implementation (light + dark modes)
- [ ] System-aware theme detection
  - [ ] CSS custom properties for both themes
  - [ ] `prefers-color-scheme` media query
  - [ ] Manual theme toggle component (optional)
  - [ ] localStorage persistence for user preference
  - [ ] Smooth transitions between themes
  - [ ] Dark mode video overlay adjustments
- [ ] Typography system setup
- [ ] Core component library structure
- [ ] Animation utilities and presets
- [ ] Responsive breakpoint system

### Phase 2: Cinematic Landing Experience (Weeks 2-3)
**Hero Section - Full Implementation**
- [ ] Full-screen video background component
  - [ ] Video optimization and compression
  - [ ] Autoplay (muted) functionality
  - [ ] Fallback image for slow connections
  - [ ] Mobile-optimized video variant
- [ ] Parallax scrolling implementation
  - [ ] Multi-layer depth system
  - [ ] Smooth scroll-triggered movements
  - [ ] Performance optimization
- [ ] Interactive 3D elements
  - [ ] 3D belt rank visualizer OR rotating logo
  - [ ] Mouse/device tilt interactions
  - [ ] WebGL performance optimization
- [ ] Micro-interactions throughout
  - [ ] Button hover states and animations
  - [ ] Scroll indicator
  - [ ] Loading animations (Lottie)
  - [ ] Form field focus states
- [ ] Bold typography treatment
  - [ ] Kinetic typography effects
  - [ ] Responsive sizing
  - [ ] Text reveal animations

**Core Landing Page Sections**
- [ ] Value proposition section with scroll-reveals
- [ ] Google Reviews integration widget
- [ ] Wall of Champions showcase section
- [ ] Featured classes preview
- [ ] Instructor spotlight section
- [ ] Location/contact section with one-tap actions

**Exit-Intent System**
- [ ] Exit-intent detection logic
- [ ] Modal component with animation
- [ ] Lead capture form (name + email)
- [ ] Resend email integration
- [ ] Cookie-based "shown once" logic

### Phase 3: Core Pages & Navigation (Week 4)
**Global Components**
- [ ] Sticky header navigation with CTA
- [ ] Footer with all essential links
- [ ] Mobile menu with smooth animations
- [ ] One-tap action buttons (mobile)
  - [ ] Click-to-call
  - [ ] Click-to-navigate (maps)
  - [ ] Click-to-email

**Classes Page**
- [ ] Program overview section
- [ ] Filterable class cards (age, level, type)
- [ ] Class descriptions with CTAs
- [ ] Pricing information
- [ ] Trial class signup integration

**Schedule Page**
- [ ] Interactive calendar component
- [ ] Filter by instructor, level, class type
- [ ] Mobile-optimized view
- [ ] Quick-add to personal calendar
- [ ] Integration with booking system

**Instructors Page**
- [ ] Instructor card grid
- [ ] Individual instructor modal/pages
- [ ] Credentials and competition history
- [ ] Teaching philosophy
- [ ] Class schedule per instructor

**Why Choose Us Page**
- [ ] Hero section with academy philosophy
- [ ] Key differentiators section (5-7 points with icons)
- [ ] Comparison/checklist section (tactful competitive positioning)
- [ ] Social proof showcase (reviews, testimonials, statistics)
- [ ] Academy values and mission
- [ ] Trial class CTA ("Experience the Difference")
- [ ] SEO optimization for "best BJJ" keywords

**Kids Program Page** (PRIORITY - High Conversion)
- [ ] Hero section targeting parents ("Building Confident Kids")
- [ ] Age-specific program sections (Little Champions 4-7, Kids 8-12, Teens 13-15)
- [ ] Program benefits (parent-focused messaging)
- [ ] Safety & supervision information
- [ ] Video/photo gallery of kids training
- [ ] Parent testimonials (video + text)
- [ ] Kids-specific FAQs
- [ ] Trial class process walkthrough
- [ ] Kids program director profile
- [ ] Pricing and family discounts
- [ ] Multiple CTAs ("Book Free Kids Trial")
- [ ] SEO optimization for "kids BJJ San Diego" keywords
- [ ] Course schema markup for age groups

**Contact Page**
- [ ] One-tap action buttons (PRIORITY)
- [ ] Contact form with validation
- [ ] Interactive map integration
- [ ] Hours of operation
- [ ] FAQ accordion section

### Phase 4: Student Dashboard & Community (Week 5)
**Student Dashboard (For Members)**
- [ ] Authentication system (simple login)
- [ ] Personal progress tracking
  - [ ] Classes attended counter
  - [ ] Belt progression timeline
  - [ ] Technique checklist
- [ ] Academy announcements feed
- [ ] Personal goals section
- [ ] Profile management

**Wall of Champions (Enhanced)**
- [ ] Competition results showcase
- [ ] Belt promotion gallery
- [ ] Student achievements
- [ ] Photo/video integration
- [ ] CMS-managed updates

### Phase 5: Advanced Features & Optimization (Week 6)
**SEO & Performance**
- [ ] Schema.org markup (LocalBusiness, Review, Event)
- [ ] Sitemap generation
- [ ] robots.txt optimization
- [ ] Meta tags and Open Graph
- [ ] Structured data for all pages
- [ ] Image optimization (AVIF/WebP)
- [ ] Video lazy-loading
- [ ] Route preloading
- [ ] Performance audit and optimization

**Analytics & Tracking**
- [ ] Umami analytics integration
- [ ] Microsoft Clarity setup (heatmaps/recordings)
- [ ] Custom event tracking
- [ ] Conversion funnel tracking
- [ ] A/B testing framework setup

**Content Management**
- [ ] Sanity Studio customization
- [ ] Content schemas for all page types
- [ ] Media library setup
- [ ] Editorial workflow

### Phase 6: Content Population & Testing (Week 7)
- [ ] Content population through Sanity
- [ ] Professional photography/video upload
- [ ] Google Reviews import
- [ ] Instructor profiles and bios
- [ ] Class descriptions
- [ ] FAQ content
- [ ] Beginner's guide content
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] User acceptance testing

### Phase 7: Launch Preparation (Week 8)
- [ ] Domain configuration
- [ ] SSL certificate setup
- [ ] Email domain authentication (Resend)
- [ ] Production environment setup
- [ ] Backup and monitoring setup
- [ ] Launch checklist completion
- [ ] Soft launch to test audience
- [ ] Final performance optimization
- [ ] Google Business Profile update
- [ ] Submit to search engines
- [ ] **PUBLIC LAUNCH**

### Phase 8: Post-Launch Optimization & Local SEO (Weeks 9-10)

**Local SEO Landing Pages (PRIORITY)**
- [ ] Create 3-5 neighborhood-specific landing pages:
  - [ ] Pacific Beach BJJ (`/pacific-beach-bjj`)
  - [ ] La Jolla Brazilian Jiu-Jitsu (`/la-jolla-bjj`)
  - [ ] Downtown San Diego BJJ (`/downtown-san-diego-bjj`)
  - [ ] North County BJJ Classes (`/north-county-bjj`)
  - [ ] Mission Valley / Hillcrest BJJ (`/mission-valley-hillcrest-bjj`)
- [ ] Unique content per page (500-800 words)
- [ ] Neighborhood-specific photos/landmarks
- [ ] Local testimonials and reviews
- [ ] Driving directions from each area
- [ ] Schema markup with geo-targeting
- [ ] Internal linking from main site
- [ ] Google Business posts for each page
- [ ] Meta descriptions with neighborhood keywords
- [ ] Submit to search engines with updated sitemap

**Enhancements & Optimization**
- [ ] Smart Intake Quiz implementation
- [ ] Advanced A/B testing
- [ ] Conversion rate optimization
- [ ] SEO monitoring and adjustments
- [ ] User feedback collection and iteration
- [ ] Local backlink building (neighborhood blogs, business directories)

**Optional Features (Evaluate Performance)**
- [ ] Video testimonials (if budget allows)
- [ ] SMS integration via Twilio
- [ ] Social wall (Instagram feed)

### Phase 9: Future Enhancements (Month 3+)
**Nice to Have Features**
- [ ] Blog/resources section expansion
- [ ] Advanced booking system
- [ ] Member technique library
- [ ] Referral program
- [ ] Progressive Web App (PWA)
- [ ] Payment processing (Stripe)
- [ ] Email marketing automation
- [ ] Community forum features

## Third-Party Integrations

### Essential Services (Launch Day)
- **Resend**: Email delivery for forms, exit-intent capture, automated follow-ups
- **Umami**: Privacy-focused web analytics
- **Microsoft Clarity**: Heatmaps and session recordings
- **Sanity**: Headless CMS for content management
- **Vercel Blob**: Media asset storage and delivery
- **Cloudinary**: Video optimization and streaming
- **Google Maps API**: Location and directions
- **Google Business API**: Reviews integration and display
- **Framer Motion**: Animation library
- **Three.js/React Three Fiber**: 3D graphics and interactions
- **Lottie**: Micro-animations

### Optional Services (Evaluate During Development)
- **Twilio**: SMS notifications and reminders
- **Calendly/Cal.com**: Advanced scheduling system (if not building custom)

### Future Integrations (Phase 2+)
- **Stripe**: Payment processing for memberships
- **Customer.io**: Advanced email marketing automation
- **Intercom/Crisp**: Live chat (alternative to AI chatbot)
- **Hotjar**: Additional UX analytics (alternative to Clarity)

## Content Requirements

### Written Content

#### Core Content (All Programs)
- **Academy Story**: Founder background, mission, values
- **Program Descriptions**: Detailed class information (adults + kids)
- **Instructor Bios**: Professional backgrounds, achievements, kids teaching experience
- **FAQ Content**: Common questions and answers (general + kids-specific)
- **SEO Copy**: Optimized page content

#### Kids Program Content (PRIORITY)
- **Kids Program Overview**: 800-1000 words covering all age groups
- **Age Group Descriptions**: 
  - Little Champions (4-7): 200 words
  - Kids BJJ (8-12): 200 words
  - Teens (13-15): 200 words
- **Program Benefits**: Parent-focused benefits copy (300 words)
- **Safety & Supervision**: Detailed safety protocols (200 words)
- **Kids FAQs**: 10-15 parent-specific questions/answers
  - "Is BJJ safe for kids?"
  - "What should my child wear?"
  - "Will my child get hurt?"
  - "How long until results?"
  - "What if my child is shy?"
  - "Special needs accommodation?"
  - "Cost and family discounts?"
- **Parent Testimonials**: 5-10 written testimonials from parents
- **Kids Success Stories**: 3-5 transformation stories
- **Trial Process**: Step-by-step for parents
- **Downloadable PDF**: "Parents' Guide to Kids BJJ" (4-6 pages)
- **Blog Articles**:
  - "Benefits of BJJ for Kids" (800 words)
  - "Is BJJ Safe for Kids?" (600 words)
  - "How BJJ Helps with Bullying" (700 words)
  - "Building Confidence Through Martial Arts" (600 words)

### Visual Assets Needed

#### Photography (Essential)

**Adult Program**
- **Hero Photography**: Athletic lifestyle shots (similar to reference, high-resolution)
- **Instructor Headshots**: Professional portraits (white background + action shots)
- **Action Photography**: Training sessions, techniques, sparring
- **Academy Photos**: Facility, equipment, atmosphere, locker rooms
- **Wall of Champions**: Competition photos, belt ceremonies

**Kids Program** (CRITICAL - High Priority)
- **Kids Training Photos**: 20-30 photos minimum
  - Kids learning techniques (smiling, engaged)
  - Age-appropriate action shots
  - Instructor-student interactions
  - Group activities and games
  - Partner drills
  - Kids helping each other
  - Diversity representation (various ages, genders, ethnicities)
- **Kids Hero Images**: 3-5 standout photos for homepage and kids page
- **Belt Ceremony Photos**: Kids receiving promotions (proud moments)
- **Parent-Child Photos**: Parents watching or training together (if applicable)
- **Facility Photos**: Kids-specific areas, parent viewing area
- **Safety Equipment**: Photos showing padded mats, safe environment

**General**
- **Logo/Branding**: Academy logo in various formats (SVG, PNG, favicon)

**Photography Requirements**:
- All kids photos require signed parent permission/release forms
- Professional quality (DSLR, good lighting)
- Natural, candid moments preferred over posed
- Show diversity and inclusivity
- Genuine smiles and engagement (not forced)

#### Video Content (Essential - Launch Day)

**Hero Background Video** (Adult-focused)
  - 20-30 seconds loop
  - High-quality training footage (slow-motion recommended)
  - Technique execution, sparring intensity, student interactions
  - Multiple orientations (landscape for desktop, portrait for mobile)
  - Professionally shot and color-graded
  - Optimized for web (H.264, compressed)

**Kids Program Video** (PRIORITY for Kids Page)
  - 20-30 seconds loop for kids page hero
  - Kids training, smiling, having fun
  - Shows all age groups
  - Instructor interactions
  - Safe, supportive environment visible
  - Parents may be visible in background
  - Must have signed parent release forms
  
#### Video Content (High Value - Strongly Recommended)
- **Parent Video Testimonials**: 3-5 testimonials (15-30 seconds each)
  - Parents talking about their child's experience
  - Before/after stories
  - "My child is more confident now"
  - Genuine, unscripted feel
  - High conversion impact (parents trust other parents)
  
- **Kids Class Walkthrough**: 2-3 minute video
  - "A Day in Our Kids Class"
  - Shows warm-up, technique learning, games
  - Instructor introducing themselves
  - Addresses parent concerns visually
  - Can be shot on phone in good lighting

#### Video Content (Optional)
- **Adult Student Testimonials**: 15-30 second video clips
- **Instructor Introductions**: Personal welcome messages

#### Video Content (Future Phases)
- **360° Virtual Tour**: Matterport-style academy walkthrough
- **Technique Demos**: Short instructional videos
- **Competition Highlights**: Event recap videos
- **Kid Success Stories**: Longer form (2-3 min) transformation stories

## Marketing & Conversion Strategy

### Lead Generation Funnel
1. **Traffic Sources**: SEO, Google Ads, Social Media, Referrals
2. **Landing Experience**: Hero section with clear value proposition
3. **Engagement**: Class information, instructor credibility
4. **Conversion**: Trial class signup with minimal friction
5. **Follow-up**: Email sequences, phone outreach

### Key Performance Indicators (KPIs)
- **Traffic Metrics**: Organic search rankings, visitor count
- **Engagement**: Time on site, pages per session, bounce rate
- **Conversion**: Trial class signups, contact form submissions
- **Business Impact**: New member acquisition, revenue growth

### A/B Testing Opportunities
- **Hero Headlines**: Different value propositions
- **CTA Buttons**: Color, text, placement
- **Contact Forms**: Field requirements, layout
- **Pricing Display**: Transparency vs. contact-for-pricing

## Budget & Resource Allocation

### Initial Development Costs
- **Development Time**: 80-100 hours
  - Foundation & setup: 10-15 hours
  - Cinematic landing experience: 25-30 hours
  - Core pages development: 20-25 hours
  - Student dashboard: 10-15 hours
  - SEO & optimization: 10-15 hours
  - Testing & refinement: 5-10 hours
  
- **Design & Content Assets**:
  - Professional photography: $500-1,500
  - Hero video production: $1,000-3,000 (or DIY with pro equipment)
  - Content writing: $300-800
  - Logo/branding (if needed): $500-1,500
  
- **Third-party Services (Setup)**:
  - Sanity CMS: Free tier
  - Vercel: Free tier initially
  - Resend: Free tier (250 emails/day)
  - Google Maps API: Free tier ($200 credit/month)
  - Domain & SSL: ~$15/year (SSL included with Vercel)

**Total Initial Investment**: $10,000-18,000
- Development: $8,000-12,000 (at $100/hr average)
- Assets: $2,000-6,000

### Ongoing Monthly Costs
- **Vercel Hosting**: $20/month (Pro plan, recommended)
- **Sanity CMS**: Free tier → $99/month (when scaling)
- **Resend Email**: Free tier → $20/month (10K emails/month)
- **Cloudinary**: Free tier → $99/month (if heavy video use)
- **Microsoft Clarity**: Free forever
- **Umami Analytics**: Free (self-hosted) or $9/month (cloud)
- **Google Maps API**: ~$0-50/month (depends on traffic)
- **Twilio SMS** (optional): ~$50-100/month
- **Domain**: ~$15/year ($1.25/month)

**Total Monthly Operating Costs**: $40-400/month (depending on scale and options)

### Success Metrics & ROI

#### Updated Conversion Targets
- **Visitor-to-Lead**: 8-12% (via exit-intent, forms, dashboard signup)
- **Lead-to-Trial**: 15-20% (via email nurture, follow-up)
- **Trial-to-Member**: 50%+ (excellent onboarding experience)
- **Overall Visitor-to-Member**: 0.6-1.2% (vs industry 0.2-0.5%)

#### Financial Projections
- **Monthly Traffic Target**: 2,000-5,000 visitors
- **Trial Class Signups**: 40-60/month (at 8-12% lead conversion)
- **New Members**: 20-30/month (at 50% trial-to-member)
- **Average Member Value**: $150-200/month
- **Monthly Revenue Impact**: $3,000-6,000
- **Annual Revenue Impact**: $36,000-72,000

#### ROI Timeline
- **Investment Payback**: 2-3 months
- **12-Month ROI**: 300-500%
- **Growth Projection**: 50-100% increase in new members
- **Lifetime Value**: Each new member = $1,800-2,400 (assuming 12-month retention)

### Why the Premium Investment is Worth It
1. **Market Differentiation**: No competitor has cinematic experience
2. **Higher Conversion**: 3x industry average = 3x revenue
3. **Brand Authority**: Premium site = premium academy perception
4. **Long-term Asset**: Website works 24/7 for years
5. **Scalability**: Built for growth, not just launch

## Risk Assessment & Mitigation

### Technical Risks
- **Performance Issues**: Comprehensive testing, optimization
- **SEO Rankings**: White-hat practices, quality content
- **Mobile Experience**: Mobile-first development approach

### Business Risks
- **Competition**: Differentiation through superior UX
- **Seasonality**: Year-round content strategy
- **Local Market Changes**: Flexible, data-driven approach

## Cinematic Experience - Technical Implementation Details

### Video Background Optimization Strategy
```javascript
// Technical Requirements
{
  format: 'MP4 (H.264)',
  resolution: {
    desktop: '1920x1080 (Full HD)',
    mobile: '720x1280 (optimized)'
  },
  fileSize: {
    desktop: '<5MB',
    mobile: '<2MB'
  },
  duration: '20-30 seconds (seamless loop)',
  fps: '30fps',
  bitrate: '2-4 Mbps (balanced quality/size)',
  compression: 'High (via Cloudinary or HandBrake)'
}
```

**Implementation Approach**:
- Lazy load video after page critical content
- Intersection Observer for loading trigger
- Preload poster image (optimized)
- Provide static fallback for slow connections
- Use `prefers-reduced-motion` media query for accessibility

### Parallax Scrolling Architecture
- Use Framer Motion's `useScroll` and `useTransform`
- Multiple parallax layers with different scroll speeds
- Foreground: 1.2x scroll speed
- Midground: 1.0x (normal)
- Background: 0.8x scroll speed
- GPU-accelerated transforms for performance
- Disable on mobile if performance issues detected

### 3D Interactive Elements
```javascript
// Implementation Options
Option 1: Three.js for complex 3D models
Option 2: React Three Fiber for React integration
Option 3: CSS 3D transforms for simpler effects (recommended for belt visualizer)

// Performance Considerations
- Lazy load 3D library
- Use low-poly models
- Implement LOD (Level of Detail)
- RequestAnimationFrame for smooth animations
- Throttle mouse movement events
```

### Micro-interactions Library
- Framer Motion for component animations
- Lottie for icon animations and loading states
- CSS transitions for hover effects
- Custom hooks for reusable animation patterns
- Animation preset library for consistency

### Exit-Intent Detection Algorithm
```javascript
// Trigger Conditions
- Mouse leaves viewport (top boundary)
- Mobile: Detect back button intention (limited)
- Scroll to bottom without interaction
- Time on site > 30 seconds (show only to engaged users)
- Show only once per session (cookie-based)
- 2-second delay before showing modal
```

## Post-Launch Optimization

### Month 1-3: Data Collection & Initial Optimization
- **Monitor Core Web Vitals**: LCP, FID, CLS tracking
- **User Behavior Analysis**: Heatmaps, session recordings (Clarity)
- **Conversion Funnel Analysis**: Where visitors drop off
- **A/B Testing**: Hero headlines, CTA button text/color
- **Exit-Intent Refinement**: Test different offers and timing
- **Mobile Experience**: Optimize based on mobile user data
- **Page Speed**: Continuous optimization for sub-2s load times
- **SEO Monitoring**: Keyword rankings, organic traffic growth

### Month 3-6: Growth & Enhancement Phase
- **Smart Intake Quiz**: Implement based on user data
- **Content Expansion**: Add beginner's guides, FAQ content
- **Video Testimonials**: If budget permits and shows high engagement
- **Email Marketing**: Automated nurture sequences
- **Backlink Building**: Local partnerships, content marketing
- **Google Ads**: If organic traffic needs supplement
- **Advanced Analytics**: Cohort analysis, retention metrics
- **A/B Testing**: Exit-intent offers, pricing page variants

### Month 6-12: Scaling & Advanced Features
- **SMS Integration**: If email engagement is low
- **Social Wall**: Instagram feed if community is active
- **Blog/Resources**: Regular content publishing for SEO
- **Advanced Booking**: Custom scheduling system
- **Member Portal Expansion**: More features based on feedback
- **Community Features**: Forum, member directory (if requested)
- **Multi-location Support**: If expansion occurs

### Year 2+: Innovation & Market Leadership
- **Progressive Web App**: If mobile usage is dominant (70%+)
- **Member Technique Library**: Competitive differentiator
- **Referral Program**: When member base is stable
- **Mobile App**: Native iOS/Android (if budget and scale justify)
- **AI Features**: Chatbot, personalization (when technology improves)
- **Video Streaming**: Live class streaming for remote members

---

## Feature Priority Summary

### ✅ MUST HAVE (Launch Day - Phases 1-4)
1. **Cinematic Landing Experience**
   - Full-screen video background
   - Parallax scrolling effects
   - Interactive 3D elements
   - Micro-interactions throughout
2. **System-Aware Theming** (auto dark mode + manual toggle)
3. **Exit-Intent Technology** (lead capture)
4. **Google Reviews Integration** (homepage widget)
5. **Student Dashboard** (for current members)
6. **Wall of Champions** (achievements showcase)
7. **One-Tap Mobile Actions** (call, map, email)
8. **Core Pages** (Home, Classes, Kids Program, Schedule, Instructors, Why Choose Us, Contact)
9. **Performance Optimization** (sub-2s load times)
10. **Local SEO** (Schema markup, content strategy)
11. **Analytics** (Umami + Microsoft Clarity)

### 🔄 PHASE 2 (Weeks 9-10) - LOCAL SEO FOCUS
1. **Neighborhood Landing Pages** (PRIORITY - 3-5 pages)
   - Pacific Beach BJJ
   - La Jolla Brazilian Jiu-Jitsu
   - Downtown San Diego BJJ
   - North County BJJ Classes
   - Mission Valley / Hillcrest BJJ
2. **Smart Intake Quiz** (personalized recommendations)
3. **Enhanced Content** (beginner's guides, expanded FAQ)
4. **A/B Testing Framework** (optimization)
5. **Local Backlink Building** (neighborhood directories, blogs)

### 🎯 OPTIONAL (Evaluate Based on Budget/Performance)
1. **Video Testimonials** (if high engagement on other videos)
2. **SMS Integration** (if email engagement is low)
3. **Advanced Booking System** (vs. simple form)

### 💎 NICE TO HAVE (Month 3+)
1. **Social Wall** (Instagram feed integration)
2. **Blog/Resources Section** (ongoing content marketing)
3. **Advanced Analytics** (additional tools if needed)

### 📋 POSTPONED (Year 2+)
1. **AI Chatbot** (when budget allows and technology improves)
2. **Member Technique Library** (content creation intensive)
3. **Referral Program** (when member base is established)
4. **Progressive Web App** (when mobile usage justifies)
5. **YouTube Channel Integration** (content strategy intensive)
6. **Podcast** (requires ongoing production)

---

## Next Steps

### Immediate Actions (Week 1)
1. ✅ **Review and approve** this planning document
2. 📸 **Schedule video/photo shoot** for hero content
   - Professional videographer for hero footage
   - Photographer for instructors, facility, action shots
3. 📝 **Content gathering**:
   - Academy story, mission, values
   - Instructor bios and credentials
   - Class descriptions
   - Pricing information
   - FAQ questions
4. 🎨 **Design assets**:
   - Logo files (SVG, PNG)
   - Brand colors confirmation
   - Any existing marketing materials
5. 🔧 **Technical setup**:
   - Domain name selection/purchase
   - Google Business Profile URL
   - Email accounts (for Resend)
   - Access to any existing accounts

### Pre-Development Checklist
- [ ] Budget approved ($10K-18K initial + $40-400/month ongoing)
- [ ] Timeline approved (8 weeks to launch)
- [ ] Video/photo shoot scheduled
- [ ] Content gathering in progress
- [ ] Stakeholders aligned on priorities
- [ ] Development team/developer confirmed
- [ ] Weekly progress review schedule established

### Development Kickoff (Week 1)
- [ ] Repository setup (Git)
- [ ] Development environment configuration
- [ ] Staging site deployment
- [ ] Project management tool setup (optional)
- [ ] Communication channels established

---

## Project Summary

**Timeline**: 8 weeks to public launch + 2 weeks post-launch optimization

**Total Pages**: 13 (8 core + 5 local SEO pages)

**Investment**: $13,000-22,000 initial + $40-400/month ongoing

**Target Outcomes**:
- **Adult Program**: 8-12% visitor-to-lead conversion (vs. industry 2-5%)
- **Kids Program**: 15-20% parent-to-lead conversion (higher intent)
- 40-60 adult trial class signups per month
- **15-25 kids trial class signups per month** (new revenue stream)
- 20-30 adult new members per month
- **10-15 kids new enrollments per month** (new revenue stream)
- **$60,000-100,000 additional annual revenue** (includes kids program)
- 2-3 month investment payback
- Market-leading website in San Diego BJJ space

**Differentiators**:
- Cinematic video experience (no competitor has this)
- **Dedicated Kids Program page** (most competitors bury this info)
- Interactive 3D elements (unique in martial arts space)
- System-aware dark mode (automatic + manual toggle)
- Exit-intent lead capture (10-15% additional conversions)
- Student dashboard (builds community and retention)
- Sub-2-second load times (fastest in market)
- Mobile-first with one-tap actions (superior mobile UX)
- **Parent-focused content strategy** (addresses concerns, builds trust)

**Technology Stack**:
Next.js 15 + TypeScript + TailwindCSS + Framer Motion + Three.js + Sanity CMS + Vercel + Resend + Umami + Microsoft Clarity

---

## Questions to Address Before Starting

1. **Video Production**: Professional shoot or DIY with pro equipment?
2. **Content Timeline**: When will written content be ready?
3. **Instructor Availability**: For photos, bios, and feedback?
4. **Brand Assets**: Logo finalized or needs design?
5. **Domain Name**: Decided or need suggestions?
6. **Launch Date**: Hard deadline or flexible?
7. **Post-Launch Support**: Who handles content updates?
8. **Budget Flexibility**: Room for optional features if development goes smoothly?

---

*This document serves as the comprehensive foundation for the San Diego BJJ Academy website project. It will be updated as requirements evolve and new insights are gathered during development. Version 2.0 - Updated with prioritized cinematic features and realistic budget/timeline.*
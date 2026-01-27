# San Diego BJJ Academy Website

World-class, conversion-optimized Brazilian Jiu-Jitsu academy website built with Next.js 15, TypeScript, and TailwindCSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 3 + shadcn/ui
- **CMS:** Sanity.io 3
- **Email:** Resend
- **Storage:** Vercel KV + Vercel Blob
- **Analytics:** Umami (privacy-focused)
- **Animations:** Framer Motion 11
- **Hosting:** Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
carlson-gracie-site/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages (no auth)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── theme/            # Theme system
│   ├── navigation/       # Header, footer, mobile nav
│   ├── hero/             # Hero section components
│   ├── forms/            # Form components
│   └── reviews/          # Reviews widget
├── lib/                   # Utility functions
├── sanity/               # Sanity CMS config
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Documentation

- **PRD:** `prd.md` - Complete product requirements
- **Project Rules:** `.cursorrules` - Development conventions
- **Skills:** `.cursor/skills/` - Implementation patterns for all features

## Performance Targets

- **LCP:** < 1.8s
- **CLS:** < 0.05
- **FID:** < 50ms
- **Lighthouse:** 98+
- **Conversion Rate:** 8-12%

## Features

- ✅ Cinematic hero with video background
- ✅ System-aware dark mode
- ✅ Exit-intent lead capture
- ✅ Google Reviews integration
- ✅ Kids Program page (dedicated)
- ✅ Wall of Champions
- ✅ Local SEO pages (Escondido, North County)
- ✅ One-tap mobile actions
- ✅ Privacy-focused analytics

## License

Private - San Diego BJJ Academy

## Support

For development questions, refer to the skills documentation in `.cursor/skills/`.

# Theme System Skill

## Overview

Complete patterns for implementing system-aware dark mode with manual toggle, smooth transitions, and no flash of unstyled content (FOUC). Respects `prefers-color-scheme` and persists user preference.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Theme Management | next-themes | Latest |
| Styling | TailwindCSS | 3.x |
| Language | TypeScript | 5.x |

## Directory Structure

```
components/
└── theme/
    ├── ThemeProvider.tsx    # Client-side theme provider
    └── ThemeToggle.tsx      # Toggle button component
app/
├── layout.tsx               # Root layout with provider
└── globals.css              # Theme CSS variables
```

## Core Patterns

### Pattern: Theme Provider Setup

**When to use:** Required in root layout for app-wide theming

**File Location:** `components/theme/ThemeProvider.tsx`

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Pattern: Root Layout with Theme Provider

**When to use:** App-wide theme support

**File Location:** `app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'San Diego BJJ Academy',
  description: 'Premier Brazilian Jiu-Jitsu in San Diego',
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
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Note:** `suppressHydrationWarning` on `<html>` prevents hydration warnings when theme is applied.

### Pattern: Theme Toggle Component

**When to use:** In header/navigation for manual theme switching

**File Location:** `components/theme/ThemeToggle.tsx`

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </Button>
  );
}
```

### Pattern: Theme Toggle with Animation

**When to use:** Enhanced toggle with Framer Motion

**File Location:** `components/theme/ThemeToggle.tsx`

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 0 : 1,
          opacity: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.div>
    </Button>
  );
}
```

### Pattern: CSS Variables for Theming

**When to use:** Define theme colors and variables

**File Location:** `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    
    --primary: 0 84.2% 60.2%;        /* Red-600 */
    --primary-foreground: 0 0% 98%;
    
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 84.2% 60.2%;
    
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    
    --primary: 0 84.2% 60.2%;        /* Red-600 */
    --primary-foreground: 0 0% 98%;
    
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 84.2% 60.2%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  }
}
```

### Pattern: Video Background with Theme Support

**When to use:** Adjust video overlay opacity based on theme

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function VideoBackground({ videoUrl }: { videoUrl: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Darker overlay in dark mode for better text contrast
  const overlayOpacity = mounted && theme === 'dark' ? 'bg-black/60' : 'bg-black/40';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlayOpacity} transition-colors duration-300`} />
      {/* Content goes here */}
    </div>
  );
}
```

## Theme-Aware Component Patterns

### Conditional Styling Based on Theme

```typescript
'use client';

import { useTheme } from 'next-themes';

export function ThemedButton() {
  const { theme } = useTheme();
  
  return (
    <button
      className={`
        px-6 py-3 rounded-lg font-semibold
        ${theme === 'dark' 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-red-600 hover:bg-red-700'
        }
        text-white transition-colors
      `}
    >
      Call To Action
    </button>
  );
}
```

### Using TailwindCSS Dark Mode Classes

```tsx
// Preferred approach: Use dark: prefix
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-4xl font-bold">
    Welcome
  </h1>
  <p className="text-gray-600 dark:text-gray-400">
    This text adapts to theme automatically
  </p>
</div>
```

## Accessibility Patterns

### WCAG Contrast Compliance

```typescript
// Ensure all text meets WCAG AA standards (4.5:1 for normal text)
// Test contrast in both themes

// Light mode: Dark text on light background
<p className="text-gray-900 dark:text-gray-100">
  Primary text content
</p>

// Muted text still meets contrast requirements
<p className="text-gray-600 dark:text-gray-400">
  Secondary text content
</p>

// Links with sufficient contrast
<a className="text-red-600 dark:text-red-500 hover:underline">
  Link text
</a>
```

### Respect prefers-reduced-motion

```css
/* In globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Common Operations

### Get Current Theme

```typescript
'use client';

import { useTheme } from 'next-themes';

function Component() {
  const { theme, systemTheme } = useTheme();
  
  // Current active theme (respects system if theme is 'system')
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  console.log('Active theme:', currentTheme); // 'light' or 'dark'
}
```

### Set Theme Programmatically

```typescript
'use client';

import { useTheme } from 'next-themes';

function Component() {
  const { setTheme } = useTheme();
  
  // Force light mode
  setTheme('light');
  
  // Force dark mode
  setTheme('dark');
  
  // Respect system preference
  setTheme('system');
}
```

## TailwindCSS Configuration

**File Location:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Use class-based dark mode (next-themes requirement)
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // ... other color definitions
      },
    },
  },
  plugins: [],
};

export default config;
```

## Gotchas & Best Practices

- **DO:** Add `suppressHydrationWarning` to `<html>` tag to prevent warnings
- **DO:** Wait for `mounted` state before rendering theme-dependent UI
- **DO:** Use TailwindCSS `dark:` prefix for theme-aware styling
- **DO:** Test WCAG contrast in both light and dark modes
- **DO:** Provide smooth transitions between themes (200-300ms)
- **DO:** Use CSS custom properties for theme colors
- **AVOID:** Accessing theme on server components (theme is client-only)
- **AVOID:** Flash of wrong theme (ensure proper SSR handling)
- **AVOID:** Hardcoded colors (use CSS variables instead)
- **AVOID:** Forgetting to test dark mode on all pages

## Related Skills

- `ui-components` - shadcn/ui components with theme support
- `animations-framer` - Theme toggle animations
- `video-optimization` - Video overlay adjustments for themes

# Framer Motion Animations Skill

## Overview

Complete patterns for Framer Motion animations including scroll-triggered animations, parallax effects, page transitions, micro-interactions, and performance-optimized animations. Use this for all site animations and interactive elements.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Animation Library | Framer Motion | 11.x |
| Language | TypeScript | 5.x |

## Directory Structure

```
components/
├── hero/
│   ├── ParallaxLayers.tsx    # Parallax scrolling
│   └── ScrollReveal.tsx       # Scroll-triggered animations
└── animations/
    ├── FadeIn.tsx             # Reusable animation wrappers
    └── StaggerChildren.tsx    # Stagger animations
```

## Core Patterns

### Pattern: Fade In on Scroll

**When to use:** Reveal content as user scrolls

**File Location:** `components/animations/FadeIn.tsx`

```typescript
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.5, className }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Usage
<FadeIn delay={0.2}>
  <h2>Animated Heading</h2>
</FadeIn>
```

### Pattern: Stagger Children Animation

**When to use:** Animate list items with sequential delay

**File Location:** `components/animations/StaggerChildren.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

// Usage
<StaggerChildren>
  <ClassCard class={class1} />
  <ClassCard class={class2} />
  <ClassCard class={class3} />
</StaggerChildren>
```

### Pattern: Parallax Scrolling

**When to use:** Hero section depth effect

**File Location:** `components/hero/ParallaxLayers.tsx`

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxLayersProps {
  children: React.ReactNode;
}

export function ParallaxLayers({ children }: ParallaxLayersProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  // Background moves slower (parallax effect)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Foreground moves faster
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background layer (slower) */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Video or image background */}
      </motion.div>
      
      {/* Content layer (normal speed) */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Foreground layer (faster) */}
      <motion.div
        style={{ y: foregroundY }}
        className="absolute bottom-0 left-0 right-0"
      >
        {/* Foreground elements */}
      </motion.div>
    </div>
  );
}
```

### Pattern: Button Hover Animation

**When to use:** Interactive CTA buttons

**File Location:** `components/ui/AnimatedButton.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';

export function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <Button asChild {...props}>
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 20px rgba(220, 38, 38, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.button>
    </Button>
  );
}
```

### Pattern: Modal Enter/Exit Animation

**When to use:** Dialogs, exit-intent modals

**File Location:** Component with modal

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function ExitIntentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 max-w-md z-50"
          >
            {/* Modal content */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Pattern: Scroll Progress Bar

**When to use:** Show reading progress on long pages

**File Location:** `components/ScrollProgress.tsx`

```typescript
'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-50"
    />
  );
}
```

### Pattern: Number Counter Animation

**When to use:** Animate statistics (members, classes, reviews)

**File Location:** `components/animations/CountUp.tsx`

```typescript
'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export function CountUp({ value, duration = 2, suffix = '' }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);
  
  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// Usage
<div className="text-4xl font-bold">
  <CountUp value={182} suffix="+" />
  <p className="text-sm">5-Star Reviews</p>
</div>
```

### Pattern: Animated Card Hover

**When to use:** Interactive class/instructor cards

```typescript
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <Card asChild>
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </Card>
  );
}
```

### Pattern: Loading Spinner

**When to use:** Form submission, data loading

**File Location:** `components/ui/Spinner.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';

export function Spinner({ size = 40 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="border-4 border-gray-200 border-t-red-600 rounded-full"
    />
  );
}
```

## Animation Variants Library

```typescript
// lib/animation-variants.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Usage
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## Performance Patterns

### GPU Acceleration

```typescript
// Use transform properties (GPU-accelerated)
<motion.div
  animate={{ x: 100, y: 50, scale: 1.2 }}  // ✅ Fast
/>

// Avoid animating layout properties
<motion.div
  animate={{ top: 100, left: 50, width: '200px' }}  // ❌ Slow
/>
```

### Reduce Motion Support

```typescript
'use client';

import { useReducedMotion } from 'framer-motion';

export function Component() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: shouldReduceMotion ? 0 : 20,  // Skip animation if user prefers reduced motion
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
      }}
    >
      Content
    </motion.div>
  );
}
```

## Common Animation Hooks

### useScroll

```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});
```

### useTransform

```typescript
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
```

### useInView

```typescript
const ref = useRef(null);
const isInView = useInView(ref, { 
  once: true,       // Trigger only once
  margin: '-100px', // Trigger 100px before element enters viewport
});
```

## Gotchas & Best Practices

- **DO:** Use `transform` properties (x, y, scale, rotate) for GPU acceleration
- **DO:** Respect `prefers-reduced-motion` with `useReducedMotion()`
- **DO:** Use `once: true` in `useInView` to prevent re-triggering
- **DO:** Wrap exit animations with `<AnimatePresence>`
- **DO:** Set `layout` prop for automatic layout animations
- **AVOID:** Animating `width`, `height`, `top`, `left` (use `transform` instead)
- **AVOID:** Complex animations on scroll (performance impact)
- **AVOID:** Forgetting `initial` prop (causes flash of final state)
- **AVOID:** Animating on every re-render (use `useEffect` dependencies)

## Related Skills

- `ui-components` - Animated versions of UI components
- `theme-system` - Theme toggle animations
- `video-optimization` - Animated video backgrounds

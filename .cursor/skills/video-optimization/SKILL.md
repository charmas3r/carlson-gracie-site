# Video Optimization Skill

## Overview

Complete patterns for optimized video backgrounds including Cloudinary integration, lazy loading, responsive video, fallback images, and performance optimization. Use this for hero video backgrounds and any video content.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Video CDN | Cloudinary | - |
| Language | TypeScript | 5.x |

## Directory Structure

```
components/
└── hero/
    ├── VideoBackground.tsx    # Optimized video component
    └── HeroSection.tsx        # Hero with video
public/
└── videos/
    ├── hero-desktop.mp4       # Desktop video (< 5MB)
    ├── hero-mobile.mp4        # Mobile video (< 2MB)
    └── hero-poster.jpg        # Poster image
```

## Core Patterns

### Pattern: Optimized Video Background

**When to use:** Full-screen hero video background

**File Location:** `components/hero/VideoBackground.tsx`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface VideoBackgroundProps {
  videoUrl: string;
  mobileVideoUrl?: string;
  posterUrl: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function VideoBackground({
  videoUrl,
  mobileVideoUrl,
  posterUrl,
  overlay = true,
  overlayOpacity = 0.4,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth < 768);
    
    // Handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Preload video
    video.load();
    
    // Handle loaded
    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener('canplaythrough', handleCanPlay);
    
    return () => video.removeEventListener('canplaythrough', handleCanPlay);
  }, []);
  
  // Adjust overlay for dark mode
  const overlayClass = theme === 'dark' 
    ? `bg-black/${Math.round(overlayOpacity * 100) + 20}` 
    : `bg-black/${Math.round(overlayOpacity * 100)}`;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Poster image (shown while loading) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster={posterUrl}
      >
        <source
          src={isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      {overlay && (
        <div className={`absolute inset-0 ${overlayClass} transition-colors duration-300`} />
      )}
    </div>
  );
}
```

### Pattern: Cloudinary Video URL Generation

**When to use:** Generate optimized video URLs from Cloudinary

**File Location:** `lib/cloudinary.ts`

```typescript
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

interface CloudinaryVideoOptions {
  width?: number;
  quality?: 'auto' | 'auto:low' | 'auto:best';
  format?: 'auto' | 'mp4' | 'webm';
  transformation?: string;
}

export function getCloudinaryVideoUrl(
  publicId: string,
  options: CloudinaryVideoOptions = {}
): string {
  const {
    width,
    quality = 'auto',
    format = 'auto',
    transformation = '',
  } = options;
  
  // Build transformation string
  const transforms = [
    width && `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    transformation,
  ]
    .filter(Boolean)
    .join(',');
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transforms}/${publicId}`;
}

// Usage
const desktopVideoUrl = getCloudinaryVideoUrl('hero-video', {
  width: 1920,
  quality: 'auto:low',
  format: 'auto',
});

const mobileVideoUrl = getCloudinaryVideoUrl('hero-video', {
  width: 768,
  quality: 'auto:low',
  format: 'auto',
});
```

### Pattern: Lazy-Loaded Video

**When to use:** Videos not in initial viewport

**File Location:** `components/LazyVideo.tsx`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  videoUrl: string;
  posterUrl: string;
  className?: string;
}

export function LazyVideo({ videoUrl, posterUrl, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    
    observer.observe(video);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <video
      ref={videoRef}
      autoPlay={isInView}
      muted
      loop
      playsInline
      poster={posterUrl}
      className={className}
    >
      {isInView && <source src={videoUrl} type="video/mp4" />}
    </video>
  );
}
```

### Pattern: Responsive Video with Srcset

**When to use:** Serve different video sizes based on viewport

**File Location:** `components/ResponsiveVideo.tsx`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface ResponsiveVideoProps {
  sources: {
    mobile: string;    // < 768px
    tablet: string;    // 768px - 1024px
    desktop: string;   // > 1024px
  };
  posterUrl: string;
  className?: string;
}

export function ResponsiveVideo({ sources, posterUrl, className }: ResponsiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSource, setCurrentSource] = useState(sources.desktop);
  
  useEffect(() => {
    const updateSource = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setCurrentSource(sources.mobile);
      } else if (width < 1024) {
        setCurrentSource(sources.tablet);
      } else {
        setCurrentSource(sources.desktop);
      }
    };
    
    updateSource();
    window.addEventListener('resize', updateSource);
    
    return () => window.removeEventListener('resize', updateSource);
  }, [sources]);
  
  useEffect(() => {
    // Reload video when source changes
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [currentSource]);
  
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={posterUrl}
      className={className}
    >
      <source src={currentSource} type="video/mp4" />
    </video>
  );
}
```

### Pattern: Video with Playback Controls

**When to use:** Testimonial videos, technique videos

**File Location:** `components/VideoPlayer.tsx`

```typescript
'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
  className?: string;
}

export function VideoPlayer({ videoUrl, posterUrl, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  }
  
  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }
  
  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        onClick={togglePlay}
        poster={posterUrl}
        className="w-full h-full object-cover cursor-pointer"
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-3">
        <button
          onClick={togglePlay}
          className="text-white hover:text-red-500 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="text-white hover:text-red-500 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
```

### Pattern: Prefers-Reduced-Motion Fallback

**When to use:** Respect user motion preferences

```typescript
'use client';

import { useEffect, useState } from 'react';

export function AccessibleVideoBackground({ videoUrl, posterUrl }: { videoUrl: string; posterUrl: string }) {
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldPlayVideo(!prefersReducedMotion);
  }, []);
  
  if (!shouldPlayVideo) {
    // Show static poster image instead
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterUrl})` }}
        role="img"
        aria-label="Hero background"
      />
    );
  }
  
  return (
    <video autoPlay muted loop playsInline poster={posterUrl} className="absolute inset-0 w-full h-full object-cover">
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
```

## Video Optimization Guidelines

### Compression Targets

| Device | Max File Size | Resolution | Bitrate |
|--------|--------------|------------|---------|
| Mobile | 2 MB | 720p (1280x720) | 500-800 kbps |
| Tablet | 3 MB | 1080p (1920x1080) | 1-1.5 Mbps |
| Desktop | 5 MB | 1080p (1920x1080) | 1.5-2 Mbps |

### Cloudinary Transformations

```typescript
// Desktop video (high quality)
const desktopUrl = getCloudinaryVideoUrl('hero-video', {
  width: 1920,
  quality: 'auto:best',
  transformation: 'c_fill,g_auto',
});

// Mobile video (optimized)
const mobileUrl = getCloudinaryVideoUrl('hero-video', {
  width: 768,
  quality: 'auto:low',
  transformation: 'c_fill,g_auto',
});

// Thumbnail/poster image
const posterUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/w_1920,q_auto:best,f_jpg,so_0/${publicId}.jpg`;
```

## Performance Patterns

### Lazy Loading

```html
<video loading="lazy" preload="none" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4" />
</video>
```

### Preload Strategies

```html
<!-- Don't preload (fastest initial page load) -->
<video preload="none">

<!-- Preload metadata only (recommended) -->
<video preload="metadata">

<!-- Preload entire video (use sparingly) -->
<video preload="auto">
```

### Network-Aware Loading

```typescript
'use client';

import { useEffect, useState } from 'react';

export function NetworkAwareVideo({ videoUrl, posterUrl }: { videoUrl: string; posterUrl: string }) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  
  useEffect(() => {
    // Check connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnection = connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      
      setShouldLoadVideo(!slowConnection);
    }
  }, []);
  
  if (!shouldLoadVideo) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
    );
  }
  
  return (
    <video autoPlay muted loop playsInline poster={posterUrl}>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
```

## Environment Variables

```bash
# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Gotchas & Best Practices

- **DO:** Compress videos to < 5MB desktop, < 2MB mobile
- **DO:** Provide poster images for instant visual
- **DO:** Use `playsInline` attribute for iOS autoplay
- **DO:** Always include `muted` for autoplay to work
- **DO:** Respect `prefers-reduced-motion` (show static image)
- **DO:** Use Cloudinary or similar CDN for video optimization
- **DO:** Lazy-load videos not in initial viewport
- **AVOID:** Autoplaying videos with sound (poor UX, breaks autoplay)
- **AVOID:** Large video files (slow load times, high bandwidth)
- **AVOID:** Missing fallback poster images
- **AVOID:** Forgetting `loop` attribute for background videos

## Related Skills

- `theme-system` - Adjust video overlay for dark mode
- `animations-framer` - Animated video backgrounds
- `next-app-router` - Video in Server Components

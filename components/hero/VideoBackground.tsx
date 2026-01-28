'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface VideoBackgroundProps {
  src: string;
  posterSrc?: string;
  className?: string;
  parallaxY?: MotionValue<string>;
}

export function VideoBackground({
  src,
  posterSrc,
  className = '',
  parallaxY,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play video when loaded
    const handleCanPlay = () => {
      setIsLoaded(true);
      if (!prefersReducedMotion) {
        video.play().catch(() => {
          // Autoplay was prevented, video will show poster
          console.log('Video autoplay prevented');
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [prefersReducedMotion]);

  // If user prefers reduced motion, show static poster image
  if (prefersReducedMotion && posterSrc) {
    return (
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`}
        style={{ backgroundImage: `url(${posterSrc})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* Video element with parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 h-[120%] -top-[10%]"
      >
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full w-full object-cover ${className}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        aria-hidden="true"
      />
    </>
  );
}

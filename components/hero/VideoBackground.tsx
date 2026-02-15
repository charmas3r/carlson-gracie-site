'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface VideoBackgroundProps {
  src: string;
  posterSrc?: string;
  className?: string;
  parallaxY?: MotionValue<string>;
  onVideoPlay?: () => void;
}

export function VideoBackground({
  src,
  posterSrc,
  className = '',
  parallaxY,
  onVideoPlay,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
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
    if (!video || prefersReducedMotion) return;

    // Mark loaded as soon as first frame is available
    const handleLoaded = () => setIsLoaded(true);

    // Notify parent when video starts playing
    const handlePlay = () => onVideoPlay?.();

    // If the video already has data (cached), mark immediately
    if (video.readyState >= 2) {
      setIsLoaded(true);
    } else {
      video.addEventListener('loadeddata', handleLoaded);
    }

    video.addEventListener('playing', handlePlay);
    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('playing', handlePlay);
    };
  }, [prefersReducedMotion, onVideoPlay]);

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
      {/* Dark background visible immediately while video loads */}
      <div className="absolute inset-0 bg-gray-900" aria-hidden="true" />

      {/* Video element with parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 h-[120%] -top-[10%]"
      >
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        aria-hidden="true"
      />
    </>
  );
}

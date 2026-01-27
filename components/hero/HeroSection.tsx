'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { VideoBackground } from './VideoBackground';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  videoSrc: string;
  posterSrc?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const scrollIndicatorVariants = {
  initial: { y: 0, opacity: 0.7 },
  animate: {
    y: [0, 10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function HeroSection({ videoSrc, posterSrc }: HeroSectionProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <VideoBackground src={videoSrc} posterSrc={posterSrc} />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Small top label */}
          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/80 md:text-base"
          >
            San Diego&apos;s Premier Academy
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            <span className="block">Brazilian</span>
            <span className="block text-primary">Jiu-Jitsu</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-lg font-light text-white/90 md:text-xl lg:text-2xl"
          >
            Transform your body. Sharpen your mind. Build confidence.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary px-8 py-6 text-lg font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] md:px-12 md:py-7 md:text-xl"
            >
              <span className="relative z-10">Start Your Journey</span>
              {/* Button glow effect */}
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          variants={scrollIndicatorVariants}
          initial="initial"
          animate="animate"
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-white/70 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-10 w-10" strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
}

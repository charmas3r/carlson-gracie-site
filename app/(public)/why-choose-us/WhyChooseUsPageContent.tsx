'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Users,
  Shield,
  Heart,
  Target,
  Star,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const reasons = [
  {
    icon: Award,
    title: 'World-Class Lineage',
    description:
      'Direct lineage to Carlson Gracie Sr., one of the most legendary figures in BJJ history. Our techniques and teaching methods are proven at the highest levels.',
  },
  {
    icon: Users,
    title: 'Family Environment',
    description:
      'We welcome students of all ages and backgrounds. Our academy feels like family, where everyone supports each other\'s journey.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'Clean, well-maintained facilities. All instructors are certified in First Aid/CPR. We prioritize safety without sacrificing effective training.',
  },
  {
    icon: Target,
    title: 'Proven Results',
    description:
      'Our students consistently medal at local and national competitions. More importantly, they develop confidence and skills that last a lifetime.',
  },
  {
    icon: Heart,
    title: 'Supportive Community',
    description:
      'More than just a gym—we\'re a community. Regular social events, competition support, and lifelong friendships are part of the experience.',
  },
  {
    icon: Star,
    title: 'Flexible Programs',
    description:
      'Morning, afternoon, and evening classes. Kids, adults, and competition programs. We have options for every schedule and goal.',
  },
];

const values = [
  'Respect for all training partners',
  'Continuous improvement mindset',
  'Integrity on and off the mats',
  'Supporting each other\'s growth',
  'Excellence in technique and character',
  'Humility to always keep learning',
];

const galleryImages = [
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/CGESCO-01.webp',
    alt: 'Carlson Gracie Escondido BJJ academy training session',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/CGESCO-05.webp',
    alt: 'Brazilian Jiu-Jitsu sparring at Carlson Gracie Escondido gym',
    span: '',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/CGESCO-06.webp',
    alt: 'Students drilling techniques at Escondido Jiu-Jitsu academy',
    span: '',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Feb%2002%202026%2C%206%2041%2009%20PM.webp',
    alt: 'BJJ community training together at Carlson Gracie Escondido Escondido',
    span: 'md:col-span-2',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Feb%2018%202025%2C%208%2002%2015%20PM.webp',
    alt: 'Martial arts instruction at Escondido Brazilian Jiu-Jitsu school',
    span: '',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Jul%2030%202025%2C%207%2057%2011%20PM.webp',
    alt: 'Jiu-Jitsu practitioners rolling at Carlson Gracie Escondido',
    span: '',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20May%2031%202025%2C%2010%2001%2031%20AM.webp',
    alt: 'Team photo at Carlson Gracie Brazilian Jiu-Jitsu Escondido academy',
    span: '',
  },
  {
    src: 'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Nov%2024%202025%2C%208%2004%2044%20PM.webp',
    alt: 'BJJ belt promotion ceremony at Carlson Gracie Escondido',
    span: '',
  },
];

export function WhyChooseUsPageContent() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setDirection(0);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    setDirection(dir === 'next' ? 1 : -1);
    setLightboxIndex((current) => {
      if (current === null) return null;
      if (dir === 'next') return (current + 1) % galleryImages.length;
      return (current - 1 + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Jul%2030%202025%2C%207%2057%2011%20PM.webp)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Why <span className="text-primary">Choose Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Not all BJJ academies are the same. Here&apos;s what makes
              Carlson Gracie Escondido the best choice for your martial arts journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <reason.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold md:text-4xl mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Brazilian Jiu-Jitsu is more than techniques—it&apos;s a way of life.
                These values guide everything we do at our academy.
              </p>
              <ul className="space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">The Carlson Gracie Legacy</h3>
              <p className="text-white/90 mb-6">
                Carlson Gracie Sr. was one of the most influential figures in
                Brazilian Jiu-Jitsu history. Known for his tough, effective style
                and legendary fight team, his legacy lives on through academies
                like ours around the world.
              </p>
              <p className="text-white/90 mb-6">
                Training at a Carlson Gracie academy means learning techniques
                proven at the highest levels of competition and real-world
                self-defense.
              </p>
              <blockquote className="border-l-4 border-white/50 pl-4 italic">
                &ldquo;Always enter like a kitten and leave like a lion. But NEVER
                enter like a lion and leave like a kitten. Always be humble.&rdquo;
              </blockquote>
              <p className="text-white/70 text-sm mt-4">
                — Carlson Gracie Sr.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Life on the Mats
            </p>
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Inside Our Academy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real moments from our Escondido academy — the training, the
              camaraderie, and the growth that happens every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${image.span}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.span.includes('col-span-2') ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-sm font-medium drop-shadow-lg">
                    {image.alt}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-20 rounded-full bg-white/10 px-4 py-2 text-white text-sm font-medium backdrop-blur-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 z-20 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 z-20 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={lightboxIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative h-[85vh] w-full max-w-5xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <motion.p
              key={`caption-${lightboxIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center max-w-lg px-4"
            >
              {galleryImages[lightboxIndex].alt}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Experience the Difference
          </h2>
          <p className="text-xl text-white/90 mb-8">
            See for yourself why students choose Carlson Gracie Escondido.
            Your first week is always free.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link href="/contact">Book Your Free Week</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero';
import { ReviewsWidget } from '@/components/reviews';
import {
  KidsHighlight,
  ChampionsPreview,
  ValueProposition,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'San Diego Brazilian Jiu-Jitsu Academy | World-Class BJJ Training',
  description:
    "San Diego's premier Brazilian Jiu-Jitsu academy. World-class instruction, family-friendly environment. Transform your body, sharpen your mind, build confidence. Schedule your free trial class today.",
  keywords: [
    'Brazilian Jiu-Jitsu',
    'BJJ',
    'San Diego',
    'martial arts',
    'self-defense',
    'fitness',
    'kids BJJ',
  ],
  openGraph: {
    title: 'San Diego Brazilian Jiu-Jitsu Academy',
    description:
      'Transform your body. Sharpen your mind. Build confidence. Join San Diego\'s premier BJJ academy.',
    type: 'website',
  },
};

// Cloudinary hero video URL
const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dssgz3ocp/video/upload/v1769527792/output-final-gracie_lbga7e.mp4';

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection videoSrc={HERO_VIDEO_URL} />

      {/* Value Proposition Section with Scroll Animations */}
      <ValueProposition />

      {/* Kids Program Highlight */}
      <KidsHighlight />

      {/* Google Reviews Section */}
      <ReviewsWidget />

      {/* Wall of Champions Preview */}
      <ChampionsPreview />

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Your first class is FREE. No experience required.
          </p>
          <button className="rounded-lg bg-white px-8 py-4 font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Claim Your Free Trial
          </button>
        </div>
      </section>
    </>
  );
}

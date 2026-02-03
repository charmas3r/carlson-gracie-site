import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero';
import { ReviewsWidget } from '@/components/reviews';
import {
  KidsHighlight,
  ChampionsPreview,
  ValueProposition,
} from '@/components/sections';
import { getFeaturedAchievements, getFeaturedReviews } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Carlson Gracie Escondido | Escondido Brazilian Jiu-Jitsu | San Diego BJJ',
  description:
    "Escondido's premier Brazilian Jiu-Jitsu academy. World-class Carlson Gracie instruction, family-friendly environment. Transform your body, sharpen your mind, build confidence. Schedule your free trial week today.",
  keywords: [
    'Carlson Gracie',
    'Brazilian Jiu-Jitsu',
    'BJJ',
    'Escondido',
    'San Diego',
    'martial arts',
    'self-defense',
    'fitness',
    'kids BJJ',
  ],
  openGraph: {
    title: 'Carlson Gracie Escondido | Escondido BJJ',
    description:
      'Transform your body. Sharpen your mind. Build confidence. Join Escondido\'s premier Carlson Gracie BJJ academy.',
    type: 'website',
  },
};

// Vercel Blob Storage hero video URL
const HERO_VIDEO_URL =
  'https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/output-final-gracie.mp4';

export default async function HomePage() {
  const [featuredAchievements, featuredReviews] = await Promise.all([
    getFeaturedAchievements(),
    getFeaturedReviews(),
  ]);

  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection videoSrc={HERO_VIDEO_URL} />

      {/* Value Proposition Section with Scroll Animations */}
      <ValueProposition />

      {/* Kids Program Highlight */}
      <KidsHighlight />

      {/* Google Reviews Section */}
      <ReviewsWidget sanityReviews={featuredReviews} />

      {/* Wall of Champions Preview */}
      <ChampionsPreview achievements={featuredAchievements} />

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Your first week is FREE. No experience required.
          </p>
          <button className="rounded-lg bg-white px-8 py-4 font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Claim Your Free Week
          </button>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

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
      {/* Theme Toggle - Fixed top right */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section with Video Background */}
      <HeroSection videoSrc={HERO_VIDEO_URL} />

      {/* Value Proposition Section - Placeholder for future content */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Card 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                World-Class Instruction
              </h3>
              <p className="text-muted-foreground">
                Learn from experienced black belt instructors with proven
                competitive and teaching credentials.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Family-Friendly Environment
              </h3>
              <p className="text-muted-foreground">
                Programs for all ages, from kids as young as 4 to adults.
                Everyone is welcome at our academy.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Results-Driven Training
              </h3>
              <p className="text-muted-foreground">
                Progressive curriculum designed to build confidence, fitness,
                and real self-defense skills.
              </p>
            </div>
          </div>
        </div>
      </section>

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

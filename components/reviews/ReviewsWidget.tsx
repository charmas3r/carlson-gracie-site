'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { MOCK_REVIEWS, type ReviewsData, type Review } from '@/lib/reviews';
import type { SanityReview } from '@/lib/sanity';
import { cn } from '@/lib/utils';

interface ReviewsWidgetProps {
  className?: string;
  autoRotateInterval?: number; // in milliseconds
  sanityReviews?: SanityReview[]; // Optional reviews from Sanity CMS
}

// Convert Sanity review to component format
function convertSanityReview(review: SanityReview, index: number): Review {
  const date = new Date(review.date);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  let relativeTime: string;
  if (diffDays < 7) {
    relativeTime = diffDays <= 1 ? 'Today' : `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    relativeTime = `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    relativeTime = `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    relativeTime = `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }

  return {
    id: review._id,
    author: review.author,
    authorInitial: review.author.charAt(0).toUpperCase(),
    rating: review.rating,
    text: review.text,
    date: review.date,
    relativeTime,
  };
}

export function ReviewsWidget({
  className,
  autoRotateInterval = 5000,
  sanityReviews,
}: ReviewsWidgetProps) {
  const [reviewsData, setReviewsData] = useState<ReviewsData>(() => {
    // If we have Sanity reviews, use them
    if (sanityReviews && sanityReviews.length > 0) {
      return {
        ...MOCK_REVIEWS,
        reviews: sanityReviews.map(convertSanityReview),
      };
    }
    return MOCK_REVIEWS;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch reviews from API (fallback if no Sanity reviews)
  useEffect(() => {
    // Skip API fetch if we have Sanity reviews
    if (sanityReviews && sanityReviews.length > 0) return;

    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviewsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        // Keep using mock data on error
      }
    }

    fetchReviews();
  }, [sanityReviews]);

  const { aggregateRating, reviews, googleBusinessUrl } = reviewsData;

  // Navigate to next review
  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  // Navigate to previous review
  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Auto-rotate reviews
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;

    const interval = setInterval(nextReview, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isPaused, nextReview, autoRotateInterval, reviews.length]);

  return (
    <section
      className={cn('py-16 bg-gray-50 dark:bg-gray-900', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header with aggregate rating */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              What Our Students Say
            </h2>

            {/* Aggregate Rating */}
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {aggregateRating.ratingValue.toFixed(1)}
                </span>
                <StarRating rating={aggregateRating.ratingValue} size="lg" />
              </div>
              <a
                href={googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline transition-colors"
              >
                ({aggregateRating.reviewCount}+ reviews on Google)
              </a>
            </div>
          </motion.div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={prevReview}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-700 md:block"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextReview}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-700 md:block"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Reviews Container */}
          <div className="overflow-hidden px-4 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-2xl"
              >
                <ReviewCard review={reviews[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'w-6 bg-primary'
                    : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                )}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA to leave review */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <span>Leave us a review on Google</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

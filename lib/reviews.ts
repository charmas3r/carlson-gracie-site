// Types for Google Reviews
export interface Review {
  id: string;
  author: string;
  authorInitial: string;
  rating: number;
  text: string;
  date: string;
  relativeTime: string;
}

export interface ReviewsData {
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
  };
  reviews: Review[];
  googleBusinessUrl: string;
}

// Mock data for development - replace with real Google Business API data
export const MOCK_REVIEWS: ReviewsData = {
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 182,
  },
  googleBusinessUrl:
    'https://www.google.com/maps/place/Carlson+Gracie+Escondido', // Replace with actual URL
  reviews: [
    {
      id: '1',
      author: 'Sarah M.',
      authorInitial: 'S',
      rating: 5,
      text: "Amazing academy! The instructors are patient and knowledgeable. My son has gained so much confidence since starting here. Can't recommend enough!",
      date: '2026-01-15',
      relativeTime: '2 weeks ago',
    },
    {
      id: '2',
      author: 'Mike T.',
      authorInitial: 'M',
      rating: 5,
      text: 'Best BJJ gym in San Diego. Clean facility, great atmosphere, world-class instruction. The community here is like family.',
      date: '2026-01-10',
      relativeTime: '3 weeks ago',
    },
    {
      id: '3',
      author: 'Jennifer L.',
      authorInitial: 'J',
      rating: 5,
      text: "I was nervous to start as a complete beginner at 40, but everyone made me feel welcome. Now I'm hooked! Great workout and self-defense skills.",
      date: '2026-01-05',
      relativeTime: '3 weeks ago',
    },
    {
      id: '4',
      author: 'David R.',
      authorInitial: 'D',
      rating: 5,
      text: 'Professor Carlos and the team are incredible. My daughter has been training here for a year and her discipline and focus have improved dramatically.',
      date: '2025-12-28',
      relativeTime: '1 month ago',
    },
    {
      id: '5',
      author: 'Amanda K.',
      authorInitial: 'A',
      rating: 5,
      text: 'Finally found my gym! The technique instruction is top-notch and the rolling sessions are challenging but safe. Highly recommend for all levels.',
      date: '2025-12-20',
      relativeTime: '1 month ago',
    },
  ],
};

// Helper to generate star rating display
export function generateStars(rating: number): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  if (hasHalfStar) {
    stars.push('half');
  }
  while (stars.length < 5) {
    stars.push('empty');
  }

  return stars;
}

import { NextResponse } from 'next/server';
import { MOCK_REVIEWS, type ReviewsData } from '@/lib/reviews';

// Cache duration in seconds (24 hours)
const CACHE_DURATION = 60 * 60 * 24;

// In production, this would fetch from Google Business API
// and cache in Vercel KV
async function fetchGoogleReviews(): Promise<ReviewsData> {
  // TODO: Implement real Google Business API integration
  // const placeId = process.env.GOOGLE_PLACE_ID;
  // const apiKey = process.env.GOOGLE_BUSINESS_API_KEY;
  //
  // const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
  // );
  // const data = await response.json();
  //
  // Transform and return the data...

  // For now, return mock data
  return MOCK_REVIEWS;
}

export async function GET() {
  try {
    const reviewsData = await fetchGoogleReviews();

    return NextResponse.json(reviewsData, {
      headers: {
        // Cache the response
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);

    // Return mock data as fallback
    return NextResponse.json(MOCK_REVIEWS, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600', // 1 hour cache on error
      },
    });
  }
}

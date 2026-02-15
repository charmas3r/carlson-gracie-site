import type { Metadata } from 'next';
import { getSchedule, getScheduleTimeSlots } from '@/lib/sanity';
import { ValleyCenterPageContent } from './ValleyCenterPageContent';

export const metadata: Metadata = {
  title: 'Brazilian Jiu-Jitsu Classes for Valley Center | Carlson Gracie Escondido',
  description:
    'Premier BJJ classes near Valley Center, CA. Serving Valley Center, Pauma Valley & surrounding communities. Kids & adult programs. Just 15 min south on Valley Center Rd. Book your free week today!',
  keywords: [
    'BJJ Valley Center',
    'Brazilian Jiu-Jitsu Valley Center',
    'martial arts Valley Center',
    'BJJ near Valley Center',
    'Valley Center self-defense classes',
    'Pauma Valley BJJ',
    'kids martial arts Valley Center',
  ],
  openGraph: {
    title: 'Brazilian Jiu-Jitsu Classes for Valley Center | Carlson Gracie Escondido',
    description:
      'Premier BJJ classes near Valley Center. World-class instruction for all ages. Easy access via Valley Center Road. Free trial week available!',
    type: 'website',
  },
};

// LocalBusiness Schema for Valley Center
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://carlsongracie-sandiego.com/#organization',
  name: 'Carlson Gracie Escondido - Valley Center BJJ',
  description:
    'Premier Brazilian Jiu-Jitsu academy serving Valley Center and North County San Diego. Expert instruction for adults and kids.',
  url: 'https://carlsongracie-sandiego.com/valley-center-bjj',
  telephone: '+17605007710',
  email: 'mikerabello@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1980 E. Valley Parkway',
    addressLocality: 'Escondido',
    addressRegion: 'CA',
    postalCode: '92027',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.1192,
    longitude: -117.0864,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Valley Center',
      sameAs: 'https://en.wikipedia.org/wiki/Valley_Center,_California',
    },
    {
      '@type': 'City',
      name: 'Pauma Valley',
    },
    {
      '@type': 'City',
      name: 'Escondido',
      sameAs: 'https://en.wikipedia.org/wiki/Escondido,_California',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  image: 'https://carlsongracie-sandiego.com/images/academy-exterior.jpg',
  sameAs: [
    'https://www.facebook.com/carlsongracie-sandiego',
    'https://www.instagram.com/cgt_escondido',
  ],
};

export default async function ValleyCenterBJJPage() {
  const schedule = await getSchedule();
  const timeSlots = getScheduleTimeSlots(schedule);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ValleyCenterPageContent timeSlots={timeSlots} />
    </>
  );
}

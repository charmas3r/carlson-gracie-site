import type { Metadata } from 'next';
import { NorthCountyPageContent } from './NorthCountyPageContent';

export const metadata: Metadata = {
  title: 'North County San Diego BJJ | Brazilian Jiu-Jitsu Classes',
  description:
    'Premier Brazilian Jiu-Jitsu classes serving North County San Diego: Escondido, San Marcos, Vista, Carlsbad, Encinitas, Oceanside & Rancho Bernardo. Family-friendly, world-class instruction. Book your free trial!',
  keywords: [
    'North County BJJ',
    'North County San Diego Brazilian Jiu-Jitsu',
    'BJJ San Marcos',
    'BJJ Vista',
    'BJJ Carlsbad',
    'martial arts North County',
    'kids BJJ North County San Diego',
    'Oceanside martial arts',
    'Encinitas BJJ',
  ],
  openGraph: {
    title: 'North County San Diego BJJ | Carlson Gracie Brazilian Jiu-Jitsu',
    description:
      'Serving San Marcos, Vista, Carlsbad, Encinitas, Oceanside & more. World-class BJJ instruction for families. Easy freeway access via I-15, I-5, and 78.',
    type: 'website',
  },
};

// LocalBusiness Schema for North County
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://carlsongracie-sandiego.com/#organization',
  name: 'Carlson Gracie San Diego - North County BJJ',
  description:
    'Premier Brazilian Jiu-Jitsu academy serving all of North County San Diego. Expert instruction for adults and kids in a family-friendly environment.',
  url: 'https://carlsongracie-sandiego.com/north-county-san-diego-bjj',
  telephone: '+17605551234',
  email: 'info@carlsongracie-sandiego.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Academy Way',
    addressLocality: 'Escondido',
    addressRegion: 'CA',
    postalCode: '92025',
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
      name: 'Escondido',
      sameAs: 'https://en.wikipedia.org/wiki/Escondido,_California',
    },
    {
      '@type': 'City',
      name: 'San Marcos',
      sameAs: 'https://en.wikipedia.org/wiki/San_Marcos,_California',
    },
    {
      '@type': 'City',
      name: 'Vista',
      sameAs: 'https://en.wikipedia.org/wiki/Vista,_California',
    },
    {
      '@type': 'City',
      name: 'Carlsbad',
      sameAs: 'https://en.wikipedia.org/wiki/Carlsbad,_California',
    },
    {
      '@type': 'City',
      name: 'Encinitas',
      sameAs: 'https://en.wikipedia.org/wiki/Encinitas,_California',
    },
    {
      '@type': 'City',
      name: 'Oceanside',
      sameAs: 'https://en.wikipedia.org/wiki/Oceanside,_California',
    },
    {
      '@type': 'City',
      name: 'Rancho Bernardo',
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
    'https://www.instagram.com/carlsongracie-sandiego',
  ],
};

export default function NorthCountyBJJPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NorthCountyPageContent />
    </>
  );
}

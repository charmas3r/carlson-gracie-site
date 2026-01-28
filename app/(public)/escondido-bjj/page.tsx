import type { Metadata } from 'next';
import { EscondidoPageContent } from './EscondidoPageContent';

export const metadata: Metadata = {
  title: 'Brazilian Jiu-Jitsu Classes in Escondido | Carlson Gracie BJJ',
  description:
    'Premier BJJ classes in Escondido, CA. Serving Escondido, Rancho Bernardo & surrounding North County communities. Kids & adult programs. Easy I-15 access. Book your free trial today!',
  keywords: [
    'BJJ Escondido',
    'Brazilian Jiu-Jitsu Escondido',
    'martial arts Escondido',
    'BJJ near Escondido',
    'Escondido self-defense classes',
    'Rancho Bernardo BJJ',
    'kids martial arts Escondido',
  ],
  openGraph: {
    title: 'Brazilian Jiu-Jitsu Classes in Escondido | Carlson Gracie BJJ',
    description:
      'Premier BJJ classes in Escondido. World-class instruction for all ages. Easy I-15 access from Rancho Bernardo. Free trial class available!',
    type: 'website',
  },
};

// LocalBusiness Schema for Escondido
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://carlsongracie-sandiego.com/#organization',
  name: 'Carlson Gracie San Diego - Escondido BJJ',
  description:
    'Premier Brazilian Jiu-Jitsu academy serving Escondido and North County San Diego. Expert instruction for adults and kids.',
  url: 'https://carlsongracie-sandiego.com/escondido-bjj',
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
      name: 'Rancho Bernardo',
    },
    {
      '@type': 'City',
      name: 'San Pasqual',
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

export default function EscondidoBJJPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <EscondidoPageContent />
    </>
  );
}

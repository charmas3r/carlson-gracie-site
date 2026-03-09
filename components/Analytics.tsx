'use client';

import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <>
      {/* Vercel Web Analytics */}
      <VercelAnalytics />
      
      {/* Umami Analytics - Only load in production if configured */}
      {websiteId && (process.env.NODE_ENV === 'production' || process.env.ENABLE_ANALYTICS) && (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id={websiteId}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

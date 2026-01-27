'use client';

import Script from 'next/script';

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  // Don't load in development unless explicitly enabled
  if (!websiteId || (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_ANALYTICS)) {
    return null;
  }

  return (
    <Script
      async
      src="https://analytics.umami.is/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}

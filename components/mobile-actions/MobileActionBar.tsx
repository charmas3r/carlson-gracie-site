'use client';

import { Phone, MessageSquare, MapPin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Academy contact info - in production, this could come from env vars or CMS
const ACADEMY_INFO = {
  phone: '+17605007710',
  address: '1980 E. Valley Parkway, Escondido, CA 92027',
  email: 'info@carlsongracie-sandiego.com',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=1980+E+Valley+Parkway+Escondido+CA+92027',
};

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

function ActionButton({
  href,
  icon,
  label,
  isPrimary = false,
  onClick,
}: ActionButtonProps) {
  const handleClick = () => {
    // Track analytics event
    // TODO: Integrate with Umami analytics
    console.log(`Mobile Action: ${label} clicked`);
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-all duration-200 active:scale-95',
        isPrimary
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
      )}
      aria-label={label}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

export function MobileActionBar() {
  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed bar */}
      <div className="h-[72px] md:hidden" aria-hidden="true" />

      {/* Fixed action bar - mobile only */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:border-gray-700 dark:bg-gray-900 md:hidden"
        role="navigation"
        aria-label="Quick contact actions"
      >
        {/* Call - Primary action */}
        <ActionButton
          href={`tel:${ACADEMY_INFO.phone}`}
          icon={<Phone className="h-5 w-5" />}
          label="Call"
          isPrimary
        />

        {/* Text/SMS */}
        <ActionButton
          href={`sms:${ACADEMY_INFO.phone}`}
          icon={<MessageSquare className="h-5 w-5" />}
          label="Text"
        />

        {/* Map/Directions */}
        <ActionButton
          href={ACADEMY_INFO.googleMapsUrl}
          icon={<MapPin className="h-5 w-5" />}
          label="Map"
        />

        {/* Email */}
        <ActionButton
          href={`mailto:${ACADEMY_INFO.email}?subject=Free%20Trial%20Week%20Inquiry`}
          icon={<Mail className="h-5 w-5" />}
          label="Email"
        />
      </nav>
    </>
  );
}

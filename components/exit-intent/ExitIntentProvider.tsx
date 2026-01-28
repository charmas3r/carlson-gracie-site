'use client';

import { useExitIntent } from '@/hooks/useExitIntent';
import { ExitIntentModal } from './ExitIntentModal';

interface ExitIntentProviderProps {
  children: React.ReactNode;
}

export function ExitIntentProvider({ children }: ExitIntentProviderProps) {
  const { showModal, closeModal, handleSuccess } = useExitIntent({
    delay: 2000, // Wait 2 seconds before enabling exit intent
    mobileIdleTime: 30000, // 30 seconds idle time on mobile
  });

  return (
    <>
      {children}
      <ExitIntentModal
        isOpen={showModal}
        onClose={closeModal}
        onSuccess={handleSuccess}
      />
    </>
  );
}

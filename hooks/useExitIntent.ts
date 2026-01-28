'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseExitIntentOptions {
  /** Delay in ms before exit intent can trigger (prevents false positives) */
  delay?: number;
  /** Cookie name for tracking if modal was shown */
  cookieName?: string;
  /** How long to wait on mobile before showing (if user is at bottom with no interaction) */
  mobileIdleTime?: number;
}

const COOKIE_EXPIRY_DAYS = 1; // Show again after 1 day

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const {
    delay = 2000,
    cookieName = 'exit_intent_shown',
    mobileIdleTime = 30000,
  } = options;

  const [showModal, setShowModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Check if modal was already shown this session
  const wasAlreadyShown = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return getCookie(cookieName) === 'true';
  }, [cookieName]);

  // Mark modal as shown
  const markAsShown = useCallback(() => {
    setCookie(cookieName, 'true', COOKIE_EXPIRY_DAYS);
    setHasTriggered(true);
  }, [cookieName]);

  // Trigger the modal
  const triggerModal = useCallback(() => {
    if (hasTriggered || wasAlreadyShown()) return;
    setShowModal(true);
    markAsShown();
  }, [hasTriggered, wasAlreadyShown, markAsShown]);

  // Close modal handler
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Handle successful form submission
  const handleSuccess = useCallback(() => {
    setShowModal(false);
    // Set a longer expiry for successful submissions
    setCookie(cookieName, 'true', 30); // Don't show again for 30 days
  }, [cookieName]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (wasAlreadyShown()) return;

    let mobileTimeoutId: NodeJS.Timeout;
    let hasInteracted = false;
    let isEnabled = false;

    // Enable exit intent detection after delay
    const enableTimeout = setTimeout(() => {
      isEnabled = true;
    }, delay);

    // Desktop: Mouse leaves viewport from top
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isEnabled || hasTriggered) return;

      // Only trigger when mouse exits from top of viewport
      if (e.clientY <= 0) {
        triggerModal();
      }
    };

    // Track user interaction
    const handleInteraction = () => {
      hasInteracted = true;
      // Reset mobile idle timer
      if (mobileTimeoutId) {
        clearTimeout(mobileTimeoutId);
      }
    };

    // Mobile: User scrolls to bottom without form submission
    const handleScroll = () => {
      if (!isEnabled || hasTriggered) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is near bottom (within 100px)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

      if (isNearBottom && !hasInteracted) {
        // Start idle timer if near bottom
        if (mobileTimeoutId) {
          clearTimeout(mobileTimeoutId);
        }
        mobileTimeoutId = setTimeout(() => {
          if (!hasTriggered) {
            triggerModal();
          }
        }, mobileIdleTime);
      }
    };

    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('touchstart', handleInteraction, {
        passive: true,
      });
      window.addEventListener('click', handleInteraction);
    } else {
      // Desktop listeners
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      clearTimeout(enableTimeout);
      clearTimeout(mobileTimeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [
    delay,
    mobileIdleTime,
    hasTriggered,
    triggerModal,
    wasAlreadyShown,
  ]);

  return {
    showModal,
    closeModal,
    handleSuccess,
    triggerModal, // Allow manual triggering for testing
  };
}

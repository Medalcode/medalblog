'use client'

/**
 * Track events safely with Umami or other configured providers
 */
export const trackEvent = (eventName: string, data?: Record<string, string | number>) => {
  try {
    // Umami
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).umami) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).umami.track(eventName, data)
    }

    // Google Analytics (gtag)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).gtag('event', eventName, data)
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Track: ${eventName}`, data)
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

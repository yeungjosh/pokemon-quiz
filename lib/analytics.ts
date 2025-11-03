// Analytics wrapper for privacy-friendly tracking
// Currently placeholder for Plausible/PostHog integration

type EventName =
  | 'quiz_start'
  | 'quiz_complete'
  | 'question_answered'
  | 'result_view'
  | 'share_click'
  | 'top3_view';

interface EventProps {
  [key: string]: string | number | boolean;
}

interface PlausibleWindow extends Window {
  plausible?: (event: string, options: { props?: EventProps }) => void;
}

interface PostHogWindow extends Window {
  posthog?: { capture: (event: string, props?: EventProps) => void };
}

export function track(name: EventName, props?: EventProps) {
  // Plausible integration
  if (typeof window !== 'undefined' && (window as PlausibleWindow).plausible) {
    (window as PlausibleWindow).plausible?.(name, { props });
  }

  // PostHog integration (optional)
  if (typeof window !== 'undefined' && (window as PostHogWindow).posthog) {
    (window as PostHogWindow).posthog?.capture(name, props);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, props);
  }
}

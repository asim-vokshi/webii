import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll instantly to top on location/route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior, // Use instant to prevent scroll-jerk during page transition
    });
    
    // Also dispatch a custom event or check if global lenis is active
    // Lenis smooth scroll might need an instant reset
    const html = document.documentElement;
    const body = document.body;
    if (html) html.scrollTop = 0;
    if (body) body.scrollTop = 0;
  }, [location]);

  return null;
}

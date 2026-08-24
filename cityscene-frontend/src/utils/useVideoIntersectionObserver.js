import { useEffect, useRef } from 'react';

/**
 * Custom hook to control video playback based on viewport visibility
 * Plays video when entering viewport, pauses when leaving viewport
 */
export function useVideoIntersectionObserver(options = {}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoNode.play().catch(() => {
            // Autoplay policy fallback
          });
        } else {
          videoNode.pause();
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px'
      }
    );

    observer.observe(videoNode);

    return () => {
      if (videoNode) {
        observer.unobserve(videoNode);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return videoRef;
}

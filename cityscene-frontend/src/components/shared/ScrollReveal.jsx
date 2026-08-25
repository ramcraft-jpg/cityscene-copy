import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className = '',
  style = {},
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once]);

  const getInitialTransform = () => {
    switch (animation) {
      case 'up':
        return 'translateY(32px)';
      case 'down':
        return 'translateY(-32px)';
      case 'left':
        return 'translateX(32px)';
      case 'right':
        return 'translateX(-32px)';
      case 'scale':
        return 'scale(0.94)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const hiddenStyle = {
    opacity: 0,
    transform: getInitialTransform(),
    willChange: 'opacity, transform',
  };

  const visibleStyle = {
    opacity: 1,
    transform: 'none',
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? visibleStyle : hiddenStyle),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

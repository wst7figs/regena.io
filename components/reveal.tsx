"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

export function Reveal({ children, className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (typeof element.animate === "function") {
            element.animate(
              [
                { opacity: 0, transform: "translateY(24px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "both" },
            );
          }
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

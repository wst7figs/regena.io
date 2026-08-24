"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DIRECT_SELECTION_HOLD_MS = 700;

export function useScrollStages(count: number) {
  const [active, setActive] = useState(0);
  const nodes = useRef<Array<HTMLDivElement | null>>([]);
  const directSelectionUntil = useRef(0);

  const selectActive = useCallback((index: number) => {
    directSelectionUntil.current = Date.now() + DIRECT_SELECTION_HOLD_MS;
    setActive(index);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (Date.now() < directSelectionUntil.current) return;

      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.stageIndex ?? 0));
      }
    }, { rootMargin: "-35% 0px -45%", threshold: 0 });
    nodes.current.slice(0, count).forEach((node) => { if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [count]);

  const register = (index: number) => (node: HTMLDivElement | null) => { nodes.current[index] = node; };
  return { active, setActive: selectActive, register };
}

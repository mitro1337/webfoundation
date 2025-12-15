import { useEffect, useRef } from "react";

/**
 * Smooth scroll global (wheel) cu inerție, stil Apple.
 * Nu blochează pe touch (mobile).
 */
export default function useSmoothScroll({ ease = 0.08 } = {}) {
  const raf = useRef(0);
  const enabled = typeof window !== "undefined" && matchMedia("(pointer: fine)").matches;

  useEffect(() => {
    if (!enabled) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let ticking = false;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onWheel = (e) => {
      // prevenim scroll-ul nativ pentru a controla inerția
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = clamp(target + e.deltaY, 0, maxScroll);
      if (!ticking) animate();
    };

    const animate = () => {
      ticking = true;
      current += (target - current) * ease;
      window.scrollTo(0, current);
      if (Math.abs(target - current) > 0.5) {
        raf.current = requestAnimationFrame(animate);
      } else {
        ticking = false;
      }
    };

    // wheel pe document (pasive false ca să putem preventDefault)
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("wheel", onWheel);
    };
  }, [ease, enabled]);
}

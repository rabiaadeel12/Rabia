import { useEffect, useState } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal-on-scroll that never leaves the page blank.
 *
 * Everything renders visible. On mount we only add the hidden pre-state to
 * elements that are already below the fold, so the first painted frame (and
 * any screenshot or shared preview of it) is fully readable.
 */
export function useReveal() {
  useEffect(() => {
    if (reducedMotion()) return;

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    let pending = targets.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    if (!pending.length) return;

    pending.forEach((el) => el.classList.add("rv-pre"));

    /* A scroll sweep rather than an IntersectionObserver: anything at or
       above the trigger line reveals, including elements the viewer jumped
       clean past. An observer misses those — a nav anchor or a deep link can
       move an element from below the fold to above it within a single frame,
       which is never reported as an intersection, and the section would stay
       invisible for good. */
    let frame = 0;

    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const sweep = () => {
      frame = 0;
      const trigger = window.innerHeight * 0.88;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top >= trigger) return true;
        const delay = Number(el.dataset.revealDelay || 0);
        window.setTimeout(() => el.classList.remove("rv-pre"), delay);
        return false;
      });
      if (!pending.length) detach();
    };

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(sweep);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      detach();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

/** 0–1 scroll position of the document, for the top progress bar. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

/** Which section id is currently in view, for nav highlighting. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

import { useEffect, useRef, useState } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on touch/coarse-pointer devices — hover-only effects skip these. */
export const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export { reducedMotion as isReducedMotion };

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
    // A zero-height viewport (a hidden pane, a thumbnail capture) would hide
    // everything and never scroll to reveal it. Leave the page fully visible.
    if (!window.innerHeight) return;

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    let pending = targets.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    if (!pending.length) return;

    const waiting = new Set(pending);
    waiting.forEach((el) => el.classList.add("rv-pre"));

    /* Two mechanisms on purpose, because each covers the other's blind spot.
       The observer fires off the browser's own frame updates, so it still
       works where scroll events never arrive. The scroll sweep catches
       elements the viewer jumped clean past — a nav anchor can move a section
       from below the fold to above it in one frame, and an intersection that
       never happened is never reported. Both stop once nothing is waiting. */
    let frame = 0;

    const teardown = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };

    const reveal = (el) => {
      if (!waiting.has(el)) return;
      waiting.delete(el);
      io.unobserve(el);
      const delay = Number(el.dataset.revealDelay || 0);
      window.setTimeout(() => el.classList.remove("rv-pre"), delay);
      if (!waiting.size) teardown();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // in view, or already scrolled past above the viewport
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    const sweep = () => {
      frame = 0;
      const trigger = window.innerHeight * 0.88;
      Array.from(waiting).forEach((el) => {
        if (el.getBoundingClientRect().top < trigger) reveal(el);
      });
    };

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(sweep);
    }

    waiting.forEach((el) => io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return teardown;
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

/**
 * True while scrolled somewhere between the hero and the contact section —
 * i.e. never while the hero's own heading/buttons are on screen (where a
 * fixed corner widget would sit right on top of them) and never over the
 * closing CTA either.
 */
export function usePetVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return undefined;

    let pastHero = false;
    let atContact = false;
    const update = () => setVisible(pastHero && !atContact);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        atContact = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    heroObserver.observe(hero);
    contactObserver.observe(contact);
    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return visible;
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

/**
 * 3D tilt-on-hover for a card. Writes the pointer position as CSS custom
 * properties (--tilt-x/--tilt-y for rotation, --tilt-glow-x/y for a glow
 * that tracks the cursor) so the actual transform lives in CSS. Skipped on
 * touch devices and prefers-reduced-motion, where there's no hover to drive it.
 */
export function useTilt(maxDeg = 9) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || reducedMotion()) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--tilt-x", `${((0.5 - py) * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${((px - 0.5) * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--tilt-glow-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--tilt-glow-y", `${(py * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxDeg]);

  return ref;
}

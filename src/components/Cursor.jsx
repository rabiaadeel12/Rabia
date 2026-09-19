import { useEffect, useRef, useState } from "react";
import { isCoarsePointer, isReducedMotion } from "../hooks.js";

/**
 * A dot that tracks the pointer exactly, and a ring that eases toward it and
 * grows over anything clickable. Fine pointers only — coarse/touch and
 * prefers-reduced-motion both get the native cursor back, so the two
 * elements below don't even mount (otherwise they'd sit frozen at their
 * default (0, 0) CSS position — a stray ring stuck in the corner — since
 * nothing would ever move them there).
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(
    () => !isCoarsePointer() && !isReducedMotion()
  );

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const isInteractive = (el) => el.closest("a, button, [data-cursor]");

    const onOver = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.add("is-active");
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.remove("is-active");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    let raf = 0;
    const tick = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="cursor-dot"
        ref={dotRef}
        aria-hidden="true"
        style={{ transform: "translate(50vw, 50vh)" }}
      />
      <div
        className="cursor-ring"
        ref={ringRef}
        aria-hidden="true"
        style={{ transform: "translate(50vw, 50vh)" }}
      />
    </>
  );
}

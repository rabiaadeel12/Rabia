import { useEffect, useRef, useState } from "react";
import { profile, track } from "../content.js";
import { isReducedMotion } from "../hooks.js";
import { audioEl } from "../audioPlayer.js";

const TYPE_TEXT = profile.name.toLowerCase();
const TYPE_MS = 65;

/**
 * The first thing a visitor sees: a short boot-up beat, then a real
 * question — not a spinner, and not just an excuse to show off a fade.
 * prefers-reduced-motion skips straight to the question, unanimated.
 */
export default function IntroSplash({ onDone }) {
  const reduced = useRef(isReducedMotion()).current;
  const [phase, setPhase] = useState(reduced ? "ask" : "type");
  const [typed, setTyped] = useState("");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(TYPE_TEXT.slice(0, i));
      if (i >= TYPE_TEXT.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("ask"), 420);
      }
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const finish = (wantsListen) => {
    // fired synchronously inside the click handler so the browser treats
    // it as a real user gesture and allows audio to actually start
    if (wantsListen && audioEl) {
      audioEl.src = track.src;
      audioEl.currentTime = 0;
      audioEl.play().catch(() => {});
    }
    setClosing(true);
    window.setTimeout(() => onDone(wantsListen), reduced ? 0 : 380);
  };

  return (
    <div className={`splash ${closing ? "splash--out" : ""}`} role="dialog" aria-label="Intro">
      <div className="splash__inner">
        {phase === "type" ? (
          <p className="splash__type mono">
            {typed}
            <span className="splash__cursor" aria-hidden="true" />
          </p>
        ) : (
          <div className="splash__ask">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              before you look around
            </p>
            <h2 className="h-md">Want something on while you get to know me?</h2>
            <p className="mono dim splash__hint">
              {track.title} · {track.artist}, on loop
            </p>
            <div className="splash__actions">
              <button className="btn btn--primary" onClick={() => finish(true)}>
                yeah!
              </button>
              <button className="btn btn--ghost" onClick={() => finish(false)}>
                just show me the site
              </button>
            </div>
          </div>
        )}
      </div>

      {phase === "type" && (
        <button className="splash__skip mono" onClick={() => finish(false)}>
          skip →
        </button>
      )}
    </div>
  );
}

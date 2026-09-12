import { useEffect, useRef, useState } from "react";
import { playlist } from "../content.js";

const ART = [
  "linear-gradient(150deg, var(--lilac), var(--cotton))",
  "linear-gradient(150deg, var(--sky), var(--mint))",
  "linear-gradient(150deg, var(--butter), var(--cotton))",
  "linear-gradient(150deg, var(--mint), var(--lilac))",
  "linear-gradient(150deg, var(--cotton), var(--sky))",
];

const clock = (s) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * A vibe widget, not a Spotify integration — it plays no audio and talks to
 * nothing. The track list lives in content.js.
 */
export default function NowPlaying() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(37);
  const [playing, setPlaying] = useState(true);
  const track = playlist[index];
  const lengthRef = useRef(track.seconds);
  lengthRef.current = track.seconds;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= lengthRef.current) {
          setIndex((i) => (i + 1) % playlist.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  const jump = (step) => {
    setIndex((i) => (i + step + playlist.length) % playlist.length);
    setElapsed(0);
  };

  const pct = Math.min(100, (elapsed / track.seconds) * 100);

  return (
    <div className="player">
      <div className="stack-col" style={{ gap: "0.35rem" }}>
        <p className="eyebrow">on loop while building</p>
      </div>

      <div
        className="player__art"
        style={{ background: ART[index % ART.length] }}
        aria-hidden="true"
      >
        <span className="player__art-glyph">{track.glyph}</span>
      </div>

      <div className="stack-col" style={{ gap: "0.15rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p className="player__title">{track.title}</p>
          <div className="eq" data-paused={!playing} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <p className="player__artist">{track.artist}</p>
      </div>

      <div className="stack-col" style={{ gap: "0.4rem" }}>
        <div className="player__bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="player__times">
          <span>{clock(elapsed)}</span>
          <span>{clock(track.seconds)}</span>
        </div>
      </div>

      <div className="player__controls">
        <button
          className="btn btn--icon"
          onClick={() => jump(-1)}
          aria-label="Previous track"
        >
          ⏮
        </button>
        <button
          className="btn btn--primary"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          style={{ width: "3.2rem", height: "3.2rem", padding: 0, justifyContent: "center", borderRadius: "50%" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          className="btn btn--icon"
          onClick={() => jump(1)}
          aria-label="Next track"
        >
          ⏭
        </button>
      </div>

      <p className="mono dim" style={{ fontSize: "0.68rem", textAlign: "center" }}>
        vibes only — no audio, no account attached
      </p>
    </div>
  );
}

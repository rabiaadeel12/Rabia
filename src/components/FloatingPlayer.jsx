import { useEffect, useState } from "react";
import { track } from "../content.js";
import { audioEl } from "../audioPlayer.js";

/**
 * The "queue it up" choice from the intro splash. The splash already
 * started playback (inside a real click, so autoplay was allowed); this
 * component just takes over control of that same <audio> element and
 * docks in a corner so it can follow the visitor around.
 */
export default function FloatingPlayer({ onClose }) {
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setExpanded(false), 4500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!audioEl) return undefined;

    setPlaying(!audioEl.paused);
    setElapsed(audioEl.currentTime);
    if (audioEl.duration) setDuration(audioEl.duration);

    const onTime = () => setElapsed(audioEl.currentTime);
    const onMeta = () => setDuration(audioEl.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audioEl.addEventListener("timeupdate", onTime);
    audioEl.addEventListener("loadedmetadata", onMeta);
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("pause", onPause);
    return () => {
      audioEl.removeEventListener("timeupdate", onTime);
      audioEl.removeEventListener("loadedmetadata", onMeta);
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    if (!audioEl) return;
    if (playing && audioEl.paused) audioEl.play().catch(() => {});
    else if (!playing && !audioEl.paused) audioEl.pause();
  }, [playing]);

  const stop = () => {
    if (audioEl) audioEl.pause();
    onClose();
  };

  const clock = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const pct = duration ? Math.min(100, (elapsed / duration) * 100) : 0;

  if (!expanded) {
    return (
      <div className="mini-player">
        <button
          className="mini-player__bubble"
          onClick={() => setExpanded(true)}
          aria-label="Expand player"
        >
          <span className="eq" data-paused={!playing} aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mini-player is-expanded">
      <button
        className="mini-player__collapse"
        onClick={() => setExpanded(false)}
        aria-label="Minimize player"
      >
        ⌄
      </button>

      <div className="mini-player__row">
        <span className="mini-player__glyph" aria-hidden="true">
          {track.glyph}
        </span>
        <div className="stack-col" style={{ gap: "0.1rem", minWidth: 0 }}>
          <p className="mini-player__title">{track.title}</p>
          <p className="mini-player__artist">{track.artist}</p>
        </div>
        <div className="eq" data-paused={!playing} aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
      </div>

      <div className="player__bar">
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className="mini-player__times">
        <span>{clock(elapsed)}</span>
        <span>{clock(duration)}</span>
      </div>

      <div className="mini-player__controls">
        <button
          className="btn btn--primary"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          style={{ width: "2.5rem", height: "2.5rem", padding: 0, justifyContent: "center", borderRadius: "50%" }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button className="btn btn--icon" onClick={stop} aria-label="Stop playing">
          ✕
        </button>
      </div>
    </div>
  );
}

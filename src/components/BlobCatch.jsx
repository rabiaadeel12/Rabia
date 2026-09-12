import { useCallback, useEffect, useRef, useState } from "react";

const W = 480;
const H = 300;
const ROUND_SECONDS = 30;
const BASKET_W = 76;
const BASKET_H = 16;
const BASKET_Y = H - 34;
const STORE_KEY = "blobcatch.best";

const TOKENS = ["--lilac", "--cotton", "--sky", "--mint", "--butter"];

const readBest = () => {
  try {
    return Number(window.localStorage.getItem(STORE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeBest = (value) => {
  try {
    window.localStorage.setItem(STORE_KEY, String(value));
  } catch {
    /* private mode, blocked site data — the game still works */
  }
};

/**
 * Blob Catch — move the cloud, catch the falling blobs, 30 seconds.
 * Mouse, touch, and arrow keys all steer. Best score is remembered in this
 * browser only.
 */
export default function BlobCatch() {
  const canvasRef = useRef(null);
  const paletteRef = useRef(["#b49bff"]);
  const stateRef = useRef({
    phase: "ready",
    basketX: W / 2,
    targetX: W / 2,
    keyDir: 0,
    blobs: [],
    sparks: [],
    score: 0,
    combo: 0,
    timeLeft: ROUND_SECONDS,
    spawnIn: 0,
    last: 0,
  });

  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [best, setBest] = useState(0);

  useEffect(() => setBest(readBest()), []);

  /* Palette comes from the theme tokens, so the game re-colours itself when
     the viewer's theme changes. */
  const refreshPalette = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    paletteRef.current = TOKENS.map(
      (token) => styles.getPropertyValue(token).trim() || "#b49bff"
    );
  }, []);

  useEffect(() => {
    refreshPalette();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => refreshPalette();
    media.addEventListener("change", onChange);
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      media.removeEventListener("change", onChange);
      observer.disconnect();
    };
  }, [refreshPalette]);

  const spawn = useCallback((game) => {
    const radius = 9 + Math.random() * 9;
    game.blobs.push({
      x: radius + Math.random() * (W - radius * 2),
      y: -radius,
      r: radius,
      // small blobs fall faster and are worth more
      vy: 64 + (19 - radius) * 5 + Math.random() * 34,
      color: paletteRef.current[
        Math.floor(Math.random() * paletteRef.current.length)
      ],
      points: radius < 13 ? 3 : 1,
    });
  }, []);

  const start = useCallback(() => {
    const game = stateRef.current;
    game.phase = "playing";
    game.blobs = [];
    game.sparks = [];
    game.score = 0;
    game.combo = 0;
    game.timeLeft = ROUND_SECONDS;
    game.spawnIn = 0.25;
    setPhase("playing");
    setScore(0);
    setCombo(0);
    setTimeLeft(ROUND_SECONDS);
  }, []);

  /* pointer + keyboard steering */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.targetX = ((clientX - rect.left) / rect.width) * W;
    };
    const onPointer = (e) => point(e.clientX);
    const onTouch = (e) => {
      if (e.touches[0]) point(e.touches[0].clientX);
    };
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") stateRef.current.keyDir = -1;
      else if (e.key === "ArrowRight") stateRef.current.keyDir = 1;
      else return;
      e.preventDefault();
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight")
        stateRef.current.keyDir = 0;
    };

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  /* the loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const game = stateRef.current;
    // a few resting blobs so the screen reads as a game before you press start
    if (!game.blobs.length && game.phase === "ready") {
      for (let i = 0; i < 5; i += 1) {
        spawn(game);
        const blob = game.blobs[i];
        blob.y = 40 + i * 42;
        blob.x = 60 + i * 78;
      }
    }

    let raf = 0;
    let lastTick = performance.now();
    let uiAccumulator = 0;

    const frame = (now) => {
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;

      if (game.phase === "playing") {
        game.timeLeft = Math.max(0, game.timeLeft - dt);

        if (game.keyDir !== 0) {
          game.targetX = Math.max(
            0,
            Math.min(W, game.targetX + game.keyDir * 340 * dt)
          );
        }
        game.basketX += (game.targetX - game.basketX) * Math.min(1, dt * 14);
        game.basketX = Math.max(
          BASKET_W / 2,
          Math.min(W - BASKET_W / 2, game.basketX)
        );

        game.spawnIn -= dt;
        if (game.spawnIn <= 0) {
          spawn(game);
          // spawns tighten as the round runs down
          const progress = 1 - game.timeLeft / ROUND_SECONDS;
          game.spawnIn = 0.72 - progress * 0.36 + Math.random() * 0.2;
        }

        for (let i = game.blobs.length - 1; i >= 0; i -= 1) {
          const blob = game.blobs[i];
          blob.y += blob.vy * dt;

          const caught =
            blob.y + blob.r >= BASKET_Y &&
            blob.y - blob.r <= BASKET_Y + BASKET_H &&
            Math.abs(blob.x - game.basketX) < BASKET_W / 2 + blob.r * 0.6;

          if (caught) {
            game.combo += 1;
            game.score += blob.points * (game.combo >= 5 ? 2 : 1);
            for (let s = 0; s < 8; s += 1) {
              const angle = Math.random() * Math.PI * 2;
              game.sparks.push({
                x: blob.x,
                y: BASKET_Y,
                vx: Math.cos(angle) * 90,
                vy: Math.sin(angle) * 90 - 40,
                life: 0.5,
                color: blob.color,
              });
            }
            game.blobs.splice(i, 1);
          } else if (blob.y - blob.r > H) {
            game.combo = 0;
            game.blobs.splice(i, 1);
          }
        }

        for (let i = game.sparks.length - 1; i >= 0; i -= 1) {
          const spark = game.sparks[i];
          spark.life -= dt;
          spark.x += spark.vx * dt;
          spark.y += spark.vy * dt;
          spark.vy += 260 * dt;
          if (spark.life <= 0) game.sparks.splice(i, 1);
        }

        uiAccumulator += dt;
        if (uiAccumulator > 0.1) {
          uiAccumulator = 0;
          setScore(game.score);
          setCombo(game.combo);
          setTimeLeft(game.timeLeft);
        }

        if (game.timeLeft <= 0) {
          game.phase = "over";
          setPhase("over");
          setScore(game.score);
          setTimeLeft(0);
          setBest((current) => {
            if (game.score > current) {
              writeBest(game.score);
              return game.score;
            }
            return current;
          });
        }
      }

      /* draw */
      ctx.clearRect(0, 0, W, H);

      game.blobs.forEach((blob) => {
        ctx.beginPath();
        ctx.fillStyle = blob.color;
        ctx.globalAlpha = 0.92;
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(blob.x - blob.r * 0.3, blob.y - blob.r * 0.34, blob.r * 0.24, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      game.sparks.forEach((spark) => {
        ctx.globalAlpha = Math.max(0, spark.life * 2);
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // the cloud you catch with
      const [lilac, cotton] = paletteRef.current;
      const gradient = ctx.createLinearGradient(
        game.basketX - BASKET_W / 2,
        0,
        game.basketX + BASKET_W / 2,
        0
      );
      gradient.addColorStop(0, lilac || "#b49bff");
      gradient.addColorStop(1, cotton || "#ff9ecf");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(
        game.basketX - BASKET_W / 2,
        BASKET_Y,
        BASKET_W,
        BASKET_H,
        BASKET_H / 2
      );
      ctx.fill();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [spawn]);

  return (
    <div className="arcade">
      <div className="arcade__bar">
        <div className="stack-col" style={{ gap: "0.2rem" }}>
          <p className="eyebrow">take a break</p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Blob Catch
          </p>
        </div>
        <div className="arcade__scores">
          <span>
            score
            <b>{score}</b>
          </span>
          <span>
            best
            <b>{best}</b>
          </span>
          <span>
            time
            <b>{Math.ceil(timeLeft)}s</b>
          </span>
        </div>
      </div>

      <div className="arcade__screen">
        <canvas
          ref={canvasRef}
          style={{ aspectRatio: `${W} / ${H}` }}
          role="img"
          aria-label="Blob Catch: steer the cloud to catch falling blobs"
        />

        {phase !== "playing" && (
          <div className="arcade__overlay">
            <div>
              {phase === "over" ? (
                <>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}>
                    {score} blobs, caught.
                  </p>
                  <p className="arcade__hint">
                    {score >= best && score > 0
                      ? "new personal best ✦"
                      : `best so far: ${best}`}
                  </p>
                </>
              ) : (
                <p className="arcade__hint">
                  30 seconds. small blobs are worth more. 5 in a row doubles it.
                </p>
              )}
              <button className="btn btn--primary" onClick={start}>
                {phase === "over" ? "run it back" : "start"}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="arcade__hint">
        move with your mouse, finger, or ← → keys
        {combo >= 5 && phase === "playing" ? " · combo x2 🔥" : ""}
      </p>
    </div>
  );
}

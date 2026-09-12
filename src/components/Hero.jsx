import { profile, projects } from "../content.js";

export default function Hero() {
  const shipped = projects.filter((p) => p.status === "live").length;

  return (
    <header className="shell hero" id="top">
      <div className="stack-col" style={{ gap: "1.5rem" }}>
        <p className="eyebrow">
          hey, i'm{" "}
          <span className="wave" aria-hidden="true">
            👋
          </span>
        </p>

        <h1 className="h-xl">
          <span className="hero__name">{profile.name}</span>
          <span className="gradient-text">builds agents.</span>
        </h1>

        <p className="lead">{profile.tagline}</p>

        <div className="chip-row" style={{ gap: "0.55rem" }}>
          <span className="chip chip--lilac">{profile.role}</span>
          <span className="chip chip--mint">{profile.status}</span>
          {profile.location && <span className="chip">{profile.location}</span>}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <a className="btn btn--primary" href="#work">
            see the work <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href="#contact">
            say hi
          </a>
        </div>
      </div>

      <div className="hero__cluster" aria-hidden="true">
        <div className="float-card float-card--a">
          <b className="tabular">{shipped}</b>
          shipped to production
        </div>
        <div className="blob-badge">
          agents
          <br />
          that
          <br />
          actually
          <br />
          finish
        </div>
        <div className="float-card float-card--b">
          healthtech · fintech
          <b>research</b>
        </div>
        <div className="float-card float-card--c">
          plan → act → observe
          <b>the loop</b>
        </div>
      </div>
    </header>
  );
}

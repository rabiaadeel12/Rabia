import { highlights, profile } from "../content.js";

export default function Hero() {
  return (
    <header className="shell hero" id="top">
      <div className="stack-col" style={{ gap: "1.5rem" }}>
        <h1 className="h-xl">
          {profile.name}
          <span className="hero__verb">builds agents.</span>
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
          <a
            className="btn btn--ghost"
            href={profile.cv}
            download={profile.cvLabel}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span aria-hidden="true">↓</span> download CV
          </a>
        </div>
      </div>

      <dl className="facts">
        {highlights.map((item) => (
          <div className="fact" key={item.label}>
            <dt className="fact__figure tabular">{item.figure}</dt>
            <dd className="fact__label">{item.label}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

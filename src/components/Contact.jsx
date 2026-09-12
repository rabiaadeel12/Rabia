import { profile, socials } from "../content.js";

export default function Contact() {
  return (
    <section className="shell section" id="contact">
      <div
        className="sticker sticker--tinted contact"
        style={{ padding: "clamp(1.8rem, 4vw, 3rem)" }}
        data-reveal
      >
        <div className="stack-col" style={{ gap: "0.9rem" }}>
          <h2 className="h-lg">Working on something interesting?</h2>
          <p className="prose-soft">
            Open to AI research collaborations, international roles, and
            conversations about where all of this is actually heading.
          </p>
        </div>

        <div className="stack-col" style={{ gap: "1rem", alignItems: "flex-start" }}>
          <a
            className="btn btn--primary"
            href={profile.cv}
            download={profile.cvLabel}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span aria-hidden="true">↓</span> download CV
          </a>

          <div className="socials">
            {socials.map((social) => (
              <a
                className="social"
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
              >
                <span className="mono dim" aria-hidden="true">
                  {social.glyph}
                </span>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="mono">{profile.location}</span>
      </footer>
    </section>
  );
}

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
          <p className="eyebrow">contact</p>
          <h2 className="h-lg">
            Working on something interesting?
            <br />
            <span className="gradient-text">Let's talk about it.</span>
          </h2>
          <p className="prose-soft">
            Open to AI research collaborations, international roles, and
            conversations about where all of this is actually heading.
          </p>
        </div>

        <div className="socials">
          {socials.map((social) => (
            <a
              className="social"
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http") ? "noreferrer noopener" : undefined
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

      <footer className="footer" style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
        <span>
          © {new Date().getFullYear()} {profile.name} · built with too many
          gradients
        </span>
        <span className="mono">plan → act → observe → repeat</span>
      </footer>
    </section>
  );
}

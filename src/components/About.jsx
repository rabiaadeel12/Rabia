import { about, howIWork } from "../content.js";

export default function About() {
  return (
    <section className="shell section about" id="about">
      <div className="stack-col" style={{ gap: "1.4rem" }} data-reveal>
        <p className="eyebrow">about me</p>
        <h2 className="h-lg">
          I like problems that
          <br />
          don't have obvious answers.
        </h2>
        <div className="stack-col prose-soft" style={{ gap: "1.1rem" }}>
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
        </div>
      </div>

      <aside className="sticker sticker--tilt-r" data-reveal data-reveal-delay="120">
        <span className="tape">how i work</span>
        <div className="loop" style={{ marginTop: "0.6rem" }}>
          {howIWork.map((step, i) => (
            <div key={step.key}>
              <div className="loop__step">
                <span className="loop__key">{step.key}</span>
                <span>{step.value}</span>
              </div>
              {i < howIWork.length - 1 && (
                <div className="loop__arrow" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
        <p
          className="mono dim"
          style={{ fontSize: "0.72rem", marginTop: "0.9rem" }}
        >
          ↻ it's a loop, not a checklist
        </p>
      </aside>
    </section>
  );
}

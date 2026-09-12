import { about, snapshot } from "../content.js";

export default function About() {
  return (
    <section className="shell section about" id="about">
      <div className="stack-col" style={{ gap: "1.4rem" }} data-reveal>
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

      <aside
        className="sticker sticker--tilt-r"
        data-reveal
        data-reveal-delay="120"
      >
        <span className="tape">right now</span>
        <dl className="snap">
          {snapshot.map((row) => (
            <div className="snap__row" key={row.key}>
              <dt className="snap__key">{row.key}</dt>
              <dd className="snap__value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}

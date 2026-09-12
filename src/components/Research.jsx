import { credentials } from "../content.js";

export default function Research() {
  return (
    <section className="shell section" id="research">
      <div className="stack-col" style={{ gap: "1.4rem" }}>
        <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
          <p className="eyebrow">research &amp; background</p>
          <h2 className="h-lg">Where the thinking comes from.</h2>
        </div>

        <div className="writing" data-reveal>
          {credentials.map((entry) => (
            <div className="writing__row" key={entry.title}>
              <span className="writing__when">{entry.when}</span>
              <span className="writing__title">{entry.title}</span>
              <span className="chip">{entry.kind}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

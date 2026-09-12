import { writing } from "../content.js";

export default function Writing() {
  return (
    <section className="shell section" id="writing">
      <div className="stack-col" style={{ gap: "1.4rem" }}>
        <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
          <p className="eyebrow">writing &amp; research</p>
          <h2 className="h-lg">Notes from the inside of the loop.</h2>
        </div>

        <div className="writing" data-reveal>
          {writing.map((entry) => (
            <a className="writing__row" href={entry.link} key={entry.title}>
              <span className="writing__when">{entry.when}</span>
              <span className="writing__title">{entry.title}</span>
              <span className="chip">{entry.kind}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { stack } from "../content.js";

export default function Stack() {
  return (
    <section className="shell section" id="stack">
      <div className="stack-col" style={{ gap: "1.6rem" }}>
        <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
          <p className="eyebrow">the stack</p>
          <h2 className="h-lg">Tools, grouped by what they're actually for.</h2>
        </div>

        <div className="stack-grid">
          {stack.map((group, i) => (
            <div
              className="stack-card"
              key={group.title}
              data-reveal
              data-reveal-delay={i * 90}
            >
              <h3 className="stack-card__title">
                <i className="swatch" style={{ background: group.color }} />
                {group.title}
              </h3>
              <div className="chip-row">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { projects } from "../content.js";

const STATUS_LABEL = {
  live: "shipped",
  wip: "in progress",
  research: "research",
};

export default function Projects() {
  return (
    <section className="shell section" id="work">
      <div className="stack-col" style={{ gap: "1.6rem" }}>
        <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
          <h2 className="h-lg">Selected work</h2>
          <p className="prose-soft">
            Seven of these are running in production today, mostly healthtech,
            mostly built end to end and handed over.
          </p>
        </div>

        <div className="projects">
          {projects.map((project, i) => (
            <article
              className={`sticker project ${
                i % 2 ? "sticker--tilt-r" : "sticker--tilt-l"
              }`}
              key={project.title}
              data-reveal
              data-reveal-delay={(i % 2) * 110}
            >
              <div
                className="project__thumb"
                style={{ background: project.gradient }}
                aria-hidden="true"
              >
                {project.glyph}
              </div>

              <div className="project__head">
                <h3 className="h-md">{project.title}</h3>
                <span className={`status status--${project.status}`}>
                  {STATUS_LABEL[project.status] ?? project.status}
                </span>
              </div>

              <p className="prose-soft" style={{ fontSize: "0.95rem" }}>
                {project.blurb}
              </p>

              <div className="chip-row">
                {project.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {project.note && (
                <p className="mono dim" style={{ fontSize: "0.7rem" }}>
                  {project.note}
                </p>
              )}

              <div style={{ display: "flex", gap: "1.2rem", marginTop: "auto", paddingTop: "0.4rem" }}>
                {project.link && (
                  <a
                    className="link-arrow"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    live <span aria-hidden="true">→</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    className="link-arrow"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    code <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

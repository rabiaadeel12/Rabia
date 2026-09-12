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
          <p className="eyebrow">stuff i built</p>
          <h2 className="h-lg">Things that think for themselves.</h2>
          <p className="mono dim" style={{ fontSize: "0.76rem" }}>
            sample entries — swap them in src/content.js
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

              <div style={{ display: "flex", gap: "1.2rem", marginTop: "auto", paddingTop: "0.4rem" }}>
                <a className="link-arrow" href={project.link}>
                  live <span aria-hidden="true">→</span>
                </a>
                <a className="link-arrow" href={project.repo}>
                  code <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

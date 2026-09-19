import { useState } from "react";
import { projects } from "../content.js";
import { useTilt } from "../hooks.js";

const STATUS_LABEL = {
  live: "shipped",
  wip: "in progress",
  research: "research",
};

const BLURB_PREVIEW_LENGTH = 118;

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

function ProjectCard({ project, delay }) {
  const tiltRef = useTilt();
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = project.blurb.length > BLURB_PREVIEW_LENGTH;

  return (
    <article
      className="sticker project"
      ref={tiltRef}
      data-reveal
      data-reveal-delay={delay}
    >
      {project.image ? (
        <div className="project__thumb project__thumb--image">
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        </div>
      ) : (
        <div
          className="project__thumb"
          style={{ background: project.gradient }}
          aria-hidden="true"
        >
          {project.glyph}
        </div>
      )}

      <div className="project__head">
        <h3 className="h-md">{project.title}</h3>
        <span className={`status status--${project.status}`}>
          {STATUS_LABEL[project.status] ?? project.status}
        </span>
      </div>

      <p className="prose-soft" style={{ fontSize: "0.95rem" }}>
        {expanded || !needsTruncation
          ? project.blurb
          : truncate(project.blurb, BLURB_PREVIEW_LENGTH)}{" "}
        {needsTruncation && (
          <button
            type="button"
            className="project__more"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "show less" : "read more"}
          </button>
        )}
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
  );
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export default function Projects() {
  const liveCount = projects.filter((p) => p.status === "live").length;
  const liveWord = NUMBER_WORDS[liveCount] ?? liveCount;

  return (
    <section className="shell section" id="work">
      <div className="stack-col" style={{ gap: "1.6rem" }}>
        <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
          <h2 className="h-lg">Selected work</h2>
          <p className="prose-soft">
            {liveWord[0].toUpperCase() + liveWord.slice(1)} of these are
            running in production today, mostly healthtech, mostly built end
            to end and handed over.
          </p>
        </div>

        <div className="projects">
          {projects.map((project, i) => (
            <ProjectCard project={project} delay={(i % 2) * 110} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

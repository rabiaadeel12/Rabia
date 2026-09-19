import { nav, profile } from "../content.js";
import { useActiveSection, useScrollProgress } from "../hooks.js";

const SECTION_IDS = nav.map((item) => item.href.slice(1));

export default function Nav() {
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <div
        className="progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <nav className="nav" aria-label="Sections">
        <div className="nav__scroll">
          <a className="nav__brand" href="#top">
            {profile.handle}
            <span style={{ color: "var(--cotton)" }}>.</span>
          </a>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.href.slice(1) === active ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

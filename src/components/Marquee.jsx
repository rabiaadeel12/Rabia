import { marquee } from "../content.js";

/**
 * Full-bleed tilted ticker. The list is rendered twice so the -50% slide
 * loops seamlessly; hovering the band pauses it.
 */
export default function Marquee() {
  const group = (
    <div className="marquee__group" aria-hidden="true">
      {marquee.map((word) => (
        <span key={word} style={{ display: "inline-flex", gap: "2.2rem", alignItems: "center" }}>
          {word}
          <i className="marquee__dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-band">
      <div className="marquee">
        {group}
        {group}
      </div>
      <span className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
        {marquee.join(", ")}
      </span>
    </div>
  );
}

/* ============================================================================
   EDIT ME FIRST — everything on the site comes from this one file.
   Nothing here is hard-coded into the components.

   Marked PLACEHOLDER = sample content, swap it for the real thing.
   ============================================================================ */

export const profile = {
  name: "Rabia", // PLACEHOLDER: add your surname
  handle: "rabia", // used for the nav brand + footer
  role: "full-stack dev, mostly building agents",
  tagline:
    "I build systems that think, decide, and act on their own — then turn them into products people actually use.",
  // Add your city to show a location chip in the hero. Empty = no chip.
  location: "",
  status: "open to AI research + international roles",
  avatarGlyph: "R", // the letter in the floating badge
};

export const about = {
  // Your words, as you wrote them.
  paragraphs: [
    "I'm a full-stack developer with a strong focus on AI, especially agentic systems and smart solutions. I like building things that can think, decide, and act on their own, and turning that into products people actually find useful.",
    "My background spans web and mobile development, and over time I've moved more and more toward AI, both in the work I ship and in the research I explore and publish. Working across the full process, from the first idea to the final product, is what I enjoy most. It means I get to stay close to both the thinking and the building.",
    "I'm curious by nature and I like problems that don't have obvious answers. Whether that's designing a system that adapts on its own or figuring out how to make something complex feel simple to use, I'm happiest when I'm learning something new along the way.",
    "Right now I'm building AI powered solutions professionally while looking to grow further into AI through research and international opportunities.",
    "If you're working on something interesting in this space, or just want to talk about where AI is headed, I'd love to connect.",
  ],
};

/* The loop an agent actually runs — used as the sidebar of the About section.
   It's the vernacular of the work, so it doubles as a summary of how I build. */
export const howIWork = [
  { key: "plan", value: "scope the problem before touching a keyboard" },
  { key: "act", value: "ship the smallest thing that proves it works" },
  { key: "observe", value: "measure it, read the traces, find what broke" },
  { key: "repeat", value: "until it's simple enough to hand to someone else" },
];

export const marquee = [
  "agentic systems",
  "full-stack",
  "react + node",
  "python",
  "llm evals",
  "mcp",
  "rag",
  "mobile",
  "research",
  "design that doesn't hurt",
];

export const stack = [
  {
    title: "agentic ai",
    color: "var(--lilac)",
    items: ["Claude API", "MCP", "tool-calling", "LangGraph", "evals", "RAG"],
  },
  {
    title: "product & web",
    color: "var(--cotton)",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "React Native"],
  },
  {
    title: "server & data",
    color: "var(--sky)",
    items: ["Node", "Python", "FastAPI", "Postgres", "Redis", "pgvector"],
  },
  {
    title: "ship it",
    color: "var(--mint)",
    items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Playwright"],
  },
];

/* PLACEHOLDER — all four are samples. Replace title/blurb/tags/links/repo. */
export const projects = [
  {
    title: "Orchestra",
    blurb:
      "A multi-agent runner that breaks a goal into steps, hands each to a specialist agent, and keeps a readable trace of every decision.",
    tags: ["Claude API", "MCP", "Node", "Postgres"],
    status: "live",
    glyph: "◍",
    gradient: "linear-gradient(140deg, var(--lilac), var(--sky))",
    link: "#",
    repo: "#",
  },
  {
    title: "Paper Trail",
    blurb:
      "Research assistant that reads a paper set, answers with citations you can click, and admits when the answer isn't in the corpus.",
    tags: ["Python", "FastAPI", "pgvector", "RAG"],
    status: "live",
    glyph: "❋",
    gradient: "linear-gradient(140deg, var(--cotton), var(--butter))",
    link: "#",
    repo: "#",
  },
  {
    title: "Loop",
    blurb:
      "An eval harness for agents: fixture conversations, graded rubrics, and a diff view that shows which prompt change caused the regression.",
    tags: ["TypeScript", "evals", "CI"],
    status: "wip",
    glyph: "↻",
    gradient: "linear-gradient(140deg, var(--mint), var(--sky))",
    link: "#",
    repo: "#",
  },
  {
    title: "Pocketful",
    blurb:
      "Cross-platform mobile app with an on-device assistant that categorises spending and explains why it guessed what it guessed.",
    tags: ["React Native", "Expo", "SQLite"],
    status: "wip",
    glyph: "✿",
    gradient: "linear-gradient(140deg, var(--butter), var(--cotton))",
    link: "#",
    repo: "#",
  },
];

/* PLACEHOLDER — sample entries. Use real papers, posts, or talks. */
export const writing = [
  {
    when: "2026 · 03",
    title: "What a good agent trace looks like",
    kind: "essay",
    link: "#",
  },
  {
    when: "2025 · 11",
    title: "Cheap evals beat clever prompts",
    kind: "essay",
    link: "#",
  },
  {
    when: "2025 · 07",
    title: "Task decomposition strategies for tool-using agents",
    kind: "preprint",
    link: "#",
  },
];

/* A vibe widget, not a live Spotify feed — it plays no audio.
   PLACEHOLDER: put your real build playlist here. */
export const playlist = [
  { title: "Nightcall", artist: "Kavinsky", seconds: 258, glyph: "◐" },
  { title: "Redbone", artist: "Childish Gambino", seconds: 327, glyph: "❂" },
  { title: "Sunflower", artist: "Rex Orange County", seconds: 178, glyph: "✺" },
  { title: "Ivy", artist: "Frank Ocean", seconds: 249, glyph: "✿" },
  { title: "Alright", artist: "Kendrick Lamar", seconds: 219, glyph: "✦" },
];

/* PLACEHOLDER — real links go here. Leave email off if you'd rather not
   publish it; the button falls back to a mailto you can change. */
export const socials = [
  { label: "GitHub", href: "#", glyph: "⌥" },
  { label: "LinkedIn", href: "#", glyph: "in" },
  { label: "Google Scholar", href: "#", glyph: "✎" },
  { label: "Email", href: "mailto:you@example.com", glyph: "✉" },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "work", href: "#work" },
  { label: "writing", href: "#writing" },
  { label: "currently", href: "#currently" },
  { label: "contact", href: "#contact" },
];

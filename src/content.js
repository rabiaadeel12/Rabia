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
  "react + firebase",
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
    items: [
      "React 19",
      "Vite",
      "Tailwind v4",
      "React Router",
      "Framer Motion",
    ],
  },
  {
    title: "server & data",
    color: "var(--sky)",
    items: ["Firebase", "AWS S3", "Node", "Python", "Postgres"],
  },
  {
    title: "ship it",
    color: "var(--mint)",
    items: ["Vercel", "Firebase Hosting", "Git", "GitHub Actions"],
  },
];

/* Real work, pulled from github.com/rabiaadeel12.
   `link` is the live deployment — leave it "" and the card shows code only. */
export const projects = [
  {
    title: "Mafaza tul Hayat Hospital",
    blurb:
      "The full web presence for a non-profit multi-specialty hospital: fifteen departments, twenty-plus consultant profiles with live availability and consultation fees, appointment booking, health-education articles and a gallery — all driven by a ten-module admin dashboard, so staff update the site without a developer.",
    tags: ["React 19", "Firebase", "AWS S3", "Tailwind v4", "React Router"],
    status: "live",
    glyph: "✚",
    gradient: "linear-gradient(140deg, var(--mint), var(--sky))",
    link: "https://mafazatulhayat.com",
    repo: "https://github.com/rabiaadeel12/hospital",
  },
  {
    title: "SehatX",
    blurb:
      "A digital health platform for Pakistan — online consultations, holistic care packages, second opinions, and separate education centres for clinicians and patients, fronting an electronic records product.",
    tags: ["React", "Tailwind", "Firebase"],
    status: "live",
    glyph: "❋",
    gradient: "linear-gradient(140deg, var(--sky), var(--lilac))",
    link: "https://sehatx.com",
    repo: "",
  },
  {
    title: "NexoDynamix",
    blurb:
      "Company site for an applied-AI venture, presenting three product lines — a reinforcement-learning wealth platform with a WhatsApp assistant, a healthcare CMS, and an ERP — alongside a rotating project showcase.",
    tags: ["React", "Framer Motion", "Tailwind"],
    status: "live",
    glyph: "◈",
    gradient: "linear-gradient(140deg, var(--lilac), var(--cotton))",
    link: "https://nexodynamix.com",
    repo: "",
  },
  {
    title: "Dr. Mudassar Rauf",
    blurb:
      "Academic portfolio for an AI and optimization researcher — publications, funded projects, editorial appointments and teaching history, organised so collaborators can find the work relevant to them.",
    tags: ["React", "Framer Motion", "Tailwind"],
    status: "live",
    glyph: "✎",
    gradient: "linear-gradient(140deg, var(--butter), var(--mint))",
    link: "https://mudassarrauf.com",
    repo: "",
  },
  {
    title: "Intech Solutions",
    blurb:
      "Lead-generation site for a Lahore solar installer, built around a savings estimator that turns a monthly electricity bill into system size, install cost and payback period in real time.",
    tags: ["React", "Vite", "Vercel"],
    status: "live",
    glyph: "☀",
    gradient: "linear-gradient(140deg, var(--butter), var(--cotton))",
    link: "https://intech-solution-alpha.vercel.app",
    repo: "https://github.com/rabiaadeel12/intech-solution",
  },
  {
    title: "SB Solar Energy",
    blurb:
      "The same solar lead-gen system shipped for a second installer — rebranded end to end, with the estimator and net-metering content retuned for a different client's offering.",
    tags: ["React", "Vite", "Vercel"],
    status: "live",
    glyph: "◎",
    gradient: "linear-gradient(140deg, var(--sky), var(--lilac))",
    link: "https://sbsolar-jade.vercel.app",
    repo: "https://github.com/rabiaadeel12/Sbsolar",
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

/* PLACEHOLDER except GitHub — add your real LinkedIn and Scholar URLs.
   Leave the email as-is if you'd rather not publish it. */
export const socials = [
  { label: "GitHub", href: "https://github.com/rabiaadeel12", glyph: "⌥" },
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

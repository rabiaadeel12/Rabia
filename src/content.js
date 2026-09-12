/* ============================================================================
   EDIT ME FIRST — everything on the site comes from this one file.
   Nothing here is hard-coded into the components.

   Content is drawn from Rabia's CV and from the live sites themselves.
   Anything still marked PLACEHOLDER needs a real value.
   ============================================================================ */

export const profile = {
  name: "Rabia Adeel",
  handle: "rabia",
  role: "final-year CS student · AI/ML developer at NexoDynamix",
  tagline:
    "I build systems that think, decide, and act on their own — then turn them into products people actually use.",
  location: "Lahore, PK",
  status: "open to AI research + international roles",
  avatarGlyph: "R",
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
  "reinforcement learning",
  "full-stack",
  "react + firebase",
  "python",
  "healthtech",
  "MERN",
  "fintech",
  "data pipelines",
  "research",
  "design that doesn't hurt",
];

export const stack = [
  {
    title: "ai & ml",
    color: "var(--lilac)",
    items: [
      "Reinforcement Learning",
      "Machine Learning",
      "data processing",
      "Python",
    ],
  },
  {
    title: "product & web",
    color: "var(--cotton)",
    items: ["React", "TypeScript", "Tailwind", "Vite", "Chart.js"],
  },
  {
    title: "server & data",
    color: "var(--sky)",
    items: [
      "Node",
      "Express",
      "REST APIs",
      "Firestore",
      "MongoDB",
      "Supabase",
      "AWS S3",
    ],
  },
  {
    title: "ship it",
    color: "var(--mint)",
    items: ["Git", "GitHub", "Vercel", "Firebase Hosting", "Postman", "Figma"],
  },
];

/* `link` is the live deployment — leave it "" and the card shows code only.
   `repo` works the same way. */
export const projects = [
  {
    title: "NexoHealth",
    blurb:
      "The AI-driven records and patient-management platform at NexoDynamix, which I led development on — optimised scheduling, resource allocation, and large-scale handling of sensitive data under healthcare compliance rules.",
    tags: ["AI/ML", "React", "Firebase", "scheduling"],
    status: "live",
    glyph: "◈",
    gradient: "linear-gradient(140deg, var(--lilac), var(--sky))",
    link: "https://health.nexodynamix.com",
    repo: "",
    note: "sign-in required",
  },
  {
    title: "Mafaza tul Hayat Hospital",
    blurb:
      "The full web presence for a non-profit multi-specialty hospital: fifteen departments, twenty-plus consultant profiles with live availability and fees, appointment booking, and a patient portal for lab reports — all run from an admin CMS, so staff publish without a developer.",
    tags: ["React 19", "Firebase", "AWS S3", "role-based auth"],
    status: "live",
    glyph: "✚",
    gradient: "linear-gradient(140deg, var(--mint), var(--sky))",
    link: "https://mafazatulhayat.com",
    repo: "https://github.com/rabiaadeel12/hospital",
  },
  {
    title: "Intelligent Wealth Management",
    blurb:
      "My final-year thesis, built as a working product: a reinforcement-learning system for personal finance that tracks assets in real time, categorises spending, and turns portfolio state into recommendations you can act on.",
    tags: ["Reinforcement Learning", "React", "Firebase", "Chart.js"],
    status: "research",
    glyph: "◍",
    gradient: "linear-gradient(140deg, var(--cotton), var(--lilac))",
    link: "",
    repo: "",
    note: "thesis project — iwmhub.com is offline",
  },
  {
    title: "SehatX",
    blurb:
      "A digital health platform for Pakistan — online consultations, holistic care packages, second opinions, and separate education centres for clinicians and patients, all behind an admin-controlled CMS.",
    tags: ["React", "Vite", "Firestore", "Firebase Auth"],
    status: "live",
    glyph: "❋",
    gradient: "linear-gradient(140deg, var(--sky), var(--mint))",
    link: "https://sehatx.com",
    repo: "",
  },
  {
    title: "NexoDynamix",
    blurb:
      "The company site for the venture I build at, presenting three product lines — the RL wealth platform, the healthcare CMS, and an ERP — alongside a rotating project showcase.",
    tags: ["React", "Framer Motion", "Tailwind"],
    status: "live",
    glyph: "▲",
    gradient: "linear-gradient(140deg, var(--butter), var(--cotton))",
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
    gradient: "linear-gradient(140deg, var(--butter), var(--sky))",
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
    gradient: "linear-gradient(140deg, var(--cotton), var(--sky))",
    link: "https://sbsolar-jade.vercel.app",
    repo: "https://github.com/rabiaadeel12/Sbsolar",
  },
];

/* Real credentials from the CV — no invented publications.
   Add papers here as they're published. */
export const credentials = [
  {
    when: "2022 – 26",
    title: "B.S. (Hons.) Computer Science — NUML, CGPA 3.59",
    kind: "degree",
  },
  {
    when: "2026",
    title:
      "Thesis — Intelligent Wealth Management System Using Reinforcement Learning",
    kind: "thesis",
  },
  {
    when: "national",
    title: "HEC Skill Competency Test — 95.3rd percentile",
    kind: "ranking",
  },
  {
    when: "current",
    title: "Vice President — ACM NUML Lahore Chapter",
    kind: "leadership",
  },
  {
    when: "current",
    title: "Core team — Google Developer Student Clubs, NUML Lahore",
    kind: "community",
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

/* PLACEHOLDER: LinkedIn. Your phone number is deliberately not here —
   a public page invites scraping in a way a PDF CV does not. */
export const socials = [
  { label: "GitHub", href: "https://github.com/rabiaadeel12", glyph: "⌥" },
  { label: "LinkedIn", href: "#", glyph: "in" },
  { label: "Email", href: "mailto:rabiadeel12@gmail.com", glyph: "✉" },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "work", href: "#work" },
  { label: "research", href: "#research" },
  { label: "currently", href: "#currently" },
  { label: "contact", href: "#contact" },
];

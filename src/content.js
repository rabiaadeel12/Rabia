/* ============================================================================
   EDIT ME FIRST — everything on the site comes from this one file.
   Nothing here is hard-coded into the components.

   Content is drawn from Rabia's CV and from the live sites themselves.
   Anything still marked PLACEHOLDER needs a real value.
   ============================================================================ */

export const profile = {
  name: "Rabia Adeel",
  handle: "rabia",
  role: "AI/ML Engineer & Full-Stack Developer",
  verb: "builds AI products.",
  tagline:
    "Full-stack developer shipping AI-powered products end to end — from reinforcement-learning agents to the SaaS platforms and healthcare systems people actually run on.",
  location: "Lahore, PK",
  status: "open to AI research + international roles",
  availability: "open to remote contract work",
  avatarGlyph: "R",
  // Background removed (see public/images/ — start from a plain, even
  // background if you swap this file, so the cutout stays clean).
  heroPhoto: "/images/rabia-cutout.png",
  // Lives in public/, so it is served from the site root. Replace the file
  // to update the CV — the filename is what visitors download.
  cv: "/Rabia_Adeel_CV.pdf",
  cvLabel: "Rabia_Adeel_CV.pdf",
};

export const about = {
  // Your words, as you wrote them.
  paragraphs: [
    "I'm a full-stack developer with a strong focus on AI, especially agentic systems and smart solutions. I like building things that can think, decide, and act on their own, and turning that into products people actually find useful.",
    "My background spans web and mobile development, and over time I've moved more and more toward AI, both in the work I ship and in the research I explore and publish — including a co-authored paper in Symmetry on Q-learning-based optimization. Working across the full process, from the first idea to the final product, is what I enjoy most. It means I get to stay close to both the thinking and the building.",
    "I'm curious by nature and I like problems that don't have obvious answers. Whether that's designing a system that adapts on its own or figuring out how to make something complex feel simple to use, I'm happiest when I'm learning something new along the way.",
    "Right now I'm building AI powered solutions professionally while looking to grow further into AI through research and international opportunities.",
    "If you're working on something interesting in this space, or just want to talk about where AI is headed, I'd love to connect.",
  ],
};

/* Facts a recruiter scans for, in the hero. Real numbers only — if you can't
   source it from the CV or a live site, it doesn't belong here.
   The project count is filled in below, once `projects` exists, so it
   can never drift out of sync with the cards themselves again. */
export const highlights = [
  { figure: "", label: "projects running in production" },
  { figure: "95.3", label: "percentile, HEC national skills test" },
  { figure: "3.57", label: "CGPA, B.S. Computer Science" },
];

/* The About sidebar: where things actually stand right now. */
export const snapshot = [
  { key: "now", value: "AI Engineer Trainee at Stewart Technology & Business Services" },
  { key: "studied", value: "B.S. Computer Science, NUML — CGPA 3.57" },
  { key: "published", value: "Co-author, Symmetry journal (IF 2.2)" },
  { key: "based in", value: "Lahore, Pakistan" },
  { key: "open to", value: "AI research roles, internationally" },
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
      "Reinforcement Learning (PPO)",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "stable-baselines3",
      "Python",
    ],
  },
  {
    title: "product & web",
    color: "var(--cotton)",
    items: ["React", "TypeScript", "Flutter", "Tailwind", "Vite", "Chart.js"],
  },
  {
    title: "server & data",
    color: "var(--sky)",
    items: [
      "Node",
      "Express",
      "Flask",
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
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "Railway",
      "Firebase Hosting",
      "Postman",
      "Figma",
    ],
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
    image: "/images/projects/nexohealth.png",
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
    image: "/images/projects/mafaza-tul-hayat.png",
    glyph: "✚",
    gradient: "linear-gradient(140deg, var(--mint), var(--sky))",
    link: "https://mafazatulhayat.com",
    repo: "https://github.com/rabiaadeel12/hospital",
  },
  {
    title: "Intelligent Wealth Management",
    blurb:
      "My thesis, built as a working product: a PPO reinforcement-learning agent trained on 94 KSE-100 stocks, serving BUY/SELL/HOLD signals through a Flask API with a daily auto-retraining pipeline. Paired with a React/Firebase PWA that tracks personal investments across seven asset classes — stocks, crypto, commodities, mutual funds, certificates, real estate, vehicles — and benchmarks risk-adjusted returns against the market.",
    tags: ["Reinforcement Learning", "PPO", "Flask", "React", "Firebase"],
    status: "research",
    image: "/images/projects/iwm.png",
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
    image: "/images/projects/sehatx.png",
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
    image: "/images/projects/nexodynamix.png",
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
    image: "/images/projects/mudassar-rauf.png",
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
    image: "/images/projects/intech-solutions.png",
    glyph: "☀",
    gradient: "linear-gradient(140deg, var(--butter), var(--sky))",
    link: "https://intech-solution-alpha.vercel.app",
    repo: "https://github.com/rabiaadeel12/intech-solution",
  },
];

highlights[0].figure = String(projects.filter((p) => p.status === "live").length);

/* Real credentials from the CV — no invented publications.
   Add papers here as they're published. */
export const credentials = [
  {
    when: "2026",
    title: "AI Engineer Trainee — Stewart Technology & Business Services",
    kind: "experience",
  },
  {
    when: "2022 – 26",
    title: "B.S. (Hons.) Computer Science — NUML, CGPA 3.57",
    kind: "degree",
  },
  {
    when: "2026",
    title:
      "Co-author — Symmetry journal (Impact Factor 2.2), Q-learning-based optimization research",
    kind: "publication",
  },
  {
    when: "2026",
    title:
      "Thesis — Intelligent Wealth Management System Using Reinforcement Learning",
    kind: "thesis",
  },
  {
    when: "prior",
    title: "Software Developer — NexoDynamix",
    kind: "experience",
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

/* The one real track the floating player offers — src set, so it
   actually plays. */
export const track = {
  title: "Diva",
  artist: "Beyoncé",
  glyph: "❖",
  src: "/audio/diva.m4a",
};

/* Your phone number is deliberately not here — a public page invites
   scraping in a way a PDF CV does not. */
export const socials = [
  { label: "GitHub", href: "https://github.com/rabiaadeel12", glyph: "⌥" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rabia-adeel12/",
    glyph: "in",
  },
  { label: "Email", href: "mailto:rabiadeel12@gmail.com", glyph: "✉" },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "work", href: "#work" },
  { label: "background", href: "#research" },
  { label: "contact", href: "#contact" },
];

import React, { useEffect, useMemo, useRef, useState } from "react";

const projects = [
  {
    title: "Telegram Group Manager",
    description:
      "A premium Telegram management system with dashboard structure, raffle flows, moderation tools, broadcast logic and multi-group support.",
    stack: ["Python", "Flask", "PTB", "JSON", "Dashboard"],
    accent: "Management",
    result: "Panel-based control with scalable group operations and automation-ready structure.",
    details: {
      goal: "Create a manageable Telegram system for multi-group operations and admin control.",
      solution:
        "A structured dashboard-driven system with moderation tools, raffle flow, broadcast actions and operational controls.",
      outcome:
        "Cleaner daily management, faster actions and a more scalable base for Telegram communities.",
    },
  },
  {
    title: "Dragon Empire Mini App",
    description:
      "A Telegram Mini App experience with game logic, auth flow, storage progression, backend API integration and product-focused interface design.",
    stack: ["FastAPI", "JavaScript", "PostgreSQL", "Redis", "Mini App"],
    accent: "Gaming",
    result: "Interactive product flow designed for retention, speed and immersive UX.",
    details: {
      goal: "Build a fast and immersive Telegram Mini App with game-based engagement.",
      solution:
        "Combined backend auth, storage mechanics, progression systems and product-oriented frontend flow into one cohesive experience.",
      outcome:
        "A more polished mini app structure focused on retention, responsiveness and premium feel.",
    },
  },
  {
    title: "CRM / Registration System",
    description:
      "A structured customer workflow for record creation, updates, querying, appointment handling, role permissions and reporting processes.",
    stack: ["Python", "Google Sheets", "Automation", "Roles", "Reporting"],
    accent: "Operations",
    result: "Faster internal operations with cleaner data flow and reduced manual work.",
    details: {
      goal: "Turn manual record and appointment handling into a controlled system.",
      solution:
        "Built role-aware flows for creating, updating and querying records with report-friendly structure.",
      outcome:
        "Reduced confusion in internal operations and improved visibility across team actions.",
    },
  },
  {
    title: "Mobile & Robotics Solutions",
    description:
      "Cross-direction development covering mobile application work in Java and Dart, plus robotics-oriented coding in C and C++ for lower-level control needs.",
    stack: ["Java", "Dart", "C", "C++", "Mobile"],
    accent: "Engineering",
    result: "Flexible capability across app development and hardware-oriented logic.",
    details: {
      goal: "Cover both mobile-first and lower-level engineering needs in one capability set.",
      solution:
        "Use Java and Dart for application-side development, while supporting hardware or robotics logic with C and C++.",
      outcome:
        "Broader technical range for projects that need both user-facing apps and deeper system control.",
    },
  },
];

const skills = [
  "Python",
  "JavaScript",
  "Java",
  "Dart",
  "C",
  "C++",
  "Telegram Bot Development",
  "Telegram Mini App Development",
  "Mobile App Development",
  "Robotics Programming",
  "FastAPI",
  "Flask",
  "PostgreSQL",
  "Redis",
  "Google Sheets API",
  "Automation Systems",
  "Admin Panels",
  "UI/UX Thinking",
];

const marqueeSkills = [
  "Python",
  "JavaScript",
  "Java",
  "Dart",
  "C",
  "C++",
  "FastAPI",
  "Flask",
  "PostgreSQL",
  "Redis",
  "Telegram Bots",
  "Mini Apps",
  "Mobile Apps",
  "Robotics",
  "Automation",
  "Dashboards",
  "UI/UX",
  "API Integrations",
];

const playgroundItems = [
  {
    title: "Bot Flow Preview",
    type: "System Concept",
    text: "Example interaction structure for Telegram bots, approval flows and user actions.",
    mode: "flow",
  },
  {
    title: "Mini App UI Blocks",
    type: "Interface Study",
    text: "Reusable product cards, dashboard sections and visual components for interactive products.",
    mode: "dashboard",
  },
  {
    title: "Automation Logic",
    type: "Workflow Idea",
    text: "Operational thinking around forms, admin actions, reporting and approval-based systems.",
    mode: "code",
  },
  {
    title: "Mobile & Robotics Experiments",
    type: "Engineering Direction",
    text: "Ideas spanning mobile app structures and lower-level logic for robotics-oriented systems.",
    mode: "terminal",
  },
];

const reasons = [
  {
    title: "Clean communication",
    text: "I keep the process clear, direct and focused so the project does not get lost in confusion.",
  },
  {
    title: "Product thinking",
    text: "I do not just code features. I think about flow, usability, presentation and long-term structure.",
  },
  {
    title: "Fast iteration",
    text: "I can move quickly, refine details and improve the product without turning the process into chaos.",
  },
  {
    title: "Full-stack coverage",
    text: "From backend logic to interface feel, I can shape the whole system into one consistent product.",
  },
];

const contactFields = [
  { key: "name", label: "Your name", type: "text", placeholder: "Enter your name" },
  { key: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { key: "project", label: "Project type", type: "text", placeholder: "Telegram bot, mini app, mobile app..." },
  { key: "message", label: "Project details", type: "textarea", placeholder: "Write a short summary of what you need" },
];

const timeline = [
  {
    year: "Today",
    title: "Freelance Automation Developer",
    text: "Building high-impact Telegram bots, mini apps and custom internal systems for clients.",
  },
  {
    year: "Growth",
    title: "Product-Oriented Development",
    text: "Transforming one-off requests into cleaner, reusable and scalable digital products.",
  },
  {
    year: "Focus",
    title: "Modern Frontend + Solid Backend",
    text: "Combining motion-rich interfaces with fast API-backed systems that feel premium and perform well.",
  },
];

const faqItems = [
  {
    question: "What kind of projects do you build?",
    answer:
      "Mainly Telegram bots, Telegram Mini Apps, dashboards, mobile applications and custom automation systems.",
  },
  {
    question: "Can you build mobile apps too?",
    answer:
      "Yes. I can work on mobile application development with Java and Dart depending on the project direction.",
  },
  {
    question: "Do you also work on lower-level or robotics code?",
    answer:
      "Yes. For robotics-oriented or lower-level needs, I can write code in C and C++ as well.",
  },
  {
    question: "Do you handle both design feel and backend logic?",
    answer:
      "Yes. I focus on making products both visually strong and technically clean, so the frontend and system layer fit together.",
  },
];

function IconBase({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3z" />
      <path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
    </IconBase>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconBase>
  );
}

function CodeIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M14 4l-4 16" />
    </IconBase>
  );
}

function DatabaseIcon({ className }) {
  return (
    <IconBase className={className}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </IconBase>
  );
}

function GlobeIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </IconBase>
  );
}

function SendIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </IconBase>
  );
}

function MailIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </IconBase>
  );
}

function ChatIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.3 0-2.6-.3-3.7-.8L3 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z" />
    </IconBase>
  );
}

function XIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </IconBase>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M6 9l6 6 6-6" />
    </IconBase>
  );
}

function useReveal(count, interval = 120) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    let current = 0;

    const tick = () => {
      if (!mounted) return;
      current += 1;
      setVisibleCount(current);
      if (current < count) {
        window.setTimeout(tick, interval);
      }
    };

    tick();

    return () => {
      mounted = false;
    };
  }, [count, interval]);

  return visibleCount;
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[8%] h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl sm:h-56 sm:w-56" />
      <div className="absolute right-[6%] top-[14%] h-60 w-60 rounded-full bg-fuchsia-500/16 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-[8%] left-[22%] h-60 w-60 rounded-full bg-violet-500/12 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_25%,transparent_75%,rgba(255,255,255,0.03))]" />
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs">
        <SparklesIcon className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">{title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-white/65 md:text-lg">{text}</p>
    </div>
  );
}

function RuntimeChecks() {
  const results = useMemo(
    () => [
      { name: "projects-min-count", pass: Array.isArray(projects) && projects.length >= 3 },
      { name: "skills-min-count", pass: Array.isArray(skills) && skills.length >= 6 },
      { name: "timeline-min-count", pass: Array.isArray(timeline) && timeline.length >= 3 },
      { name: "marquee-min-count", pass: Array.isArray(marqueeSkills) && marqueeSkills.length >= 8 },
      { name: "playground-min-count", pass: Array.isArray(playgroundItems) && playgroundItems.length >= 3 },
      { name: "reasons-min-count", pass: Array.isArray(reasons) && reasons.length >= 3 },
      { name: "faq-min-count", pass: Array.isArray(faqItems) && faqItems.length >= 3 },
    ],
    []
  );

  useEffect(() => {
    results.forEach((check) => {
      if (!check.pass) {
        console.warn(`[portfolio-check] ${check.name} failed.`);
      }
    });
  }, [results]);

  return null;
}

function AnimatedCard({ children, delay = 0, className = "" }) {
  return (
    <div
      className={`animate-[fadeUp_700ms_ease-out_forwards] opacity-0 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const repeatedItems = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          reverse ? "animate-[marqueeReverse_34s_linear_infinite]" : "animate-[marquee_34s_linear_infinite]"
        }`}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-[12px] text-white/75 backdrop-blur-xl sm:px-4 sm:py-3 sm:text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalPanel() {
  const lines = [
    "> initialize_portfolio --mode premium",
    "> build telegram_bot_system --fast --scalable",
    "> compile mobile_app --java --dart",
    "> upload robotics_module --c --cpp",
    "> deploy dashboard --production",
    "> status: ready_for_selected_projects",
  ];

  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-[#070d1d]/95 p-4 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/90" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 sm:text-xs">system terminal</div>
      </div>

      <div className="space-y-2.5 font-mono text-[12px] leading-6 text-emerald-300/90 sm:text-sm sm:leading-7 md:text-[15px]">
        {lines.map((line, index) => (
          <div
            key={line}
            className="animate-[fadeUp_650ms_ease-out_forwards] opacity-0"
            style={{ animationDelay: `${index * 110}ms` }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ title, text, delay = 0 }) {
  return (
    <AnimatedCard delay={delay}>
      <div className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[0.06] sm:rounded-[1.8rem] sm:p-6">
        <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
          Service
        </div>
        <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
      </div>
    </AnimatedCard>
  );
}

function PlaygroundVisual({ mode }) {
  if (mode === "flow") {
    return (
      <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-[#0b1120]/80 p-3">
        <div className="flex items-center gap-2 text-[11px] text-white/65">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1">User</span>
          <span className="text-white/30">→</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Bot</span>
          <span className="text-white/30">→</span>
          <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-2 py-1">Admin</span>
        </div>
        <div className="mt-3 grid gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/60">
            Start → input → confirm
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/60">
            Approval → sync → result
          </div>
        </div>
      </div>
    );
  }

  if (mode === "dashboard") {
    return (
      <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-[#0b1120]/80 p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2">
            <div className="text-[10px] text-white/40">Users</div>
            <div className="mt-1 text-sm font-semibold text-white">1.2K</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2">
            <div className="text-[10px] text-white/40">Tasks</div>
            <div className="mt-1 text-sm font-semibold text-white">84</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2">
            <div className="text-[10px] text-white/40">Flow</div>
            <div className="mt-1 text-sm font-semibold text-white">Live</div>
          </div>
        </div>
        <div className="mt-3 h-14 rounded-xl border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,0.18),rgba(168,85,247,0.12),rgba(255,255,255,0.04))]" />
      </div>
    );
  }

  if (mode === "code") {
    return (
      <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-[#0b1120]/80 p-3 font-mono text-[11px] leading-6 text-emerald-300/85">
        <div>if approved:</div>
        <div className="text-white/60">&nbsp;&nbsp;sync_records()</div>
        <div className="text-white/60">&nbsp;&nbsp;notify_admin()</div>
        <div>else:</div>
        <div className="text-white/60">&nbsp;&nbsp;request_revision()</div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-[#0b1120]/80 p-3 font-mono text-[11px] leading-6 text-cyan-200/85">
      <div>&gt; init mobile_build</div>
      <div className="text-white/55">&gt; compile dart_module</div>
      <div className="text-white/55">&gt; attach c++ controller</div>
      <div>&gt; status: ready</div>
    </div>
  );
}

function PlaygroundCard({ item, delay = 0 }) {
  return (
    <AnimatedCard delay={delay}>
      <div className="group rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.06] sm:rounded-[1.8rem] sm:p-5">
        <PlaygroundVisual mode={item.mode} />
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200/75 sm:text-xs">
          {item.type}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
      </div>
    </AnimatedCard>
  );
}

function ProjectCard({ project, delay = 0, onOpen }) {
  return (
    <AnimatedCard delay={delay}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group h-full w-full rounded-[1.6rem] border border-white/10 bg-white/5 p-4 text-left backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[0.07] sm:rounded-[2rem] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
            {project.accent}
          </span>
          <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-white/80" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{project.description}</p>

        <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70 sm:text-xs">Project Impact</div>
          <p className="mt-2 text-sm leading-6 text-white/68">{project.result}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 sm:text-xs">
              {item}
            </span>
          ))}
        </div>
      </button>
    </AnimatedCard>
  );
}

function ReasonCard({ item, delay = 0 }) {
  return (
    <AnimatedCard delay={delay}>
      <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl sm:rounded-[1.8rem] sm:p-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70 sm:text-xs">Why work with me</div>
        <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
      </div>
    </AnimatedCard>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
      >
        <span className="text-sm font-medium text-white sm:text-base">{item.question}</span>
        <ChevronDownIcon className={`h-4 w-4 shrink-0 text-white/50 transition ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm leading-7 text-white/62 sm:px-6 sm:pb-6">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 backdrop-blur-md sm:items-center sm:p-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b1120]/95 p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200/75 sm:text-xs">
              {project.accent}
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10"
            aria-label="Close project details"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-white/65">{project.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Goal</div>
            <p className="mt-2 text-sm leading-6 text-white/70">{project.details.goal}</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Solution</div>
            <p className="mt-2 text-sm leading-6 text-white/70">{project.details.solution}</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Outcome</div>
            <p className="mt-2 text-sm leading-6 text-white/70">{project.details.outcome}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 sm:text-xs">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({ name: "", email: "", project: "", message: "" });
  if (!isOpen) return null;

  const handleChange = (key, value) => setFormState((prev) => ({ ...prev, [key]: value }));
  const mailSubject = encodeURIComponent(`New Project Inquiry - ${formState.project || "Portfolio Contact"}`);
  const mailBody = encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.project}\n\nProject Details:\n${formState.message}`
  );
  const mailHref = `mailto:subzeroreiz@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 backdrop-blur-md sm:items-center sm:p-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b1120]/95 p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200/75 sm:text-xs">
              Quick Contact
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Start a project conversation</h3>
            <p className="mt-3 text-sm leading-7 text-white/62">
              Fill this quickly and send it directly to my email, or reach me on Telegram for a faster conversation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10"
            aria-label="Close contact form"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {contactFields.map((field) => (
            <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/45">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={formState[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={5}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-cyan-300/40"
                />
              ) : (
                <input
                  type={field.type}
                  value={formState[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-cyan-300/40"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailHref}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
          >
            <MailIcon className="h-4 w-4" />
            Send via Email
          </a>
          <a
            href="https://t.me/samedbrll"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            <ChatIcon className="h-4 w-4" />
            Continue on Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactDock({ onOpenContact }) {
  return (
    <div className="fixed bottom-2 left-1/2 z-40 w-[calc(100%-0.5rem)] max-w-xl -translate-x-1/2 rounded-[1.2rem] border border-white/10 bg-[#0b1120]/80 p-1.5 shadow-2xl backdrop-blur-2xl sm:bottom-5 sm:w-auto sm:min-w-[420px] sm:rounded-[1.6rem] sm:p-2 md:min-w-[380px]">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <a
          href="https://t.me/samedbrll"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-[1rem] bg-white px-3 py-2.5 text-[12px] font-medium text-black transition hover:scale-[1.02] sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
        >
          <ChatIcon className="h-4 w-4" />
          Telegram
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex items-center justify-center gap-1.5 rounded-[1rem] border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] font-medium text-white/80 transition hover:bg-white/10 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
        >
          <MailIcon className="h-4 w-4" />
          Email
        </button>
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-1.5 rounded-[1rem] border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] font-medium text-white/80 transition hover:bg-white/10 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
        >
          <ArrowRightIcon className="h-4 w-4" />
          Projects
        </a>
      </div>
    </div>
  );
}

export default function AnimeJsPortfolioSite() {
  const rootRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 18 });
  const [activeProject, setActiveProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const projectVisible = useReveal(projects.length, 120);
  const skillVisible = useReveal(skills.length, 55);
  const timelineVisible = useReveal(timeline.length, 140);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setIsContactOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#050816] pb-28 text-white sm:pb-32">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes pulseGlow { 0%,100%{opacity:0.55;} 50%{opacity:0.9;} }
        @keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        @keyframes marqueeReverse { from { transform: translateX(-50%);} to { transform: translateX(0);} }
        @keyframes mouseGlow { 0%,100%{opacity:0.65;} 50%{opacity:1;} }
      `}</style>

      <RuntimeChecks />

      <div
        className="pointer-events-none fixed inset-0 z-0 animate-[mouseGlow_4s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(420px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(56, 189, 248, 0.12), transparent 38%)`,
        }}
      />

      <div className="relative overflow-hidden">
        <BackgroundGlow />

        <div className="absolute inset-0 opacity-40">
          <div className="grid h-full w-full grid-cols-6 px-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="relative border-l border-white/5 last:border-r">
                <div
                  className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent animate-[fadeUp_1000ms_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${i * 90}ms` }}
                />
              </div>
            ))}
          </div>
        </div>

        <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <div className="animate-[fadeUp_700ms_ease-out_forwards] text-sm font-medium tracking-[0.25em] text-white/70">
            SAMED BIRELLI
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {["About", "Projects", "Playground", "Skills", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="animate-[fadeUp_700ms_ease-out_forwards] opacity-0 transition hover:text-white"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        <section className="relative z-10 mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-2 sm:px-6 md:min-h-[86vh] md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-10 md:px-10 md:pb-20 md:pt-10">
          <div className="pt-0">
            <div className="inline-flex animate-[fadeUp_800ms_ease-out_forwards] items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 opacity-0 backdrop-blur-xl">
              <SparklesIcon className="h-4 w-4" />
              
            </div>

            <div className="mt-5 max-w-[820px] space-y-2 text-[42px] font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-[78px]">
              {["I build", "fast, sharp,", "modern digital systems."].map((line, index) => (
                <div
                  key={line}
                  className={`animate-[fadeUp_900ms_ease-out_forwards] opacity-0 ${
                    index === 1 ? "bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent" : ""
                  }`}
                  style={{ animationDelay: `${160 + index * 120}ms` }}
                >
                  {line}
                </div>
              ))}
            </div>

            <p
              className="mt-5 max-w-[760px] animate-[fadeUp_900ms_ease-out_forwards] text-[15px] leading-7 text-white/68 opacity-0 sm:text-base sm:leading-8 md:text-[18px]"
              style={{ animationDelay: "520ms" }}
            >
              I build Telegram bots, mini apps, mobile apps and automation systems that are fast, clean and built to solve real problems. I care about both how a product works and how it feels when people use it.
            </p>

            <div
              className="mt-6 flex animate-[fadeUp_900ms_ease-out_forwards] flex-col gap-3 opacity-0 sm:flex-row sm:gap-4"
              style={{ animationDelay: "650ms" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                View Projects <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Let’s Work Together
              </a>
            </div>

            <div className="mt-8 grid max-w-[760px] gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
              {[
                ["20+", "Delivered Systems"],
                ["Fast", "Execution Focus"],
                ["Full Stack", "Bot to Dashboard"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className="min-h-[104px] rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 opacity-0 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] animate-[fadeUp_800ms_ease-out_forwards] sm:min-h-[120px] sm:rounded-3xl sm:p-5"
                  style={{ animationDelay: `${760 + index * 100}ms` }}
                >
                  <div className="text-2xl font-semibold text-white">{value}</div>
                  <div className="mt-1 text-sm text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:pl-4">
            <div
              className="mx-auto max-w-[560px] rounded-[1.6rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl animate-[fadeUp_900ms_ease-out_forwards] opacity-0 sm:rounded-[2rem] md:max-w-[620px]"
              style={{ animationDelay: "420ms" }}
            >
              <div className="rounded-[1.4rem] border border-white/10 bg-[#0a1023] p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Featured Stack</p>
                    <h3 className="text-xl font-semibold">Development Core</h3>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">2026</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: <CodeIcon className="h-5 w-5" />, title: "Backend Logic", text: "Python, FastAPI, Flask" },
                    { icon: <SendIcon className="h-5 w-5" />, title: "Telegram Ecosystem", text: "Bots, Mini Apps, Flows" },
                    { icon: <DatabaseIcon className="h-5 w-5" />, title: "Data Layer", text: "PostgreSQL, Redis, Sheets" },
                    { icon: <GlobeIcon className="h-5 w-5" />, title: "Frontend UX", text: "Modern, responsive interfaces" },
                  ].map((item, index) => (
                    <AnimatedCard key={item.title} delay={550 + index * 90}>
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3 text-cyan-200">{item.icon}</div>
                        <h4 className="text-base font-semibold">{item.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="relative z-10 mx-auto max-w-[1440px] space-y-12 px-3 py-8 sm:px-6 md:space-y-24 md:px-10 md:py-14">
        <section className="space-y-5 sm:space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Core Stack</p>
              <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Technologies I work with</h3>
            </div>
            <div className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200 md:block">
              Web · Mobile · Robotics
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl md:p-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#050816] to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#050816] to-transparent sm:w-24" />
            <div className="space-y-3">
              <MarqueeRow items={marqueeSkills} />
              <MarqueeRow items={[...marqueeSkills].reverse()} reverse />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="space-y-5">
            <SectionTitle
              eyebrow="System Layer"
              title="A premium feel with real build capability"
              text="I work across automation, web, mobile and robotics-focused development, then shape everything into something that feels modern, reliable and premium from the first interaction."
            />
            <div className="opacity-95">
              <TerminalPanel />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-fuchsia-400/10 p-4 backdrop-blur-2xl sm:p-6 md:rounded-[2rem] md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-[pulseGlow_2.4s_ease-in-out_infinite]" />
              Open for selected projects
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              Building products that look expensive and work properly.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/68">
              From Telegram bots and mini apps to mobile applications in Java and Dart, plus robotics-oriented coding in C and C++, I build systems with both strong technical depth and a polished presentation layer.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-white/45">Focus</div>
                <div className="mt-3 text-lg font-medium text-white">Automation · UX · Performance</div>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-white/45">Coverage</div>
                <div className="mt-3 text-lg font-medium text-white">Web · Mobile · Robotics</div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-8 md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionTitle
            eyebrow="About Me"
            title="Developer mindset with product vision"
            text="I do not just write code. I build complete systems that look polished, solve real bottlenecks and make a product feel stronger from both the technical and user side."
          />

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-white/70 backdrop-blur-2xl animate-[fadeUp_800ms_ease-out_forwards] opacity-0 sm:p-7 md:rounded-[2rem]">
            <p className="text-lg leading-8">
              My main focus is building Telegram bots, mini apps, automation systems, mobile applications and client panels. I care about architecture, user flow, visual quality and speed at the same time.
            </p>
            <p className="mt-5 text-base leading-8 text-white/60">
              Whether it is an internal business tool, a customer-facing mini app, a mobile product or an advanced bot workflow, my goal is always the same: make it clean, scalable and impressive from the first interaction.
            </p>
          </div>
        </section>

        <section id="projects" className="space-y-10">
          <SectionTitle
            eyebrow="Selected Work"
            title="Projects built for real usage"
            text="A mix of automation, product development and interactive systems designed to perform well, feel premium and reflect the kind of work I actually build. Tap a project to view more detail."
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {projects.slice(0, projectVisible).map((project, index) => (
              <ProjectCard key={project.title} project={project} delay={index * 70} onOpen={setActiveProject} />
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionTitle
            eyebrow="Services"
            title="What I can build"
            text="I focus on systems that are not only functional, but also presentable, maintainable and ready for real users."
          />

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ServiceCard title="Telegram Bot Systems" text="Advanced workflows, admin tools, automations, raffles, approval systems and integrations." delay={0} />
            <ServiceCard title="Telegram Mini Apps" text="Interactive mini app interfaces with backend logic, authentication, dashboards and real product flow." delay={90} />
            <ServiceCard title="Mobile Applications" text="App development with Java and Dart for mobile-focused products and business tools." delay={180} />
            <ServiceCard title="Robotics Coding" text="Low-level and robotics-oriented programming support with C and C++ where needed." delay={270} />
          </div>
        </section>

        <section id="playground" className="space-y-8 sm:space-y-10">
          <SectionTitle
            eyebrow="Playground"
            title="Experiments, concepts and interface studies"
            text="A space for showing the more exploratory side of my work, from system ideas to UI direction and product experiments."
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {playgroundItems.map((item, index) => (
              <PlaygroundCard key={item.title} item={item} delay={index * 90} />
            ))}
          </div>
        </section>

        <section id="skills" className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="Skills"
            title="What I work with"
            text="My stack is centered around building reliable systems quickly while keeping the product layer visually strong and modern."
          />

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {skills.slice(0, skillVisible).map((skill, index) => (
              <div
                key={skill}
                className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-[13px] text-white/75 opacity-0 backdrop-blur-xl animate-[fadeUp_500ms_ease-out_forwards] sm:px-4 sm:py-3 sm:text-sm"
                style={{ animationDelay: `${index * 35}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionTitle
            eyebrow="Why Work With Me"
            title="Why clients choose to work with me"
            text="I focus on keeping the project clean, fast-moving and strong on both the technical and product side."
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((item, index) => (
              <ReasonCard key={item.title} item={item} delay={index * 90} />
            ))}
          </div>
        </section>

        <section className="space-y-8 sm:space-y-10">
          <SectionTitle
            eyebrow="Journey"
            title="How I approach projects"
            text="Strong communication, focused execution and product-level thinking are the parts I bring beyond just coding."
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {timeline.slice(0, timelineVisible).map((item, index) => (
              <AnimatedCard key={item.title} delay={index * 90}>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
                  <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">{item.year}</div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionTitle eyebrow="FAQ" title="Common questions" text="A few direct answers about what I build and how I work." />

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8 pb-12 sm:pb-16">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-fuchsia-400/10 p-4 backdrop-blur-2xl sm:p-6 md:rounded-[2rem] md:p-10">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/60">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  Contact
                </p>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl">
                  Have an idea? Let’s turn it into something real.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
                  Whether it is a Telegram bot, a mini app, a mobile application or a business automation system, I can help turn it into something polished, usable and ready to launch.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/samedbrll"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/75 transition hover:bg-white/10"
                >
                  <ChatIcon className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  aria-label="Open contact form"
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/75 transition hover:bg-white/10"
                >
                  <MailIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactDock onOpenContact={() => setIsContactOpen(true)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

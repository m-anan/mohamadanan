"use client";
import { useState, useRef, useEffect, Suspense, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.cjs";
import { Model1 } from "./3d-logo";
import {
  BiHome,
  BiUser,
  BiDetail,
  BiCode,
  BiBarChart,
  BiBriefcase,
  BiEnvelope,
} from "react-icons/bi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionDef {
  id: string;
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  cameraPosition: [number, number, number];
  panelPosition: [number, number, number];
}

// ─── Section config ────────────────────────────────────────────────────────────
// Camera and panel share the same X/Y; panel is always 2 units further in −Z.
// This keeps the panel centered in the default camera view (no rotation needed).

const SECTIONS: SectionDef[] = [
  {
    id: "hero",
    label: "Home",
    Icon: BiHome,
    cameraPosition: [0, 0, 5],
    panelPosition: [0, 0, 2.5],
  },
  {
    id: "about",
    label: "About",
    Icon: BiUser,
    cameraPosition: [-4, 0, -8],
    panelPosition: [-4, 0, -10],
  },
  {
    id: "services",
    label: "Services",
    Icon: BiDetail,
    cameraPosition: [4, 2, -16],
    panelPosition: [4, 2, -18],
  },
  {
    id: "projects",
    label: "Projects",
    Icon: BiCode,
    cameraPosition: [-4, -1, -24],
    panelPosition: [-4, -1, -26],
  },
  {
    id: "skills",
    label: "Skills",
    Icon: BiBarChart,
    cameraPosition: [3, 1, -32],
    panelPosition: [3, 1, -34],
  },
  {
    id: "experience",
    label: "Experience",
    Icon: BiBriefcase,
    cameraPosition: [-3, 2, -40],
    panelPosition: [-3, 2, -42],
  },
  {
    id: "contact",
    label: "Contact",
    Icon: BiEnvelope,
    cameraPosition: [0, 0, -48],
    panelPosition: [0, 0, -50],
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const cooldown = useRef(false);

  const navigate = (dir: 1 | -1) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setTimeout(() => {
      cooldown.current = false;
    }, 800);
    setActiveSection((prev) =>
      Math.min(Math.max(prev + dir, 0), SECTIONS.length - 1)
    );
  };

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch / swipe navigation
  useEffect(() => {
    let touchY = 0;
    const onStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const delta = touchY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      navigate(delta > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <Canvas
        style={{ width: "100vw", height: "100dvh", background: "#080810" }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <CameraController position={SECTIONS[activeSection].cameraPosition} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 20]} intensity={1.5} />
        <pointLight color="#08B4AB" position={[0, 0, 0]} intensity={2} />
        <Stars />
        <Suspense fallback={null}>
          <Model1 position={[-6, 4, -8]} scale={[0.5, 0.5, 0.5]} />
        </Suspense>
        {SECTIONS.map((section) => (
          <HtmlBox key={section.id} position={section.panelPosition}>
            <SectionContent sectionId={section.id} />
          </HtmlBox>
        ))}
      </Canvas>

      {/* Right-side navigation */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3 select-none">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(i)}
            className="group flex items-center gap-2 justify-end cursor-pointer"
          >
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white whitespace-nowrap bg-black/60 px-2 py-0.5 rounded pointer-events-none">
              {section.label}
            </span>
            <span
              className={`rounded-full p-2 transition-all duration-300 ${
                activeSection === i
                  ? "bg-teal-500 scale-125 shadow-lg shadow-teal-500/50"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            >
              <section.Icon size={14} />
            </span>
          </button>
        ))}
      </nav>

      {/* Section label — bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] text-white/50 text-xs tracking-[0.3em] uppercase select-none pointer-events-none">
        {SECTIONS[activeSection].label}
      </div>

      {/* Scroll hint — only on first section */}
      {activeSection === 0 && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-1 text-white/30 text-xs select-none pointer-events-none animate-bounce">
          <span>scroll</span>
          <span>↓</span>
        </div>
      )}
    </div>
  );
};

// ─── Camera controller ────────────────────────────────────────────────────────

function CameraController({ position }: { position: [number, number, number] }) {
  const { camera } = useThree();
  const posVec = useRef(new THREE.Vector3(...position));

  useFrame(() => {
    posVec.current.set(...position);
    camera.position.lerp(posVec.current, 0.03);
  });

  return null;
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars() {
  const ref = useRef<any>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 80 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 600;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c8a0ff"
          size={0.12}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// ─── HtmlBox ──────────────────────────────────────────────────────────────────

function HtmlBox({
  position,
  children,
}: {
  position: [number, number, number];
  children: ReactNode;
}) {
  const mesh = useRef<any>(null);
  const { camera } = useThree();
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useFrame(() => {
    if (!mesh.current) return;
    const dist = camera.position.distanceTo(mesh.current.position);
    const now = dist < 6;
    if (now !== visibleRef.current) {
      visibleRef.current = now;
      setVisible(now);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      {visible && (
        <Html transform distanceFactor={1.5} className="z-50">
          {children}
        </Html>
      )}
    </mesh>
  );
}

// ─── Section content router ───────────────────────────────────────────────────

function SectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "hero":       return <HeroSection />;
    case "about":      return <AboutSection />;
    case "services":   return <ServicesSection />;
    case "projects":   return <ProjectsSection />;
    case "skills":     return <SkillsSection />;
    case "experience": return <ExperienceSection />;
    case "contact":    return <ContactSection />;
    default:           return null;
  }
}

// ─── Panel wrapper ────────────────────────────────────────────────────────────

function Panel({
  children,
  minWidth = "min-w-[420px]",
}: {
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div
      className={`${minWidth} border border-white/15 rounded-xl p-6 bg-black/40 backdrop-blur-sm select-none text-white`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold mb-6 text-white tracking-wide">
      {children}
    </h2>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div className="text-center select-none min-w-[440px] py-4">
      <p className="text-teal-400 text-xs tracking-[0.4em] uppercase mb-3">
        Welcome
      </p>
      <h1 className="text-5xl font-bold text-white mb-3 tracking-wider">
        MOHAMAD ANAN
      </h1>
      <p className="text-gray-400 text-lg tracking-widest uppercase">
        Full Stack Developer
      </p>
      <div className="mt-6 flex justify-center gap-6 text-gray-500 text-sm">
        <span>React</span>
        <span className="text-white/20">·</span>
        <span>Next.js</span>
        <span className="text-white/20">·</span>
        <span>Node.js</span>
        <span className="text-white/20">·</span>
        <span>Three.js</span>
      </div>
      <p className="text-gray-600 text-xs mt-4">Dubai, UAE</p>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

const ABOUT_ROWS = [
  ["Firstname", "Mohamad"],
  ["Lastname", "Anan"],
  ["Age", "25"],
  ["Nationality", "Syrian"],
  ["Address", "Dubai, UAE"],
  ["Phone", "+971 56 866 9305"],
  ["Email", "mohmad2000.an@gmail.com"],
  ["Languages", "Arabic, English"],
] as const;

function AboutSection() {
  return (
    <Panel>
      <SectionTitle>About Me</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {ABOUT_ROWS.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-sm text-gray-200">{value}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Frontend Development",
    desc: "Modern, responsive web apps with React, Next.js and TypeScript.",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3H7c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h6c1.103 0 2-.897 2-2h8c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" />
      </svg>
    ),
  },
  {
    title: "Backend Development",
    desc: "Scalable APIs and server-side systems with Node.js and PostgreSQL.",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Mobile Applications",
    desc: "Cross-platform mobile apps with React Native and Expo.",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
        <path fillRule="evenodd" d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Database Management",
    desc: "Efficient database design, optimization, and administration.",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

function ServicesSection() {
  return (
    <Panel minWidth="min-w-[540px]">
      <SectionTitle>My Services</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="p-4 border border-white/10 rounded-lg flex flex-col items-center gap-3 text-center"
          >
            <div className="w-14 h-14 rounded-full border-2 border-gray-600 flex items-center justify-center text-teal-400">
              {s.icon}
            </div>
            <h3 className="font-semibold text-sm text-white">{s.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    year: "2024",
    desc: "Full-stack online store with cart, payments, and admin dashboard.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    title: "Real-Time Chat App",
    year: "2024",
    desc: "Scalable chat with rooms, file sharing, and push notifications.",
    tech: ["Next.js", "WebSockets", "Redis", "MongoDB"],
  },
  {
    title: "Fitness Tracker Mobile",
    year: "2023",
    desc: "Mobile app for workout logging, progress tracking, and goal setting.",
    tech: ["React Native", "Expo", "Firebase"],
  },
  {
    title: "Portfolio CMS",
    year: "2023",
    desc: "Headless CMS for managing portfolio content with live preview.",
    tech: ["Next.js", "Supabase", "Tailwind"],
  },
];

function ProjectsSection() {
  return (
    <Panel minWidth="min-w-[540px]">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="p-4 border border-white/10 rounded-lg flex flex-col gap-2"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-sm text-white leading-snug">
                {p.title}
              </h3>
              <span className="text-xs text-teal-400 whitespace-nowrap shrink-0">
                {p.year}
              </span>
            </div>
            <p className="text-gray-400 text-xs flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-teal-900/40 text-teal-300 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    label: "Mobile",
    skills: ["React Native", "Expo", "Firebase"],
  },
  {
    label: "DevOps & Tools",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
  },
];

function SkillsSection() {
  return (
    <Panel minWidth="min-w-[480px]">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid grid-cols-2 gap-6">
        {SKILL_GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-teal-400 text-xs uppercase tracking-widest mb-3">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-white/8 text-gray-300 px-3 py-1 rounded-full border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp Dubai",
    period: "2022 – Present",
    desc: "Led the frontend team building enterprise SaaS dashboards for 50k+ users.",
    highlights: [
      "Reduced bundle size by 40%",
      "Migrated to Next.js App Router",
      "Mentored 3 junior developers",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 – 2022",
    desc: "Built and shipped a B2B analytics platform from scratch in 6 months.",
    highlights: [
      "React + Node.js + PostgreSQL stack",
      "Integrated Stripe payment systems",
      "Maintained 99.9% uptime SLA",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Digital Agency Beirut",
    period: "2020 – 2021",
    desc: "Developed marketing websites and e-commerce stores for 20+ clients.",
    highlights: [
      "WordPress, React, PHP",
      "SEO optimization across all projects",
      "Client-facing delivery and support",
    ],
  },
];

function ExperienceSection() {
  return (
    <Panel minWidth="min-w-[520px]">
      <SectionTitle>Experience</SectionTitle>
      <div className="flex flex-col gap-6">
        {EXPERIENCES.map((exp) => (
          <div key={exp.role} className="border-l-2 border-teal-500/40 pl-4 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-teal-500" />
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="font-semibold text-sm text-white">{exp.role}</h3>
              <span className="text-xs text-teal-400 whitespace-nowrap ml-4">
                {exp.period}
              </span>
            </div>
            <p className="text-gray-500 text-xs mb-1">{exp.company}</p>
            <p className="text-gray-300 text-xs mb-2">{exp.desc}</p>
            <ul className="flex flex-col gap-1">
              {exp.highlights.map((h) => (
                <li key={h} className="text-xs text-gray-400 flex gap-1.5">
                  <span className="text-teal-400 shrink-0">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const CONTACT_ROWS = [
  ["Email", "mohmad2000.an@gmail.com"],
  ["Phone", "+971 56 866 9305"],
  ["Location", "Dubai, UAE"],
  ["LinkedIn", "/in/mohamad-anan"],
  ["GitHub", "github.com/m-anan"],
] as const;

function ContactSection() {
  return (
    <Panel minWidth="min-w-[400px]">
      <SectionTitle>Contact</SectionTitle>
      <div className="flex flex-col gap-4 mb-6">
        {CONTACT_ROWS.map(([label, value]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-teal-400 text-xs uppercase tracking-wider w-20 shrink-0">
              {label}
            </span>
            <span className="text-gray-300 text-sm">{value}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4 text-center">
        <p className="text-gray-500 text-xs">
          Open to full-time positions and freelance projects worldwide.
        </p>
      </div>
    </Panel>
  );
}

export default Home;

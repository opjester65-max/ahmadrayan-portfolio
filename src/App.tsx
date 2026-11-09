import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  BookOpen, 
  Layers, 
  Terminal as TerminalIcon, 
  ShieldCheck, 
  Code, 
  Workflow, 
  Database,
  ArrowRight,
  ChevronRight,
  Info,
  Award,
  Github,
  Linkedin,
  Mail
} from "lucide-react";

import Header from "./components/Header";
import Terminal from "./components/Terminal";
import ContactForm from "./components/ContactForm";
import ResumeModal from "./components/ResumeModal";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import SplitText from "./components/SplitText/SplitText";
import ClickSpark from "./components/ClickSpark/ClickSpark";
import Ribbons from "./components/Ribbons/Ribbons";

import LatticeLoader from "./components/LatticeLoader/LatticeLoader";
import LogoLoop, { LogoItem } from "./components/LogoLoop/LogoLoop";
import BranchedMenu from "./components/BranchedMenu/BranchedMenu";
import GooeyNav from "./components/GooeyNav/GooeyNav";

import { 
  PORTFOLIO_METRIC_CARDS, 
  PROJECTS_DATA, 
  EXPERIENCE_DATA, 
  SKILL_CATEGORIES, 
  EDUCATION_DATA,
  ACHIEVEMENTS_DATA,
  CERTIFICATIONS_DATA
} from "./data";

const TECH_ECOSYSTEM_LOGOS: LogoItem[] = [
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#3776AB]/15 border border-[#3776AB]/30 text-[#4B8BBE]">Python 3.12</span>,
    title: "Python (Asyncio / Pydantic)",
    hoverColor: "#3776AB"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#05998B]/15 border border-[#05998B]/30 text-[#009688]">FastAPI</span>,
    title: "FastAPI Production Microservices",
    hoverColor: "#05998B"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#61DAFB]/15 border border-[#61DAFB]/30 text-[#61DAFB]">React 18</span>,
    title: "React 18 SPA Architecture",
    hoverColor: "#61DAFB"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white">Next.js</span>,
    title: "Next.js Edge Streaming",
    hoverColor: "#FFFFFF"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#3178C6]/15 border border-[#3178C6]/30 text-[#3178C6]">TypeScript</span>,
    title: "TypeScript Enterprise Strict",
    hoverColor: "#3178C6"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#00599C]/15 border border-[#00599C]/30 text-[#00599C]">C++ POSIX</span>,
    title: "C++ (Bloom Filters / Treaps / Chroot)",
    hoverColor: "#00599C"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#512BD4]/15 border border-[#512BD4]/30 text-[#754be0]">C# / .NET</span>,
    title: "C# / WinForms & x86 P/Invoke Bridge",
    hoverColor: "#512BD4"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#2496ED]/15 border border-[#2496ED]/30 text-[#2496ED]">Docker</span>,
    title: "Docker Containerized Infrastructure",
    hoverColor: "#2496ED"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#336791]/15 border border-[#336791]/30 text-[#336791]">PostgreSQL</span>,
    title: "PostgreSQL ACID Event Logs",
    hoverColor: "#336791"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#3ECF8E]/15 border border-[#3ECF8E]/30 text-[#3ECF8E]">Supabase</span>,
    title: "Supabase Relational Auth & RLS",
    hoverColor: "#3ECF8E"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#a855f7]/15 border border-[#a855f7]/30 text-[#a855f7]">Gemini AI</span>,
    title: "Gemini 2.5 / Multi-Modal ReAct",
    hoverColor: "#a855f7"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#14F195]/15 border border-[#14F195]/30 text-[#14F195]">Solana</span>,
    title: "Solana Verifiable Agent Registry",
    hoverColor: "#14F195"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#29B5E8]/15 border border-[#29B5E8]/30 text-[#29B5E8]">Snowflake</span>,
    title: "Snowflake Structured CoCo Data",
    hoverColor: "#29B5E8"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#FF6584]/15 border border-[#FF6584]/30 text-[#FF6584]">n8n Agents</span>,
    title: "n8n Stateful Autonomous Sequences",
    hoverColor: "#FF6584"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8]">Tailwind CSS</span>,
    title: "Tailwind CSS Design Systems",
    hoverColor: "#38BDF8"
  },
  {
    node: <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white">Three.js</span>,
    title: "Three.js & React Three Fiber (GLTF)",
    hoverColor: "#ffffff"
  }
];

const ARCHITECTURE_BRANCH_ITEMS = [
  {
    label: "Frontier AI & Autonomous Agents",
    children: [
      { value: "rag", label: "Production RAG Pipelines & Embeddings", icon: Workflow },
      { value: "fastapi", label: "FastAPI Contracts & Self-Healing Retries", icon: Cpu },
      { value: "agentic", label: "Multi-Agent Workflows (n8n / ReAct)", icon: Sparkles },
      { value: "vision", label: "YOLOv8 & Deep SORT Tracking", icon: Layers }
    ]
  },
  {
    label: "Low-Level & Algorithmic Systems",
    children: [
      { value: "shell", label: "POSIX Shell & DJB2/SDBM Bloom Filter", icon: TerminalIcon },
      { value: "pinvoke", label: "C# P/Invoke to 32-bit x86 NASM DLL", icon: Code },
      { value: "metering", label: "Micro-Cent Precision Billing Engine", icon: ShieldCheck }
    ]
  },
  {
    label: "Enterprise Cloud & Data Topology",
    children: [
      { value: "relational", label: "15+ Normalized PostgreSQL/T-SQL Tables", icon: Database },
      { value: "websockets", label: "Persistent WebSocket Real-Time Relays", icon: ArrowUpRight },
      { value: "docker", label: "Containerized Microservices on Docker", icon: Layers }
    ]
  }
];

const BRANCH_DETAILS: Record<string, { title: string; subtitle: string; benchmark: string; desc: string; tags: string[] }> = {
  rag: {
    title: "Production RAG Answer Flows & Knowledge Graphs",
    subtitle: "Enterprise Vector Retrieval & Structured Generation",
    benchmark: "Sub-120ms Vector Retrieval Latency • 99.4% Recall",
    desc: "Engineered retrieval-augmented generation pipelines coupling dense vector embeddings with strict schema-constrained LLM inferences for deterministic question answering.",
    tags: ["Pinecone", "pgvector", "LangChain", "FastAPI", "Cosine Sim"]
  },
  fastapi: {
    title: "FastAPI Contracts & Self-Healing Microservices",
    subtitle: "Async REST APIs with Pydantic Validation Layers",
    benchmark: "Zero-Schema-Failure Policy • Automated Quarantine Logs",
    desc: "Rigorous API endpoint contracts defining schemas, HTTP status codes, and multi-tier exception handlers prior to deployment, eliminating schema drift.",
    tags: ["Python 3.12", "FastAPI", "Pydantic v2", "Asyncio", "Docker"]
  },
  agentic: {
    title: "Autonomous Multi-Agent Orchestration",
    subtitle: "ReAct Agent Frameworks & Production n8n Workflows",
    benchmark: "Stateful Branching Logic • Automated Retry Mechanisms",
    desc: "Designing multi-agent workflows where specialized autonomous agents perform tool calling, structured extraction, automated verification, and external webhook triggers.",
    tags: ["n8n", "ReAct", "Gemini API", "Make.com", "Function Calling"]
  },
  vision: {
    title: "Computer Vision Analytics & Object Tracking",
    subtitle: "YOLOv8 + Deep SORT High-Throughput Pipelines",
    benchmark: "60 FPS Real-Time Inference • Multi-Object Tracking",
    desc: "Trained and benchmarked edge vision models for rapid object detection, custom ROI segmentation, and multi-object persistent tracking under varying lighting conditions.",
    tags: ["YOLOv8", "Deep SORT", "OpenCV", "PyTorch", "CUDA"]
  },
  shell: {
    title: "Custom UNIX Algorithmic Shell (POSIX)",
    subtitle: "Algorithmic Security Shield & Memory Isolation",
    benchmark: "<5% False Positives (DJB2/SDBM) • Chroot Sandboxing",
    desc: "Engineered a custom POSIX command-line shell with dual-hash Bloom Filter malware scanning, Treap-backed Trie autocompletion, and hardware-isolated chroot jailing.",
    tags: ["C++", "POSIX API", "Bloom Filter", "Treap", "Chroot Sandbox"]
  },
  pinvoke: {
    title: "Managed-to-Unmanaged P/Invoke Assembly Bridge",
    subtitle: "C# WinForms to 32-bit x86 NASM DLL Integration",
    benchmark: "4-Bit Bitwise Data Packing • Zero Memory Segfaults",
    desc: "Architected a dual-runtime educational system connecting high-level C# WinForms to low-level 32-bit x86 Assembly code via P/Invoke with manual stack frame control.",
    tags: ["C# .NET", "x86 Assembly", "NASM", "P/Invoke", "Bitwise Registers"]
  },
  metering: {
    title: "Micro-Cent Precision Metering & Billing Engine",
    subtitle: "High-Volume FinTech Event Ingestion Pipeline",
    benchmark: "Integer Micro-Cent Math • 100% Idempotency Keys",
    desc: "Asynchronous HTTP metering engine built with Python & FastAPI using integer-based micro-cent precision to eliminate floating-point rounding errors and revenue leakage.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Stripe API", "Idempotency"]
  },
  relational: {
    title: "Relational DBMS & Stored Procedure Engines",
    subtitle: "15+ Normalized Tables with Referential Integrity",
    benchmark: "54 Stored Procedures • 17 Triggers • 18 UDFs",
    desc: "Engineered multi-tenant database systems enforcing third normal form (3NF), complex business rules via triggers, and ACID-compliant transaction rollbacks.",
    tags: ["PostgreSQL", "T-SQL", "SQL Server", "EF Core", "ACID"]
  },
  websockets: {
    title: "Real-Time WebSocket Hubs & Persistent State",
    subtitle: "Bidirectional Low-Latency Client-Server Sync",
    benchmark: "<15ms Broadcast Latency • Multi-Room Isolation",
    desc: "Full-stack real-time communication platform (LawLedge) utilizing Socket.IO and Node.js for live complaint filing, automated PDF generation, and multi-role messaging.",
    tags: ["Socket.IO", "Node.js", "WebSockets", "React 18", "jsPDF"]
  },
  docker: {
    title: "Containerized Microservices & Cloud Topologies",
    subtitle: "Docker Compose & Production Edge Deployments",
    benchmark: "Multi-Stage Dockerfiles • Lightweight Alpine Base",
    desc: "Containerizing backend APIs, background workers, and PostgreSQL databases for predictable execution across cloud VMs and isolated local test runners.",
    tags: ["Docker", "Docker Compose", "CI/CD", "Linux", "Nginx"]
  }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ai-backend" | "fullstack" | "lowlevel">("all");
  const [selectedBranch, setSelectedBranch] = useState("rag");

  useEffect(() => {
    // Set standard class on root window element for tailwind v4 dark: variants
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#050505";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  }, [darkMode]);

  // Dynamic Animated Favicon System - Circular Avatar with Orbiting System Indicator
  useEffect(() => {
    let favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://i.ibb.co/cH6KCRb/Avatra-bg-remove.png';

    let angle = 0;
    let timerId: any;
    let imgLoaded = false;

    img.onload = () => {
      imgLoaded = true;
    };

    const updateFavicon = () => {
      ctx.clearRect(0, 0, 32, 32);

      // Clip central circular avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(16, 16, 11, 0, Math.PI * 2);
      ctx.clip();

      if (imgLoaded) {
        ctx.drawImage(img, 4, 4, 24, 24);
      } else {
        // Fallback indicator if image loading or CORS fails
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A', 16, 16);
      }
      ctx.restore();

      // Outer track ring
      ctx.beginPath();
      ctx.arc(16, 16, 13.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbiting emerald dot indicating system operation status
      const dotX = 16 + 13.5 * Math.cos(angle);
      const dotY = 16 + 13.5 * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      favicon.href = canvas.toDataURL('image/png');
      angle += 0.12;
      timerId = setTimeout(updateFavicon, 100);
    };

    updateFavicon();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // Height of sticky header with comfortable spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const filteredProjects = PROJECTS_DATA.filter(proj => {
    if (activeTab === "all") return true;
    if (activeTab === "ai-backend") {
      return proj.category.includes("AI") || 
             proj.category.includes("BACKEND") || 
             proj.tags.includes("FastAPI") || 
             proj.tags.includes("OpenRouter API") || 
             proj.tags.includes("Gemini API");
    }
    if (activeTab === "fullstack") {
      return proj.category.includes("FULL-STACK") || 
             proj.category.includes("ENTERPRISE") || 
             proj.tags.includes("React 18") || 
             proj.tags.includes("Supabase") ||
             proj.tags.includes("Socket.IO");
    }
    if (activeTab === "lowlevel") {
      return proj.category.includes("MATH_SIMULATION") || 
             proj.category.includes("LOW_LEVEL") || 
             proj.category.includes("DEEP-TECH") || 
             proj.category.includes("SECURITY") || 
             proj.tags.includes("C++") || 
             proj.tags.includes("NASM") || 
             proj.tags.includes("x86 Assembly");
    }
    return true;
  });

  return (
    <ClickSpark
      sparkColor={darkMode ? "#10b981" : "#2563eb"}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
    >
      <div className="min-h-screen bg-bg-primary text-text-secondary transition-colors duration-300">
        {/* Top Banner Message for Recruiter */}
        <div className="bg-bg-secondary border-b border-border-color py-2.5 text-center font-mono text-[10px] uppercase tracking-widest px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-800 dark:text-emerald-500 font-bold">SYSTEM REPORT: PORTAL OPERATIONAL</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden sm:inline text-neutral-600 dark:text-neutral-400">SECURE CONNECTIVITY SYSTEM ACTIVE</span>
          </div>
          <button 
            onClick={() => handleScrollToSection("contact")}
            className="text-[10px] font-bold text-neutral-800 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
          >
            <span>INITIATE RECRUITER CHECK-IN</span>
            <ArrowRight className="w-3 h-3 text-emerald-500" />
          </button>
        </div>
      </div>

      {/* Header System Panel */}
      <Header 
        darkMode={darkMode} 
        onToggleTheme={() => setDarkMode(!darkMode)} 
        onScrollToSection={handleScrollToSection}
        onVerifyRecord={() => setIsModalOpen(true)}
      />

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 scroll-mt-24" id="hero-top">
        
        {/* SECTION 1: HERO & EXECUTIVE SUMMARY */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-250/60 dark:border-neutral-800/80 bg-gradient-to-b from-neutral-900/10 via-[#06070a]/40 to-[#040507]/90 dark:from-[#0c0d14]/60 dark:via-[#07080d]/80 dark:to-[#040508] p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl transition-all duration-500 min-h-[calc(100vh-120px)] lg:min-h-[780px] flex flex-col justify-center">
          
          {/* Ambient soft glow & emerald aura depth behind portrait */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/12 dark:bg-emerald-600/16 blur-[130px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 dark:bg-emerald-600/12 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#14b8a6', '#06b6d4'] : ['#059669', '#0d9488', '#0891b2']}
              baseSpring={0.012}
              baseFriction={0.93}
              baseThickness={12}
              offsetFactor={0.02}
              maxAge={900}
              pointCount={50}
              speedMultiplier={0.3}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-14">
            {/* Top Status Bar: Brand & Pulsing State with LatticeLoader */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/40 dark:border-neutral-800/60 pb-5"
            >
              <div className="inline-flex items-center space-x-3 bg-neutral-900/50 dark:bg-neutral-950/70 border border-neutral-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
                <LatticeLoader
                  status="done"
                  label="TELEMETRY"
                  doneLabel="SYSTEM CORE: ONLINE"
                  pattern="orbit"
                  grid={3}
                  shape="round"
                  cellSize={4}
                  gap={1.5}
                  fontSize={10}
                  glow={true}
                  glowColor="#10b981"
                  doneColor="#10b981"
                  showTimer={false}
                />
                <span className="w-px h-3 bg-neutral-700/80 hidden sm:inline" />
                <span className="text-[10px] font-mono font-medium tracking-wide text-neutral-400 dark:text-neutral-400 hidden sm:inline">
                  OPEN TO REMOTE SWE / AI ENGINEERING ROLES GLOBALLY
                </span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>EXECUTIVE INGRESS</span>
              </div>
            </motion.div>

            {/* Main 3-Column Mindly + Brutalist Hero Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
              
              {/* Left Column: Bold Typographic Hierarchy (lg:col-span-5) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 space-y-6 text-left"
              >
                {/* Refined Emerald Accent Hairline */}
                <div className="w-14 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block">
                    3rd-Year CS Student &bull; AI Engineer &bull; Hackathon Winner &bull; Startup Founder
                  </span>
                  
                  <div className="space-y-1">
                    <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-neutral-950 dark:text-white font-sans leading-[1.05]">
                      I'm Ahmad, an
                    </h1>
                    <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans leading-[1.05] drop-shadow-sm">
                      AI Systems Architect.
                    </h1>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-400 dark:text-neutral-400 font-light leading-relaxed max-w-md font-sans">
                  Backend AI Intern @ FlyRank AI &bull; 1st Place MLH Hackathon &bull; President @ AUSC &bull; Building production systems. Open to remote SWE / AI Engineering roles globally.
                </p>

                {/* Primary Action Button Cluster */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => handleScrollToSection("trajectory")}
                    className="group px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_32px_rgba(16,185,129,0.5)] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Explore Trajectory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleScrollToSection("proof")}
                    className="px-4 py-3 rounded-xl border border-neutral-700/80 hover:border-emerald-500/60 bg-neutral-900/40 text-neutral-300 hover:text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    View Systems
                  </button>
                </div>
              </motion.div>

              {/* Middle Column: Contemplative Portrait with Brutalist Emerald Outline & Floating Mindly UI Cards (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 w-full flex flex-col justify-center items-center py-4 relative z-20"
              >
                <div className="relative flex items-center justify-center w-full max-w-sm sm:max-w-md mx-auto">
                  
                  {/* Floating Mindly-style Card Top-Left */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -left-6 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#060b09]/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">1st Place MLH</span>
                      <span className="text-xs font-bold text-white block">MandiLinkAI</span>
                    </div>
                  </motion.div>

                  {/* Floating Mindly-style Card Bottom-Right */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -right-6 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#060b09]/90 backdrop-blur-xl border border-teal-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">Production RAG</span>
                      <span className="text-xs font-bold text-white block">FastAPI &bull; FlyRank</span>
                    </div>
                  </motion.div>

                  {/* BRUTALIST GRAPHIC EMERALD/TEAL OUTLINE FRAME */}
                  <div className="relative group">
                    {/* Multi-layered Brutalist Neon Emerald Cutout Silhouette Glow */}
                    <div className="absolute -inset-1.5 rounded-[2.25rem] bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 opacity-80 blur-[10px] group-hover:opacity-100 group-hover:blur-[14px] transition-all duration-500" />
                    
                    {/* Architectural Sharp Outline Shell */}
                    <div className="relative rounded-[2rem] p-1.5 bg-gradient-to-b from-emerald-400 via-emerald-600 to-teal-800 shadow-[0_0_50px_rgba(16,185,129,0.35)]">
                      <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-[1.75rem] overflow-hidden bg-[#040706] border border-emerald-500/40 flex items-center justify-center">
                        
                        {/* Contemplative Upward Portrait */}
                        <img
                          src="https://i.ibb.co/JFjpTxs0/Firefly.png"
                          alt="Ahmad Rayan Qasim - AI Systems Architect"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                        />

                        {/* Subtle atmospheric vignette gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040706]/80 via-transparent to-transparent pointer-events-none" />

                        {/* Live badge overlay inside portrait frame */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#060b09]/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                          <span className="font-bold uppercase tracking-wider">Ahmad Rayan Qasim</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Right Column: About, Work, and Follow Me (lg:col-span-3) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-7 text-left"
              >
                {/* ABOUT ME SECTION */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 hover:border-emerald-500/30 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase block">
                    ABOUT ME
                  </span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    3rd-Year CS Student at Air University (CGPA: 3.55 | DSA: 12/12). 1st Place MLH Hackathon Winner. Specializing in RAG pipelines, FastAPI microservices, and autonomous multi-agent orchestration.
                  </p>
                  <button
                    onClick={() => handleScrollToSection("trajectory")}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-emerald-400 flex items-center gap-1 transition-colors group cursor-pointer pt-1"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* MY WORK SECTION */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 hover:border-emerald-500/30 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase block">
                    MY WORK
                  </span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Real-time portals (LawLedge), micro-cent usage metering engines, low-level x86/C++ systems, and commercial AI agency solutions.
                  </p>
                  <button
                    onClick={() => handleScrollToSection("proof")}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-emerald-400 flex items-center gap-1 transition-colors group cursor-pointer pt-1"
                  >
                    <span>BROWSE PORTFOLIO</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* FOLLOW ME SECTION */}
                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-widest uppercase block">
                    FOLLOW ME
                  </span>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="https://github.com/ahmadrayan-create"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-neutral-800/50 hover:bg-emerald-600/20 text-neutral-400 hover:text-white border border-neutral-700/60 hover:border-emerald-500/40 transition-all"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/ahmad-rayan-2a1785261"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-neutral-800/50 hover:bg-emerald-600/20 text-neutral-400 hover:text-white border border-neutral-700/60 hover:border-emerald-500/40 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    </a>
                    <button
                      onClick={() => handleScrollToSection("contact")}
                      className="p-2 rounded-lg bg-neutral-800/50 hover:bg-emerald-600/20 text-neutral-400 hover:text-white border border-neutral-700/60 hover:border-emerald-500/40 transition-all cursor-pointer"
                      title="Email Direct Signal"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>

            </div>

            {/* Bottom Row Section: Persistent Foundation & Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-neutral-200/40 dark:border-neutral-800/60 items-start"
            >
              
              {/* Left text: Persistent Foundation */}
              <div className="lg:col-span-6 space-y-3 text-left">
                <span className="text-[10px] font-mono font-bold text-emerald-500 dark:text-emerald-400 tracking-widest uppercase block">
                  / PERSISTENT FOUNDATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white font-sans">
                  Developing Intelligent Solutions Since 2020
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans max-w-md">
                  Operations are verified across sandboxed execution tests to guarantee absolute runtime reliability and memory-efficient data optimization.
                </p>
              </div>

              {/* Right stats */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-4">
                {PORTFOLIO_METRIC_CARDS.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 hover:border-emerald-500/30 transition-all text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                      {metric.value.split(" ")[0]}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider leading-tight pt-1">
                      {metric.label}
                    </div>
                    <div className="text-[9px] text-neutral-400 dark:text-neutral-400 font-light font-sans truncate pt-0.5">
                      {metric.institution}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Elevated Dynamic Tech & Institutional Ecosystem: React Bits LogoLoop */}
            <div className="pt-8 border-t border-neutral-200/30 dark:border-neutral-800/40 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-400 tracking-widest uppercase">
                    Institutional Ecosystem &amp; Proven Engagements
                  </span>
                </div>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider hidden sm:inline">
                  Interactive Physics Loop • Drag or Hover
                </span>
              </div>
              <LogoLoop 
                items={TECH_ECOSYSTEM_LOGOS}
                speed={38}
                pauseOnHover={true}
                tiltEffect={true}
                fadeEdges={true}
                className="py-1"
              />
            </div>

          </div>
        </section>

        {/* SECTION 2: PROFESSIONAL TRAJECTORY (ELEVATED VERTICAL TIMELINE) */}
        <section id="trajectory" className="space-y-12 scroll-mt-24">
          <div className="space-y-2 border-b border-border-color pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase block">
                01 // Professional Path
              </span>
              <SplitText
                text="Professional Trajectory"
                tag="h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary"
                delay={30}
                duration={0.7}
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              CONNECTING VERIFIED ENGINEERING POSTS
            </span>
          </div>

          {/* Elevated Vertical Timeline with central connecting line */}
          <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-2.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500/50 before:to-transparent">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-6 sm:-left-10 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-[#040706] border-2 border-emerald-500 group-hover:border-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                </div>

                {/* Card Container */}
                <div className="relative grid md:grid-cols-12 gap-6 bg-gradient-to-b from-[#06120d]/70 to-[#040706]/85 border border-neutral-800/80 hover:border-emerald-500/50 p-6 sm:p-7 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300">
                  
                  {/* Subtle top glare highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

                  {/* Badge */}
                  <span className="absolute top-5 right-5 font-mono text-[10px] text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25 pointer-events-none select-none uppercase tracking-wider font-bold">
                    {exp.badge || (exp.isVenture ? "Venture Enterprise" : "Corporate Placement")}
                  </span>

                  {/* Left Company Column */}
                  <div className="md:col-span-4 space-y-2.5">
                    <span className="text-xs font-mono text-emerald-400/90 block font-semibold">
                      {exp.period}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">
                        {exp.role}
                      </p>
                      {exp.link && (
                        <div className="pt-1.5 select-all">
                          <span className="text-[10px] font-mono font-medium text-neutral-400 block uppercase">
                            Live Production System:
                          </span>
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-semibold break-all pt-0.5"
                          >
                            {exp.link.replace("https://", "")}
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Bullets / Pillars Column */}
                  <div className="md:col-span-8">
                    {exp.isVenture && exp.pillars ? (
                      <div className="space-y-6">
                        <p className="text-sm text-neutral-200 font-medium font-sans border-l-2 border-emerald-500 pl-3 leading-relaxed">
                          {exp.tagline}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {exp.pillars.map((pillar, pIdx) => (
                            <div 
                              key={pIdx} 
                              className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl space-y-2 hover:border-emerald-500/40 transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                  0{pIdx + 1}
                                </span>
                                <h4 className="text-xs font-mono font-extrabold uppercase tracking-wide text-white">
                                  {pillar.title}
                                </h4>
                              </div>
                              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                                {pillar.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                          <button
                            onClick={() => handleScrollToSection("contact")}
                            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md shadow-emerald-900/20 active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Discuss Your Project</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="text-[9px] font-mono text-neutral-400 font-bold">
                            * DIRECT CONSULTATION GATEWAY ACTIVE
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-neutral-300 leading-relaxed font-light flex items-start space-x-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Performance Commendation Strip */}
                    {!exp.isVenture && (
                      <div className="mt-5 p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-xs flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-neutral-300 font-light leading-snug font-sans">
                          {exp.company.includes("FlyRank") ? (
                            <>
                              <strong>Production AI Architecture:</strong> Standardizing strict API schemas, retrieval-backed RAG answer flows, and automated test rubrics transitioning experimental AI to predictable production.
                            </>
                          ) : exp.company.includes("SafeX") ? (
                            <>
                              <strong>Production ML Pipelines:</strong> Bridging algorithmic models with automated preprocessing and variance reduction for distributed enterprise environments.
                            </>
                          ) : exp.company.includes("Nobel") ? (
                            <>
                              <strong>Global Leadership Cohort:</strong> Engaging in weekly high-frequency cross-cultural leadership modules, strategic technological transformation, and international execution.
                            </>
                          ) : (
                            <>
                              <strong>Executive Commendation (Cert CA/SE1/26599):</strong> Formally recommended with Letter of Recommendation from Founder & CEO Sorticri for exceptional analytical prowess, high productivity, and rapid adaptation.
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2.5: ACHIEVEMENTS & LEADERSHIP */}
        <section id="achievements" className="space-y-10 scroll-mt-24">
          <div className="space-y-2 border-b border-border-color pb-4">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
              01.5 // Distinguished Impact
            </span>
            <SplitText
              text="Achievements & Leadership"
              tag="h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary"
              delay={35}
              duration={0.7}
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS_DATA.map((ach, idx) => (
              <div 
                key={idx}
                className="group bg-bg-primary border border-border-color rounded-lg overflow-hidden hover:scale-[1.01] hover:border-emerald-500 hover:shadow-sm transition-all duration-300 flex flex-col h-full"
              >
                {/* Full-View Image Container with zero cutoffs */}
                <div className="relative overflow-hidden h-52 sm:h-56 border-b border-border-color bg-neutral-900/40 dark:bg-neutral-950/80 flex items-center justify-center p-2">
                  {/* Subtle blurred backdrop to complement natural image boundaries */}
                  <img 
                    src={ach.image} 
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110 pointer-events-none select-none"
                  />
                  <img 
                    src={ach.image} 
                    alt={`${ach.role} - ${ach.organization}`}
                    referrerPolicy="no-referrer"
                    className="relative z-10 max-h-full max-w-full object-contain rounded shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-text-secondary uppercase font-bold tracking-wider block">
                      {ach.organization}
                    </span>
                    <h3 className="text-sm font-bold text-text-primary tracking-tight">
                      {ach.role}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary leading-relaxed font-light">
                      {ach.impact}
                    </p>
                  </div>

                  {/* Verification action */}
                  <div className="pt-2 border-t border-border-color flex items-center justify-between">
                    <a 
                      href={ach.credentialUrl || ach.image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Full Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    
                    <span className="text-[8px] font-mono text-text-secondary font-semibold uppercase">
                      verified [sha256]
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subsection: Major Certifications & Technical Honors */}
          <div className="pt-10 border-t border-border-color space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                  Major Certifications & Technical Honors
                </h3>
              </div>
              <p className="text-xs text-text-secondary font-sans font-light">
                Verified industry credentials spanning frontier LLM agent orchestration, AI software engineering, advanced analytics, and executive recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-bg-primary border border-border-color rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500 hover:shadow-sm transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono text-text-secondary">
                        {cert.period}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-text-primary tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-text-secondary leading-relaxed font-light font-sans">
                      {cert.highlight}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-color space-y-2.5">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-[9px] font-mono bg-bg-secondary px-1.5 py-0.5 rounded text-text-secondary border border-border-color"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono pt-1 text-text-secondary">
                      {cert.credentialId ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          ID: {cert.credentialId}
                        </span>
                      ) : (
                        <span className="uppercase">Formal Accreditation</span>
                      )}
                      <span className="uppercase text-text-secondary font-medium">Verified Record</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE COMPETENCIES & TECH STACK (THE BLUEPRINT) */}
        <section id="blueprint" className="space-y-10 scroll-mt-24">
          <div className="space-y-3 border-b border-border-color pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
                02 // Framework Matrix
              </span>
              <SplitText
                text="The Blueprint (Core Competencies)"
                tag="h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary"
                delay={25}
                duration={0.7}
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
            </div>
            <a 
              href="https://github.com/ahmadrayan-create" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all flex items-center gap-2 bg-bg-secondary border border-border-color px-3 py-2 rounded-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>Active daily contributor. View latest commits and structural patterns on my GitHub profile.</span>
            </a>
          </div>

          {/* Interactive Systems Topology & Branching Architecture Tree: React Bits BranchedMenu */}
          <div className="p-6 rounded-2xl bg-[#060b09]/80 backdrop-blur-xl border border-neutral-800/80 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Interactive Systems Architecture &amp; Engineering Topology
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Click Branch Node to Inspect Live Specs
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: BranchedMenu Tree */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-[#040706]/70 border border-neutral-800/50 overflow-x-auto">
                <BranchedMenu
                  items={ARCHITECTURE_BRANCH_ITEMS}
                  selectedValue={selectedBranch}
                  onSelect={(val) => setSelectedBranch(val)}
                  accentColor="#10b981"
                  badge="SYSTEMS TREE"
                />
              </div>

              {/* Right Column: Live Architectural Node Inspector */}
              <div className="lg:col-span-7">
                {BRANCH_DETAILS[selectedBranch] && (
                  <motion.div
                    key={selectedBranch}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-[#06120d] via-[#060b09] to-[#040706] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] space-y-5 text-left"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          {BRANCH_DETAILS[selectedBranch].subtitle}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          VERIFIED RUNTIME
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {BRANCH_DETAILS[selectedBranch].title}
                      </h4>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{BRANCH_DETAILS[selectedBranch].benchmark}</span>
                    </div>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {BRANCH_DETAILS[selectedBranch].desc}
                    </p>

                    <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                        Production Tooling &amp; Stack Primitives
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {BRANCH_DETAILS[selectedBranch].tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-700/80 font-mono text-[10px] text-neutral-300 hover:border-emerald-500/40 hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              // Custom matching iconography
              let headerIcon = <Code className="w-4 h-4 text-emerald-500" />;
              if (cat.category.includes("AI")) headerIcon = <Workflow className="w-4 h-4 text-teal-400" />;
              if (cat.category.includes("Databases")) headerIcon = <Database className="w-4 h-4 text-emerald-400" />;

              return (
                <div 
                  key={idx} 
                  className="bg-bg-primary border border-border-color rounded-lg p-5 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 border-b border-border-color pb-3">
                      {headerIcon}
                      <h3 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider">
                        {cat.category}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-text-primary font-medium">{skill.name}</span>
                            <span className="text-text-secondary text-[10px]">{skill.info}</span>
                          </div>
                          {/* Fine technical loading progress bar */}
                          <div className="w-full h-1 bg-bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                cat.category.includes("Languages") 
                                  ? "bg-teal-500" 
                                  : cat.category.includes("AI") 
                                  ? "bg-emerald-500" 
                                  : "bg-emerald-600"
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-border-color font-mono text-[9px] text-text-secondary text-right">
                    VERIFIED COMPILE INDEX
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: FLAGSHIP VENTURES & SEMESTER PROJECTS (THE PROOF - ELEVATED PROJECT GRID) */}
        <section id="proof" className="space-y-10 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border-color pb-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase block">
                03 // Technical Verification
              </span>
              <SplitText
                text="Flagship Ventures & Systems"
                tag="h2"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary"
                delay={30}
                duration={0.7}
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
            </div>

            {/* Fluid WebGL Liquid Droplet Navigation: Strictly Contained React Bits GooeyNav */}
            <div className="w-full sm:w-auto max-w-full overflow-x-auto scrollbar-none p-1 rounded-full bg-emerald-950/25 border border-emerald-500/25 shadow-inner flex items-center justify-start sm:justify-center">
              <GooeyNav
                items={[
                  { id: "all", label: "All Systems", badge: `${PROJECTS_DATA.length}` },
                  { id: "ai-backend", label: "AI & Backend APIs", icon: <Cpu className="w-3.5 h-3.5" /> },
                  { id: "fullstack", label: "Full-Stack & Real-Time", icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: "lowlevel", label: "Low-Level & Systems", icon: <Code className="w-3.5 h-3.5" /> }
                ]}
                activeId={activeTab}
                onChange={(id) => setActiveTab(id as any)}
                accentColor="#10b981"
                glowColor="rgba(16, 185, 129, 0.45)"
                size="sm"
              />
            </div>
          </div>

          {/* Elevated Responsive Bento Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, idx) => {
              return (
                <motion.article 
                  key={proj.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-gradient-to-b from-[#06120d]/80 to-[#040706]/90 border border-neutral-800/80 hover:border-emerald-500/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  {/* Subtle card top glow on hover */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="space-y-4">
                    {/* Header bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-neutral-800/70 pb-3">
                      <span className="text-neutral-400 font-semibold">
                        PROJECT // 0{idx + 1}
                      </span>
                      {proj.badge ? (
                        <span className="text-emerald-300 font-bold uppercase tracking-wider text-[10px] bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                          {proj.badge}
                        </span>
                      ) : (
                        <span className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">
                          {proj.category}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                            {proj.title}
                          </h3>
                          {proj.subtitle && (
                            <p className="text-xs font-mono font-bold text-emerald-400">
                              {proj.subtitle}
                            </p>
                          )}
                        </div>
                        
                        {/* Interactive dynamic link */}
                        <a 
                          href={proj.githubUrl || proj.liveUrl || "#contact"}
                          target={proj.githubUrl || proj.liveUrl ? "_blank" : undefined}
                          rel={proj.githubUrl || proj.liveUrl ? "noreferrer" : undefined}
                          onClick={!proj.githubUrl && !proj.liveUrl ? (e) => {
                            e.preventDefault();
                            handleScrollToSection("contact-field");
                          } : undefined}
                          className="p-1.5 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer shrink-0 mt-0.5"
                          title={proj.githubUrl ? "Open GitHub Repository" : proj.liveUrl ? "Open Live App" : "Ask for architecture walk-through"}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light font-sans pt-1">
                        {proj.description}
                      </p>
                    </div>

                    {/* Architecture description block */}
                    <div className="space-y-2 bg-neutral-900/50 p-4 border border-neutral-800/80 rounded-xl">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block font-bold">
                        Core System Architecture
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light font-sans">
                        {proj.architecture}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack tags and metrics indicators */}
                  <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                    
                    {/* Performance metrics micro grid */}
                    <div className="grid grid-cols-2 gap-2 text-right">
                      {proj.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="bg-neutral-900/60 p-2 border border-neutral-800 rounded-lg text-left">
                          <span className="block font-mono text-[9px] text-neutral-400 max-w-full truncate uppercase">
                            {metric.split(" ").slice(1).join(" ") || "Benchmark"}
                          </span>
                          <span className="text-xs font-mono font-bold text-white">
                            {metric.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 bg-neutral-900/70 border border-neutral-800 text-[10px] font-mono text-neutral-400 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-neutral-800/70 flex items-center justify-between gap-2">
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-[11px] font-mono font-bold text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Code</span>
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          Proprietary / In-House
                        </span>
                      )}

                      <a
                        href={proj.githubUrl || "#contact"}
                        target={proj.githubUrl ? "_blank" : undefined}
                        rel={proj.githubUrl ? "noreferrer" : undefined}
                        onClick={!proj.githubUrl ? (e) => {
                          e.preventDefault();
                          handleScrollToSection("contact-field");
                        } : undefined}
                        className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 ml-auto"
                      >
                        <span>{proj.githubUrl ? "Live Spec" : "Request Spec"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Engineering Repository Callout Block */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/20 via-neutral-900/40 to-teal-950/20 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-emerald-400 shrink-0 shadow-inner">
                <Github className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text-primary font-sans">
                  The architecture behind these systems is evolving in real-time.
                </h4>
                <p className="text-xs text-text-secondary font-light font-sans">
                  Explore source code and commit history on GitHub.
                </p>
              </div>
            </div>
            <a 
              href="https://github.com/ahmadrayan-create"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-text-primary text-bg-primary hover:bg-transparent hover:text-text-primary hover:border-text-primary font-mono text-[11px] font-bold uppercase tracking-wider rounded border border-transparent flex items-center gap-1.5 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>Explore Source Code on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* SECTION 5: ACADEMIC & LEADERSHIP FOUNDATION */}
        <section id="academic" className="space-y-10 scroll-mt-24">
          <div className="space-y-2 border-b border-border-color pb-4">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
              04 // Education & Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Academic & Leadership Foundation
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Degree placement */}
            <div className="lg:col-span-5 bg-bg-primary border border-border-color rounded-lg p-6 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 border border-emerald-500/20 rounded-full font-bold">
                    ACTIVE CANDIDATE
                  </span>
                  <span className="text-xs font-mono text-text-secondary">
                    Expected May 2028
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-text-primary">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <p className="text-base text-text-secondary font-medium">
                    {EDUCATION_DATA.institution}
                  </p>
                  <p className="text-xs font-mono text-emerald-500 dark:text-emerald-400 pt-1">
                    {EDUCATION_DATA.statusLine}
                  </p>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed font-light font-sans">
                  Ahmad's academic program couples theoretical computer science fundamentals — structured programming, low-memory indexing, and relational schema normalization — with advanced automation research.
                </p>
              </div>

              {/* Graphic design accent */}
              <div className="border-t border-border-color pt-4 flex items-center justify-between text-xs text-text-secondary">
                <span className="font-mono">IP Checksum: Valid</span>
                <span className="text-[10px] font-mono text-text-secondary font-bold">Air University</span>
              </div>
            </div>

            {/* Leadership list */}
            <div className="lg:col-span-7 bg-bg-primary border border-border-color rounded-lg p-6 space-y-6 shadow-sm">
              <div>
                <h3 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider mb-1">
                  Notable Extracurricular Engagements
                </h3>
                <p className="text-xs text-text-secondary font-sans">Leadership responsibilities, community development, and international discourse representation.</p>
              </div>

              <div className="space-y-4">
                {EDUCATION_DATA.leadership.map((lead, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-3 bg-bg-secondary border border-border-color rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-text-primary text-bg-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 border border-border-color">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-x-2">
                        <span className="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400">
                          {lead.role}
                        </span>
                        <span className="text-xs font-bold text-text-primary">
                          {lead.organization}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary font-light font-sans">
                        {lead.highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SYSTEM COMMAND TERMINAL & CONTACT INTERFACE */}
        <section id="contact" className="space-y-10 scroll-mt-24">
          <div className="space-y-2 border-b border-border-color pb-4">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
              05 // Transmission Node
            </span>
            <SplitText
              text="Controls & Communications"
              tag="h2"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary"
              delay={35}
              duration={0.7}
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
          </div>

          <div className="space-y-8">
            
            {/* Standard developer terminal component */}
            <Terminal 
              onVerifyRecord={() => setIsModalOpen(true)}
              onScrollToSection={handleScrollToSection}
            />

            {/* Simulated terminal context tip */}
            <div className="flex items-center space-x-2.5 text-xs text-text-secondary bg-bg-primary p-3 rounded-lg border border-border-color shadow-sm">
              <Info className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="font-light font-sans">
                <strong>Terminal usage tip:</strong> Type <span className="font-mono bg-bg-secondary border border-border-color px-1 py-0.5 rounded text-text-primary text-[11px]">skills</span> or <span className="font-mono bg-bg-secondary border border-border-color px-1 py-0.5 rounded text-text-primary text-[11px]">projects</span> and press Enter to filter console feeds dynamically and verify candidate attributes.
              </p>
            </div>

            {/* Full interactive contact form with LinkedIn Badge */}
            <ContactForm darkMode={darkMode} />
          </div>
        </section>

        {/* Dynamic call to action card above footer */}
        <section className="bg-bg-primary border border-border-color p-8 rounded-lg text-center space-y-6 shadow-sm">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl font-bold tracking-tight text-text-primary leading-tight">
              Ready to Accelerate Recruitment Handshakes?
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light font-sans">
              Get direct proof of candidate operational precision. Click button to initiate the Cryptographic Records verification modal or request references immediately.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-text-primary text-bg-primary hover:bg-transparent hover:text-text-primary hover:border-text-primary font-mono text-xs font-bold tracking-widest rounded uppercase flex items-center space-x-2 mx-auto active:scale-98 transition-all border border-transparent cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verify Official Credentials (CV)</span>
          </button>
        </section>

      </main>

      {/* Systems footer bar */}
      <footer className="bg-bg-secondary border-t border-border-color py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-7 h-7 rounded bg-text-primary border border-border-color flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-bg-primary" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-text-primary tracking-tight leading-none uppercase">
                Ahmad Rayan Qasim
              </p>
              <span className="text-[10px] font-mono text-text-secondary mt-1 block uppercase font-medium">
                Systems Architect &bull; Class of 2028
              </span>
            </div>
          </div>

          {/* Symmetrical Middle standard links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
            <a 
              href="https://github.com/ahmadrayan-create" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-secondary hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/ahmad-rayan-2a1785261" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-secondary hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:iamahmadrayan@gmail.com" 
              className="text-text-secondary hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer md:mr-4"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          <div className="text-center md:text-right font-mono text-[10px] text-text-secondary space-y-1">
            <p>&copy; 2026 Ahmad Rayan Qasim. Built to highest operational standard.</p>
            <p>Secure Relay Portal Node, port 3000 Ingress SSL &bull; Code integrity verified</p>
          </div>
        </div>
      </footer>

      {/* Embedded Verification Modal overlay */}
      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
    </ClickSpark>
  );
}

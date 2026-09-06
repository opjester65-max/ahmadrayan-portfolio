import { useState, useEffect } from "react";
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

import { 
  PORTFOLIO_METRIC_CARDS, 
  PROJECTS_DATA, 
  EXPERIENCE_DATA, 
  SKILL_CATEGORIES, 
  EDUCATION_DATA,
  ACHIEVEMENTS_DATA,
  CERTIFICATIONS_DATA
} from "./data";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ai-backend" | "fullstack" | "lowlevel">("all");

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
            className="text-[10px] font-bold text-neutral-800 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-white flex items-center gap-1.5 transition-colors"
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
        <section className="relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/5 dark:bg-[#06070a]/40 p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl transition-all duration-500 min-h-[calc(100vh-140px)] lg:min-h-[760px] flex flex-col justify-center">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#3b82f6', '#1d4ed8', '#60a5fa'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.012}
              baseFriction={0.93}
              baseThickness={14}
              offsetFactor={0.02}
              maxAge={900}
              pointCount={55}
              speedMultiplier={0.35}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-16">
            {/* Top Row: Brand & Pulsing Terminal State */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/40 dark:border-neutral-800/60 pb-6">
              <div className="inline-flex items-center space-x-2 bg-neutral-200/40 dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 rounded-full px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-mono font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                  SYSTEM CORE: ONLINE &bull; OPEN TO GLOBAL SPRINTS
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                00 // EXECUTIVE INGRESS
              </div>
            </div>

            {/* Main 3-Column Hero Grid matching image_0.png */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Core Identity Heading (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-6 text-left">
                {/* Thin white horizontal accent line */}
                <div className="w-16 h-[2px] bg-neutral-950 dark:bg-white" />
                
                <div className="space-y-3">
                  <span className="text-xs font-mono font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase block">
                    AI Engineer & Startup Founder
                  </span>
                  <div className="block">
                    <SplitText
                      text="I'm Ahmad, an"
                      tag="h1"
                      className="text-4xl sm:text-5xl lg:text-[40px] xl:text-5xl font-black tracking-tight text-neutral-950 dark:text-white font-sans leading-none block"
                      delay={35}
                      duration={0.9}
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      textAlign="left"
                    />
                    <SplitText
                      text="AI Systems Architect."
                      tag="h1"
                      className="text-4xl sm:text-5xl lg:text-[40px] xl:text-5xl font-black tracking-tight text-blue-600 dark:text-blue-400 font-sans leading-none block pt-2"
                      delay={40}
                      duration={0.9}
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      textAlign="left"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-sm font-sans">
                  AI Engineer at FlyRank & Founder of DeepBuild AI. Bridging core computing foundations with next-gen agentic intelligence and production-grade RAG pipelines.
                </p>

                {/* Down Arrow Button styled exactly like image_0.png */}
                <button
                  onClick={() => handleScrollToSection("trajectory")}
                  className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
                  title="Scroll Down"
                >
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </button>
              </div>

              {/* Middle Column: Circular Avatar Frame with Glow (lg:col-span-4) */}
              <div className="lg:col-span-4 w-full flex flex-col justify-center items-center py-4 relative z-20">
                <div className="relative flex items-center justify-center w-full max-w-sm mx-auto">
                  {/* Prominent, soft, circular blue glow surrounding avatar */}
                  <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-blue-600/30 blur-[64px] pointer-events-none animate-pulse" />
                  
                  {/* Rotating orbital rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[290px] h-[290px] rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute w-[270px] h-[270px] rounded-full border border-dashed border-blue-400/15 animate-[spin_20s_linear_infinite_reverse]" />
                  </div>

                  {/* Perfect Circular boundary framing the avatar */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-950/90 shadow-[0_0_40px_rgba(37,99,235,0.15)] flex items-center justify-center overflow-hidden group">
                    {/* Subtle glare sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    
                    <img
                      src="https://i.ibb.co/cH6KCRb/Avatra-bg-remove.png"
                      alt="Ahmad Rayan Qasim Avatar"
                      referrerPolicy="no-referrer"
                      className="w-[90%] h-[90%] object-contain mt-auto transform group-hover:scale-103 transition-transform duration-700 select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: About, Work, and Follow Me (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-8 text-left">
                
                {/* ABOUT ME SECTION */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase block">
                    ABOUT ME
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                    BS Computer Science candidate at Air University (CGPA 3.55, 12/12 in DSA). Specializing in production RAG pipelines, FastAPI microservices, and autonomous multi-agent orchestration.
                  </p>
                  <button
                    onClick={() => handleScrollToSection("trajectory")}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-1 transition-colors group cursor-pointer"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* MY WORK SECTION */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase block">
                    MY WORK
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                    Real-time portals (LawLedge), micro-cent usage metering engines, low-level x86/C++ systems, and commercial AI agency solutions.
                  </p>
                  <button
                    onClick={() => handleScrollToSection("proof")}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-1 transition-colors group cursor-pointer"
                  >
                    <span>BROWSE PORTFOLIO</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* FOLLOW ME SECTION */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase block">
                    FOLLOW ME
                  </span>
                  <div className="flex items-center gap-4 pt-1">
                    <a
                      href="https://github.com/ahmadrayan-create"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ahmadrayandev"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                    <button
                      onClick={() => handleScrollToSection("contact")}
                      className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                      title="Email Direct Signal"
                    >
                      <Mail className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Row Section: Layout styled from image_0.png bottom part of hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-neutral-200/40 dark:border-neutral-800/60 items-start">
              
              {/* Left text: I've been developing websites / engineering solutions */}
              <div className="lg:col-span-6 space-y-3 text-left">
                <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase block">
                  / PERSISTENT FOUNDATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white font-sans">
                  Developing Intelligent Solutions Since 2020
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans max-w-md">
                  Operations are verified across sandboxed execution tests to guarantee absolute runtime reliability and memory-efficient data optimization.
                </p>
              </div>

              {/* Right stats: 12 Years, 150+ Successful Projects etc. mapped to Ahmad's real stats */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-4">
                {PORTFOLIO_METRIC_CARDS.map((metric, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                      {metric.value.split(" ")[0]}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider leading-tight">
                      {metric.label}
                    </div>
                    <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-light font-sans truncate">
                      {metric.institution}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom row of client logos: ENGAGEMENTS & ORGANIZATIONS */}
            <div className="pt-8 border-t border-neutral-200/30 dark:border-neutral-800/40 flex flex-wrap items-center justify-between gap-6">
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">
                ENGAGEMENTS & ORGANIZATIONS
              </span>
              <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-neutral-400 dark:text-neutral-500 font-mono text-xs font-bold">
                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>flyrank ai</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>nobel navigators</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>deepbuild ai</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>codealpha</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>air university</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: PROFESSIONAL TRAJECTORY */}
        <section id="trajectory" className="space-y-10 scroll-mt-24">
          <div className="space-y-2 border-b border-border-color pb-4">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
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

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div 
                key={idx} 
                className="relative grid md:grid-cols-12 gap-6 bg-bg-primary border border-border-color p-6 rounded-lg overflow-hidden hover:border-blue-500 dark:hover:border-emerald-500 transition-all shadow-sm"
              >
                {/* Background watermarked micro label */}
                <span className="absolute top-4 right-4 font-mono text-[10px] text-blue-600 dark:text-emerald-400 bg-blue-500/10 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-blue-500/20 dark:border-emerald-500/20 pointer-events-none select-none uppercase tracking-wider font-bold">
                  {exp.badge || (exp.isVenture ? "Venture Enterprise" : "Corporate Placement")}
                </span>

                {/* Left company column */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-xs font-mono text-text-secondary block">
                    {exp.period}
                  </span>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-text-primary tracking-tight leading-tight">
                       {exp.company}
                    </h3>
                    <p className="text-xs font-mono text-blue-500 dark:text-emerald-400 uppercase tracking-wider">
                      {exp.role}
                    </p>
                    {exp.link && (
                      <div className="pt-1 select-all">
                        <span className="text-[10px] font-mono font-medium text-text-secondary block uppercase">
                          Live Production System:
                        </span>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold break-all"
                        >
                          {exp.link.replace("https://", "")}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Graphic micro line */}
                  <div className="hidden md:block h-10 w-px bg-gradient-to-b from-border-color to-transparent ml-1 mt-4"></div>
                </div>

                {/* Right bullets description list */}
                <div className="md:col-span-8">
                  {exp.isVenture && exp.pillars ? (
                    <div className="space-y-6">
                      <p className="text-sm text-text-primary font-medium font-sans border-l-2 border-blue-600 dark:border-emerald-500 pl-3 leading-relaxed">
                        {exp.tagline}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {exp.pillars.map((pillar, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="p-4 bg-bg-secondary border border-border-color rounded-lg space-y-2 hover:border-neutral-300 dark:hover:border-neutral-850 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-emerald-500 bg-blue-105/40 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                0{pIdx + 1}
                              </span>
                              <h4 className="text-xs font-mono font-extrabold uppercase tracking-wide text-text-primary">
                                {pillar.title}
                              </h4>
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                              {pillar.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                        <button
                          onClick={() => handleScrollToSection("contact")}
                          className="px-4 py-2.5 bg-text-primary text-bg-primary font-mono text-[10px] font-bold uppercase tracking-wider rounded border border-transparent hover:bg-transparent hover:text-text-primary hover:border-text-primary active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Discuss Your Project</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="text-[9px] font-mono text-text-secondary font-bold">
                          * DIRECT CONSULTATION GATEWAY ACTIVE
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bIdx) => {
                        return (
                          <li key={bIdx} className="text-sm text-text-secondary leading-relaxed font-light flex items-start space-x-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-2 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Command system check */}
                  {exp.isVenture && (
                    <div className="mt-6 p-3 bg-bg-secondary border border-border-color rounded-lg text-[11px] font-mono text-text-secondary flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>Consultative Platform Node: Standardizing digital transformation with zero low-value development sprawl.</span>
                    </div>
                  )}
                  {!exp.isVenture && (
                    <div className="mt-5 p-3.5 bg-[#F6F6F9] dark:bg-neutral-950/20 border border-border-color rounded-lg text-xs flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-blue-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-text-secondary font-light leading-snug font-sans">
                        {exp.company.includes("FlyRank") ? (
                          <>
                            <strong>Production AI Architecture:</strong> Standardizing strict API schemas, retrieval-backed RAG answer flows, and automated test rubrics transitioning experimental AI to predictable production.
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
                className="group bg-bg-primary border border-border-color rounded-lg overflow-hidden hover:scale-[1.01] hover:border-blue-500 dark:hover:border-emerald-500 hover:shadow-sm transition-all duration-300 flex flex-col h-full"
              >
                {/* High-resolution Image Container */}
                <div className="relative overflow-hidden aspect-video border-b border-border-color bg-bg-secondary">
                  <img 
                    src={ach.image} 
                    alt={`${ach.role} - ${ach.organization}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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
                      href={ach.image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
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
                <Award className="w-4 h-4 text-blue-600 dark:text-emerald-400" />
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
                  className="bg-bg-primary border border-border-color rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-blue-500 dark:hover:border-emerald-500 hover:shadow-sm transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-emerald-400 bg-blue-500/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-blue-500/20 dark:border-emerald-500/20">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono text-text-secondary">
                        {cert.period}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-text-primary tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
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
                        <span className="text-blue-600 dark:text-emerald-400 font-semibold">
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
              className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary hover:text-blue-600 dark:hover:text-emerald-400 hover:border-blue-500/50 dark:hover:border-emerald-500/50 transition-all flex items-center gap-2 bg-bg-secondary border border-border-color px-3 py-2 rounded-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>Active daily contributor. View latest commits and structural patterns on my GitHub profile.</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              // Custom matching iconography
              let headerIcon = <Code className="w-4 h-4 text-blue-500" />;
              if (cat.category.includes("AI")) headerIcon = <Workflow className="w-4 h-4 text-emerald-500" />;
              if (cat.category.includes("Databases")) headerIcon = <Database className="w-4 h-4 text-amber-500" />;

              return (
                <div 
                  key={idx} 
                  className="bg-bg-primary border border-border-color rounded-lg p-5 hover:border-blue-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between shadow-sm"
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
                                  ? "bg-blue-500" 
                                  : cat.category.includes("AI") 
                                  ? "bg-emerald-500" 
                                  : "bg-amber-500"
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

        {/* SECTION 4: FLAGSHIP VENTURES & SEMESTER PROJECTS (THE PROOF) */}
        <section id="proof" className="space-y-10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-color pb-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
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

            {/* Simulated selector tabs for categorization */}
            <div className="flex items-center space-x-1 p-1 bg-bg-secondary border border-border-color rounded-lg max-w-max overflow-x-auto">
              {[
                { label: "All Systems", id: "all" },
                { label: "AI & Backend APIs", id: "ai-backend" },
                { label: "Full-Stack & Real-Time", id: "fullstack" },
                { label: "Low-Level & Systems", id: "lowlevel" }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 font-mono text-[10px] font-semibold tracking-tight rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-text-primary text-bg-primary border border-border-color text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Balanced responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, idx) => {
              return (
                <article 
                  key={proj.id} 
                  className="bg-bg-primary border border-border-color hover:border-blue-500 dark:hover:border-emerald-500 rounded-lg p-6 flex flex-col justify-between space-y-6 hover:shadow-md hover:translate-y-[-1px] transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    
                    {/* Monospaced tag and header */}
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-border-color pb-2">
                      <span className="text-text-secondary">
                        PROJECT // 0{idx + 1}
                      </span>
                      <span className="text-blue-500 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                        {proj.category}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
                          {proj.title}
                        </h3>
                        {/* Interactive dynamic link */}
                        <a 
                          href={proj.githubUrl || "#contact"}
                          target={proj.githubUrl ? "_blank" : undefined}
                          rel={proj.githubUrl ? "noreferrer" : undefined}
                          onClick={!proj.githubUrl ? (e) => {
                            e.preventDefault();
                            handleScrollToSection("contact-field");
                          } : undefined}
                          className="p-1 text-text-secondary hover:text-blue-500 dark:hover:text-emerald-400 transition-colors cursor-pointer shrink-0 mt-0.5"
                          title={proj.githubUrl ? "Open GitHub Repository" : "Ask for architecture walk-through"}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-normal font-light font-sans">
                        {proj.description}
                      </p>
                    </div>

                    {/* Architecture description block */}
                    <div className="space-y-2 bg-bg-secondary p-4 border border-border-color rounded-lg">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary block font-bold">
                        Core System Architecture
                      </span>
                      <p className="text-xs text-text-secondary leading-relaxed font-light font-sans">
                        {proj.architecture}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack tags and metrics indicators */}
                  <div className="space-y-4 pt-4 border-t border-border-color">
                    
                    {/* Performance metrics micro grid */}
                    <div className="grid grid-cols-2 gap-2 text-right">
                      {proj.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="bg-bg-secondary p-2 border border-border-color rounded text-left">
                          <span className="block font-mono text-[9px] text-text-secondary max-w-full truncate uppercase">
                            {metric.split(" ").slice(1).join(" ") || "Benchmark"}
                          </span>
                          <span className="text-xs font-mono font-bold text-text-primary">
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
                          className="px-2 py-1 bg-bg-secondary border border-border-color text-[10px] font-mono text-text-secondary rounded"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-border-color flex items-center justify-between gap-2">
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-bg-secondary hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-border-color rounded text-[11px] font-mono font-bold text-text-primary flex items-center gap-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Code</span>
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-text-secondary uppercase">
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
                        className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1 ml-auto"
                      >
                        <span>{proj.githubUrl ? "Live Spec" : "Request Spec"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Engineering Repository Callout Block */}
          <div className="p-6 bg-bg-secondary border border-border-color rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-sm">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-bg-primary border border-border-color rounded-lg text-text-primary shrink-0">
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
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
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
              className="text-text-secondary hover:text-blue-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmadrayandev" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-secondary hover:text-blue-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:iamahmadrayan@gmail.com" 
              className="text-text-secondary hover:text-blue-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer md:mr-4"
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

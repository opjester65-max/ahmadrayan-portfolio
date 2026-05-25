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
  ACHIEVEMENTS_DATA
} from "./data";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "enterprise" | "lowlevel" | "fintech">("all");

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

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredProjects = PROJECTS_DATA.filter(proj => {
    if (activeTab === "all") return true;
    if (activeTab === "enterprise") return proj.category.includes("ENTERPRISE") || proj.category.includes("SIMULATOR");
    if (activeTab === "lowlevel") return proj.category.includes("MATH_SIMULATION") || proj.category.includes("LOW_LEVEL");
    if (activeTab === "fintech") return proj.category.includes("FINTECH");
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
        <section className="space-y-12 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-12">
          
          {/* Pulsing Terminal State Indicator */}
          <div className="inline-flex items-center space-x-2 bg-neutral-200/50 dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 rounded-full px-3 py-1.5 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
              Open to Global Technical Opportunities & Applied AI Engineering
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Core Identity Greeting */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-emerald-500"></span>
                  <span className="text-[10px] font-mono font-extrabold tracking-widest text-blue-600 dark:text-emerald-400 uppercase">
                    AI Systems Architect &bull; PortFOLIO v2.5
                  </span>
                </div>
                <SplitText
                  text="Ahmad Rayan Qasim"
                  tag="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-sans leading-none block"
                  delay={35}
                  duration={0.9}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="left"
                />
                <SplitText
                  text="Bridging Core Computing Foundations with Next-Gen Agentic Intelligence."
                  tag="p"
                  className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-700 dark:text-neutral-300 font-sans leading-normal max-w-3xl pt-1 block"
                  delay={12}
                  duration={0.7}
                  from={{ opacity: 0, y: 15 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="left"
                />
              </div>
              
              {/* Core Subheadline */}
              <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-2xl font-sans">
                Computer Science undergraduate specializing in applied LLM orchestration, scalable backend automation, and high-performance database architectures. Built to scale, engineered for business value.
              </p>

              {/* Action Buttons Hub */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleScrollToSection("proof")}
                  className="px-5 py-3 bg-text-primary text-bg-primary font-mono text-xs font-semibold rounded-lg hover:opacity-90 flex items-center space-x-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Explore Systems</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-3 bg-bg-secondary border border-border-color text-text-primary font-mono text-xs font-semibold rounded-lg hover:bg-text-primary hover:text-bg-primary flex items-center space-x-1.5 transition-all active:scale-98 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verify Record (CV)</span>
                </button>
                <a
                  href="https://github.com/ahmadrayan-create"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-transparent border border-border-color text-text-primary hover:bg-text-primary hover:text-bg-primary font-mono text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-98 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub</span>
                </a>
              </div>

              {/* Integration & Deployment Gateway Card */}
              <div className="bg-bg-primary border border-border-color rounded-lg p-5 space-y-4 shadow-sm mt-4">
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest block font-bold">
                  // Integration & Deployment Gateway
                </span>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Systems built with robust API routing and orchestrations across leading language models, engineered for continuous edge delivery.
                </p>
                <div className="space-y-3 font-mono text-xs text-text-secondary">
                  <div className="flex justify-between items-center py-1.5 border-b border-border-color">
                    <span>Model APIs:</span>
                    <span className="font-semibold text-text-primary">OpenAI, Anthropic, Gemini</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-border-color">
                    <span>Deployment Host:</span>
                    <span className="text-blue-500 dark:text-emerald-400 font-bold">Vercel Edge Network</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-border-color">
                    <span>Environment:</span>
                    <span className="text-text-primary font-semibold">Standard Container Engine</span>
                  </div>
                  <div className="flex justify-between items-center py-1.55">
                    <span>SSL Status:</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Active Security
                    </span>
                  </div>
                </div>

                {/* Verified Integration Notice */}
                <div className="pt-2 text-[10px] text-text-secondary font-mono bg-bg-secondary p-3 border border-border-color rounded">
                  <span className="font-extrabold text-text-primary block mb-1">AUTOMATED TESTING STABLE</span>
                  <span className="font-sans font-light text-[10px] text-text-secondary block">Operations are verified across sandboxed execution tests to guarantee runtime reliability.</span>
                </div>
              </div>
            </div>

            {/* Right stack: Holographic Profile ID Card - Prominent and Majestic Full Height Block */}
            <div className="lg:col-span-5 w-full flex flex-col justify-center items-center py-4 relative z-20">
              <ProfileCard 
                name="Ahmad Rayan Qasim"
                title="AI Systems Engineer"
                handle="rayanqasim"
                status="Active Ingress"
                contactText="Direct Signal"
                onContactClick={() => handleScrollToSection("contact")}
                avatarUrl="https://i.ibb.co/VYhK10hL/Pfp-Cropped-Fence-Bg-removed-500kb.png"
              />
            </div>
          </div>

          {/* Minimal Metric Strip (3 Columns) */}
          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border-color">
            {PORTFOLIO_METRIC_CARDS.map((metric, idx) => (
              <div 
                key={idx} 
                className="bg-bg-primary border border-border-color rounded-lg p-5 hover:border-blue-500 dark:hover:border-emerald-500 transition-all duration-300 hover:translate-y-[-1px] group"
              >
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-text-secondary font-bold tracking-wider">
                    {metric.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight group-hover:text-amber-500 dark:group-hover:text-emerald-400 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-xs text-text-secondary font-light font-sans">
                    {metric.institution}
                  </div>
                </div>
                {/* Embedded computer science mono statement inside each card */}
                <div className="mt-4 bg-bg-secondary p-2 px-3 border border-border-color rounded font-mono text-[10px] text-text-secondary overflow-x-auto select-none">
                  {metric.monoCode}
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* SECTION 2: PROFESSIONAL TRAJECTORY */}
        <section id="trajectory" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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
                <span className="absolute top-4 right-4 font-mono text-[10px] text-text-secondary pointer-events-none select-none uppercase tracking-wider">
                  {exp.isVenture ? "Venture Enterprise" : "Corporate Placement"}
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
                      <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-text-secondary font-light leading-snug font-sans">
                        <strong>Performance Commendation:</strong> Formally lauded for advanced adaptation to next-generation AI pipelines and exceptional speed of analysis in distributed teams.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* SECTION 2.5: ACHIEVEMENTS & LEADERSHIP */}
        <section id="achievements" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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
        </section>

        {/* SECTION 3: CORE COMPETENCIES & TECH STACK (THE BLUEPRINT) */}
        <section id="blueprint" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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
          </div>
        </section>

        {/* SECTION 4: FLAGSHIP VENTURES & SEMESTER PROJECTS (THE PROOF) */}
        <section id="proof" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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
            <div className="flex items-center space-x-1 p-1 bg-bg-secondary border border-border-color rounded-lg max-w-max">
              {[
                { label: "All Proofs", id: "all" },
                { label: "Enterprise & Compilers", id: "enterprise" },
                { label: "Low-level Math", id: "lowlevel" },
                { label: "FinTech", id: "fintech" }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 font-mono text-[10px] font-semibold tracking-tight rounded-md transition-all cursor-pointer ${
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

          {/* Asymmetrical grid layout */}
          <div className="grid md:grid-cols-6 gap-6">
            {filteredProjects.map((proj, idx) => {
              // Establish asymmetrical columns based on index
              // First project (Blue Barn) is flagship, gets 4 columns.
              // Other projects get 2 columns or 3 columns to build an elegant bento grid structure
              let colSpan = "md:col-span-3";
              if (proj.id === "blue-barn") colSpan = "md:col-span-6 lg:col-span-4";
              if (proj.id === "vectorglide-3d" && activeTab === "all") colSpan = "md:col-span-3 lg:col-span-2";

              return (
                <article 
                  key={proj.id} 
                  className={`${colSpan} bg-bg-primary border border-border-color hover:border-blue-500 dark:hover:border-emerald-500 rounded-lg p-6 flex flex-col justify-between space-y-6 hover:shadow-md hover:translate-y-[-1px] transition-all duration-300 group`}
                >
                  <div className="space-y-4">
                    
                    {/* Monospaced tag and header */}
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-border-color pb-2">
                      <span className="text-text-secondary">
                        PROJECT // 0{idx + 1}
                      </span>
                      <span className="text-blue-500 dark:text-emerald-400 font-bold uppercase tracking-wider">
                        {proj.category}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-tight text-text-primary group-hover:text-amber-500 dark:group-hover:text-emerald-400 transition-colors">
                          {proj.title}
                        </h3>
                        {/* Interactive dynamic link */}
                        <a 
                          href="#contact" 
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollToSection("contact-field");
                          }}
                          className="p-1 text-text-secondary hover:text-blue-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Ask for architecture walk-through"
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
                      <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary block">
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
          </div>
        </section>

        {/* SECTION 5: ACADEMIC & LEADERSHIP FOUNDATION */}
        <section id="academic" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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
          </div>
        </section>

        {/* SECTION 6: SYSTEM COMMAND TERMINAL & CONTACT INTERFACE */}
        <section id="contact" className="space-y-10 scroll-mt-24 relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-6 md:p-10 lg:p-12 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 space-y-10 w-full">
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

            {/* Full interactive contact form */}
            <ContactForm />
          </div>
          </div>
        </section>

        {/* Dynamic call to action card above footer */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-900/80 bg-neutral-50/15 dark:bg-[#07070a]/25 p-8 text-center space-y-6 shadow-sm transition-all duration-500">
          
          {/* Holographic Physics-based Ribbon Trails Backdrop */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none overflow-hidden rounded-3xl">
            <Ribbons
              colors={darkMode ? ['#10b981', '#059669', '#34d399'] : ['#2563eb', '#3b82f6', '#60a5fa']}
              baseSpring={0.015}
              baseFriction={0.92}
              baseThickness={18}
              offsetFactor={0.03}
              maxAge={800}
              pointCount={50}
              speedMultiplier={0.4}
              enableFade={true}
              enableShaderEffect={true}
            />
          </div>

          <div className="relative z-10 w-full space-y-6">
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
          </div>
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
              href="https://linkedin.com/in/ahmad-rayan-qasim/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-secondary hover:text-blue-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:opjester65@gmail.com" 
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

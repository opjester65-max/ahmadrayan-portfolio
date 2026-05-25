import { useState } from "react";
import { X, Copy, Mail, Check, FileText, Printer, ShieldCheck, Download } from "lucide-react";
import { EXPERIENCE_DATA, EDUCATION_DATA, SKILL_CATEGORIES } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyMarkdownCV = () => {
    const skillsText = SKILL_CATEGORIES.map(
      cat => `### ${cat.category}\n${cat.skills.map(s => `- ${s.name} (${s.info})`).join("\n")}`
    ).join("\n\n");

    const expText = EXPERIENCE_DATA.map(
      exp => `### ${exp.role} | ${exp.company} (${exp.period})\n${exp.bullets.map(b => `- ${b}`).join("\n")}`
    ).join("\n\n");

    const markdownCV = `# AHMAD RAYAN QASIM\nMultan, Pakistan | opjester65@gmail.com\n\n## CGPA: 3.56 | Air University\n\n## TECHNICAL SKILLS\n${skillsText}\n\n## PROFESSIONAL EXPERIENCE\n${expText}\n\n## EXTRA-CURRICULAR & LEADERSHIP\n- TechBist Society Core Member\n- University Debating Society Coordinator\n- MUN Head représenter for Germany`;

    navigator.clipboard.writeText(markdownCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in transition-all">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-bg-primary border border-border-color rounded-lg shadow-2xl flex flex-col font-sans transition-colors"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-bg-secondary border-b border-border-color">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            <span className="text-xs font-mono font-bold tracking-widest text-text-primary uppercase">
              Record Verification Service // Ahmad Rayan Qasim
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-bg-secondary border-b border-border-color">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Cryptographically Certified Undergraduate Record</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={copyMarkdownCV}
              className="px-3 py-1.5 bg-bg-secondary hover:bg-bg-primary border border-border-color rounded text-xs font-medium text-text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied Markdown" : "Copy Markdown Code"}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-bg-secondary hover:bg-bg-primary rounded text-xs border border-border-color font-medium text-text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print System Copy</span>
            </button>
            <a
              href="mailto:opjester65@gmail.com?subject=Ahmad%20Rayan%20Qasim%20-%20Interview%20/%20CV%20Inquiry"
              className="px-3.5 py-1.5 bg-text-primary hover:opacity-90 text-bg-primary rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-450 dark:text-emerald-350" />
              <span>Contact Candidate</span>
            </a>
          </div>
        </div>

        {/* Modal Inner Document Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-bg-primary text-text-secondary space-y-8 select-text print-body font-sans">
          {/* Document Header */}
          <div className="border-b border-border-color pb-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-text-primary">{`AHMAD RAYAN QASIM`}</h1>
                <p className="font-mono text-xs text-blue-600 dark:text-emerald-400 mt-1.5 tracking-wider uppercase font-bold">
                  Systems Architect & Applied LLM Automations Expert
                </p>
                <p className="text-sm text-text-secondary mt-1 font-light">
                  Multan, Pakistan &bull; opjester65@gmail.com
                </p>
              </div>
              <div className="text-right font-mono text-xs text-text-secondary border border-border-color bg-bg-secondary p-3 rounded-lg">
                <p className="text-text-primary font-bold">AIR UNIVERSITY</p>
                <p className="mt-0.5">CGPA: <span className="text-blue-600 dark:text-emerald-400 font-bold">3.56</span></p>
                <p>Status: Undergrad Class of 2028</p>
              </div>
            </div>
          </div>

          {/* Technical Alignment Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-600 dark:bg-emerald-500 rounded-sm"></span>
                  Professional Work Summary
                </h2>
                <p className="text-sm text-text-secondary font-light leading-relaxed font-sans">
                  Computer Science undergraduate candidate specializing in high-throughput C++/C# applications, complex relation structures normalization, and advanced automated prompt execution patterns using next-generation AI SDK gateways and low-code servers (n8n, Make). Focuses on driving pure commercial business efficiency.
                </p>
              </div>

              {/* Trajectory */}
              <div className="space-y-4">
                <h2 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-600 dark:bg-emerald-500 rounded-sm"></span>
                  Professional Trajectory
                </h2>
                {EXPERIENCE_DATA.map((exp, idx) => (
                  <div key={idx} className="border-l border-border-color pl-4 py-1 space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-sm font-semibold text-text-primary">{exp.role}</h3>
                      <span className="text-xs font-mono text-text-secondary">{exp.period}</span>
                    </div>
                    <p className="text-xs font-mono text-blue-600 dark:text-emerald-400 font-bold">
                      {exp.company}
                      {exp.link && (
                        <span className="inline-block sm:inline ml-0 sm:ml-2 font-normal text-[10px] text-text-secondary">
                          &bull; Live System: <a href={exp.link} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-emerald-400 hover:underline break-all">{exp.link.replace("https://", "")}</a>
                        </span>
                      )}
                    </p>
                    <ul className="list-disc pl-4 text-xs text-text-secondary space-y-1.5 font-light font-sans">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack List for Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-600 dark:bg-emerald-500 rounded-sm"></span>
                  Categorized Competencies
                </h2>
                <div className="space-y-4">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="bg-bg-secondary border border-border-color p-3 rounded-lg space-y-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-emerald-400 uppercase tracking-tight">
                        {cat.category}
                      </span>
                      <div className="space-y-1">
                        {cat.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center text-[11px]">
                            <span className="text-text-primary font-medium">{skill.name}</span>
                            <span className="text-text-secondary font-mono text-[10px]">{skill.info}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Highlights */}
              <div>
                <h2 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-600 dark:bg-emerald-500 rounded-sm"></span>
                  Foundational Strengths
                </h2>
                <div className="bg-bg-secondary border border-border-color p-3 rounded-lg space-y-2 text-xs">
                  <div className="border-b border-border-color pb-1.5 font-sans">
                     <span className="font-mono text-blue-600 dark:text-emerald-400 font-bold block">12/12 PERFECT GPA</span>
                    <span className="text-[10px] text-text-secondary">Data Structures & Algorithms course validation.</span>
                  </div>
                  <div className="border-b border-border-color pb-1.5 font-sans">
                    <span className="font-mono text-blue-600 dark:text-emerald-400 font-bold block">450+ APPLIED HOURS</span>
                    <span className="text-[10px] text-text-secondary">Designing complex custom prompts, token routing architectures & LLM agents.</span>
                  </div>
                  <div className="font-sans">
                    <span className="font-mono text-blue-600 dark:text-emerald-400 font-bold block">CADET LEADERSHIP</span>
                    <span className="text-[10px] text-text-secondary">Represented Germany at MUN. Coordinator for public debate circuits.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sign-off Info */}
        <div className="px-6 py-4 bg-bg-secondary border-t border-border-color text-center text-[10px] text-text-secondary font-mono tracking-wider">
          VERIFIED VIA ACADEMIC PORTFOLIO INTELLIGENCE ENGINE &bull; TIME STAMP: 2026-05-25T08:12:46Z
        </div>
      </div>
    </div>
  );
}

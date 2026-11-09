import { useState, useRef, useEffect, FormEvent } from "react";
import { Terminal as TerminalIcon, Sparkles, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

interface TerminalProps {
  onVerifyRecord: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Terminal({ onVerifyRecord, onScrollToSection }: TerminalProps) {
  const [history, setHistory] = useState<{ type: "input" | "output" | "error" | "system"; text: string }[]>([
    { type: "system", text: "AHMAD RAYAN QASIM - SYSTEMS ARCHITECT CORE PORTFLIO v2.5.0" },
    { type: "system", text: "Establish secure connection on port 3000... SUCCESS." },
    { type: "system", text: "Ready. Type 'help' to list available system sequences." },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "input" as const, text: cmd }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Available commands:
  help       - Display terminal interface capabilities.
  about      - Brief technical background summary.
  projects   - Show flagship ventures & performance metrics.
  skills     - Render tech stack core competencies matrix.
  cv         - Trigger official record validation modal.
  contact    - Scroll directly to secure contact channel.
  clear      - Clear terminal buffer memory.`
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          text: `Ahmad Rayan Qasim — 3rd-Year CS Student · AI Engineer · Hackathon Winner · Startup Founder.
Undergraduate at Air University Multan (CGPA: 3.55 | DSA: 12/12).
🏆 1st Place — Hacktoberfest Hack Day Multan (MLH × AWS × BZU, Oct 31, 2026).
President — Air University Startup Club (AUSC, 2026–2027 Term).
Backend AI Engineering Intern at FlyRank AI (July 2026 – Sept 2026).
AI/ML Engineering Intern at SafeX Solutions (July 2026 – Sept 2026).
Global Nobel Intern at Nobel Navigators (June 2026 – Nov 2026).
Founder & Lead AI Solutions Architect at DeepBuild AI Services.
Open to remote SWE / AI Engineering roles globally.`
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: `=== FLAGSHIP SYSTEMS REGISTERED ===
[1] MANDILINKAI: 🏆 1st Place MLH Hackathon agritech intelligence (Gemini AI, Snowflake, Solana).
[2] LAWLEDGE: Real-time legal grievance portal (React 18, Node.js, Socket.IO, Supabase, Vercel).
[3] SECURESHELL: Custom UNIX shell with Bloom Filter malware detection & chroot jail (C++, Treaps).
[4] CODECONNECT: Visual x86 Assembly & C# WinForms unmanaged P/Invoke system bridge.
[5] USAGE METERING & BILLING: Enterprise micro-cent billing engine (Python, FastAPI, Stripe API, Docker).
[6] VECTORGLIDE 3D: Kinematic drone trajectory simulator with Frenet-Serret frames (React Three Fiber).
[7] LLM SUPPORT TRIAGE: Microservice intent parsing with self-healing Pydantic loops (FastAPI, OpenRouter).
[8] BLUE BARN: Enterprise AgriTech DBMS. 15+ normalized tables, 54 stored procedures.
Type 'contact' or scroll to view details.`
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: `=== TECHNOLOGY CORE STACK ===
* AI Engineering: RAG Pipelines, Vector Embeddings, FastAPI, Pydantic, Gemini API, Anthropic API, OpenRouter, n8n, Make.com, Supabase Auth, YOLOv8, S-BERT, Prompt Engineering
* Languages: Python | C++ (POSIX, Bloom Filters) | C# (.NET, WPF, P/Invoke) | TypeScript/JavaScript | SQL (T-SQL & PostgreSQL) | 32-bit x86 Assembly
* Frameworks & Infra: FastAPI, Docker, PostgreSQL, Supabase, React 18, Next.js, Socket.IO, Framer Motion, Tailwind CSS`
        });
        break;
      case "cv":
        newHistory.push({ type: "system", text: "Triggering CV system modal... Launch complete." });
        setTimeout(() => {
          onVerifyRecord();
        }, 100);
        break;
      case "contact":
        newHistory.push({ type: "system", text: "Initiating navigation sequence to Contact Section..." });
        setTimeout(() => {
          onScrollToSection("contact-field");
        }, 200);
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `Unknown command: '${cmd}'. Type 'help' to see authorized sequence list.`
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="w-full bg-[#0A0A0A] dark:bg-[#020202]/90 border border-border-color rounded-lg shadow-md overflow-hidden font-mono text-xs text-neutral-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F0F0F] border-b border-border-color/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping font-sans"></span>
          </div>
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3 text-emerald-500" />
            systems-terminal@qasim-core ~ (UTC)
          </span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-850"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-850"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-850"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-4 h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent selection:bg-neutral-800"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {line.type === "input" && (
              <span className="text-blue-405">
                visitor@rayanqasim:~$ <span className="text-white font-medium">{line.text}</span>
              </span>
            )}
            {line.type === "output" && <span className="text-neutral-300">{line.text}</span>}
            {line.type === "error" && (
              <span className="text-red-400 flex items-start gap-1">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{line.text}</span>
              </span>
            )}
            {line.type === "system" && (
              <span className="text-emerald-400 flex items-start gap-1">
                <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                <span>{line.text}</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleCommand} className="flex border-t border-neutral-200/10 px-4 py-3 bg-[#0A0A0A]">
        <span className="text-blue-405 mr-2 shrink-0 select-none">visitor@rayanqasim:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' and press Enter..."
          className="flex-1 bg-transparent text-white focus:outline-none caret-emerald-500 placeholder-neutral-600 font-mono text-xs border-0 p-0 m-0"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="ml-2 text-neutral-500 hover:text-emerald-500 transition-colors shrink-0"
          aria-label="Execute command"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

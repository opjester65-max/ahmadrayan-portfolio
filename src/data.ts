import { Project, Experience, SkillCategory, LeadershipItem, Achievement, Certification } from "./types";

export const PORTFOLIO_METRIC_CARDS = [
  {
    value: "3.55 CGPA",
    label: "Academic Standing",
    institution: "Air University Multan",
    monoCode: "double cgpa = 3.55;"
  },
  {
    value: "12/12 Score",
    label: "Data Structures & Algorithms",
    institution: "Maximum Grade Points",
    monoCode: "std::vector<Node*> dsa_score(12);"
  },
  {
    value: "1st Place",
    label: "MLH Hackathon",
    institution: "MandiLinkAI Live 60-min Deploy",
    monoCode: "deploy_status = 'WINNER_1ST_PLACE';"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "mandilink-ai",
    title: "MandiLinkAI",
    subtitle: "🏆 1st Place — MLH Hacktoberfest Hack Day Multan (Oct 2026)",
    badge: "🏆 1st Place MLH Hackathon",
    category: "AI_MARKETPLACE / REAL-TIME AGENTIC",
    description: "AI-powered agricultural marketplace intelligence tool built and deployed live under a 60-minute constraint. Orchestrates real-time commodity pricing flows via Gemini API, structured data via Snowflake CoCo, and agent registration on Solana Agent Registry.",
    architecture: "High-velocity live deployment on Vercel. Ingests mandi commodities pricing through Gemini AI real-time parsing, persists validated schema structures into Snowflake CoCo, and executes automated verifiable agent registration on the Solana Agent Registry.",
    metrics: ["1st Place MLH", "60-Min Deploy", "Gemini AI Core", "Solana Registry"],
    tags: ["Gemini AI", "Snowflake", "Solana", "Vercel", "60-min Deploy"],
    isFeatured: true
  },
  {
    id: "lawledge",
    title: "LawLedge",
    category: "FULL-STACK / REAL-TIME WEBSOCKETS",
    description: "Full-stack legal portal and community grievance system with real-time WebSocket communication, multi-role RBAC via Supabase Auth, automated PDF complaint generation (jsPDF), and production deployment on Vercel.",
    architecture: "React 18 SPA + Node.js Socket.IO persistent WebSocket hub. Supabase PostgreSQL relational database with Auth role resolution (User, Volunteer, Admin) and encrypted file buckets. Client-side jsPDF document engine compiling official authority-templated complaint filings with zero server latency.",
    metrics: ["Real-Time WebSockets", "Role-Based Access Control", "Instant PDF Engine", "PostgreSQL Storage"],
    tags: ["React 18", "Node.js", "Socket.IO", "Supabase", "PostgreSQL", "Vercel"],
    githubUrl: "https://github.com/ahmadrayan-create/lawledge-platform-1"
  },
  {
    id: "secureshell",
    title: "SecureShell",
    category: "LOW_LEVEL / SYSTEMS_SECURITY",
    description: "Custom UNIX command-line shell with dual-hash Bloom Filter malware detection (O(1), <5% false positive), Trie + Treap autocompletion, and chroot jail sandboxing for untrusted binaries.",
    architecture: "Dual-hash DJB2/SDBM Bloom Filter malware shield for pre-execution threat detection. Trie auto-completion backed by balanced Treap structures, and hardware-isolated chroot jail execution sandbox restricting untrusted binaries.",
    metrics: ["<5% Bloom False Positives", "Sub-ms Lookup Latency", "Chroot Jail Isolation", "Zero Memory Leaks"],
    tags: ["C++", "POSIX", "Bloom Filter", "Treap", "Chroot"],
    githubUrl: "https://github.com/ahmadrayan-create/secure-algorithmic-shell"
  },
  {
    id: "codeconnect",
    title: "CodeConnect",
    category: "DEEP-TECH / SYSTEMS_COMPILER",
    description: "Educational platform bridging C# WinForms (managed) with a 32-bit x86 Assembly DLL via P/Invoke. Features 4-bit bitwise packing, double-buffered rendering, and strict stack frame management.",
    architecture: "Unmanaged-to-managed bridge using C# P/Invoke (__cdecl/__stdcall) connecting WinForms to a custom 32-bit x86 Assembly DLL (NASM). 4-bit bitwise data packing for FlowID/NodeType, strict stack frames (push ebp), and double-buffered rendering.",
    metrics: ["32-bit NASM DLL", "C# P/Invoke Bridge", "4-Bit Bitwise Packing", "Zero Memory Segfaults"],
    tags: ["C#", "WinForms", "x86 Assembly", "P/Invoke", "NASM"],
    githubUrl: "https://github.com/ahmadrayan-create/CodeConnect_COAL_Project"
  },
  {
    id: "usage-metering",
    title: "Production Metering & Billing Engine",
    category: "BACKEND / FINTECH API",
    description: "Enterprise SaaS billing platform with integer micro-cent precision, Stripe webhook idempotency enforcement, dynamic quota enforcement engine, and ACID-compliant PostgreSQL audit logs. Containerized via Docker.",
    architecture: "Asynchronous HTTP metering engine built with Python & FastAPI using integer-based micro-cent precision to eliminate floating-point rounding errors. Implements strict idempotency keys, Stripe webhook signature verification, dynamic tier quota enforcement, and ACID PostgreSQL transactional event logs.",
    metrics: ["Micro-Cent Precision", "100% Idempotency", "Zero Revenue Leakage", "ACID Event Logs"],
    tags: ["Python", "FastAPI", "PostgreSQL", "Stripe API", "Docker"],
    githubUrl: "https://github.com/ahmadrayan-create/flyrank-capstone-metering-billing"
  },
  {
    id: "vectorglide-3d",
    title: "VectorGlide 3D",
    category: "MATH_SIMULATION / GEOMETRY",
    description: "3D drone trajectory simulation platform built with React Three Fiber, evaluating space curves r(t), Frenet-Serret frames T(t)/N(t), and arc-length reparameterization for constant-speed navigation.",
    architecture: "Evaluates r(t) space curves, velocity, speed, and arc length. Renders 500+ point curves with Frenet-Serret frames (T, N, B) and coordinate plane projections. Custom Blender low-poly GLTF drone asset with arc-length reparameterization for constant speed.",
    metrics: ["500+ Point Trajectories", "Frenet-Serret Kinematics", "WebGL 1080p Telemetry", "Arc-Length Reparameterization"],
    tags: ["React", "Three.js", "React Three Fiber", "Math.js", "Blender", "GLTF"],
    githubUrl: "https://github.com/ahmadrayan-create/VectorGlide-3D"
  },
  {
    id: "llm-triage",
    title: "Automated LLM Support Triage API",
    category: "AI_MICROSERVICE / AGENTIC",
    description: "An intelligent backend classification microservice built for enterprise customer support teams to automatically triage, validate, and route incoming tickets using LLMs.",
    architecture: "Asynchronous REST endpoints leveraging OpenRouter API for real-time query intent parsing. Implemented strict Pydantic schema validation coupled with automated self-healing retry loops for malformed model outputs and a quarantine logging mechanism for low-confidence inferences.",
    metrics: ["Milliseconds Triage", "-35% Retry Overhead", "0% Schema Failures", "Self-Healing Loops"],
    tags: ["Python", "FastAPI", "OpenRouter API", "Pydantic", "Asyncio", "LLM Orchestration"],
    githubUrl: "https://github.com/ahmadrayan-create/llm-triage-api"
  },
  {
    id: "blue-barn",
    title: "Blue Barn: Enterprise AgriTech DBMS",
    category: "ENTERPRISE / AGRI-TECH",
    description: "A multi-tenant AgriTech relational database platform engineered for dairy farm operators to centralize herd health, breeding cycles, and milk production.",
    architecture: "Relational schema with 15+ normalized tables, enforcing referential integrity. Automated workflows via 54 stored procedures, 18 functions, and 17 triggers enabling real-time vet assignment, breeding predictions, and multi-table transaction rollbacks. Integrated C# front-end.",
    metrics: ["15+ Normalized Tables", "54 Stored Procedures", "+20% Reporting Accuracy", "Highest Batch Score"],
    tags: ["SQL Server", "T-SQL", "C#", ".NET", "Stored Procedures", "Triggers", "UDFs"],
    githubUrl: "https://github.com/ahmadrayan-create/cattlefarm-dbms"
  },
  {
    id: "eld-engine",
    title: "Enterprise ELD & Compliance Engine",
    category: "FULL-STACK / LOGISTICS",
    description: "A full-stack commercial fleet navigation and compliance engine built for logistics operators to automate Hours of Service (HOS) routing and FMCSA reporting.",
    architecture: "Interactive GIS routing dashboard using Leaflet to calculate commercial transit paths and fuel stops. Automated compliance calculation engine adhering strictly to FMCSA 11-hour driving and 14-hour duty regulations, generating dynamic vector SVG 24-hour log sheets.",
    metrics: ["100% FMCSA Compliant", "Dynamic SVG Logs", "GIS Path Routing", "Automated HOS Schedulers"],
    tags: ["TypeScript", "React", "Django", "Python", "Leaflet.js", "Tailwind CSS", "SVG"],
    githubUrl: "https://github.com/ahmadrayan-create/eld-compliance-engine"
  },
  {
    id: "kisan-zarai-bazar",
    title: "Kisan Zarai Bazar: Agricultural Disease Diagnostic App",
    category: "APPLIED_AI / COMPUTER_VISION",
    description: "An AI-orchestrated agricultural disease detection platform for farmers to diagnose crop disease images, receive treatment recommendations, and listen via voice synthesis.",
    architecture: "Multi-modal Gemini API integration via Google AI Studio. Analyzes crop pathology from uploaded images, matches recommended treatments against brand inventories, and delivers solutions in Urdu and English with accessibility voice output.",
    metrics: ["Bilingual Voice & Text", "Multi-Modal Gemini Vision", "Instant Disease Rx", "70% Dev Time Reduction"],
    tags: ["Gemini API", "Google AI Studio", "Computer Vision", "Prompt Engineering", "Voice Synthesis"]
  },
  {
    id: "secure-data-toolbox",
    title: "Cryptographic Security & Steganography Engine",
    category: "SECURITY / CRYPTOGRAPHY",
    description: "An information security platform engineered for privacy-focused users to perform cryptographic key generation, file encryption, and hidden image steganography.",
    architecture: "PBKDF2 key derivation functions paired with AES-256 encryption. Least Significant Bit (LSB) image steganography module concealing encrypted payloads inside carrier images with SHA-256 integrity headers.",
    metrics: ["SHA-256 Tamper Detection", "AES-256 + PBKDF2", "Zero Visual Degradation", "LSB Steganography"],
    tags: ["C#", ".NET", "Cryptography API", "LSB Steganography", "PBKDF2", "SHA-256"],
    githubUrl: "https://github.com/ahmadrayan-create/secure-data-toolbox"
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Backend AI Engineering Intern",
    company: "FlyRank AI",
    period: "July 2026 – September 2026",
    isVenture: false,
    badge: "Production AI Systems",
    bullets: [
      "Developed RAG (Retrieval-Augmented Generation) answer flows and structured-output pipelines for extraction, classification, and drafting tasks.",
      "Defined FastAPI endpoint contracts — payload schemas, status codes, error-handling layers — prior to implementation.",
      "Engineered lightweight evaluation rubrics and custom test scripts to transition experimental AI features into production-grade services.",
      "Implemented authentication wrappers and automated retry mechanisms under strict remote-first builder standards."
    ]
  },
  {
    role: "AI/ML Engineering Intern",
    company: "SafeX Solutions",
    period: "July 2026 – September 2026",
    isVenture: false,
    badge: "AI/ML Systems",
    bullets: [
      "Translated ML theory into production-ready pipelines; refined automated preprocessing and feature validation layers.",
      "Implemented and evaluated iterative AI/ML model versions, optimizing prediction accuracy and variance reduction.",
      "Bridged algorithmic development with structured system workflows for distributed enterprise environments."
    ]
  },
  {
    role: "Global Nobel Intern",
    company: "Nobel Navigators",
    period: "June 2026 – November 2026",
    isVenture: false,
    badge: "Global Leadership Cohort",
    bullets: [
      "Selected for the intensive, multi-stage global internship program focused on advanced international leadership, strategic technology integration, and high-stakes problem-solving.",
      "Engaged in high-frequency collaborative modules spanning foundational global leadership, cross-cultural project execution, and strategic technology transformation."
    ]
  },
  {
    role: "Founder & Lead AI Solutions Architect",
    company: "DeepBuild AI Services",
    period: "Aug 2025 – Present",
    isVenture: true,
    link: "https://deepbuild-ai-services.vercel.app",
    badge: "Venture Consultancy",
    tagline: "Independent AI engineering consultancy and technical prototyping lab — delivering custom web applications, agentic workflow automations (n8n, Make.com), and bespoke LLM integrations.",
    bullets: [
      "Independent technical consultancy and technical prototyping lab delivering custom web applications, agentic workflow automations (n8n, Make.com), and bespoke LLM integrations.",
      "Architected n8n and Make.com automation sequences connecting complex business processes with autonomous LLM reasoning, external APIs, and Apify web scrapers.",
      "Engineered high-performance web applications utilizing Next.js, React, and Tailwind CSS, featuring streaming UIs for zero-latency user experiences.",
      "Formulated technical evaluation frameworks and bespoke prototypes (RAG knowledge bases, ReAct function-calling agents) resolving architectural bottlenecks."
    ],
    pillars: [
      {
        title: "Technical Prototyping",
        description: "Bespoke LLM integrations, RAG knowledge bases, and ReAct function-calling agents engineered to validate technical feasibility."
      },
      {
        title: "Agentic Workflow Automation",
        description: "Stateful automation sequences in n8n and Make.com connecting business logic with autonomous LLM reasoning, APIs, and web scrapers."
      },
      {
        title: "Custom Web Applications",
        description: "High-performance digital experiences utilizing Next.js, React, and Tailwind CSS with streaming UI architecture."
      },
      {
        title: "Strategic AI Advisory",
        description: "Technical evaluation frameworks and architecture audits helping engineering teams identify high-ROI automation bottlenecks."
      }
    ]
  },
  {
    role: "Artificial Intelligence Virtual Intern",
    company: "CodeAlpha",
    period: "Nov 2025 – Nov 2025",
    isVenture: false,
    badge: "Govt MSME Recognized",
    bullets: [
      "Built and benchmarked computer vision analytics (YOLOv8 + Deep SORT ROI tracking), semantic FAQ retrieval agents (S-BERT + Mahalanobis distance), and low-latency speech-to-speech translation engines with contextual glossaries.",
      "Awarded formal Letter of Recommendation from Founder & CEO Sorticri praising extraordinary analytical prowess, high productivity, and rapid adaptation to emerging AI stacks (Certificate ID: CA/SE1/26599)."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI & Agentic Orchestration",
    skills: [
      { name: "RAG Pipelines & Vector Embeddings", level: 96, info: "Retrieval Grounding & Audits" },
      { name: "FastAPI & Pydantic", level: 95, info: "Endpoint Schemas & Self-Healing" },
      { name: "Gemini API & Anthropic API", level: 95, info: "Multi-Modal & ReAct Agents" },
      { name: "OpenRouter & Prompt Engineering", level: 94, info: "Precision Role Definition" },
      { name: "n8n & Make.com", level: 95, info: "Production Multi-Agent Sequences" },
      { name: "YOLOv8 & S-BERT", level: 88, info: "Deep SORT & Semantic Search" },
      { name: "Cursor, v0 & Lovable", level: 95, info: "AI-Orchestrated Rapid Prototyping" },
      { name: "Apify & BeautifulSoup", level: 88, info: "Ethical Automated Scraping" }
    ]
  },
  {
    category: "Languages & Core Systems",
    skills: [
      { name: "Python", level: 95, info: "FastAPI, Asyncio, Pydantic" },
      { name: "C++", level: 90, info: "POSIX, Bloom Filters, Treaps" },
      { name: "C# / .NET", level: 92, info: "WPF, WinForms, P/Invoke, EF Core" },
      { name: "TypeScript / JavaScript", level: 90, info: "React 18, Next.js, Node.js" },
      { name: "SQL (T-SQL & PostgreSQL)", level: 92, info: "Stored Procs, Triggers, RDBMS" },
      { name: "32-bit x86 Assembly", level: 82, info: "NASM, Bitwise Registers, Stacks" }
    ]
  },
  {
    category: "Frameworks, Architecture & Cloud",
    skills: [
      { name: "FastAPI & Docker", level: 93, info: "Containerized Microservices" },
      { name: "PostgreSQL & Supabase Auth", level: 92, info: "RBAC, RLS, Edge Relational DB" },
      { name: "React 18 & Next.js", level: 90, info: "Edge Streaming, Tailored SPAs" },
      { name: "Socket.IO & WebSockets", level: 90, info: "Live Bidirectional Messaging" },
      { name: "Framer Motion & Tailwind CSS", level: 92, info: "Fluid System Animations" },
      { name: "SQL Server & EF Core", level: 90, info: "15+ Normalized Tables, Procs" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "hacktoberfest-1st",
    title: "🏆 1st Place — Hacktoberfest Hack Day Multan",
    issuer: "Major League Hacking (MLH) × AWS Student Builder Group × BZU",
    period: "October 31, 2026",
    highlight: "Built and deployed MandiLinkAI live on Vercel under a strict 60-minute time constraint. Stack: Gemini AI, Snowflake CoCo, Solana Agent Registry, GitHub Copilot.",
    skills: ["Gemini AI", "Snowflake CoCo", "Solana", "Vercel", "Rapid Prototyping"],
    badgeColor: "emerald"
  },
  {
    id: "ausc-president",
    title: "President — Air University Startup Club (AUSC)",
    issuer: "Business Incubation Center (BIC)",
    period: "2026–2027 Term",
    highlight: "Elected to lead the university's entrepreneurship society in coordination with the Business Incubation Center (BIC). Mentors student startups and coordinates strategic growth programs.",
    skills: ["Startup Mentorship", "Executive Leadership", "Incubation", "Strategic Growth"],
    badgeColor: "blue"
  },
  {
    id: "leverify-topbuild",
    title: "Top Build Award — Leverify AI Cohort",
    issuer: "Leverify Quest",
    period: "August 2025",
    highlight: "Selected among top 40 builders from 1,000+ applicants in Pakistan's inaugural live AI Agents & Vibe Coding cohort. Honored with the Top Build of the Cohort award for capstone architecture.",
    skills: ["AI Agents", "n8n", "Make.com", "Cursor", "Webhooks"],
    badgeColor: "emerald"
  },
  {
    id: "anthropic-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    period: "Verified",
    highlight: "Official certification validating advanced proficiency in collaborating with frontier AI systems effectively, efficiently, ethically, and safely across technical workflows.",
    skills: ["Claude Code", "MCP Architecture", "AI Safety", "Prompt Logic"],
    badgeColor: "blue"
  },
  {
    id: "outskill-mastery",
    title: "AI For Engineering & Mastermind Generative AI",
    issuer: "Outskill",
    period: "Aug & Oct 2025",
    highlight: "26+ hours intensive professional program instructed by Vaibhav Sisinty and industry leaders from Google, Microsoft, and Netflix. Covered Claude, Gemini, Hugging Face, multi-modal generation, and agent task orchestration.",
    skills: ["Gemini API", "Claude", "Hugging Face", "Model Tuning"],
    badgeColor: "emerald"
  },
  {
    id: "leverify-data",
    title: "Professional Data Analytics Certification",
    issuer: "Leverify",
    period: "February 2025",
    highlight: "Ranked among the Top 10 scorers in the cohort. Designed end-to-end data pipelines analyzing historical stock price datasets (2000–present) with custom dashboards in Power BI and Looker Studio.",
    skills: ["Power BI", "Looker Studio", "Data Pipelines", "Statistical Modeling"],
    badgeColor: "amber"
  },
  {
    id: "codealpha-cert",
    title: "Artificial Intelligence Virtual Internship & Recommendation",
    issuer: "CodeAlpha (Govt of India MSME Recognized)",
    period: "November 2025",
    credentialId: "CA/SE1/26599",
    highlight: "Completed virtual AI internship with formal Letter of Recommendation from Founder & CEO Sorticri citing high productivity, teamwork, and rapid technical adaptation.",
    skills: ["YOLOv8", "Deep SORT", "S-BERT", "Speech-to-Speech"],
    badgeColor: "cyan"
  },
  {
    id: "leverify-vibe",
    title: "Vibe Coding and AI Agents Program",
    issuer: "Leverify",
    period: "July 2025",
    highlight: "Completed Pakistan's first live course on Vibe Coding, prompt engineering, and autonomous agent orchestration across Cursor, Lovable, Bolt, and n8n.",
    skills: ["Vibe Coding", "LLM Prompting", "Lovable", "Firebase"],
    badgeColor: "emerald"
  }
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Air University Multan",
  period: "Expected Graduation: May 2028 (5th Semester Ongoing)",
  statusLine: "CGPA: 3.55 | DSA: 12/12",
  leadership: [
    {
      role: "President (2026–2027 Term)",
      organization: "Air University Startup Club (AUSC) & BIC",
      highlight: "Elected to lead the university's entrepreneurship society in coordination with the Business Incubation Center (BIC). Mentors student startups and coordinates strategic growth programs."
    },
    {
      role: "Academics Head & Chair of UNHRC",
      organization: "Air University Model United Nations",
      highlight: "Presided over international diplomatic simulations and deployed custom Gemini AI guidance gems for student delegates."
    },
    {
      role: "Appointed Team Coordinator",
      organization: "University Debating Society",
      highlight: "Guiding rhetoric development, team logistics, and inter-varsity debate championship delegations."
    },
    {
      role: "Core Member (2024–2025)",
      organization: "TechBist Society",
      highlight: "Orchestrating technical hackathons, competitive coding workshops, and campus engineering meetups."
    },
    {
      role: "Delegation Head (Germany)",
      organization: "Model United Nations & Global Village",
      highlight: "Led an 11-member team representing German culture and international policy at Model United Nations."
    }
  ]
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    role: "🏆 1st Place Winner",
    organization: "Hacktoberfest Hack Day Multan (MLH × AWS × BZU)",
    impact: "Built and deployed MandiLinkAI live on Vercel under a strict 60-minute time constraint. Stack: Gemini AI, Snowflake CoCo, Solana Agent Registry, GitHub Copilot (Oct 31, 2026).",
    image: "https://i.ibb.co/ycdTDXcc/Whats-App-Image-2026-11-04-at-6-56-16-PM-1.jpg",
    credentialUrl: "https://lnkd.in/p/drnDqw2T"
  },
  {
    role: "Chair of UNHRC",
    organization: "Model United Nations",
    impact: "Presided over diplomatic committee sessions, leading high-stakes negotiation and resolution drafting.",
    image: "https://i.ibb.co/p6zfNDV5/MUN-GP.jpg",
    credentialUrl: "https://lnkd.in/p/dZc3pVGp"
  },
  {
    role: "Operations Lead (Usher)",
    organization: "TechXhibit South Punjab",
    impact: "Coordinated the region’s largest tech exhibition, overseeing logistics for 130+ AI, App Dev, and Computer Vision project deployments.",
    image: "https://i.ibb.co/67dkDvqG/techfest.jpg",
    credentialUrl: "https://lnkd.in/p/dENwXpRh"
  }
];


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
    value: "FlyRank AI",
    label: "AI Engineering",
    institution: "Production RAG & API Flows",
    monoCode: "async def stream_rag_audit():"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "lawledge",
    title: "LawLedge: Legal Portal & Grievance System",
    category: "FULL-STACK / REAL-TIME WEBSOCKETS",
    description: "An end-to-end civic legal portal and grievance reporting platform that automates case routing, evidence management, and real-time community collaboration.",
    architecture: "React 18 SPA + Node.js Socket.IO persistent WebSocket hub. Supabase PostgreSQL relational database with Auth role resolution (User, Volunteer, Admin) and encrypted file buckets. Client-side jsPDF document engine compiling official authority-templated complaint filings with zero server latency.",
    metrics: ["Real-Time WebSockets", "Role-Based Access Control", "Instant PDF Engine", "PostgreSQL Storage"],
    tags: ["React 18", "Node.js", "Socket.IO", "Supabase", "PostgreSQL", "Tailwind CSS", "jsPDF"],
    githubUrl: "https://github.com/ahmadrayan-create/lawledge-platform-1"
  },
  {
    id: "usage-metering",
    title: "Production Usage Metering & Billing Engine",
    category: "BACKEND / FINTECH API",
    description: "An enterprise usage-based billing platform engineered for SaaS providers to accurately meter API consumption, enforce quotas, and automate payment processing.",
    architecture: "Asynchronous HTTP metering engine built with Python & FastAPI using integer-based micro-cent precision to eliminate floating-point rounding errors. Implements strict idempotency keys, Stripe webhook signature verification, dynamic tier quota enforcement, and ACID PostgreSQL transactional event logs.",
    metrics: ["Micro-Cent Precision", "100% Idempotency", "Zero Revenue Leakage", "ACID Event Logs"],
    tags: ["Python", "FastAPI", "PostgreSQL", "Stripe API", "Docker", "Pydantic", "Asyncio"],
    githubUrl: "https://github.com/ahmadrayan-create/flyrank-capstone-metering-billing"
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
    id: "codeconnect",
    title: "CodeConnect: Visual x86 Assembly & System Bridge",
    category: "DEEP-TECH / SYSTEMS_COMPILER",
    description: "An educational deep-tech platform designed for computer science students to visualize low-level x86 assembly logic and register operations via an interactive GUI.",
    architecture: "Unmanaged-to-managed bridge using C# P/Invoke (__cdecl/__stdcall) connecting WinForms to a custom 32-bit x86 Assembly DLL (NASM). 4-bit bitwise data packing for FlowID/NodeType, strict stack frames (push ebp), and double-buffered rendering.",
    metrics: ["32-bit NASM DLL", "C# P/Invoke Bridge", "4-Bit Bitwise Packing", "Zero Memory Segfaults"],
    tags: ["C# WinForms", "x86 Assembly", "NASM", "P/Invoke", "C++", "Systems Architecture"],
    githubUrl: "https://github.com/ahmadrayan-create/CodeConnect_COAL_Project"
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
    id: "vectorglide-3d",
    title: "VectorGlide 3D: Trajectory Simulation Engine",
    category: "MATH_SIMULATION / GEOMETRY",
    description: "A 3D web simulation platform modeling autonomous drone trajectories via space curve calculus to visualize kinematic paths and MPC navigation telemetry.",
    architecture: "Evaluates r(t) space curves, velocity, speed, and arc length. Renders 500+ point curves with Frenet-Serret frames (T, N, B) and coordinate plane projections. Custom Blender low-poly GLTF drone asset with arc-length reparameterization for constant speed.",
    metrics: ["500+ Point Trajectories", "Frenet-Serret Kinematics", "WebGL 1080p Telemetry", "Arc-Length Reparameterization"],
    tags: ["React", "Three.js", "React Three Fiber", "Math.js", "GLTF / Blender", "Linear Algebra"],
    githubUrl: "https://github.com/ahmadrayan-create/VectorGlide-3D"
  },
  {
    id: "secureshell",
    title: "Sandboxed POSIX Shell Subsystem & Security Shield",
    category: "LOW_LEVEL / SYSTEMS_SECURITY",
    description: "A high-performance custom UNIX terminal subsystem engineered for system administrators requiring secure command routing and kernel-level sandboxing.",
    architecture: "Dual-hash DJB2/SDBM Bloom Filter malware shield for pre-execution threat detection. Trie auto-completion backed by balanced Treap structures, and hardware-isolated chroot jail execution sandbox restricting untrusted binaries.",
    metrics: ["<5% Bloom False Positives", "Sub-ms Lookup Latency", "Chroot Jail Isolation", "Zero Memory Leaks"],
    tags: ["C++", "POSIX System Calls", "Treaps", "Bloom Filters", "Tries", "Chroot Sandbox"],
    githubUrl: "https://github.com/ahmadrayan-create/secure-algorithmic-shell"
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
    role: "AI Engineering Intern",
    company: "FlyRank AI",
    period: "July 2026 – September 2026",
    isVenture: false,
    badge: "Production AI Systems",
    bullets: [
      "Retrieval & Grounding (RAG): Architected retrieval-backed answer flows and structured-output pipelines (extraction, classification, drafting), establishing a verifiable audit trail between source data and AI inferences.",
      "API Contracts & Resilience: Defined robust REST endpoints with strict Pydantic payload schemas, standardized status codes, authentication wrappers, and resilient retry loops to eliminate failure modes under high-concurrency production workloads.",
      "Evaluation & Observability: Formulated lightweight evaluation rubrics, automated testing harnesses, and observability plans to transition experimental AI features into predictable, audit-grade production services."
    ]
  },
  {
    role: "Global Nobel Intern",
    company: "Nobel Navigators",
    period: "June 2026 Cohort – Present",
    isVenture: false,
    badge: "Global Leadership Cohort",
    bullets: [
      "Selected for the intensive, multi-stage global internship program focused on advanced international leadership, strategic technology integration, and high-stakes problem-solving.",
      "Engage in high-frequency collaborative modules (multiple live sessions weekly) spanning foundational global leadership, cross-cultural project execution, and strategic technology transformation."
    ]
  },
  {
    role: "Founder & Lead AI Solutions Architect",
    company: "DeepBuild AI Services",
    period: "Aug 2025 – Present",
    isVenture: true,
    link: "https://deepbuild-ai-services.vercel.app",
    badge: "Venture Agency",
    tagline: "An AI engineering agency and strategic consultancy delivering custom web development, agentic workflow automations, bespoke AI application engineering, and technical advisory.",
    bullets: [
      "Agentic Workflow Automation: Architected stateful n8n and Make.com automation sequences connecting complex business processes with autonomous LLM reasoning, external APIs, and Apify web scrapers.",
      "Custom Web Development: Built high-performance, brand-tailored websites and web applications utilizing Next.js, React, and Tailwind CSS, featuring streaming UIs for zero-latency user experiences.",
      "Bespoke AI Applications & Engineering: Developed custom AI prototypes (RAG tutors, ReAct function-calling agents) and engineered solutions to troubleshoot, optimize, and resolve issues in existing client systems.",
      "AI Strategy & Consultancy: Formulated technical evaluation frameworks to consult business owners on identifying high-ROI operational bottlenecks solvable via AI automation."
    ],
    pillars: [
      {
        title: "Custom Web Development",
        description: "High-performance, conversion-optimized digital experiences utilizing Next.js, React, and Tailwind CSS. Modern, SEO-ready, and edge-deployed in days."
      },
      {
        title: "Agentic Workflow Automation",
        description: "Stateful automation sequences in n8n and Make.com connecting business logic with autonomous LLM reasoning, APIs, and web scrapers. Achieve 60–80% efficiency gains."
      },
      {
        title: "Bespoke AI Applications",
        description: "Domain-specific AI applications including RAG knowledge bases, ReAct function-calling agents, and custom GPT models tailored to proprietary data."
      },
      {
        title: "Strategic AI Advisory",
        description: "Comprehensive audits of digital infrastructure and operational workflows, delivering concrete technical roadmaps to implement high-ROI AI agent architectures."
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
    category: "Languages & Core Systems",
    skills: [
      { name: "Python", level: 94, info: "FastAPI, Asyncio, Pydantic" },
      { name: "C++", level: 90, info: "POSIX, Bloom Filters, Treaps" },
      { name: "C# / .NET", level: 92, info: "WPF, WinForms, P/Invoke, EF Core" },
      { name: "TypeScript / JavaScript", level: 88, info: "React 18, Next.js, Node.js" },
      { name: "SQL (T-SQL / PostgreSQL)", level: 90, info: "Stored Procs, Triggers, RDBMS" },
      { name: "32-bit x86 Assembly", level: 82, info: "NASM, Bitwise Registers, Stacks" }
    ]
  },
  {
    category: "AI & Agentic Orchestration",
    skills: [
      { name: "n8n & Make.com", level: 95, info: "Production Multi-Agent Sequences" },
      { name: "Gemini & OpenAI APIs", level: 95, info: "RAG, ReAct, Multi-Modal" },
      { name: "Cursor, v0 & Lovable", level: 95, info: "AI-Orchestrated Rapid Prototyping" },
      { name: "Anthropic Claude & Perplexity", level: 92, info: "Deep Reasoning & Research" },
      { name: "Apify & BeautifulSoup", level: 88, info: "Ethical Automated Scraping" },
      { name: "Prompt Engineering & Evals", level: 94, info: "Self-Healing Pydantic Loops" }
    ]
  },
  {
    category: "Frameworks, Architecture & Cloud",
    skills: [
      { name: "FastAPI & Django", level: 92, info: "High-Throughput Microservices" },
      { name: "React 18 & Next.js", level: 90, info: "Edge Streaming, Tailored SPAs" },
      { name: "PostgreSQL & Supabase", level: 90, info: "RLS, Real-Time Hubs, Edge DB" },
      { name: "SQL Server & EF Core", level: 90, info: "15+ Normalized Tables, Procs" },
      { name: "Socket.IO & WebSockets", level: 88, info: "Live Bidirectional Messaging" },
      { name: "Docker & Docker Compose", level: 86, info: "Multi-Stage Containers" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "leverify-topbuild",
    title: "Top Build of the Cohort & Elite Builder Award",
    issuer: "Leverify Quest",
    period: "August 2025",
    highlight: "Selected out of 1,000+ applicants into Pakistan's inaugural live AI Agents & Vibe Coding cohort (Top 40 builders). Honored with the Top Build of the Cohort award for the capstone that directly laid the operational foundation for DeepBuild AI.",
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
    badgeColor: "purple"
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
  statusLine: "CGPA: 3.55 | Maximum 12/12 Grade Points in Data Structures & Algorithms",
  leadership: [
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
      role: "Executive Member",
      organization: "Student Club (Umbrella Society)",
      highlight: "Executive member of the central governing body overseeing all university clubs, events, and student initiatives."
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
    role: "Chair of UNHRC",
    organization: "Model United Nations",
    impact: "Presided over diplomatic committee sessions, leading high-stakes negotiation and resolution drafting.",
    image: "/src/assets/images/unhrc_achievement_1779702400408.png",
    credentialUrl: "https://deepbuild-ai-services.vercel.app/"
  },
  {
    role: "Operations Lead (Usher)",
    organization: "TechXhibit South Punjab",
    impact: "Coordinated the region’s largest tech exhibition, overseeing logistics for 130+ AI, App Dev, and Computer Vision project deployments.",
    image: "/src/assets/images/techx_achievement_1779702424415.png",
    credentialUrl: "https://deepbuild-ai-services.vercel.app/"
  },
  {
    role: "Founder / Pitch Finalist",
    organization: "BrandScape Entrepreneurship Gala",
    impact: "Recognized for high-impact pitch and structural execution of Blue Barn, a data-driven livestock asset management system.",
    image: "/src/assets/images/brandscape_achievement_1779702443797.png",
    credentialUrl: "https://deepbuild-ai-services.vercel.app/"
  }
];

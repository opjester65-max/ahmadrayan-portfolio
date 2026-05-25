import { Project, Experience, SkillCategory, LeadershipItem, Achievement } from "./types";

export const PORTFOLIO_METRIC_CARDS = [
  {
    value: "3.56 CGPA",
    label: "Academic Standing",
    institution: "Air University",
    monoCode: "double cgpa = 3.56;"
  },
  {
    value: "12/12 Perfect Score",
    label: "Data Structures & Algorithms",
    institution: "Core Theory & Practice",
    monoCode: "std::vector<Node*> dsa_score(12);"
  },
  {
    value: "450+ Applied Hours",
    label: "LLM Prompting & ReAct Agent Patterns",
    institution: "Engineering Production Flow",
    monoCode: "async function runAgent() { ... }"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "blue-barn",
    title: "Blue Barn",
    category: "ENTERPRISE / AGRI-TECH",
    description: "An integrated livestock enterprise asset management system designed to digitize dairy and cattle farming operations through data-driven tracking and structural automation.",
    architecture: "Relational schema utilizing 15+ normalized tables, fully automated via 54 stored procedures, 18 user-defined functions, and 17 triggers. Improved reporting accuracy by 20% with real-time breeding predictions and integrated C# dashboards. Earned the highest marks across the entire academic batch.",
    metrics: ["15+ Normalized Tables", "50+ Stored Procedures", "+20% Management Accuracy", "1st Rank Batch Evaluation"],
    tags: ["C#", "SQL Server", ".NET 8.0", "WPF", "Stored Procedures", "Triggers", "UDFs"]
  },
  {
    id: "vectorglide-3d",
    title: "VectorGlide 3D",
    category: "MATH_SIMULATION / GEOMETRY",
    description: "A highly advanced space curve and drone trajectory simulator developed for multi-variable calculus visualization exhibitions.",
    architecture: "Modeled 3D spatial trajectories and physical kinematics equations to map real-time flight vectors within custom visual layouts.",
    metrics: ["3D Space Curve Engine", "Physics Kinematics Math", "Vector Visualization UI"],
    tags: ["TypeScript", "Three.js / WebGL", "Linear Algebra", "Calculus Visualizer", "Canvas Rendering"]
  },
  {
    id: "fintech-tracker",
    title: "Advanced FinTech Tracker",
    category: "FINTECH / MARKET_ANALYTICS",
    description: "High-frequency commodity tracking systems analyzing historical and live spot gold markets (XAUUSD) alongside stock datasets using automated charting interfaces and rapid data stream processing.",
    architecture: "Cleaned, filtered, and processed multi-thousand-row datasets within Power BI and Looker Studio to deliver structural market indicators and actionable trend predictions.",
    metrics: ["Multi-K Datasets Cleaned", "XAUUSD Trend Analytics", "Automated Visual Reports"],
    tags: ["Power BI", "Looker Studio", "Data Engineering", "XAUUSD Analytics", "Market Signals"]
  },
  {
    id: "code-to-survive",
    title: "CodeToSurvive",
    category: "SIMULATOR / COMPILED_LANG",
    description: "Immersive developer lifecycle application built with C# .NET 8.0, WPF, and EF Core.",
    architecture: "Features a custom syntax parser (Tokenizer & Parser modules) to validate code blocks, backed by 80% unit testing coverage via xUnit.",
    metrics: ["Custom Lexer/Parser", "WPF Desktop Frame", "80% xUnit Coverage", "EF Core Persistence"],
    tags: ["C#", ".NET 8.0", "WPF", "EF Core", "xUnit Testing", "Syntax Tokenizer"]
  },
  {
    id: "secureshell",
    title: "SecureShell",
    category: "LOW_LEVEL / DATA_STRUCTURES",
    description: "Low-level C++ command shell optimizing memory layout through data structures like Tries, Bloom Filters, Treaps, and Hash Tables.",
    architecture: "Validated a malicious input false-positive rate under 5% over 500 parallel inserts with direct memory optimization profiles.",
    metrics: ["Bloom Filter Validation", "<5% False-Positives", "500 High-Speed Inserts", "Zero Memory Leaks"],
    tags: ["C++", "Tries", "Bloom Filters", "Treaps", "Hash Tables", "CLI Shell"]
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Founder & Lead Systems Engineer",
    company: "DeepBuild AI Services",
    period: "Aug 2025 - Present",
    isVenture: true,
    link: "https://deepbuild-ai-services.vercel.app",
    tagline: "We combine advanced AI orchestration with practical business logic to drive measurable brand performance.",
    bullets: [
      "AI-Powered Growth Engineering: Combinatorial AI systems designed to drive measurable brand performance and optimize operations.",
      "High-Performance Web Assets: Conversion-optimized digital interfaces engineered for rapid edge delivery and core search discoverability.",
      "Automated Pipeline Workflows: Implementation of intelligent multi-agent automation matrices yielding 60-80% manual efficiency gains.",
      "SaaS & AI Consultation Services: End-to-end operational audits offering high-level roadmaps to scale emerging AI agent infrastructures cleanly."
    ],
    pillars: [
      {
        title: "Website Development",
        description: "We build high-performance, conversion-optimized digital experiences. Modern, SEO-ready, and delivered in days, not months."
      },
      {
        title: "AI Content Systems",
        description: "We design automated pipelines that generate unlimited, on-brand marketing content—from blog posts to social media—eliminating creative bottlenecks."
      },
      {
        title: "Automated Workflows",
        description: "We deploy intelligent AI agents to automate repetitive operational tasks like lead qualification, customer support, and scheduling. Achieve 60–80% efficiency gains and cost reduction."
      },
      {
        title: "Strategic AI Consultancy",
        description: "We audit your existing digital infrastructure and provide a high-level roadmap to integrate AI into your core business operations, ensuring long-term scalability."
      }
    ]
  },
  {
    role: "Artificial Intelligence Intern",
    company: "CodeAlpha",
    period: "Nov 2025",
    isVenture: false,
    bullets: [
      "Formally commended by organizational leadership for exceptional analytical processing skills and rapid adaptation within distributed, remote sprints."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "C++", level: 90, info: "Advanced, Low-Level Opt" },
      { name: "C# (.NET 8.0 / WPF)", level: 90, info: "Enterprise Backend" },
      { name: "SQL", level: 88, info: "Analytical, Normalization" },
      { name: "JavaScript / TS", level: 85, info: "Fullstack Frontend" },
      { name: "HTML & CSS", level: 85, info: "Semantic Layouts" },
      { name: "Python", level: 60, info: "Beginner level" }
    ]
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "n8n & Make.com", level: 92, info: "Production Sequences" },
      { name: "Gemini / OpenAI APIs", level: 95, info: "Applied Orchestration" },
      { name: "RAG Architectures", level: 88, info: "Knowledge Graph Synced" },
      { name: "Cursor & Lovable", level: 90, info: "Rapid Prototype Systems" },
      { name: "Custom GPT Design", level: 95, info: "Optimized Prompt Routing" },
      { name: "Apify Web Scraping", level: 85, info: "Automated Lead Discovery" }
    ]
  },
  {
    category: "Databases & Infrastructure",
    skills: [
      { name: "SQL Server", level: 90, info: "Stored Procedures" },
      { name: "EF Core & WPF", level: 88, info: "Relational Persistence" },
      { name: "MongoDB & Firebase", level: 85, info: "Document / Key-Value" },
      { name: "Supabase & SQLite", level: 87, info: "Edge Storage / Serverless" },
      { name: "Git & GitHub", level: 90, info: "Secure CI/CD Workflows" }
    ]
  }
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Air University",
  period: "Expected Graduation: May 2028",
  statusLine: "GPA: 3.56 | Dual Concentration in Foundations & Agent Solutions",
  leadership: [
    {
      role: "Core Member",
      organization: "TechBist Society",
      highlight: "Orchestrating technical hackathons and competitive programming meetups."
    },
    {
      role: "Appointed Team Coordinator",
      organization: "University Debating Society",
      highlight: "Guiding rhetoric development, logistics, and inter-varsity coordination."
    },
    {
      role: "Delegate Head",
      organization: "Model United Nations (representing Germany)",
      highlight: "Leading delegations, diplomatic debates, and deploying RAG information lookup engines."
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

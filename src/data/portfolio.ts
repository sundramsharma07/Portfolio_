export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "training", label: "Training" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/sundramsharma07",
  linkedin: "https://www.linkedin.com/in/sundaram-sharma-108a1b297",
} as const;

export const HERO_STRINGS = [
  "Innovative Full-Stack Solutions",
  "AI-Powered Applications",
  "Secure System Architectures",
] as const;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  /**
   * When false, the modal will not embed the live preview (still shows links).
   * Useful when a project should not be showcased visually.
   */
  showLivePreview?: boolean;
};

export const ABOUT_TEXT =
  "I am a B.Tech Computer Science and Engineering student at Lovely Professional University with hands-on experience in web development, backend systems, AI-integrated applications, and secure system design. I enjoy building practical applications and continuously improving my problem-solving skills.";

export const SKILLS = {
  languages: [
    { name: "C++", level: 92 },
    { name: "Python", level: 84 },
    { name: "C", level: 76 },
    { name: "PHP", level: 68 },
    { name: "JavaScript", level: 80 },
  ],
  frameworks: [
    { name: "HTML", level: 86 },
    { name: "CSS", level: 84 },
    { name: "Bootstrap", level: 74 },
    { name: "Node.js", level: 78 },
    { name: "React", level: 82 },
    { name: "Tailwind CSS", level: 86 },
  ],
  tools: [
    "MongoDB",
    "Tableau",
    "MS SQL Server",
    "MySQL",
    "REST APIs",
    "Linux System Calls",
    "Tesseract.js",
    "Google Gemini AI",
  ],
  softSkills: [
    "Problem Solving",
    "Team Work",
    "Adaptability",
    "Communication",
  ],
} as const;

export const PROJECTS = [
  {
    title: "AI Handwritten Text Enhancer",
    description:
      "An OCR + AI workflow that enhances handwritten text using REST APIs and modern AI models.",
    stack: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "REST APIs",
      "Tesseract.js",
      "Google Gemini AI",
    ],
    highlights: [
      "OCR extraction pipeline with Tesseract.js",
      "AI-driven text enhancement via REST endpoints",
      "User-friendly UI for uploads and real-time processing",
    ],
    liveUrl: "https://sundramsharma07.github.io/AI-TEXT-ENHANCER/",
  },
  {
    title: "Educational Web Platform",
    description:
      "A dynamic learning platform with backend modules and database integration to deliver structured content and smoother study flows.",
    stack: ["HTML", "Tailwind CSS", "PHP", "MySQL"],
    highlights: [
      "Backend modules to support dynamic learning flows",
      "Database-driven content management",
      "Responsive UI built for a smooth study experience",
    ],
    repoUrl: "https://github.com/Ashutosh2705Yadav/ChaloSeekhein",
  },
  {
    title: "System Call Interface for Security",
    description:
      "A GUI-based system call interface for security monitoring with access control logic.",
    stack: ["C", "Linux System Calls", "Security Modules", "Shell Scripting"],
    highlights: [
      "Monitoring-focused GUI with control flow for security events",
      "Access control design using secure module boundaries",
      "Shell scripting automation for operational workflows",
    ],
    liveUrl: "https://sundramsharma07.github.io/SystemCall/",
  },
  {
    title: "Voice Bloom – Sentiment Analyzer",
    description:
      "Real-time call sentiment analysis using speech-to-text and AI-driven insights, designed for live monitoring and decision-making.",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML",
      "CSS",
      "APIs",
    ],
    highlights: [
      "Built a real-time call sentiment analysis web app using Node.js, Express.js, and REST APIs.",
      "Integrated speech-to-text and sentiment analysis APIs to process recorded and live call audio.",
      "Used WebSocket’s and MongoDB to store transcripts and stream sentiment insights in real time.",
      "Improved call monitoring and decision-making through a live analytics dashboard.",
    ],
    liveUrl:
      "https://sentiment-analysis-4p3r04h6g-sundram-kumars-projects-5104b986.vercel.app",
    repoUrl: "https://github.com/sundaramsharma07/VoiceBloom",
    showLivePreview: false,
  },
  {
    title: "Get Set Go – Government Exam Mock",
    description:
      "A free mock platform for multiple government exams with a clean TypeScript-first UI and fast practice flow.",
    stack: ["TypeScript", "CSS", "APIs", "Web UI"],
    highlights: [
      "Provides free exam mocks for multiple competitive exams (CGL, CHSL, Railways, SSC).",
      "Built with TypeScript for reliable UI logic and smoother state handling.",
      "Optimized practice experience for quick attempts and review.",
    ],
    liveUrl: "https://get-set-go-mock.lovable.app",
  },
  {
    title: "WhisperGlow Room – Private Voice Chat",
    description:
      "Create a private room for real-time voice conversation with a clean, modern TypeScript + CSS experience.",
    stack: ["TypeScript", "CSS", "APIs", "Web UI"],
    highlights: [
      "Generate a new private voice room in seconds",
      "Real-time communication UX with smooth interactions",
      "Built with TypeScript-first UI logic for reliability",
      "Minimal, premium dark UI for recruiter-grade product feel",
    ],
    liveUrl: "https://whisper-glow-room.lovable.app/",
  },
] satisfies Project[];

export const TRAINING_STEPS = [
  {
    title: "Data Structures and Algorithms training (LPU)",
    detail:
      "Built strong fundamentals by focusing on complexity, patterns, and problem-solving strategies.",
  },
  {
    title: "100+ problems solved",
    detail:
      "Regular practice on HackerRank and GeeksforGeeks to sharpen accuracy and speed.",
  },
] as const;

export const RESUME_DRIVE_ID = "1jEJWUePewgBO3dtvGOqcFwFdIfeYb8KG";
export const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/preview`;
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`;

export type Certificate = {
  title: string;
  subtitle: string;
  url: string;
};

export const CERTIFICATES = [
  {
    title: "Computational Theory (PDF)",
    subtitle: "Certificate document from Drive",
    url: "https://drive.google.com/file/d/1ENoK0rP6uiNMZNX0szmID11yRTgCZsml/view?usp=sharing",
  },
  {
    title: "Schema Patterns (PDF)",
    subtitle: "Certificate document from Drive",
    url: "https://drive.google.com/file/d/1KK0-23RDUS2voQoiKRctBbXM4yFcxabM/view?usp=sharing",
  },
  {
    title: "Relational to Document Model Certificate",
    subtitle: "Certificate from Drive",
    url: "https://drive.google.com/file/d/1iXYVNhtV62nuu80lOd4eCdpGk4qhCV0c/view?usp=sharing",
  },
  {
    title: "ChatGPT Certificate (PDF)",
    subtitle: "Certificate from Drive",
    url: "https://drive.google.com/file/d/1U3ZBCuAFcRyCfoTeRSFtGCiiBk6dlKIm/view?usp=sharing",
  },
  {
    title: "Coursera Certificate",
    subtitle: "Software Development Methodologies",
    url: "https://www.coursera.org/account/accomplishments/certificate/4NYUDFK8TWFB",
  },
  {
    title: "NPTEL Certificate (PDF)",
    subtitle: "Privacy and Security in Online Social Media",
    url: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs117/Course/NPTEL25CS117S66610106310911791.pdf",
  },
  {
    title: "Relational and Document Model Certificate",
    subtitle: "Drive certificate link 1",
    url: "https://drive.google.com/file/d/1wdYrq8oCTvkjhnReCjPxk6MxKOpBFMab/view?usp=drive_link",
  },
  {
    title: "My Bharat Certificate",
    subtitle: "Drive certificate link 2",
    url: "https://drive.google.com/file/d/1V60q-no8BKjsSFrb_Cyf-iIBvI9h62i3/view?usp=sharing",
  },
] satisfies Certificate[];

export const ACHIEVEMENTS = [
  { label: "LeetCode problems solved", value: 100, suffix: "+" },
  { label: "HackerRank C++ rating", value: 5, suffix: "-star" },
  { label: "hours practice (freeCodeCamp)", value: 300, suffix: "+" },
] as const;

export const EDUCATION = [
  { title: "Lovely Professional University", subtitle: "B.Tech CSE", meta: "CGPA 7.72" },
  { title: "Little Flower House", subtitle: "Intermediate", meta: "74.4%" },
  { title: "B D Public School", subtitle: "High School", meta: "89.2%" },
] as const;


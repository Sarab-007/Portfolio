import type { Project } from "../types/project.types";

export const projects: Project[] = [
  {
    id: "medicura",
    title: "MediCura",
    eyebrow: "Next-generation AI healthcare",
    description:
      "MediCura turns symptom chaos into calm clinical clarity through guided symptom intake, multilingual access, safer patient context, prescription previews, and admin-ready clinical operations. It is built around the real care journey: intake, context, intelligence, safety, review, and follow-up.",
    role: "AI healthcare product engineering",
    period: "Clinical AI",
    stack: ["Next.js", "AI", "SSE", "Auth", "PDF Export", "Urdu Voice"],
    highlights: [
      "AI triage transforms unstructured symptoms into cleaner clinical summaries.",
      "Safety guardrails highlight red flags, contraindication concerns, and emergency language.",
      "Urdu voice capture and English translation improve multilingual symptom reporting.",
      "Admin dashboards centralize patient profiles, disease records, trends, and activity.",
    ],
    metrics: [
      { value: "24/7", label: "guided AI intake" },
      { value: "Urdu", label: "speech translation path" },
      { value: "SSE", label: "stream-ready AI responses" },
    ],
    visual: { signal: "Care intelligence layer", accent: "emerald" },
    links: { demo: "https://medicura-health.vercel.app/" },
  },
  {
    id: "terra",
    title: "TERRA",
    eyebrow: "Private global property exchange",
    description:
      "TERRA transforms landmark real estate into a cinematic, intelligent investment experience: curated global assets, AI-guided discovery, blockchain-secured settlement, and a private marketplace built for modern wealth.",
    role: "Luxury marketplace and AI discovery UX",
    period: "Global property exchange",
    stack: ["Next.js", "AI Concierge", "Blockchain", "Escrow", "Marketplace"],
    highlights: [
      "AI-shaped discovery turns every search into a tailored investment narrative.",
      "Verified asset flows frame provenance, location intelligence, and market context.",
      "Investor-grade clarity connects yield, liquidity, valuation signals, and comparables.",
      "Secure workflows support discovery, offers, escrow, and portfolio growth.",
    ],
    metrics: [
      { value: "$10M+", label: "tracked luxury volume" },
      { value: "450+", label: "curated global assets" },
      { value: "5K+", label: "investors in the network" },
    ],
    visual: { signal: "Private market corridor", accent: "amber" },
    links: { demo: "https://terra-exchange.vercel.app/" },
  },
  {
    id: "hive",
    title: "HIVE",
    eyebrow: "IoT smart building command center",
    description:
      "HIVE is an IoT-enabled smart building management platform designed to help building owners, facility managers, and operators monitor, control, and optimize multiple building systems in one place. It transforms buildings into intelligent, efficient, and sustainable environments by integrating data from sensors across HVAC, lighting, security, air quality, and more.",
    role: "Full-stack platform engineering",
    period: "Enterprise IoT",
    stack: ["Angular", "Spring Boot", "MongoDB", "MariaDB", "APIs"],
    highlights: [
      "Live data from sensors including temperature, humidity, air quality, and occupancy.",
      "Remote monitoring for operators across web and mobile dashboards.",
      "Energy usage optimization and reduced operational overhead.",
      "Real-time alerts with proactive action workflows.",
    ],
    metrics: [
      { value: "24/7", label: "sensor visibility" },
      { value: "HVAC", label: "lighting, security, air quality" },
      { value: "API", label: "integrated building systems" },
    ],
    visual: { signal: "Building telemetry", accent: "amber" },
    links: { demo: "https://www.conurets.com/hive/" },
  },
  {
    id: "parksmart-jhah",
    title: "ParkSmart JHAH",
    eyebrow: "Johns Hopkins Aramco Healthcare parking intelligence",
    description:
      "A smart parking management system deployed at JHAH, designed to optimize parking operations and enhance user experience. Using over 1,600 IoT sensors and digital signage across 12 parking lots, the system provides real-time parking availability, reduces search times, improves traffic flow, and offers a dedicated web portal for visitors, staff, and patients.",
    role: "Real-time dashboard and system integration",
    period: "Healthcare mobility",
    stack: ["Angular", "Spring Boot", "Dashboard"],
    highlights: [
      "Real-time parking guidance for visitors, staff, and patients.",
      "IoT sensor integration across a large campus parking footprint.",
      "Scalable analytics for utilization and availability patterns.",
      "Traffic optimization supported by digital signage.",
    ],
    metrics: [
      { value: "1600+", label: "IoT sensors" },
      { value: "12", label: "parking lots" },
      { value: "Live", label: "availability guidance" },
    ],
    visual: { signal: "Parking occupancy", accent: "cyan" },
    links: {
      demo: "https://www.conurets.com/johns-hopkins-aramco-healthcare/",
    },
  },
  {
    id: "hcm",
    title: "HCM",
    eyebrow: "Human Capital Management operations layer",
    description:
      "HCM (Human Capital Management) is an enterprise workforce management platform designed to automate and optimize core HR operations while enhancing employee productivity and organizational performance. The system centralizes employee management, attendance tracking, leave handling, recruitment, and automated payroll processing within a single intelligent platform. It provides real-time workforce analytics, KPI-based performance monitoring, and AI-driven insights to support strategic business decisions and improve operational efficiency.",
    role: "Product workflow and reporting engineering",
    period: "Workforce systems",
    stack: ["React", "Node.js", "PostgreSQL"],
    highlights: [
      "Workforce tracking across attendance and work-hour flows.",
      "Leave management with operational visibility.",
      "Reporting and productivity metrics for business teams.",
    ],
    metrics: [
      { value: "HR", label: "workflow automation" },
      { value: "SQL", label: "reporting models" },
      { value: "React", label: "operator interface" },
    ],
    visual: { signal: "Workforce analytics", accent: "emerald" },
  },
  {
    id: "ipaas",
    title: "iPaaS",
    eyebrow: "Integration Platform as a Service",
    description:
      "iPaaS.com is a cloud-based integration platform that helps businesses connect, automate, and manage data flows across many different software systems from one central hub instead of building custom point-to-point connectors.",
    role: "Integration workflows and backend coordination",
    period: "Cloud automation",
    stack: ["Angular", "Node.js", "RabbitMQ", "CI/CD", "Cloud"],
    highlights: [
      "Real-time data transmission across connected systems.",
      "Data transfer optimization for reliable platform operations.",
      "Hub-and-spoke architecture for centralized integration flows.",
      "Error detection and logging for operational confidence.",
    ],
    metrics: [
      { value: "Hub", label: "spoke architecture" },
      { value: "MQ", label: "event delivery" },
      { value: "CI/CD", label: "release automation" },
    ],
    visual: { signal: "Data flow network", accent: "rose" },
    links: { demo: "https://ipaas.com/" },
  },
];

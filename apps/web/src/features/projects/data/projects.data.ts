import type { Project } from "../types/project.types";

export const projects: Project[] = [
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
      "System to track employee work hours, leave, and productivity metrics.",
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

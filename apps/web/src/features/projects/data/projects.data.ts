import type { Project } from "../types/project.types";

export const projects: Project[] = [
  {
    id: "hive",
    title: "HIVE",
    description:
      "HIVE is an IoT-enabled smart building management platform designed to help building owners, facility managers, and operators monitor, control, and optimize multiple building systems in one place. It transforms buildings into intelligent, efficient, and sustainable environments by integrating data from sensors across HVAC, lighting, security, air quality, and more.",
    stack: ["Angular", "Spring Boot", "MongoDB", "MariaDB", "APIs"],
    highlights: ["live data from sensors (temperature, humidity, air quality, occupancy, etc.)", "Lets managers monitor systems remotely via web or mobile dashboards", "Helps to optimize energy usage and reduce operational costs", "Real-Time alerts & proactive actions"],
    links: { demo: "https://www.conurets.com/hive/" },
  },
  {
    id: "parksmart-jhah",
    title: "ParkSmart JHAH (John Hopkins Aramco Hospital)",
    description:
      "A smart parking management system deployed at JHAH, designed to optimize parking operations and enhance user experience. Using over 1,600 IoT sensors and digital signage across 12 parking lots, the system provides real-time parking availability, reduces search times, improves traffic flow, and offers a dedicated web portal for visitors, staff, and patients.",
    stack: ["Angular", "Spring Boot", "Dashboard"],
    highlights: ["Real-time Parking Guidance", "IoT Sensor Integration", "Scalability & Analytics", "Traffic Optimization"],
    links: { demo: "https://www.conurets.com/johns-hopkins-aramco-healthcare/" },
  },
  {
    id: "hcm",
    title: "HCM (Human Capital Management)",
    description: "System to track employee work hours, leave, and productivity metrics.",
    stack: ["React", "Node.js", "PostgreSQL"],
    highlights: ["Workforce tracking", "Leave management", "Reporting & metrics"],
  },
  {
    id: "ipaas",
    title: "iPaaS (Integration Platform as a Service)",
    description:
      "iPaaS.com is a cloud-based integration platform (an Integration Platform as a Service) that helps businesses connect, automate, and manage data flows across many different software systems from one central hub instead of building custom point-to-point connectors.",
    stack: ["Angular", "Node.js", "RabbitMQ", "CI/CD", "Cloud"],
    highlights: ["Real-time Data Transmission", "Data Transfer Optimization", "Hub and Spoke Architecture", "Error detection & logging"],
    links: { demo: "https://ipaas.com/" },
  },
];

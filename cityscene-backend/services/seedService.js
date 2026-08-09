import Blog from '../models/Blog.js';
import Project from '../models/Project.js';
import Job from '../models/Job.js';
import Client from '../models/Client.js';

export const initialBlogs = [
  {
    id: "ai-grow-business",
    title: "How to Leverage Artificial Intelligence to Grow Your Business",
    category: "Artificial Intelligence",
    date: "March 15, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    slug: "how-to-leverage-artificial-intelligence-to-grow-your-business",
    summary: "Discover how AI-driven strategies, machine learning models, and automated customer workflows can scale your business operations.",
    content: "<h2>Transforming Business Strategy Through Artificial Intelligence</h2><p>Artificial Intelligence (AI) is no longer a futuristic vision; it is a foundational business strategy empowering modern enterprises to outpace competitors.</p>"
  },
  {
    id: "voice-search-ai",
    title: "How to Optimize Your Website for Voice Search & AI Assistants",
    category: "AI & SEO",
    date: "February 7, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    slug: "how-to-optimize-your-website-for-voice-search-ai-assistants",
    summary: "Voice search is changing search engine dynamics. Learn how conversational keywords and structured schema markup keep your brand visible.",
    content: "<h2>The Shift to Conversational Search</h2><p>Voice search is quickly changing how people find information online thanks to AI assistants like Siri, Alexa, and Google Assistant.</p>"
  },
  {
    id: "web-app-trends",
    title: "The Future of Web/App Development: Trends to Watch in 2025",
    category: "Web Development",
    date: "March 26, 2025",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    slug: "the-future-of-web-app-development-trends-to-watch-in-2025",
    summary: "Stay ahead in digital innovation by exploring modern web and mobile application trends.",
    content: "<h2>The Evolving Digital Landscape in 2025</h2><p>As digital technology advances at unprecedented speeds, web and application development are undergoing a monumental paradigm shift.</p>"
  }
];

export const initialProjects = [
  {
    id: "powerportal",
    title: "PowerPortal",
    category: "Energy & Utilities",
    description: "Centralised platform for monitoring and optimising power operations with real-time insights.",
    image: "/assets/images/projects/powerportal.jpg",
    slug: "powerportal",
    overview: "PowerPortal is a centralized enterprise platform designed to stream real-time operational metrics across renewable and conventional energy grids.",
    highlights: ["Real-time telemetry and grid load forecasting", "Automated outage alerts"],
    techStack: ["React", "Node.js", "TimeSeries DB", "Tailwind CSS", "WebSockets"]
  },
  {
    id: "healthconnect",
    title: "HealthConnect",
    category: "Healthcare Tech",
    description: "A unified digital ecosystem connecting patients, doctors, and healthcare administration.",
    image: "/assets/images/projects/healthconnect.jpg",
    slug: "healthconnect",
    overview: "HealthConnect streamlines healthcare delivery by bridging the communication gap between clinical administration and patients.",
    highlights: ["HIPAA-compliant encrypted data architecture", "Integrated virtual video appointments"],
    techStack: ["React Native", "React", "GraphQL", "Node.js", "WebRTC"]
  },
  {
    id: "fleetpro",
    title: "FleetPro",
    category: "Logistics & Mobility",
    description: "Smart fleet management for tracking vehicles, drivers, and operations.",
    image: "/assets/images/projects/fleetpro.jpg",
    slug: "fleetpro",
    overview: "FleetPro delivers an intelligent telemetry and fleet management platform for logistics and transport enterprises.",
    highlights: ["Live GPS tracking with sub-second geospatial updates", "Automated route optimization"],
    techStack: ["React", "Leaflet Maps", "FastAPI", "Kafka", "Docker"]
  },
  {
    id: "solarcare",
    title: "SolarCare",
    category: "Enterprise ERP",
    description: "Project-centric ERP workflow managing procurement, execution, and delivery.",
    image: "/assets/images/projects/solarcare.jpg",
    slug: "solarcare",
    overview: "SolarCare is a specialized enterprise resource planning system tailored for solar engineering and construction management.",
    highlights: ["Project milestone tracking", "Supplier vendor portal"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"]
  },
  {
    id: "autitrack-pro",
    title: "AutiTrack Pro",
    category: "Medical Tech",
    description: "Structured autism care platform enabling doctors to track therapy and progress.",
    image: "/assets/images/projects/autitrack-pro.jpg",
    slug: "autitrack-pro",
    overview: "AutiTrack Pro is a specialized clinical software solution created for therapists, pediatricians, and families.",
    highlights: ["Standardized developmental assessment tools", "Multi-caregiver collaboration"],
    techStack: ["React", "Redux Toolkit", "Chart.js", "Node.js"]
  },
  {
    id: "procuraone",
    title: "ProcuraOne",
    category: "Supply Chain",
    description: "End-to-end procurement system ensuring transparency and traceability.",
    image: "/assets/images/projects/procuraone.jpg",
    slug: "procuraone",
    overview: "ProcuraOne modernizes corporate supply chain management with an end-to-end procurement portal.",
    highlights: ["Automated multi-tier approval matrix", "Vendor rating metrics"],
    techStack: ["React", "Tailwind CSS", "Enterprise API", "Node.js"]
  },
  {
    id: "solarsync",
    title: "SolarSync",
    category: "Renewable Energy",
    description: "Intelligent monitoring of solar assets, energy output, and performance.",
    image: "/assets/images/projects/solarsync.jpg",
    slug: "solarsync",
    overview: "SolarSync is an IoT-connected energy analytics application designed for utility-scale solar farms.",
    highlights: ["IoT sensor integration", "Performance ratio calculation"],
    techStack: ["React", "Recharts", "Python", "MQTT"]
  }
];

export const initialJobs = [
  {
    id: "web-developer",
    title: "Web Developer",
    description: "We are looking for an experienced Web Developer proficient in JavaScript, HTML, and CSS.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    description: "Looking for a creative UI/UX Designer with experience in Figma and Adobe XD.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Seeking a passionate Software Engineer skilled in MERN Stack development.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialClients = [
  { id: "client-1", name: "GlobalTech Solutions", logo: "https://via.placeholder.com/150x50?text=GlobalTech" },
  { id: "client-2", name: "Apex Financial", logo: "https://via.placeholder.com/150x50?text=ApexFinancial" },
  { id: "client-3", name: "Metro Transit", logo: "https://via.placeholder.com/150x50?text=MetroTransit" }
];

export const seedDatabase = async () => {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
    console.log('[Seed Service] Seeded initial blog posts.');

    await Project.deleteMany({});
    await Project.insertMany(initialProjects);
    console.log('[Seed Service] Seeded initial projects.');

    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      await Job.insertMany(initialJobs);
      console.log('[Seed Service] Seeded initial job positions.');
    }

    const clientCount = await Client.countDocuments();
    if (clientCount === 0) {
      await Client.insertMany(initialClients);
      console.log('[Seed Service] Seeded initial client logos.');
    }
  } catch (err) {
    console.warn('[Seed Service Warning] Automatic seeding skipped:', err.message);
  }
};

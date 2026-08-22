import { defaultHomeContent } from '../controllers/homeContentController.js';
import { initialTestimonials } from '../controllers/testimonialController.js';
import { Blog } from '../models/Blog.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { Job } from '../models/Job.js';
import { Client } from '../models/Client.js';
import { Testimonial } from '../models/Testimonial.js';
import { HomeContent } from '../models/HomeContent.js';
import bcrypt from 'bcryptjs';

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

export const initialServices = [
  {
    id: "custom-software-development",
    title: "Custom\nSoftware\nDevelopment",
    displayTitle: "Custom Software Development Services",
    path: "/services/custom-software-development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "Tailored software solutions engineered to solve your unique business challenges and drive operational efficiency.",
    topicName: "Custom Software",
    heroDesc: "We engineer bespoke software applications engineered to solve complex operational challenges, increase team productivity, and accelerate business growth.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we build custom enterprise software solutions designed specifically around your unique business workflows. Off-the-shelf software often limits your flexibility; our tailored software adapts perfectly to your operational needs.",
    introP2: "Our experienced engineering team crafts secure, cloud-native enterprise systems, SaaS platforms, and automated workflow engines that empower teams to work smarter and scale efficiently.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We build custom software solutions engineered for flexibility, security, and long-term enterprise scalability.",
    whyChooseCards: [
      { title: "Custom Architecture", desc: "Designed from scratch to fit your exact workflow without bloated unnecessary features." },
      { title: "Seamless Integration", desc: "Integrates effortlessly with your existing legacy systems, APIs, and databases." },
      { title: "Enterprise Security", desc: "Bank-level encryption, role-based access controls, and strict audit trails." },
      { title: "High Productivity", desc: "Automates repetitive manual tasks so your staff can focus on core revenue drivers." },
      { title: "Scalable Data Model", desc: "Robust database schemas designed to grow alongside your expanding enterprise operations." },
      { title: "24/7 SLA Support", desc: "Dedicated engineering response teams to ensure 99.99% uptime for critical tools." }
    ],
    expertiseTitle: "Custom Software Expertise",
    expertiseSubtitle: "Empowering organizations with robust software solutions tailored to specialized industry demands.",
    expertiseItems: [
      { title: "Enterprise ERP & CRM Systems", desc: "Centralized management tools connecting sales, operations, finance, and human resources." },
      { title: "SaaS Platform Development", desc: "Multi-tenant cloud applications designed for high performance, subscription management, and security." },
      { title: "Legacy System Modernization", desc: "Refactoring legacy monolithic codebases into modern cloud-native microservices." },
      { title: "API & Data Integration", desc: "Custom REST & GraphQL APIs linking disparate software tools into unified real-time dashboards." }
    ],
    processTitle: "Our Software Development Process",
    processSteps: [
      { title: "Discovery & Scope", desc: "In-depth analysis of workflow gaps, system architecture planning, and feature mapping." },
      { title: "Architecture Design", desc: "Designing scalable database schemas, microservice layers, and secure cloud environments." },
      { title: "Agile Development", desc: "Iterative sprint development with continuous integration and transparent code reviews." },
      { title: "Quality Control", desc: "Comprehensive unit testing, load testing, and security vulnerability scanning." },
      { title: "Deployment", desc: "Automated CI/CD pipeline deployment to AWS, Azure, or private cloud servers." },
      { title: "Ongoing SLA Support", desc: "24/7 server monitoring, proactive maintenance, and feature enhancements." }
    ],
    faqs: [
      { q: "How long does custom software development take?", a: "Project timelines depend on system complexity. Initial MVP solutions typically take 8-12 weeks, while full enterprise systems are built in phased sprints." },
      { q: "Who owns the code rights for custom software?", a: "You own 100% of the intellectual property, source code, and assets upon project completion." },
      { q: "Can you modernize our existing old software?", a: "Yes, we specialize in legacy migration, API integration, and cloud refactoring." }
    ]
  },
  {
    id: "mobile-app-development",
    title: "Mobile App\nDevelopment",
    displayTitle: "Mobile App Development Services",
    path: "/services/mobile-app-development",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Native and cross-platform mobile apps designed for seamless user experience and maximum engagement.",
    topicName: "Mobile App",
    heroDesc: "We build innovative, high-performance mobile applications that engage users, adapt to behavioural trends, and drive measurable business growth across global markets.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we empower businesses to grow digitally by transforming powerful ideas into seamless, high-performance mobile applications.",
    introP2: "Whether you're a startup or an established enterprise, our expert team delivers customised native and cross-platform mobile solutions.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We design and develop mobile applications that combine performance, usability, security, and scalability.",
    whyChooseCards: [
      { title: "iOS & Android Expertise", desc: "High-quality applications for iOS, Android, Apple Watch, and Apple TV." },
      { title: "Cross-Platform Excellence", desc: "React Native and Flutter apps with native performance and faster time-to-market." },
      { title: "Secure App Architecture", desc: "Enterprise-grade security, data protection, and compliance." },
      { title: "User-Centric UI/UX Design", desc: "Intuitive interfaces and fluid user journeys." },
      { title: "Scalable Infrastructure", desc: "Cloud-native backend architectures designed to handle millions of users." },
      { title: "Global Delivery Standard", desc: "Proven track record delivering mission-critical mobile solutions worldwide." }
    ],
    expertiseTitle: "Mobile App Development Expertise",
    expertiseSubtitle: "We build mobile applications that deliver performance, scalability, and long-term business impact.",
    expertiseItems: [
      { title: "iOS App Development", desc: "Feature-rich apps for iPhone, iPad, Apple Watch, and Apple TV." },
      { title: "Android App Development", desc: "High-performance Android applications with wide device compatibility." },
      { title: "React Native & Flutter", desc: "Cost-effective cross-platform apps with consistent native performance." },
      { title: "IoT App Development", desc: "Smart apps connecting devices, sensors, and real-time data." },
      { title: "Upgradation & Migration", desc: "Seamless upgrades and secure migrations with zero downtime." }
    ],
    processTitle: "Our App Development Process",
    processSteps: [
      { title: "Consultation", desc: "Idea validation, strategy planning, and technical consulting." },
      { title: "UI / UX Design", desc: "Modern, intuitive interfaces designed for engagement." },
      { title: "Development", desc: "Custom-built, scalable mobile application development." },
      { title: "Testing & QA", desc: "Security, performance, and compatibility testing." },
      { title: "Deployment", desc: "Seamless Play Store and App Store launches." },
      { title: "Maintenance", desc: "Continuous updates, enhancements, and long-term support." }
    ],
    faqs: [
      { q: "Do you build both Android and iOS apps?", a: "Yes, we specialize in both native iOS & Android development as well as cross-platform frameworks like React Native and Flutter." },
      { q: "Do you provide support after the app is launched?", a: "Absolutely. We offer continuous post-launch maintenance, performance monitoring, and security patch management." }
    ]
  },
  {
    id: "web-development",
    title: "Web\nDevelopment",
    displayTitle: "Web Development Services",
    path: "/services/web-development",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "High-performance, scalable web applications built using modern frameworks and responsive design principles.",
    topicName: "Web",
    heroDesc: "High-performance, ultra-responsive web applications built with modern frameworks to engage visitors and convert traffic into enterprise value.",
    heroImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we create web platforms that combine stunning design aesthetics with blazing speed.",
    introP2: "From complex web applications and portal platforms to high-converting web applications, we utilize Next.js, React, Node.js, and modern cloud infrastructures.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We engineer web solutions prioritized for speed, SEO readiness, accessibility, and high conversion rates.",
    whyChooseCards: [
      { title: "Blazing Fast Performance", desc: "Optimized Core Web Vitals ensuring sub-second load times." },
      { title: "SEO & Accessibility", desc: "Built with semantic HTML5, schema markups, and accessibility standards." },
      { title: "Scalable Cloud Stack", desc: "Serverless architectures capable of handling peak traffic surges effortlessly." },
      { title: "Modern Design Tokens", desc: "Clean UI component architectures with micro-animations." },
      { title: "Cross-Browser Precision", desc: "Tested across all modern browsers and device viewports." },
      { title: "Robust Security Standards", desc: "SSL encryption, DDoS mitigation, and OWASP top 10 security compliance." }
    ],
    expertiseTitle: "Web Development Expertise",
    expertiseSubtitle: "Delivering modern web architecture crafted for speed, engagement, and operational scale.",
    expertiseItems: [
      { title: "Single Page & Progressive Web Apps", desc: "App-like web experiences featuring offline support and instant navigation." },
      { title: "E-Commerce Platforms", desc: "Custom online storefronts with integrated payment gateways." },
      { title: "Enterprise Web Portals", desc: "Secure portal solutions for client interaction and employee workflows." },
      { title: "Headless CMS Integration", desc: "Flexible content management setups." }
    ],
    processTitle: "Our Web Development Process",
    processSteps: [
      { title: "UX Strategy & Wireframing", desc: "Mapping user flows, layout wireframes, and information architecture." },
      { title: "Visual UI Design", desc: "Crafting beautiful responsive interface layouts." },
      { title: "Frontend & Backend Build", desc: "Clean frontend coding coupled with scalable API endpoints." },
      { title: "Performance Optimization", desc: "Asset minification, image optimization, and CDN caching setup." },
      { title: "Cross-Browser Testing", desc: "Rigorous testing across browsers and mobile viewports." },
      { title: "Launch & Monitoring", desc: "Domain launch, SSL setup, SEO indexing, and analytics tracking." }
    ],
    faqs: [
      { q: "What tech stack do you use for web development?", a: "We primarily utilize React, Next.js, Node.js, TypeScript, Tailwind CSS, and cloud platforms like AWS." },
      { q: "Will our website be mobile-responsive?", a: "Yes, 100%. All our web builds follow mobile-first responsive design standards." }
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    displayTitle: "UI/UX Design Services",
    path: "/services/ui-ux-design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "User-centric design solutions that transform complex workflows into intuitive, beautiful digital experiences.",
    topicName: "UI/UX Design",
    heroDesc: "Creating user-centric digital experiences that blend aesthetic beauty with seamless functionality.",
    heroImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    introP1: "Our design team crafts intuitive interfaces and human-centered user journeys that drive high retention.",
    introP2: "We utilize Figma, user research, wireframing, and interactive prototyping to ensure maximum usability.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Empower your brand with human-centric designs crafted for engagement and delight.",
    whyChooseCards: [
      { title: "User Research", desc: "Deep analytical research into user personas, behavior, and workflow friction points." },
      { title: "Interactive Prototypes", desc: "Clickable Figma prototypes for rapid feedback and user testing." },
      { title: "Design Systems", desc: "Scalable UI component libraries ensuring visual consistency across products." }
    ],
    expertiseTitle: "UI/UX Design Expertise",
    expertiseSubtitle: "Design systems and user interface engineering that stand out.",
    expertiseItems: [
      { title: "Mobile & Web UI Design", desc: "Modern visual interface design tuned for modern screens." },
      { title: "Design System Engineering", desc: "Unified design tokens, reusable components, and documentation." }
    ],
    processTitle: "Our Design Process",
    processSteps: [
      { title: "Research & Discovery", desc: "Analyzing user goals and business objectives." },
      { title: "Wireframing & Prototyping", desc: "Drafting user flows and interactive wireframes." },
      { title: "Visual Design & Handoff", desc: "Creating high-fidelity UI assets and developer handoff documentation." }
    ],
    faqs: [
      { q: "What design tools do you use?", a: "We rely on industry standard tools like Figma, Adobe XD, and Illustrator." }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital\nMarketing",
    displayTitle: "Digital Marketing Services",
    path: "/services/digital-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Data-driven marketing strategies to increase reach, enhance brand visibility, and drive qualified leads.",
    topicName: "Digital Marketing",
    heroDesc: "Data-driven marketing strategies engineered to scale your audience and maximize conversion ROI.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    introP1: "We combine SEO, content marketing, PPC, and social media campaigns to elevate your brand presence online.",
    introP2: "Our campaigns are backed by real-time analytics to ensure continuous growth and performance optimization.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Results-focused digital marketing tailored to your commercial growth goals.",
    whyChooseCards: [
      { title: "Targeted PPC", desc: "High-converting ad campaigns across Google Search and social channels." },
      { title: "Technical SEO", desc: "On-page and technical optimization for organic search dominance." }
    ],
    expertiseTitle: "Marketing Expertise",
    expertiseSubtitle: "Multichannel growth strategies for modern digital businesses.",
    expertiseItems: [
      { title: "Search Engine Optimization", desc: "Comprehensive keyword, content, and backlink strategies." }
    ],
    processTitle: "Our Marketing Process",
    processSteps: [
      { title: "Audience Analysis", desc: "Identifying target buyer personas and competitive positioning." },
      { title: "Campaign Execution", desc: "Deploying multi-channel marketing campaigns." }
    ],
    faqs: [
      { q: "How do you measure campaign success?", a: "We track qualified leads, conversion rate, CAC, and overall return on ad spend." }
    ]
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine\nLearning",
    displayTitle: "AI & Machine Learning Services",
    path: "/services/ai-machine-learning",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Predictive analytics, natural language processing, and custom ML models for intelligent automation.",
    topicName: "AI & ML",
    heroDesc: "Custom machine learning models, LLM integrations, and predictive analytics that automate intelligence.",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    introP1: "Transform your data into actionable business intelligence with state-of-the-art artificial intelligence models.",
    introP2: "We build custom NLP, computer vision, and predictive pipeline solutions that integrate directly into your workflow.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Turn raw data into competitive advantages with cutting-edge ML models.",
    whyChooseCards: [
      { title: "Custom Neural Networks", desc: "Tailored deep learning architectures trained on your proprietary data." }
    ],
    expertiseTitle: "AI/ML Expertise",
    expertiseSubtitle: "Empowering automation through machine intelligence.",
    expertiseItems: [
      { title: "NLP & Conversational AI", desc: "Custom LLM agents, chatbots, and document ingestion systems." }
    ],
    processTitle: "Our AI Process",
    processSteps: [
      { title: "Data Pipeline Setup", desc: "Cleaning, structuring, and preparing training datasets." }
    ],
    faqs: [
      { q: "Can AI integrate with our legacy database?", a: "Yes, we build custom API layers to connect AI models with existing DBs." }
    ]
  },
  {
    id: "blockchain-development",
    title: "Blockchain\nDevelopment",
    displayTitle: "Blockchain Development Services",
    path: "/services/blockchain-development",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "Decentralized applications, smart contracts, and secure blockchain infrastructure for web3 innovation.",
    topicName: "Blockchain",
    heroDesc: "Secure smart contract development, Web3 dApps, and decentralized infrastructure solutions.",
    heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    introP1: "Build transparent, tamper-proof digital systems powered by enterprise blockchain technology.",
    introP2: "Our Web3 engineers craft audited smart contracts and decentralized protocols.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Cryptographically secure Web3 architecture designed for scale.",
    whyChooseCards: [
      { title: "Audited Smart Contracts", desc: "Flawless Solidity & Rust code verified against security vulnerabilities." }
    ],
    expertiseTitle: "Blockchain Expertise",
    expertiseSubtitle: "Decentralized innovation across public and permissioned ledgers.",
    expertiseItems: [
      { title: "DeFi & Tokenomics", desc: "Decentralized financial protocols and custom token ecosystems." }
    ],
    processTitle: "Our Web3 Process",
    processSteps: [
      { title: "Protocol Design", desc: "Structuring tokenomics, consensus models, and smart contract logic." }
    ],
    faqs: [
      { q: "Which blockchains do you support?", a: "Ethereum, Polygon, Solana, Hyperledger, and BNB Chain." }
    ]
  },
  {
    id: "ai-scope-evaluation",
    title: "Detailed Study\nAnd Scope\nEvaluation Of AI",
    displayTitle: "Detailed Study And Scope Evaluation Of AI",
    path: "/services/ai-scope-evaluation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "In-depth feasibility studies and architectural roadmaps to assess AI integration in enterprise workflows.",
    topicName: "AI Feasibility",
    heroDesc: "In-depth feasibility studies and architectural roadmaps to assess AI integration in enterprise workflows.",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    introP1: "Evaluate the ROI, technical feasibility, and security risks of deploying AI solutions across your operations.",
    introP2: "Our consultants provide comprehensive audit reports before you invest heavy development capital.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Strategic clarity before AI deployment.",
    whyChooseCards: [
      { title: "ROI Analysis", desc: "Financial modeling and cost-benefit projections for AI adoption." }
    ],
    expertiseTitle: "Evaluation Expertise",
    expertiseSubtitle: "Comprehensive technical audits and strategy roadmaps.",
    expertiseItems: [
      { title: "Data Readiness Audit", desc: "Assessing data quality, privacy compliance, and infrastructure readiness." }
    ],
    processTitle: "Evaluation Process",
    processSteps: [
      { title: "Discovery Workshop", desc: "Reviewing existing workflows and pinpointing AI automation opportunities." }
    ],
    faqs: [
      { q: "What does the evaluation deliverable include?", a: "A comprehensive technical architecture document, risk matrix, and phased timeline." }
    ]
  },
  {
    id: "robotics-automation",
    title: "Robotics And\nAutomation",
    displayTitle: "Robotics And Automation Services",
    path: "/services/robotics-automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Robotic process automation (RPA) and industrial automation systems for optimized operational output.",
    topicName: "Robotics & Automation",
    heroDesc: "Robotic process automation (RPA) and industrial automation systems for optimized operational output.",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    introP1: "Automate repetitive physical and software tasks to maximize operational throughput and precision.",
    introP2: "From enterprise RPA bots to IoT-connected industrial hardware monitoring, we deliver seamless automation.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Boost productivity while reducing human error rates.",
    whyChooseCards: [
      { title: "RPA Bot Workflows", desc: "Automated software bots handling data entry, invoicing, and reporting." }
    ],
    expertiseTitle: "Automation Expertise",
    expertiseSubtitle: "End-to-end industrial and software automation solutions.",
    expertiseItems: [
      { title: "Enterprise RPA", desc: "Streamlining back-office workflows with intelligent bot routines." }
    ],
    processTitle: "Automation Process",
    processSteps: [
      { title: "Workflow Analysis", desc: "Identifying bottleneck operations suitable for automated robotics." }
    ],
    faqs: [
      { q: "How fast is the ROI on RPA implementation?", a: "Most enterprise clients realize full cost recovery within 6 to 9 months." }
    ]
  },
  {
    id: "business-research-ai",
    title: "Business\nResearch Projects\nwith AI Innovation",
    displayTitle: "Business Research Projects with AI Innovation",
    path: "/services/business-research-ai",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "Applied business research leveraging AI modeling to solve domain-specific commercial challenges.",
    topicName: "Business Research",
    heroDesc: "Applied business research leveraging AI modeling to solve domain-specific commercial challenges.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    introP1: "Empower corporate decision-makers with AI-driven market intelligence, trend forecasting, and competitive research.",
    introP2: "Our research methodologies combine quantitative data analytics with automated web scraping and LLM synthesis.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Data-driven commercial insights powered by machine intelligence.",
    whyChooseCards: [
      { title: "Predictive Analytics", desc: "Statistical modeling to forecast market trends and consumer demand." }
    ],
    expertiseTitle: "Research Expertise",
    expertiseSubtitle: "Commercial intelligence for strategic executive decisions.",
    expertiseItems: [
      { title: "Market Sentiment Modeling", desc: "Analyzing millions of data points to evaluate brand health and consumer sentiment." }
    ],
    processTitle: "Research Process",
    processSteps: [
      { title: "Hypothesis & Scope", desc: "Setting clear research targets and data collection boundaries." }
    ],
    faqs: [
      { q: "Can research datasets be delivered via API?", a: "Yes, we can feed structured analytical reports directly into your BI dashboards." }
    ]
  },
  {
    id: "software-testing-qa",
    title: "Software Testing\nand Quality\nAssurance (QA)",
    displayTitle: "Software Testing and Quality Assurance (QA)",
    path: "/services/software-testing-qa",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Automated and manual testing protocols ensuring zero-defect software deployments.",
    topicName: "Quality Assurance",
    heroDesc: "Automated and manual testing protocols ensuring zero-defect software deployments.",
    heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    introP1: "Ensure flawless application performance, security compliance, and user satisfaction with end-to-end QA.",
    introP2: "We execute automated unit, integration, regression, and load testing cycles prior to every deployment.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Zero-defect quality assurance for mission-critical applications.",
    whyChooseCards: [
      { title: "Automated CI/CD Testing", desc: "Continuous automated test suites catching bugs before staging." }
    ],
    expertiseTitle: "QA Expertise",
    expertiseSubtitle: "Comprehensive software testing across devices and platforms.",
    expertiseItems: [
      { title: "Performance & Stress Testing", desc: "Simulating peak user traffic spikes to verify server stability." }
    ],
    processTitle: "QA Process",
    processSteps: [
      { title: "Test Plan Definition", desc: "Creating test cases, regression matrix, and automation scripts." }
    ],
    faqs: [
      { q: "Do you offer automated testing frameworks?", a: "Yes, we build custom automation pipelines using Cypress, Playwright, and Selenium." }
    ]
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    displayTitle: "IT Consulting Services",
    path: "/services/it-consulting",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Strategic technology advisement, cloud migration strategies, and enterprise architecture planning.",
    topicName: "IT Consulting",
    heroDesc: "Strategic technology advisement, cloud migration strategies, and enterprise architecture planning.",
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    introP1: "Align your IT infrastructure with business goals through strategic technology advisory services.",
    introP2: "Our senior architects help enterprises modernize cloud environments, optimize IT spend, and fortify cybersecurity.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Unbiased technical advice from seasoned enterprise architects.",
    whyChooseCards: [
      { title: "Cloud Strategy", desc: "AWS, Azure, and GCP architecture optimization and cost reduction." }
    ],
    expertiseTitle: "Consulting Expertise",
    expertiseSubtitle: "Enterprise architecture and digital transformation advisement.",
    expertiseItems: [
      { title: "Infrastructure Optimization", desc: "Audit and modernization of enterprise cloud and network architectures." }
    ],
    processTitle: "Consulting Process",
    processSteps: [
      { title: "IT Audit", desc: "Comprehensive review of system health, security vulnerabilities, and operational costs." }
    ],
    faqs: [
      { q: "How do you assist with cloud migration?", a: "We design zero-downtime migration plans and manage full cloud transition execution." }
    ]
  }
];

export const initialProjects = [
  {
    id: "powerportal",
    title: "PowerPortal",
    category: "Energy & Utilities",
    client: "Global Energy Corp",
    duration: "6 Months",
    shortDesc: "Centralised platform for monitoring and optimising power operations with real-time insights.",
    fullDesc: "PowerPortal is a centralized enterprise platform designed to stream real-time operational metrics across renewable and conventional energy grids.",
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
    client: "MediCare Systems",
    duration: "8 Months",
    shortDesc: "A unified digital ecosystem connecting patients, doctors, and healthcare administration.",
    fullDesc: "HealthConnect streamlines healthcare delivery by bridging the communication gap between clinical administration and patients.",
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
    client: "TransLogistics Inc",
    duration: "5 Months",
    shortDesc: "Smart fleet management for tracking vehicles, drivers, and operations.",
    fullDesc: "FleetPro delivers an intelligent telemetry and fleet management platform for logistics and transport enterprises.",
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
    client: "SunPower Solutions",
    duration: "7 Months",
    shortDesc: "Project-centric ERP workflow managing procurement, execution, and delivery.",
    fullDesc: "SolarCare is a specialized enterprise resource planning system tailored for solar engineering and construction management.",
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
    client: "CareHealth Foundation",
    duration: "4 Months",
    shortDesc: "Structured autism care platform enabling doctors to track therapy and progress.",
    fullDesc: "AutiTrack Pro is a specialized clinical software solution created for therapists, pediatricians, and families.",
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
    client: "Global Logistics Group",
    duration: "6 Months",
    shortDesc: "End-to-end procurement system ensuring transparency and traceability.",
    fullDesc: "ProcuraOne modernizes corporate supply chain management with an end-to-end procurement portal.",
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
    client: "CleanEnergy Utilities",
    duration: "9 Months",
    shortDesc: "Intelligent monitoring of solar assets, energy output, and performance.",
    fullDesc: "SolarSync is an IoT-connected energy analytics application designed for utility-scale solar farms.",
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
  { id: "client-1", name: "The Nation First", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80" },
  { id: "client-2", name: "Jai Kisaan Solar", logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=200&q=80" },
  { id: "client-3", name: "eSunScope", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80" },
  { id: "client-4", name: "Sunscope Group", logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80" },
  { id: "client-5", name: "Sunscope Capital", logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80" },
  { id: "client-6", name: "B-Sun Africa", logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80" }
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Executing idempotent MySQL database seeding...');

    // 1. Seed Blogs
    let blogsInserted = 0;
    for (const blogData of initialBlogs) {
      const [, created] = await Blog.findOrCreate({
        where: { id: blogData.id },
        defaults: blogData
      });
      if (created) blogsInserted++;
    }

    // 2. Seed Services
    let servicesInserted = 0;
    for (const serviceData of initialServices) {
      const [, created] = await Service.findOrCreate({
        where: { id: serviceData.id },
        defaults: serviceData
      });
      if (created) servicesInserted++;
    }

    // 3. Seed Clients
    let clientsInserted = 0;
    for (const clientData of initialClients) {
      const [, created] = await Client.findOrCreate({
        where: { id: clientData.id },
        defaults: clientData
      });
      if (created) clientsInserted++;
    }

    // 4. Seed Projects
    let projectsInserted = 0;
    for (const projectData of initialProjects) {
      const [, created] = await Project.findOrCreate({
        where: { id: projectData.id },
        defaults: projectData
      });
      if (created) projectsInserted++;
    }

    // 5. Seed Jobs
    let jobsInserted = 0;
    for (const jobData of initialJobs) {
      const [, created] = await Job.findOrCreate({
        where: { id: jobData.id },
        defaults: jobData
      });
      if (created) jobsInserted++;
    }

    // 6. Seed Testimonials
    let testimonialsInserted = 0;
    for (const testData of initialTestimonials) {
      const [, created] = await Testimonial.findOrCreate({
        where: { author: testData.author, company: testData.company || '' },
        defaults: {
          author: testData.author,
          role: testData.role || '',
          company: testData.company || '',
          quote: testData.quote,
          rating: testData.rating || 5,
          status: testData.status || 'active'
        }
      });
      if (created) testimonialsInserted++;
    }

    // 7. Seed HomeContent
    let homeSectionsInserted = 0;
    for (const [section, content] of Object.entries(defaultHomeContent)) {
      const [, created] = await HomeContent.findOrCreate({
        where: { section },
        defaults: { section, content }
      });
      if (created) homeSectionsInserted++;
    }

    console.log('✅ SQL Seeding complete!');
    console.log(`   - Blogs: ${blogsInserted} new records inserted`);
    console.log(`   - Services: ${servicesInserted} new records inserted`);
    console.log(`   - Clients: ${clientsInserted} new records inserted`);
    console.log(`   - Projects: ${projectsInserted} new records inserted`);
    console.log(`   - Jobs: ${jobsInserted} new records inserted`);
    console.log(`   - Testimonials: ${testimonialsInserted} new records inserted`);
    console.log(`   - HomeContent Sections: ${homeSectionsInserted} new records inserted`);
  } catch (error) {
    console.error('❌ Error during SQL database seeding:', error);
  }
};


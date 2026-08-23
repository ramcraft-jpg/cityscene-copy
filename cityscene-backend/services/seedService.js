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
    shortDesc: "Tailored software solutions engineered to solve unique business challenges and drive operational efficiency.",
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
    shortDesc: "Native and cross-platform mobile apps designed for seamless user experience and maximum engagement across iOS & Android.",
    topicName: "Mobile App",
    heroDesc: "We build innovative, high-performance mobile applications that engage users, adapt to behavioural trends, and drive measurable business growth across global markets.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we empower businesses to grow digitally by transforming powerful ideas into seamless, high-performance mobile applications.",
    introP2: "Whether you're a startup or an established enterprise, our expert team delivers customised native iOS, Android, and cross-platform mobile solutions.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We design and develop mobile applications that combine performance, usability, security, and scalability.",
    whyChooseCards: [
      { title: "iOS & Android Expertise", desc: "High-quality applications for iOS, Android, Apple Watch, and Apple TV." },
      { title: "Cross-Platform Excellence", desc: "React Native and Flutter apps with native performance and faster time-to-market." },
      { title: "Secure App Architecture", desc: "Enterprise-grade security, biometric authentication, and compliance." },
      { title: "User-Centric UI/UX Design", desc: "Intuitive interfaces and fluid user journeys optimized for touch interactions." },
      { title: "Scalable Cloud Backend", desc: "Cloud-native backend architectures designed to handle millions of active mobile users." },
      { title: "Global Delivery Standard", desc: "Proven track record delivering mission-critical mobile solutions worldwide." }
    ],
    expertiseTitle: "Mobile App Development Expertise",
    expertiseSubtitle: "We build mobile applications that deliver performance, scalability, and long-term business impact.",
    expertiseItems: [
      { title: "iOS Native App Development", desc: "Feature-rich Swift & Objective-C apps for iPhone, iPad, and Apple Watch." },
      { title: "Android Native App Development", desc: "High-performance Kotlin & Java Android applications with wide device compatibility." },
      { title: "React Native & Flutter", desc: "Cost-effective cross-platform apps with consistent 60fps native performance." },
      { title: "IoT & Wearable Integration", desc: "Smart mobile apps connecting Bluetooth sensors, wearables, and real-time telemetry." },
      { title: "App Migration & Upgrades", desc: "Seamless code refactoring and secure migrations with zero user downtime." }
    ],
    processTitle: "Our App Development Process",
    processSteps: [
      { title: "Consultation & Discovery", desc: "Idea validation, audience research, feature scope, and technical consulting." },
      { title: "UI / UX Wireframing", desc: "Modern, intuitive touch interfaces designed for peak mobile engagement." },
      { title: "Mobile App Engineering", desc: "Clean, test-driven native and cross-platform mobile code development." },
      { title: "Security & Device QA", desc: "Rigorous testing across physical iOS & Android devices and security vulnerability scans." },
      { title: "Store Deployment", desc: "Guaranteed Play Store and Apple App Store submission and approval management." },
      { title: "Continuous Maintenance", desc: "Ongoing OS updates, analytics monitoring, and feature additions." }
    ],
    faqs: [
      { q: "Do you build both Android and iOS apps?", a: "Yes, we specialize in both native iOS & Android development as well as cross-platform frameworks like React Native and Flutter." },
      { q: "How do you handle App Store approvals?", a: "We manage the entire submission lifecycle, ensuring compliance with Apple App Store and Google Play guidelines." },
      { q: "Do you provide support after the app is launched?", a: "Absolutely. We offer continuous post-launch maintenance, OS compatibility updates, and security patch management." }
    ]
  },
  {
    id: "web-development",
    title: "Web\nDevelopment",
    displayTitle: "Web Development Services",
    path: "/services/web-development",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "High-performance, scalable web applications built using modern frameworks, serverless architectures, and responsive design principles.",
    topicName: "Web",
    heroDesc: "High-performance, ultra-responsive web applications built with modern frameworks to engage visitors and convert traffic into enterprise value.",
    heroImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we create web platforms that combine stunning design aesthetics with blazing speed.",
    introP2: "From complex web applications and portal platforms to high-converting web applications, we utilize Next.js, React, Node.js, and modern cloud infrastructures.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We engineer web solutions prioritized for speed, SEO readiness, accessibility, and high conversion rates.",
    whyChooseCards: [
      { title: "Blazing Fast Performance", desc: "Optimized Core Web Vitals ensuring sub-second page load times." },
      { title: "SEO & Accessibility", desc: "Built with semantic HTML5, schema markups, and WCAG accessibility standards." },
      { title: "Scalable Cloud Stack", desc: "Serverless architectures capable of handling peak traffic surges effortlessly." },
      { title: "Modern Design Tokens", desc: "Clean UI component architectures enriched with smooth micro-animations." },
      { title: "Cross-Browser Precision", desc: "Tested across all modern desktop, tablet, and mobile viewports." },
      { title: "Robust Security Standards", desc: "SSL encryption, DDoS mitigation, and OWASP top 10 security compliance." }
    ],
    expertiseTitle: "Web Development Expertise",
    expertiseSubtitle: "Delivering modern web architecture crafted for speed, engagement, and operational scale.",
    expertiseItems: [
      { title: "Single Page & Progressive Web Apps", desc: "App-like web experiences featuring offline support and instant navigation." },
      { title: "E-Commerce Platforms", desc: "Custom online storefronts with integrated payment gateways and inventory sync." },
      { title: "Enterprise Web Portals", desc: "Secure portal solutions for client interaction, employee workflows, and data management." },
      { title: "Headless CMS Integration", desc: "Flexible content management setups powered by headless CMS architectures." }
    ],
    processTitle: "Our Web Development Process",
    processSteps: [
      { title: "UX Strategy & Wireframing", desc: "Mapping user flows, layout wireframes, and information architecture." },
      { title: "Visual UI Design", desc: "Crafting beautiful responsive interface layouts with custom design tokens." },
      { title: "Frontend & Backend Build", desc: "Clean frontend coding coupled with scalable REST/GraphQL API endpoints." },
      { title: "Performance Optimization", desc: "Asset minification, image optimization, and global CDN caching setup." },
      { title: "Cross-Browser Testing", desc: "Rigorous testing across browsers and mobile viewports." },
      { title: "Launch & Monitoring", desc: "Domain launch, SSL setup, SEO indexing, and analytics tracking." }
    ],
    faqs: [
      { q: "What tech stack do you use for web development?", a: "We primarily utilize React, Next.js, Node.js, TypeScript, Tailwind CSS, and cloud platforms like AWS and Vercel." },
      { q: "Will our website be mobile-responsive?", a: "Yes, 100%. All our web builds follow mobile-first responsive design standards." },
      { q: "How do you optimize page speed?", a: "We implement SSR/SSG, code splitting, lazy loading, image compression, and CDN edge caching." }
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
      { title: "Design Systems", desc: "Scalable UI component libraries ensuring visual consistency across products." },
      { title: "Frictionless Workflows", desc: "Streamlining complex multi-step processes into intuitive visual paths." },
      { title: "Conversion Focus", desc: "Designing strategic call-to-action paths to maximize user conversions." },
      { title: "Developer Handoff", desc: "Pixel-perfect visual specs and design tokens ready for code execution." }
    ],
    expertiseTitle: "UI/UX Design Expertise",
    expertiseSubtitle: "Design systems and user interface engineering that stand out.",
    expertiseItems: [
      { title: "Mobile & Web UI Design", desc: "Modern visual interface design tuned for modern screens." },
      { title: "Design System Engineering", desc: "Unified design tokens, reusable components, and documentation." },
      { title: "User Experience Audits", desc: "Heuristic evaluation and user testing to identify friction bottlenecks." },
      { title: "Micro-Animations & Motion", desc: "Subtle motion design that elevates user delight and interaction feedback." }
    ],
    processTitle: "Our Design Process",
    processSteps: [
      { title: "Research & Discovery", desc: "Analyzing user goals, target demographics, and business objectives." },
      { title: "Information Architecture", desc: "Structuring sitemaps and user journey navigation paths." },
      { title: "Wireframing & Low-Fi Prototypes", desc: "Drafting interactive layout wireframes for early feedback." },
      { title: "High-Fidelity Visual Design", desc: "Applying visual design tokens, typography, and polished colors." },
      { title: "Usability Testing", desc: "Testing prototypes with real users to refine interface mechanics." },
      { title: "Developer Handoff", desc: "Creating developer handoff specs, asset export, and design tokens." }
    ],
    faqs: [
      { q: "What design tools do you use?", a: "We rely on industry standard tools like Figma, Adobe XD, and Illustrator." },
      { q: "Do you provide clickable prototypes?", a: "Yes, we build interactive Figma prototypes that simulate full application behavior before coding." },
      { q: "How do you ensure design consistency across platforms?", a: "We build centralized design systems with unified color palettes, typography rules, and reusable UI components." }
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
      { title: "Technical SEO", desc: "On-page and technical optimization for organic search dominance." },
      { title: "Conversion Optimization", desc: "Landing page AB testing to maximize lead conversion rates." },
      { title: "Social Media Growth", desc: "Engaging brand campaigns across LinkedIn, Twitter, and Instagram." },
      { title: "Content Pipelines", desc: "SEO-driven blog posts, whitepapers, and thought leadership assets." },
      { title: "Transparent ROI Reports", desc: "Real-time analytics dashboards tracking customer acquisition cost (CAC)." }
    ],
    expertiseTitle: "Marketing Expertise",
    expertiseSubtitle: "Multichannel growth strategies for modern digital businesses.",
    expertiseItems: [
      { title: "Search Engine Optimization (SEO)", desc: "Comprehensive keyword, technical structure, and backlink authority strategies." },
      { title: "Pay-Per-Click Advertising (PPC)", desc: "Targeted Google Ads and paid social campaigns optimized for ROI." },
      { title: "Content Strategy & Copywriting", desc: "High-converting copy and educational articles that build brand trust." },
      { title: "Social Media Marketing", desc: "Brand positioning campaigns targeting relevant B2B and B2C audiences." }
    ],
    processTitle: "Our Marketing Process",
    processSteps: [
      { title: "Audience Analysis", desc: "Identifying target buyer personas and competitive positioning." },
      { title: "Campaign Strategy", desc: "Developing multi-channel ad copy, keywords, and landing pages." },
      { title: "Ad & Asset Creation", desc: "Designing high-converting ad visuals and copy." },
      { title: "Multi-Channel Launch", desc: "Deploying campaigns across Google, Meta, and LinkedIn." },
      { title: "A/B Testing & Optimization", desc: "Continuously testing headlines, landing pages, and bid strategies." },
      { title: "Performance Reporting", desc: "Weekly analytics reporting tracking cost-per-lead and ROI." }
    ],
    faqs: [
      { q: "How do you measure campaign success?", a: "We track qualified leads, conversion rate, customer acquisition cost (CAC), and overall return on ad spend (ROAS)." },
      { q: "How fast can we see SEO results?", a: "While PPC drives instant traffic, technical SEO and content rankings typically deliver compounding returns within 3-6 months." },
      { q: "Do you manage ad budgets directly?", a: "Yes, we handle complete ad campaign setup, bid management, and budget optimization." }
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
      { title: "Custom Neural Networks", desc: "Tailored deep learning architectures trained on your proprietary data." },
      { title: "Predictive Accuracy", desc: "High-precision algorithms for demand forecasting and risk analysis." },
      { title: "LLM & RAG Systems", desc: "Enterprise AI agents leveraging Retrieval-Augmented Generation over private documents." },
      { title: "Computer Vision", desc: "Automated image classification, object detection, and document OCR." },
      { title: "Real-Time Inference APIs", desc: "Low-latency microservices delivering instant AI predictions." },
      { title: "Data Privacy & Governance", desc: "On-premise or VPC deployments ensuring strict corporate data security." }
    ],
    expertiseTitle: "AI/ML Expertise",
    expertiseSubtitle: "Empowering automation through machine intelligence.",
    expertiseItems: [
      { title: "NLP & Conversational AI", desc: "Custom LLM agents, chatbots, and automated document ingestion systems." },
      { title: "Predictive Financial Analytics", desc: "Machine learning models forecasting market trends, demand spikes, and credit risk." },
      { title: "Computer Vision & OCR", desc: "Automated document extraction, facial verification, and visual quality inspection." },
      { title: "Automated Decision Engines", desc: "Intelligent rule-based recommendation engines automating complex operational tasks." }
    ],
    processTitle: "Our AI Development Process",
    processSteps: [
      { title: "Data Ingestion & Cleaning", desc: "Structuring, labeling, and cleaning training datasets." },
      { title: "Model Selection", desc: "Evaluating deep learning, transformer, or statistical ML architectures." },
      { title: "Model Training & Validation", desc: "Training algorithms on high-performance GPU clusters." },
      { title: "Accuracy Tuning", desc: "Optimizing hyperparameters to eliminate bias and maximize precision." },
      { title: "API Integration", desc: "Deploying REST APIs connecting the AI model to web/mobile apps." },
      { title: "Drift Monitoring", desc: "Continuous monitoring to prevent model performance degradation over time." }
    ],
    faqs: [
      { q: "Can AI integrate with our legacy database?", a: "Yes, we build custom API layers to connect AI models directly with SQL, NoSQL, and legacy ERP databases." },
      { q: "How do you protect data privacy?", a: "We deploy models within your private VPC or on-premise servers so your data is never sent to public AI APIs." },
      { q: "What ML frameworks do you utilize?", a: "We work with PyTorch, TensorFlow, Scikit-Learn, HuggingFace, and LangChain." }
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
    introP2: "Our Web3 engineers craft audited smart contracts and decentralized protocols tailored for security.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "Cryptographically secure Web3 architecture designed for scale.",
    whyChooseCards: [
      { title: "Audited Smart Contracts", desc: "Flawless Solidity & Rust code verified against security vulnerabilities." },
      { title: "Multi-Chain Support", desc: "Deploying across Ethereum, Polygon, Solana, and Hyperledger." },
      { title: "Cryptographic Security", desc: "Immutable transaction logs protecting against tamper risks." },
      { title: "Zero Gas Inefficiencies", desc: "Optimized smart contract logic to minimize gas fee overhead." },
      { title: "Enterprise Ledgers", desc: "Private permissioned blockchain networks for supply chain transparency." },
      { title: "Tokenomics Engineering", desc: "Designing sustainable token economic models and staking protocols." }
    ],
    expertiseTitle: "Blockchain Expertise",
    expertiseSubtitle: "Decentralized innovation across public and permissioned ledgers.",
    expertiseItems: [
      { title: "DeFi Protocols & Tokenomics", desc: "Decentralized financial protocols, liquidity pools, and custom token ecosystems." },
      { title: "Smart Contract Engineering", desc: "Audited smart contracts for automated escrow, governance, and token minting." },
      { title: "Enterprise Permissioned Chains", desc: "Hyperledger Fabric networks for private supply chain tracking." },
      { title: "Web3 Wallet & dApp Integration", desc: "Seamless Web3 onboarding with MetaMask, WalletConnect, and Phantom." }
    ],
    processTitle: "Our Web3 Process",
    processSteps: [
      { title: "Protocol Design", desc: "Structuring tokenomics, consensus models, and smart contract logic." },
      { title: "Smart Contract Coding", desc: "Writing gas-optimized Solidity, Rust, or Go smart contracts." },
      { title: "Security Audit", desc: "Conducting formal verification and third-party penetration testing." },
      { title: "Testnet Verification", desc: "Deploying to public testnets to verify transaction throughput." },
      { title: "Mainnet Launch", desc: "Executing mainnet contract deployment and subgraph indexing." },
      { title: "Monitoring & Indexing", desc: "Real-time contract event monitoring and automated alerting." }
    ],
    faqs: [
      { q: "Which blockchains do you support?", a: "We support Ethereum, Polygon, Solana, Hyperledger Fabric, Avalanche, and BNB Chain." },
      { q: "How do you guarantee smart contract security?", a: "Every smart contract undergoes static analysis, automated unit tests, and comprehensive security audits before mainnet deployment." },
      { q: "Can blockchain integrate with standard web apps?", a: "Yes, we build Web3 frontend interfaces using Ethers.js/Wagmi connecting standard Web2 backends to blockchain nodes." }
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
      { title: "ROI Cost-Benefit Analysis", desc: "Financial modeling and cost-benefit projections for AI adoption." },
      { title: "Data Readiness Audit", desc: "Assessing data quality, privacy compliance, and infrastructure readiness." },
      { title: "Security Assessment", desc: "Evaluating data exposure risks and compliance guardrails." },
      { title: "Technical Feasibility Score", desc: "Determining whether custom ML, LLMs, or pre-built APIs fit best." },
      { title: "Vendor & Model Benchmarking", desc: "Comparing open-source vs. commercial AI models for your use case." },
      { title: "Phased Adoption Roadmap", desc: "Clear step-by-step implementation milestones minimizing operational risk." }
    ],
    expertiseTitle: "Evaluation Expertise",
    expertiseSubtitle: "Comprehensive technical audits and strategy roadmaps.",
    expertiseItems: [
      { title: "Data Hygiene & Quality Audits", desc: "Evaluating dataset completeness, noise levels, and labeling requirements." },
      { title: "Workflow Bottleneck Mapping", desc: "Identifying high-leverage business processes suitable for AI automation." },
      { title: "AI Model Selection Benchmark", desc: "Evaluating model latency, token costs, and accuracy across candidates." },
      { title: "Regulatory Compliance Audit", desc: "Ensuring AI initiatives comply with EU AI Act, HIPAA, and GDPR standards." }
    ],
    processTitle: "Evaluation Process",
    processSteps: [
      { title: "Discovery Workshop", desc: "Reviewing existing workflows and pinpointing AI automation opportunities." },
      { title: "Data Infrastructure Audit", desc: "Inspecting data sources, database schemas, and API connectivity." },
      { title: "Feasibility Modeling", desc: "Running test benchmarks on sample corporate datasets." },
      { title: "Risk & Cost Projection", desc: "Calculating cloud GPU costs, API fees, and maintenance overhead." },
      { title: "Architectural Roadmap Design", desc: "Drafting technical system blueprints and integration strategies." },
      { title: "Executive Report Presentation", desc: "Delivering actionable scope evaluation documents to C-suite stakeholders." }
    ],
    faqs: [
      { q: "What does the evaluation deliverable include?", a: "A comprehensive technical architecture document, data quality audit, risk matrix, cost breakdown, and phased implementation timeline." },
      { q: "How long does an AI evaluation study take?", a: "Evaluation engagements typically range from 2 to 4 weeks depending on organizational complexity." },
      { q: "Why is scope evaluation necessary before building AI?", a: "It prevents costly development failures by validating data quality and model feasibility before committing major capital." }
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
      { title: "RPA Software Bots", desc: "Automated software bots handling data entry, invoicing, and reporting." },
      { title: "Industrial Hardware Sync", desc: "IoT connectivity bridging physical machinery with central control dashboards." },
      { title: "Zero Manual Data Entry", desc: "Eliminating tedious manual typing across ERP and accounting tools." },
      { title: "Sub-Second Task Execution", desc: "Processes that took hours are executed automatically in seconds." },
      { title: "Error Rate Reduction", desc: "Achieving 99.9% accuracy in high-volume repetitive tasks." },
      { title: "Rapid Cost Recovery", desc: "Clients achieve full investment recovery within months of bot deployment." }
    ],
    expertiseTitle: "Automation Expertise",
    expertiseSubtitle: "End-to-end industrial and software automation solutions.",
    expertiseItems: [
      { title: "Enterprise RPA Bot Routines", desc: "Streamlining back-office workflows with intelligent automated bot routines." },
      { title: "Industrial Sensor & SCADA Sync", desc: "Connecting physical factory sensors and SCADA systems to real-time analytics." },
      { title: "Warehouse & Inventory Automation", desc: "Barcode telemetry, automated dispatching, and stock sync." },
      { title: "Automated Report Generation", desc: "Scheduling bot routines to generate and email compliance reports." }
    ],
    processTitle: "Automation Process",
    processSteps: [
      { title: "Process Audit", desc: "Identifying bottleneck operations suitable for automated robotics." },
      { title: "Routine Mapping", desc: "Designing keystroke-level bot workflows and exception handling." },
      { title: "Bot Development", desc: "Building resilient RPA scripts and hardware API connectors." },
      { title: "System Integration", desc: "Connecting bots into legacy ERPs, CRMs, and email gateways." },
      { title: "Staging Testing", desc: "Verifying bot performance against high-volume test transactions." },
      { title: "Production Deployment", desc: "Deploying unattended bots with 24/7 execution monitoring." }
    ],
    faqs: [
      { q: "How fast is the ROI on RPA implementation?", a: "Most enterprise clients realize full cost recovery within 6 to 9 months of RPA deployment." },
      { q: "Does RPA replace existing staff or assist them?", a: "RPA eliminates tedious manual tasks, freeing your team to focus on high-value strategic work." },
      { q: "Can software bots run 24/7 without supervision?", a: "Yes, unattended RPA bots run continuously on virtual machines with automated exception logging." }
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
      { title: "Predictive Analytics", desc: "Statistical modeling to forecast market trends and consumer demand." },
      { title: "Automated Data Ingestion", desc: "Web scraping and API feeds ingesting global commercial data points." },
      { title: "Competitor Intelligence", desc: "Real-time tracking of market competitor pricing and feature moves." },
      { title: "Sentiment Modeling", desc: "NLP evaluation of consumer sentiment across social and news channels." },
      { title: "Strategic Executive Insights", desc: "Synthesizing complex data into actionable executive summaries." },
      { title: "Custom BI Integration", desc: "Feeding structured research outputs directly into PowerBI or Tableau." }
    ],
    expertiseTitle: "Research Expertise",
    expertiseSubtitle: "Commercial intelligence for strategic executive decisions.",
    expertiseItems: [
      { title: "Market Sentiment Modeling", desc: "Analyzing millions of data points to evaluate brand health and consumer sentiment." },
      { title: "Consumer Behavioral Analysis", desc: "Mining transactional data to uncover emerging consumer purchasing trends." },
      { title: "Competitor Benchmarking", desc: "Continuous automated audits of competitor product offerings and pricing." },
      { title: "Macroeconomic Trend Forecasting", desc: "Machine learning statistical models projecting market demand cycles." }
    ],
    processTitle: "Research Process",
    processSteps: [
      { title: "Hypothesis & Scope", desc: "Setting clear research targets and data collection boundaries." },
      { title: "Data Scraping & Ingestion", desc: "Deploying automated pipelines to collect unstructured market data." },
      { title: "AI Model Ingestion", desc: "Processing data through custom NLP and statistical algorithms." },
      { title: "Pattern Recognition", desc: "Identifying correlation trends and market anomalies." },
      { title: "Executive Synthesis", desc: "Creating comprehensive visual research reports and dashboards." },
      { title: "BI Dashboard Feed", desc: "Integrating live data feeds directly into enterprise reporting systems." }
    ],
    faqs: [
      { q: "Can research datasets be delivered via API?", a: "Yes, we can feed structured analytical reports directly into your BI dashboards via REST APIs." },
      { q: "How accurate are AI sentiment forecasting models?", a: "Our models achieve over 90% directional accuracy by analyzing multi-channel data sources." },
      { q: "What industries do you cover for business research?", a: "We cover technology, renewable energy, healthcare, retail, financial services, and logistics." }
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
      { title: "Automated CI/CD Testing", desc: "Continuous automated test suites catching bugs before staging." },
      { title: "Zero-Defect Guarantee", desc: "Rigorous verification ensuring reliable software releases." },
      { title: "High-Traffic Load Testing", desc: "Simulating thousands of concurrent users to test server stability." },
      { title: "Cross-Device QA", desc: "Testing across hundreds of mobile device viewports and OS versions." },
      { title: "OWASP Security Audits", desc: "Penetration testing to identify security vulnerabilities before hackers do." },
      { title: "Regression Test Matrix", desc: "Ensuring new feature updates never break existing working code." }
    ],
    expertiseTitle: "QA Expertise",
    expertiseSubtitle: "Comprehensive software testing across devices and platforms.",
    expertiseItems: [
      { title: "Automated End-to-End Testing", desc: "Cypress and Playwright test suites for automated web and API verification." },
      { title: "Performance & Stress Testing", desc: "Simulating peak user traffic spikes to verify server stability and latency." },
      { title: "Mobile App QA & Device Matrix", desc: "Testing native mobile apps across real iOS and Android physical hardware." },
      { title: "Security Vulnerability Scanning", desc: "Scanning APIs and web applications against OWASP Top 10 security risks." }
    ],
    processTitle: "QA Process",
    processSteps: [
      { title: "Test Plan Definition", desc: "Creating test cases, regression matrix, and automation scripts." },
      { title: "Automated Script Writing", desc: "Writing reusable Cypress/Playwright test scripts." },
      { title: "Manual Exploratory QA", desc: "Conducting edge-case user workflow testing." },
      { title: "Performance Load Testing", desc: "Stressing servers with simulated user spikes." },
      { title: "Bug Remediation Sync", desc: "Logging bug tickets with exact reproduction steps for developers." },
      { title: "Release Clearance Signoff", desc: "Issuing formal quality signoff for production deployment." }
    ],
    faqs: [
      { q: "Do you offer automated testing frameworks?", a: "Yes, we build custom automation pipelines using Cypress, Playwright, Selenium, and Appium." },
      { q: "What tools do you use for load testing?", a: "We utilize JMeter, k6, and Gatling to simulate multi-region user traffic spikes." },
      { q: "How early in development should QA begin?", a: "We advocate Shift-Left QA, integrating automated test cases from the earliest sprint." }
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
      { title: "Cloud Strategy Optimization", desc: "AWS, Azure, and GCP architecture optimization and monthly cost reduction." },
      { title: "Zero-Downtime Migration", desc: "Seamless migration of legacy infrastructure into secure cloud environments." },
      { title: "Enterprise Security Audits", desc: "Fortifying infrastructure against data breaches and compliance violations." },
      { title: "Disaster Recovery Planning", desc: "Designing robust backup and automated failover strategies." },
      { title: "SLA & Uptime Assurance", desc: "Ensuring 99.99% system availability for mission-critical operations." },
      { title: "Unbiased Technical Advice", desc: "Independent vendor evaluations prioritizing your business ROI." }
    ],
    expertiseTitle: "Consulting Expertise",
    expertiseSubtitle: "Enterprise architecture and digital transformation advisement.",
    expertiseItems: [
      { title: "Cloud Infrastructure Optimization", desc: "Audit and modernization of enterprise cloud architectures across AWS, Azure, and GCP." },
      { title: "Legacy System Modernization", desc: "Strategic refactoring of monolithic software into microservices." },
      { title: "Cybersecurity & Disaster Recovery", desc: "Implementing zero-trust security frameworks and automated backup failovers." },
      { title: "Enterprise IT Governance", desc: "Establishing technology policies, SLA benchmarks, and compliance frameworks." }
    ],
    processTitle: "Consulting Process",
    processSteps: [
      { title: "Infrastructure Audit", desc: "Comprehensive review of system health, security vulnerabilities, and operational costs." },
      { title: "Gap Analysis", desc: "Identifying security risks, performance bottlenecks, and excess cloud spend." },
      { title: "Strategy & Roadmap", desc: "Designing phased cloud migration and modernization blueprints." },
      { title: "Vendor Selection", desc: "Evaluating software tools and cloud infrastructure providers." },
      { title: "Execution Oversight", desc: "Guiding dev teams during migration execution." },
      { title: "Post-Migration Monitoring", desc: "24/7 infrastructure monitoring ensuring peak performance." }
    ],
    faqs: [
      { q: "How do you assist with cloud migration?", a: "We design zero-downtime migration plans and manage full cloud transition execution across AWS, Azure, or GCP." },
      { q: "Can you reduce our monthly AWS/Azure spend?", a: "Yes, our cloud cost audits typically reduce monthly infrastructure expenditure by 20% to 40%." },
      { q: "What does an IT audit involve?", a: "An IT audit inspects server architecture, database health, security vulnerabilities, backup policies, and cloud cost efficiency." }
    ]
  }
];

export const initialProjects = [
  {
    id: "powerportal",
    title: "PowerPortal",
    titleSystem: "Power Portal System",
    category: "Energy & Utilities",
    categoryCaps: "ENTERPRISE ERP",
    client: "Global Energy Corp",
    duration: "6 Months",
    description: "Power Portal is a complete Sales & Project Management platform that manages the entire business lifecycle — from lead acquisition to project delivery, invoicing, and analytics — in one unified system.",
    shortDesc: "Centralised platform for monitoring and optimising power operations with real-time insights.",
    fullDesc: "PowerPortal is a centralized enterprise platform designed to stream real-time operational metrics across renewable and conventional energy grids.",
    image: "/assets/images/projects/powerportal.jpg",
    slug: "powerportal",
    systemOverview: [
      "Power Portal is a comprehensive enterprise-grade Sales and Project Management platform designed to manage the complete business lifecycle from initial lead acquisition through final project delivery, billing, and post-sales analysis.",
      "The system seamlessly connects sales operations, inventory, finance, delivery, and project execution into a unified data ecosystem, eliminating data silos between departments and ensuring real-time synchronization across all business functions.",
      "Power Portal supports both **Order-to-Cash** and **Concept-to-Completion** workflows, making it ideal for businesses that handle complex sales cycles, customized orders, service delivery, and project-based execution.",
      "Built with scalability and flexibility at its core, the platform can efficiently support organizations processing as few as **10 orders per month** to enterprises handling **10,000+ orders monthly**—without compromising performance, data integrity, or user experience."
    ],
    modulesTitle: "Sales & Delivery Modules",
    summaryNote: "From lead capture to delivery confirmation, Power Portal ensures accuracy, speed, and transparency.",
    capabilities: [
      { title: "Lead & Sales Management", description: "Multi-channel lead capture, BANT scoring, nurturing, and analytics." },
      { title: "Quotation & Order Processing", description: "Dynamic pricing, approvals, inventory validation, and payments." },
      { title: "Delivery & Logistics", description: "Partial shipments, courier integrations, GPS tracking, POD." },
      { title: "Customer Communication", description: "Automated emails, order tracking portal, and support tickets." }
    ],
    valuePropositions: [
      { title: "Unified Data Model", description: "Single source of truth across sales, projects, inventory, and finance." },
      { title: "Automation Excellence", description: "Eliminates repetitive tasks with intelligent workflow automation." },
      { title: "Real-Time Visibility", description: "Live dashboards for executives, sales managers, and project heads." },
      { title: "Scalable Architecture", description: "Designed for growth without performance degradation." },
      { title: "Industry Flexibility", description: "Manufacturing, services, distribution, and engineering workflows." },
      { title: "Enterprise Security", description: "Role-based access, audit logs, and compliance-ready." }
    ],
    executionTitle: "Project Execution & Analytics",
    executionFeatures: [
      { title: "Project Automation", description: "Auto project creation, task templates, dependencies, and milestones." },
      { title: "Task & Resource Management", description: "Kanban boards, Gantt charts, skill-based allocation." },
      { title: "Time & Cost Control", description: "Timesheets, earned value management, profitability tracking." },
      { title: "Dashboards & Reports", description: "Sales funnels, project health, executive KPIs." }
    ],
    techStack: ["React", "Node.js", "TimeSeries DB", "Tailwind CSS", "WebSockets"]
  },
  {
    id: "healthconnect",
    title: "HealthConnect",
    titleSystem: "HealthConnect Digital System",
    category: "Healthcare Tech",
    categoryCaps: "HEALTHCARE TECH",
    client: "MediCare Systems",
    duration: "8 Months",
    description: "HealthConnect is a unified digital ecosystem connecting patients, doctors, and clinical administration in real time.",
    shortDesc: "A unified digital ecosystem connecting patients, doctors, and healthcare administration.",
    fullDesc: "HealthConnect streamlines healthcare delivery by bridging the communication gap between clinical administration and patients.",
    image: "/assets/images/projects/healthconnect.jpg",
    slug: "healthconnect",
    systemOverview: [
      "HealthConnect streamlines healthcare delivery by bridging the communication gap between clinical administration, attending physicians, and patients into a HIPAA-compliant digital environment.",
      "The system synchronizes Electronic Health Records (**EHR**), automated appointment dispatching, and secure telemedicine consultations into a seamless clinical workflow.",
      "HealthConnect empowers care providers to deliver proactive treatment plans while providing patients with instant access to lab results, digital prescriptions, and vital telemetry.",
      "Engineered for high availability and strict medical data privacy standards across hospital networks, specialized diagnostic centers, and outpatient clinics."
    ],
    modulesTitle: "Clinical Care & Patient Modules",
    summaryNote: "By digitizing clinical workflows and patient touchpoints, HealthConnect improves care delivery speed and patient satisfaction.",
    capabilities: [
      { title: "EHR Synchronization", description: "Real-time medical history timeline, lab results, digital scripts, and allergy records." },
      { title: "Tele-Health Engine", description: "Encrypted HD video consultations with interactive prescription notes and vitals logging." },
      { title: "Automated Appointment Queue", description: "Multi-channel automated appointment booking, smart queueing, and instant SMS reminders." },
      { title: "Patient Care Portal", description: "Self-service lab report downloads, symptom trackers, and secure doctor messaging." }
    ],
    valuePropositions: [
      { title: "HIPAA & GDPR Compliance", description: "End-to-end data encryption, immutable audit trails, and strict role-based access control." },
      { title: "Clinical Error Reduction", description: "Automated dosage cross-checking and digital chart verification." },
      { title: "Zero-Wait Queueing", description: "Automated clinic check-ins and digital token dispatching." },
      { title: "24/7 Remote Telemetry", description: "Continuous remote vitals monitoring for chronic condition patient management." },
      { title: "HL7 & FHIR Standards", description: "Native interoperability protocols connecting seamlessly with hospital ERP systems." },
      { title: "Patient Satisfaction Boost", description: "85% reduction in appointment no-shows through automated patient engagement." }
    ],
    executionTitle: "Clinical Workflow & Analytics",
    executionFeatures: [
      { title: "Clinical Scheduling", description: "Multi-channel automated appointment booking and instant doctor notifications." },
      { title: "Patient Portal Sync", description: "Self-service lab downloads, symptom trackers, and secure medical messaging." },
      { title: "HIPAA Security Architecture", description: "End-to-end encryption, audit logs, and role-based clinical access control." },
      { title: "Care Outcome Analytics", description: "Patient recovery metrics, clinic bed occupancy, and physician performance KPIs." }
    ],
    techStack: ["React Native", "React", "GraphQL", "Node.js", "WebRTC"]
  },
  {
    id: "fleetpro",
    title: "FleetPro",
    titleSystem: "FleetPro Telemetry & Mobility System",
    category: "Logistics & Mobility",
    categoryCaps: "LOGISTICS & MOBILITY",
    client: "TransLogistics Inc",
    duration: "5 Months",
    description: "Smart fleet management platform for tracking vehicles, driver safety, and transport operations.",
    shortDesc: "Smart fleet management for tracking vehicles, drivers, and operations.",
    fullDesc: "FleetPro delivers an intelligent telemetry and fleet management platform for logistics and transport enterprises.",
    image: "/assets/images/projects/fleetpro.jpg",
    slug: "fleetpro",
    systemOverview: [
      "FleetPro delivers an intelligent telemetry and fleet management platform for commercial logistics, transit networks, and heavy transport enterprises.",
      "The system aggregates sub-second geospatial updates, IoT engine sensor feeds, and fuel telemetry to eliminate route inefficiencies and reduce operating costs.",
      "FleetPro provides automated geofence triggers, driver behavior safety scoring, and predictive maintenance alerts across long-haul and last-mile logistics routes.",
      "Built for high-density transport fleets handling **thousands of active vehicles** across global logistics networks with zero latency."
    ],
    modulesTitle: "Logistics & Fleet Operations Modules",
    summaryNote: "FleetPro provides total visibility over vehicle fleets, ensuring safety compliance and optimized fuel consumption.",
    capabilities: [
      { title: "Sub-Second GPS Telemetry", description: "Live vehicle location tracking, geofence breaches, and route history playback." },
      { title: "Driver Behavior Analytics", description: "Safety scoring based on harsh braking, rapid acceleration, idling, and speed compliance." },
      { title: "Dynamic Route Optimization", description: "AI-powered route planning, dynamic traffic avoidance, and multi-drop ordering." },
      { title: "Fuel & Theft Protection", description: "Real-time fuel level monitoring, theft detection alerts, and consumption analytics." }
    ],
    valuePropositions: [
      { title: "30% Fuel Cost Reduction", description: "Intelligent route optimization and idling reduction cut fleet fuel expenditure significantly." },
      { title: "Predictive Vehicle Maintenance", description: "Engine OBD-II diagnostics trigger maintenance before costly breakdowns occur." },
      { title: "Driver Safety Enhancement", description: "Automated in-cab alerts and driver safety scorecards lower accident rates." },
      { title: "Complete Supply Chain Visibility", description: "Live ETA updates shared directly with cargo owners and dispatchers." },
      { title: "Automated Compliance Logging", description: "Electronic Logging Device (ELD) integration for regulatory transport compliance." },
      { title: "Rapid Cargo Dispatch", description: "Automated trip assignment based on driver proximity and vehicle load capacity." }
    ],
    executionTitle: "Fleet Analytics & Operations",
    executionFeatures: [
      { title: "Route Optimization Engine", description: "AI route planning, dynamic traffic avoidance, and multi-drop ordering." },
      { title: "Fuel Management System", description: "Fuel theft detection, consumption analytics, and fill-up logging." },
      { title: "Maintenance Work Order Sync", description: "Predictive breakdown alerts and automated service work order triggers." },
      { title: "Fleet Profitability Reports", description: "Vehicle utilization rates, carbon footprint metrics, and operational cost KPIs." }
    ],
    techStack: ["React", "Leaflet Maps", "Python / FastAPI", "Kafka", "Docker"]
  },
  {
    id: "solarcare",
    title: "SolarCare",
    titleSystem: "SolarCare Construction ERP System",
    category: "Enterprise ERP",
    categoryCaps: "ENTERPRISE ERP",
    client: "SunPower Solutions",
    duration: "7 Months",
    description: "Project-centric ERP workflow managing procurement, site execution, and renewable energy delivery.",
    shortDesc: "Project-centric ERP workflow managing procurement, execution, and delivery.",
    fullDesc: "SolarCare is a specialized enterprise resource planning system tailored for solar engineering and construction management.",
    image: "/assets/images/projects/solarcare.jpg",
    slug: "solarcare",
    systemOverview: [
      "SolarCare is a specialized enterprise resource planning (ERP) system engineered specifically for commercial and utility solar construction projects.",
      "The platform unifies site engineering survey data, bill of quantities (**BOQ**) procurement, contractor milestone approvals, and commissioning verification.",
      "SolarCare connects field engineering teams with corporate finance departments, preventing cost overruns and material bottlenecks during solar installations.",
      "Designed to support solar developers managing **multi-megawatt solar projects** across distributed geographic regions."
    ],
    modulesTitle: "Solar Procurement & Project Modules",
    summaryNote: "SolarCare streamlines renewable energy project lifecycles from initial engineering survey to grid connection.",
    capabilities: [
      { title: "BOQ & Procurement Portal", description: "Material requisition, supplier BOQ requests, PO approvals, and inventory dispatching." },
      { title: "Field Mobile App", description: "Site audit checklists, offline photo uploads, and contractor milestone signoffs." },
      { title: "Subcontractor Management", description: "Contractor bidding, milestone verification, and automated progress billing." },
      { title: "Grid Commissioning Verification", description: "Safety inspection workflows, compliance documentation, and handover logs." }
    ],
    valuePropositions: [
      { title: "Zero Material Bottlenecks", description: "Just-in-time procurement tracking prevents solar site work stoppage." },
      { title: "100% Budget Traceability", description: "Real-time BOQ cost variance monitoring against project budgets." },
      { title: "Mobile Field Signoff", description: "Engineers verify milestones directly from tablets on site." },
      { title: "Supplier Transparency", description: "Vendor rating metrics based on delivery speed and material quality." },
      { title: "Accelerated Grid Handover", description: "Standardized commissioning workflows speed up utility approval." },
      { title: "Multi-Site Portfolio Control", description: "Executive visibility across dozens of simultaneous solar farm builds." }
    ],
    executionTitle: "Solar Execution & Analytics",
    executionFeatures: [
      { title: "BOQ & Costing Engine", description: "Automated bill of materials costing, supplier pricing sync, and PO tracking." },
      { title: "Milestone Gantt Tracker", description: "Gantt schedules, site inspection signoffs, and commissioning logs." },
      { title: "Vendor Compliance Management", description: "Supplier ratings, contract compliance, and invoice reconciliation." },
      { title: "Executive Margin Dashboards", description: "Portfolio yield forecasts, project margin health, and cash flow." }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs"]
  },
  {
    id: "autitrack-pro",
    title: "AutiTrack Pro",
    titleSystem: "AutiTrack Pro Clinical System",
    category: "Medical Tech",
    categoryCaps: "MEDICAL TECH",
    client: "CareHealth Foundation",
    duration: "4 Months",
    description: "Structured autism care platform enabling doctors, therapists, and families to track therapy and progress.",
    shortDesc: "Structured autism care platform enabling doctors to track therapy and progress.",
    fullDesc: "AutiTrack Pro is a specialized clinical software solution created for therapists, pediatricians, and families.",
    image: "/assets/images/projects/autitrack-pro.jpg",
    slug: "autitrack-pro",
    systemOverview: [
      "AutiTrack Pro is a specialized clinical platform designed for pediatricians, speech/occupational therapists, and care teams managing autism spectrum care.",
      "The system standardizes behavioral assessment scoring, therapy milestone tracking, and home exercise program monitoring into a unified caregiver portal.",
      "AutiTrack Pro enables real-time collaboration between multidisciplinary specialists and parents, accelerating developmental progress.",
      "Built with child-friendly interactive interfaces and strict medical data privacy protections across therapy centers."
    ],
    modulesTitle: "Therapy & Clinical Modules",
    summaryNote: "AutiTrack Pro turns therapy evaluation data into actionable, personalized care plans for every child.",
    capabilities: [
      { title: "Standardized Clinical Assessments", description: "Digital scoring for ADOS, CARS, and custom behavioral evaluation matrices." },
      { title: "Multidisciplinary Therapy Logs", description: "Shared clinical notes between speech language pathologists, OTs, and behavioral therapists." },
      { title: "Home Exercise & Parent Portal", description: "Interactive caregiver portal with video guidance for daily skill reinforcement." },
      { title: "Longitudinal Progress Charts", description: "Visual progress graphs tracking speech, motor skills, and social engagement over time." }
    ],
    valuePropositions: [
      { title: "Accelerated Therapy Outcomes", description: "Unified caregiver coordination improves child skill acquisition speed by 40%." },
      { title: "Standardized Scoring Accuracy", description: "Eliminates manual paper assessment errors in clinical evaluations." },
      { title: "Empowered Parent Participation", description: "Parents log home milestones with direct therapist feedback." },
      { title: "HIPAA Data Protection", description: "Encrypted clinical records accessible only by authorized care teams." },
      { title: "Multi-Specialty Alignment", description: "Speech, occupational, and behavioral therapists share a single chart." },
      { title: "Tele-Therapy Integration", description: "Remote video observation sessions with real-time clinical notes." }
    ],
    executionTitle: "Clinical Insights & Tracking",
    executionFeatures: [
      { title: "Assessment Automation", description: "Standardized clinical questionnaires, diagnostic scoring, and report generation." },
      { title: "Session Timer & Log", description: "Built-in session timer, activity tracking, and objective performance records." },
      { title: "Family Sync Mobile App", description: "Daily home habit logging, video guidance, and direct therapist messaging." },
      { title: "Clinical Cohort Insights", description: "Cohort progress trends, intervention efficacy metrics, and outcome charts." }
    ],
    techStack: ["React", "Redux Toolkit", "Chart.js", "Node.js", "Express"]
  },
  {
    id: "procuraone",
    title: "ProcuraOne",
    titleSystem: "ProcuraOne Enterprise Procurement System",
    category: "Supply Chain",
    categoryCaps: "SUPPLY CHAIN",
    client: "Global Logistics Group",
    duration: "6 Months",
    description: "End-to-end procurement and vendor management system ensuring compliance, transparency, and auditability.",
    shortDesc: "End-to-end procurement system ensuring transparency and traceability.",
    fullDesc: "ProcuraOne modernizes corporate supply chain management with an end-to-end procurement portal.",
    image: "/assets/images/projects/procuraone.jpg",
    slug: "procuraone",
    systemOverview: [
      "ProcuraOne modernizes corporate procurement by digitizing requisition approvals, vendor sourcing, contract lifecycle management, and invoice audit matching.",
      "The system enforces multi-tiered financial approval matrices, mitigating fraud risk and eliminating manual processing bottlenecks.",
      "ProcuraOne connects seamlessly with legacy ERP accounting ledgers for instant purchase order and ledger reconciliation.",
      "Built for enterprise procurement departments processing **thousands of vendor contracts** and purchase orders annually."
    ],
    modulesTitle: "Procurement & Vendor Modules",
    summaryNote: "ProcuraOne delivers total spend visibility and automated procurement workflows for modern enterprises.",
    capabilities: [
      { title: "Requisition & Approval Engine", description: "Dynamic threshold approval routing, budget checking, and automated PO generation." },
      { title: "Vendor Self-Service Portal", description: "Digital RFQs, bid submissions, compliance document storage, and scorecard ratings." },
      { title: "Automated 3-Way Matching", description: "Automated reconciliation between PO, goods receipt note (GRN), and vendor invoice." },
      { title: "Immutable Audit Trail", description: "Complete event logging for every financial approval, edit, and payment trigger." }
    ],
    valuePropositions: [
      { title: "100% Spend Visibility", description: "Centralized dashboard tracking purchase orders across all company divisions." },
      { title: "Fraud & Risk Mitigation", description: "Strict multi-tiered approval limits prevent unauthorized corporate spend." },
      { title: "70% Faster PO Approval", description: "Automated mobile signoffs reduce PO turnaround from days to hours." },
      { title: "Vendor Contract Savings", description: "Dynamic RFQ bidding encourages competitive pricing from suppliers." },
      { title: "Zero Invoice Discrepancies", description: "Automated 3-way matching prevents overpayments and duplicate invoices." },
      { title: "ERP Ledger Synchronization", description: "Direct integration with SAP, Oracle, and Microsoft Dynamics ledgers." }
    ],
    executionTitle: "Procurement Analytics & Compliance",
    executionFeatures: [
      { title: "Requisition Engine", description: "Item catalog selection, budget checking, and automated PO generation." },
      { title: "3-Way Matching Engine", description: "PO, goods receipt, and invoice automated reconciliation." },
      { title: "Audit Trail Logging", description: "Immutable event logs for every procurement action and approval." },
      { title: "Spend Category Analytics", description: "Category spend breakdown, savings metrics, and vendor performance." }
    ],
    techStack: ["React", "Tailwind CSS", "Enterprise API", "Node.js"]
  },
  {
    id: "solarsync",
    title: "SolarSync",
    titleSystem: "SolarSync IoT Telemetry & Analytics System",
    category: "Renewable Energy",
    categoryCaps: "RENEWABLE ENERGY",
    client: "CleanEnergy Utilities",
    duration: "9 Months",
    description: "Intelligent IoT monitoring system for tracking solar farm output, inverter performance, and asset health.",
    shortDesc: "Intelligent monitoring of solar assets, energy output, and performance.",
    fullDesc: "SolarSync is an IoT-connected energy analytics application designed for utility-scale solar farms.",
    image: "/assets/images/projects/solarsync.jpg",
    slug: "solarsync",
    systemOverview: [
      "SolarSync is an IoT-connected energy telemetry and performance analytics application engineered for utility-scale solar arrays and commercial rooftop setups.",
      "The platform continuously evaluates string-level power output, solar irradiance, ambient temperature, and inverter conversion efficiency in real time.",
      "SolarSync utilizes machine learning models to detect thermal anomalies, panel degradation, and inverter failures before power generation drops.",
      "Designed for solar asset managers, IPPs, and operation & maintenance (O&M) teams handling **gigawatt-scale renewable portfolios**."
    ],
    modulesTitle: "Solar Telemetry & Performance Modules",
    summaryNote: "SolarSync maximizes solar plant yield and minimizes downtime through real-time IoT diagnostic feeds.",
    capabilities: [
      { title: "Real-Time IoT Telemetry", description: "Sub-second inverter string monitoring, weather sensor feeds, and live generation charts." },
      { title: "Yield & PR Calculation", description: "Continuous Performance Ratio (PR) tracking, temperature-loss modeling, and yield forecasts." },
      { title: "AI Anomaly Fault Map", description: "Machine learning classification of panel degradation, soiling loss, and inverter tripping." },
      { title: "Automated O&M Work Orders", description: "Automatic dispatch of field maintenance teams upon fault detection." }
    ],
    valuePropositions: [
      { title: "15% Power Yield Optimization", description: "Early fault detection prevents generation loss across solar arrays." },
      { title: "99.8% System Uptime", description: "Predictive inverter maintenance prevents catastrophic outages." },
      { title: "Automated Washing Schedules", description: "Soiling loss sensors trigger panel cleaning only when cost-effective." },
      { title: "PPA Revenue Protection", description: "Precise kWh generation accounting matches Power Purchase Agreement tariffs." },
      { title: "Remote Plant Diagnostics", description: "Engineers diagnose inverter issues remotely before traveling to the site." },
      { title: "Executive Portfolio Dashboards", description: "Consolidated generation performance across hundreds of solar sites." }
    ],
    executionTitle: "Solar Analytics & Reporting",
    executionFeatures: [
      { title: "IoT Fault Detection", description: "AI anomaly classification, inverter tripping alerts, and string fault maps." },
      { title: "Predictive O&M Schedules", description: "Soiling loss estimation and optimal panel cleaning schedule triggers." },
      { title: "PPA Revenue Forecast", description: "PPA tariff calculation, generation forecasts, and financial yield logs." },
      { title: "Asset Yield Reports", description: "Automated investor reports, daily generation summaries, and uptime KPIs." }
    ],
    techStack: ["React", "D3.js / Recharts", "Python", "MQTT / WebSockets"]
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


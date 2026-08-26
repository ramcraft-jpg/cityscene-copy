import { defaultHomeContent } from '../controllers/homeContentController.js';
import { initialTestimonials } from '../controllers/testimonialController.js';
import { Blog } from '../models/Blog.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { Job } from '../models/Job.js';
import { Client } from '../models/Client.js';
import { Testimonial } from '../models/Testimonial.js';
import { HomeContent } from '../models/HomeContent.js';
import { SeoMeta } from '../models/SeoMeta.js';
import bcrypt from 'bcryptjs';

export const initialSeoMetas = [
  {
    pageKey: "home",
    pageName: "Home Page",
    pageGroup: "main",
    title: "CityScene Global - Enterprise Software & AI Solutions",
    description: "Leading AI-driven digital transformation, custom software development, Web3 engineering, and cloud applications for global enterprises.",
    keywords: "AI, Custom Software, Web Development, Mobile Apps, Digital Transformation, CityScene Global",
    canonicalUrl: "https://citysceneglobal.com/",
    ogTitle: "CityScene Global - Engineering Tomorrow's Digital Experience",
    ogDescription: "Empower your business with bespoke AI, web, mobile, and enterprise software architectures.",
    ogImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "about",
    pageName: "About CityScene",
    pageGroup: "main",
    title: "About Us - CityScene Global",
    description: "Learn about CityScene Global, our mission, leadership, core enterprise values, and technology innovation journey.",
    keywords: "About CityScene, Digital Agency, Leadership, Enterprise Tech, Software Engineering Team",
    canonicalUrl: "https://citysceneglobal.com/about",
    ogTitle: "About CityScene Global - Innovators in Technology",
    ogDescription: "Bridging the gap between ambitious ideas and technical execution.",
    ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "services",
    pageName: "What We Do / Services",
    pageGroup: "main",
    title: "Enterprise Technology Services - CityScene Global",
    description: "Explore our range of engineering services: Custom Software, Mobile Apps, Web Development, UI/UX, AI/ML, Blockchain, and Robotics Automation.",
    keywords: "Services, Software Engineering, Mobile App Dev, Web Dev, UI UX Design, AI ML, Blockchain",
    canonicalUrl: "https://citysceneglobal.com/services",
    ogTitle: "Our Services - CityScene Global Technology Solutions",
    ogDescription: "Tailored technology services designed to scale modern enterprises.",
    ogImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "career",
    pageName: "Careers",
    pageGroup: "main",
    title: "Careers & Opportunities - CityScene Global",
    description: "Join our global team of engineers, designers, and AI specialists. Explore open job positions and grow your career with CityScene.",
    keywords: "Careers, Job Openings, Engineering Jobs, Tech Careers, CityScene Jobs, Software Engineer Hiring",
    canonicalUrl: "https://citysceneglobal.com/career",
    ogTitle: "Join the CityScene Global Team",
    ogDescription: "Work on state-of-the-art enterprise software and AI projects.",
    ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "blog",
    pageName: "Blogs & Articles",
    pageGroup: "main",
    title: "Tech Insights & Blog - CityScene Global",
    description: "Stay informed with the latest articles on AI innovation, voice search SEO, modern web application trends, and digital strategy.",
    keywords: "Tech Blog, AI Articles, Web Development Trends, SEO Voice Search, CityScene Blog",
    canonicalUrl: "https://citysceneglobal.com/blog",
    ogTitle: "CityScene Tech Insights & Industry Blog",
    ogDescription: "Expert commentary and deep dives into modern technology trends.",
    ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "portfolio",
    pageName: "Portfolio & Projects",
    pageGroup: "main",
    title: "Client Case Studies & Portfolio - CityScene Global",
    description: "Discover how CityScene Global delivers transformative software solutions for industry leaders across fintech, healthcare, IoT, and supply chain.",
    keywords: "Portfolio, Case Studies, Software Projects, Client Success Stories, Enterprise Apps",
    canonicalUrl: "https://citysceneglobal.com/portfolio",
    ogTitle: "Our Work & Portfolio - CityScene Global",
    ogDescription: "Showcasing high-impact enterprise applications built for global clients.",
    ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  },
  {
    pageKey: "contact",
    pageName: "Contact Us",
    pageGroup: "main",
    title: "Contact Us - CityScene Global",
    description: "Get in touch with CityScene Global to discuss your next custom software, mobile app, or AI digital transformation initiative.",
    keywords: "Contact CityScene, Software Consultation, Hire Tech Team, Inquire Project",
    canonicalUrl: "https://citysceneglobal.com/contact",
    ogTitle: "Contact CityScene Global",
    ogDescription: "Bridging the gap between ideas and technical execution.",
    ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    robots: "index, follow"
  }
];

export const initialBlogs = [
  {
    id: "ai-grow-business",
    title: "How to Leverage Artificial Intelligence to Grow Your Business",
    category: "Artificial Intelligence",
    date: "March 26, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    slug: "how-to-leverage-artificial-intelligence-to-grow-your-business",
    summary: "Artificial Intelligence (AI) has transformed the business world by allowing companies to optimize operations, customer experiences, and growth. Learn how to leverage AI to maximize growth and stay ahead.",
    author: "Vishwambhar Singh",
    authorAvatar: "/assets/images/author-vishwambhar.png",
    authorRole: "Senior Tech Lead & Solution Architect",
    authorBio: "Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.",
    ctaHeading: "Ready to Leverage AI for Your Enterprise?",
    ctaDescription: "Partner with CityScene Global to integrate tailored AI models, automated workflows, and predictive analytics into your business.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact",
    seoTitle: "How to Leverage Artificial Intelligence to Grow Your Business | CityScene",
    seoDescription: "Discover how AI-driven strategies, machine learning models, and automated customer workflows can scale your business operations.",
    content: "<h1>How to Leverage Artificial Intelligence to Grow Your Business</h1><p>Artificial Intelligence (AI) has transformed the business world by allowing companies to optimize operations, customer experiences, and growth.</p>",
    blocks: [
      {
        id: "b1-p1",
        type: "paragraph",
        text: "Artificial Intelligence (AI) has transformed the business world by allowing companies to optimize operations, customer experiences, and growth. A small business, just like an established business, can utilize AI to achieve its goal and set a competitive edge. Through automating certain tasks, AI is beneficial for the betterment of decision-making skills and improving interactions with customers."
      },
      {
        id: "b1-p2",
        type: "paragraph",
        text: "At CityScene Global, we understand the power of AI in IT management and business transformation. This blog will explore how businesses can leverage AI to maximize growth and stay ahead in today's fast-paced digital world."
      },
      {
        id: "b1-h2-1",
        type: "h2",
        text: "1. Automating Business Processes for Efficiency"
      },
      {
        id: "b1-ul-1",
        type: "bullet_list",
        items: [
          "Robotic Process Automation (RPA): Bots can carry out routine operations, such as processing invoices, managing payroll, and onboarding into HR.",
          "Chatbots & Virtual Assistants: AI chatbots can offer customer services 24x7, minimizing the need for human intercession for common queries.",
          "AI-powered scheduling: Intelligent scheduling tools optimize team calendars for increased productivity and resource utilization."
        ]
      },
      {
        id: "b1-h2-2",
        type: "h2",
        text: "2. AI-Enhanced Customer Experience"
      },
      {
        id: "b1-ul-2",
        type: "bullet_list",
        items: [
          "Personalized Marketing: AI-driven algorithms predict customer preferences and recommend products, thereby increasing the rate of conversion.",
          "AI Chatbots & Voice Assistants: AI-based bots on websites, social media, and mobile apps offer instant support to customers.",
          "Sentiment Analysis: AI scans customer feedback and social media conversations to understand emotions and improve services."
        ]
      },
      {
        id: "b1-h2-3",
        type: "h2",
        text: "3. Data-Driven Decision Making"
      },
      {
        id: "b1-ul-3",
        type: "bullet_list",
        items: [
          "Predictive Analytics: AI predicts future market trends so businesses can prepare for customer demands.",
          "Real-Time Data Processing: AI tools analyze live data to provide insights into sales, inventory, and customer behavior.",
          "AI-Driven Business Intelligence: AI dashboards help executives make data-backed decisions, improving efficiency and profitability."
        ]
      },
      {
        id: "b1-h2-4",
        type: "h2",
        text: "4. Cybersecurity & IT Management"
      },
      {
        id: "b1-ul-4",
        type: "bullet_list",
        items: [
          "Threat Detection & Prevention: AI scans through systems with suspicious activities and stops the data breach.",
          "Fraud Detection: AI monitors financial transactions for fraudulent activities and reduces risks.",
          "Automated Security Response: AI-powered security tools respond very quickly to cyberattacks, reducing damage."
        ]
      },
      {
        id: "b1-h2-5",
        type: "h2",
        text: "5. Enhancing Marketing Strategies with AI"
      },
      {
        id: "b1-ul-5",
        type: "bullet_list",
        items: [
          "Predictive Customer Insights: AI identifies potential customers and suggests personalized content.",
          "Automated Email Campaigns: AI personalizes email content according to user behavior and preferences.",
          "AI-Powered Ad Optimization: AI optimizes digital ad placements for maximum reach and ROI."
        ]
      },
      {
        id: "b1-h2-6",
        type: "h2",
        text: "6. Revolutionizing Human Resources with AI"
      },
      {
        id: "b1-ul-6",
        type: "bullet_list",
        items: [
          "AI-Powered Recruitment: AI scans resumes, shortlists candidates, and predicts job fit.",
          "Employee Engagement Analysis: AI measures employee sentiment and suggests improvements.",
          "Performance Monitoring: AI tracks employee performance and provides feedback for development."
        ]
      },
      {
        id: "b1-h2-7",
        type: "h2",
        text: "7. AI-Powered Financial Management"
      },
      {
        id: "b1-ul-7",
        type: "bullet_list",
        items: [
          "Automated Accounting: The AI-powered application automates invoices and the tracking of expenses.",
          "Risk Assessment: AI evaluates the company's financial risks and recommends growth strategies.",
          "AI-Based Investment Insights: AI uses market trend prediction to guide investment decisions."
        ]
      },
      {
        id: "b1-h2-8",
        type: "h2",
        text: "Conclusion: The Future of AI in Business"
      },
      {
        id: "b1-p-conc1",
        type: "paragraph",
        text: "AI is no longer futuristic but a practical tool that any business must leverage to remain in competition. Automation, customer experience, decision-making, security, marketing, human resources, and finance are some opportunities through which one can expand into an infinite potential with AI."
      },
      {
        id: "b1-p-conc2",
        type: "paragraph",
        text: "CityScene Global is an IT management and AI solutions company specializing in helping businesses optimize performance and drive success. If you are ready to integrate AI into your operations, contact us today and unlock your firm's full potential."
      }
    ]
  },
  {
    id: "voice-search-ai",
    title: "How to Optimize Your Website for Voice Search & AI Assistants",
    category: "IT Solutions",
    date: "February 7, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    slug: "how-to-optimize-your-website-for-voice-search-ai-assistants",
    summary: "Voice search is quickly changing how people find information online thanks to the emergence of AI-powered voice assistants like Siri, Alexa, and Google Assistant. To remain competitive, businesses need to adjust to this change.",
    author: "Vishwambhar Singh",
    authorAvatar: "/assets/images/author-vishwambhar.png",
    authorRole: "Senior Tech Lead & Solution Architect",
    authorBio: "Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.",
    ctaHeading: "Ready to Add Voice Search Capability?",
    ctaDescription: "Put these tactics into practice right now to make sure that both voice search users and AI assistants can find your company with ease!",
    ctaButtonText: "Optimize Your Website Today",
    ctaButtonLink: "/contact",
    seoTitle: "How to Optimize Your Website for Voice Search & AI Assistants | CityScene",
    seoDescription: "Learn how conversational keywords, local SEO, schema markup, and page speed keep your brand visible on Siri, Alexa, and Google Assistant.",
    content: "<h1>How to Optimize Your Website for Voice Search & AI Assistants</h1><p>Voice search is quickly changing how people find information online thanks to the emergence of AI-powered voice assistants like Siri, Alexa, and Google Assistant.</p>",
    blocks: [
      {
        id: "v-p1",
        type: "paragraph",
        text: "Voice search is quickly changing how people find information online thanks to the emergence of AI-powered voice assistants like Siri, Alexa, and Google Assistant. To remain competitive in the digital market, businesses need to adjust to this change by making their websites voice search-friendly."
      },
      {
        id: "v-h2-why",
        type: "h2",
        text: "Why Voice Search Optimization Matters"
      },
      {
        id: "v-p2",
        type: "paragraph",
        text: "Voice search is expanding quickly; in the near future, voice searches are predicted to account for more than 50% of all online searches. Businesses must adjust since consumers now depend on voice assistants for instantaneous, hands-free information access."
      },
      {
        id: "v-h2-benefits",
        type: "h2",
        text: "Key Benefits of Optimizing for Voice Search"
      },
      {
        id: "v-ul-benefits",
        type: "bullet_list",
        items: [
          "Increased Visibility: Ranking for voice search queries means more exposure to potential customers.",
          "Better User Experience: Voice search optimization improves site navigation and usability.",
          "Higher Conversion Rates: Users conducting voice searches are often closer to making a purchase."
        ]
      },
      {
        id: "v-h2-1",
        type: "h2",
        text: "1. Focus on Conversational Keywords & Natural Language"
      },
      {
        id: "v-ul-1",
        type: "bullet_list",
        items: [
          "Employ Long-Tail Keywords: Focus on organic, sentence-like questions, such as \"Where can I buy organic coffee near me?\"",
          "Use Phrases Based on Questions: Optimize your content using \"who,\" \"what,\" \"where,\" \"when,\" and \"how\" queries.",
          "Use Google's \"People Also Ask\" function: Include frequently asked questions in your writing."
        ]
      },
      {
        id: "v-h2-2",
        type: "h2",
        text: "2. Improve Local SEO for Voice Search"
      },
      {
        id: "v-ul-2",
        type: "bullet_list",
        items: [
          "Claim Your Google My Business Listing: Ensure your company's name, address, and phone number (NAP) are up to date.",
          "Employ Local Keywords: Incorporate location-specific phrases, such as \"best IT services in New York.\"",
          "Promote Customer Reviews: Positive reviews increase credibility and improve voice search rankings."
        ]
      },
      {
        id: "v-h2-3",
        type: "h2",
        text: "3. Optimize for Featured Snippets"
      },
      {
        id: "v-ul-3",
        type: "bullet_list",
        items: [
          "Answer Questions Directly: Provide clear, concise answers in your content.",
          "Use Structured Data (Schema Markup): Help search engines understand and display your content effectively.",
          "Break Content into Bullets & Lists: Voice search results often come from well-structured content."
        ]
      },
      {
        id: "v-h2-4",
        type: "h2",
        text: "4. Improve Website Speed & Mobile-Friendliness"
      },
      {
        id: "v-ul-4",
        type: "bullet_list",
        items: [
          "Use a Lightweight Theme: Avoid heavy plugins and bloated code.",
          "Optimize Images: Compress images to reduce load time.",
          "Enable Caching & Minify Code: Improve site performance with caching and minification tools."
        ]
      },
      {
        id: "v-h2-5",
        type: "h2",
        text: "5. Utilize Structured Data & Schema Markup"
      },
      {
        id: "v-ul-5",
        type: "bullet_list",
        items: [
          "Use FAQ Schema: Enhance visibility for commonly asked questions.",
          "Implement Local Business Schema: Improve local SEO presence.",
          "Add Product & Service Schema: Showcase your offerings effectively in search results."
        ]
      },
      {
        id: "v-h2-6",
        type: "h2",
        text: "6. Optimize Content for Voice Search Readability"
      },
      {
        id: "v-ul-6",
        type: "bullet_list",
        items: [
          "Write in a Conversational Tone: Avoid complex jargon.",
          "Use Short Sentences & Paragraphs: Ensure content is easy to digest.",
          "Add a Q&A Section: Address common customer inquiries directly."
        ]
      },
      {
        id: "v-h2-7",
        type: "h2",
        text: "7. Leverage AI and Chatbots for Better Engagement"
      },
      {
        id: "v-ul-7",
        type: "bullet_list",
        items: [
          "Provide Instant Answers: AI chatbots offer quick responses to customer queries.",
          "Improve Customer Service: AI reduces response time and enhances interactions.",
          "Collect Valuable Data: Gain insights for better voice search optimization."
        ]
      },
      {
        id: "v-h2-final",
        type: "h2",
        text: "Final Thoughts"
      },
      {
        id: "v-p-final1",
        type: "paragraph",
        text: "It is now essential to optimize your website for voice search as AI and voice search technologies advance. Businesses can increase their visibility and maintain their competitive edge in the digital era by concentrating on natural language, mobile optimization, structured data, and local SEO."
      },
      {
        id: "v-p-final2",
        type: "paragraph",
        text: "Are you prepared to add voice search functionality to your website? Put these tactics into practice right now to make sure that both voice search users and AI assistants can find your company with ease!"
      }
    ]
  },
  {
    id: "web-app-trends",
    title: "The Future of Web/App Development: Trends to Watch in 2025",
    category: "IT Solutions",
    date: "March 26, 2025",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    slug: "the-future-of-web-app-development-trends-to-watch-in-2025",
    summary: "Web and app development is evolving rapidly. As we approach 2025, new trends are shaping the industry. At CityScene Global, we stay ahead of these changes to provide cutting-edge solutions for businesses.",
    author: "Vishwambhar Singh",
    authorAvatar: "/assets/images/author-vishwambhar.png",
    authorRole: "Senior Tech Lead & Solution Architect",
    authorBio: "Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.",
    ctaHeading: "Ready to Transform Your Digital Presence?",
    ctaDescription: "CityScene Global leads the way in web and app development, creating high-performance, user-centric solutions tailored for 2025 and beyond.",
    ctaButtonText: "Transform Your Digital Presence Today",
    ctaButtonLink: "/contact",
    seoTitle: "The Future of Web/App Development: Trends to Watch in 2025 | CityScene",
    seoDescription: "Discover top 2025 web and mobile development trends including AI integration, PWAs, WebAssembly, low-code, VUIs, serverless, Web3, and sustainable dev.",
    content: "<h1>The Future of Web/App Development: Trends to Watch in 2025</h1><p>Web and app development is evolving rapidly. As we approach 2025, new trends are shaping the industry.</p>",
    blocks: [
      {
        id: "w-p1",
        type: "paragraph",
        text: "Web and app development is evolving rapidly. As we approach 2025, new trends are shaping the industry. At CityScene Global, we stay ahead of these changes to provide cutting-edge solutions for businesses. Here are the top trends driving web and app development in 2025."
      },
      {
        id: "w-h2-ai",
        type: "h2",
        text: "AI-Driven Development"
      },
      {
        id: "w-ul-ai",
        type: "bullet_list",
        items: [
          "AI-powered tools automate coding, testing, and bug detection.",
          "Personalized user experiences through AI-driven interfaces.",
          "Enhanced efficiency with tools like GitHub Copilot and predictive analytics."
        ]
      },
      {
        id: "w-h2-pwa",
        type: "h2",
        text: "Progressive Web Apps (PWAs)"
      },
      {
        id: "w-ul-pwa",
        type: "bullet_list",
        items: [
          "PWAs combine mobile app and web functionalities.",
          "Fast loading, offline functionality, and push notifications.",
          "Cost-effective and accessible across platforms."
        ]
      },
      {
        id: "w-h2-wasm",
        type: "h2",
        text: "WebAssembly (Wasm)"
      },
      {
        id: "w-ul-wasm",
        type: "bullet_list",
        items: [
          "Enables high-performance web applications.",
          "Runs code at near-native speed in browsers.",
          "Ideal for gaming, video editing, and data-intensive applications."
        ]
      },
      {
        id: "w-h2-lowcode",
        type: "h2",
        text: "Low-Code/No-Code Development"
      },
      {
        id: "w-ul-lowcode",
        type: "bullet_list",
        items: [
          "Accelerates app development with drag-and-drop interfaces.",
          "Reduces development costs and time-to-market.",
          "Integrates with AI, APIs, and cloud services."
        ]
      },
      {
        id: "w-h2-vui",
        type: "h2",
        text: "Voice User Interfaces (VUIs)"
      },
      {
        id: "w-ul-vui",
        type: "bullet_list",
        items: [
          "Growing demand for voice-activated interactions.",
          "Enhances accessibility and hands-free usage.",
          "Optimized for smart devices and AI assistants."
        ]
      },
      {
        id: "w-h2-serverless",
        type: "h2",
        text: "Serverless Architecture"
      },
      {
        id: "w-ul-serverless",
        type: "bullet_list",
        items: [
          "Scalable applications without server management.",
          "Reduces infrastructure costs and maintenance.",
          "Supports dynamic workloads with cloud-based solutions."
        ]
      },
      {
        id: "w-h2-web3",
        type: "h2",
        text: "Web3 & Decentralized Applications (dApps)"
      },
      {
        id: "w-ul-web3",
        type: "bullet_list",
        items: [
          "Blockchain-powered, user-centric internet applications.",
          "Enhances privacy, security, and data ownership.",
          "Supports peer-to-peer transactions and tokenized assets."
        ]
      },
      {
        id: "w-h2-sustainable",
        type: "h2",
        text: "Sustainable Development Practices"
      },
      {
        id: "w-ul-sustainable",
        type: "bullet_list",
        items: [
          "Eco-friendly coding and energy-efficient hosting.",
          "Optimized code to reduce resource consumption.",
          "Aligns with corporate sustainability goals."
        ]
      },
      {
        id: "w-h2-why",
        type: "h2",
        text: "Why Choose CityScene Global?"
      },
      {
        id: "w-p-why",
        type: "paragraph",
        text: "CityScene Global leads the way in web and app development, integrating these trends to create high-performance, user-centric solutions. Whether you need a scalable app, AI-powered website, or decentralized application, we have the expertise to bring your vision to life."
      }
    ]
  },
  {
    id: "ai-work-efficiency",
    title: "How Artificial Intelligence Can Uplift Your Work Efficiency — Make Your Work Easy with CityScene Global",
    category: "IT Solutions",
    date: "November 24, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    slug: "how-artificial-intelligence-can-uplift-your-work-efficiency-make-your-work-easy-with-cityscene-global",
    summary: "In today's fast-paced digital era, organisations are constantly seeking new ways to enhance productivity and streamline operations. Discover how AI can uplift your work efficiency with CityScene Global.",
    author: "Vishwambhar Singh",
    authorAvatar: "/assets/images/author-vishwambhar.png",
    authorRole: "Senior Tech Lead & Solution Architect",
    authorBio: "Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.",
    ctaHeading: "Ready to Elevate Your Work Efficiency?",
    ctaDescription: "Transform your business operations with CityScene Global's AI-driven IT solutions and intelligent automation modules.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact",
    seoTitle: "How AI Can Uplift Your Work Efficiency | CityScene Global",
    seoDescription: "Discover how AI-powered HR management, task automation, data analytics, and predictive intelligence make your work easy.",
    content: "<h1>How Artificial Intelligence Can Uplift Your Work Efficiency — Make Your Work Easy with CityScene Global</h1><p>In today's fast-paced digital era, organisations are constantly seeking new ways to enhance productivity, optimise workflows, and streamline their operations.</p>",
    blocks: [
      {
        id: "e-p1",
        type: "paragraph",
        text: "In today's fast-paced digital era, organisations are constantly seeking new ways to enhance productivity, optimise workflows, and streamline their operations. Artificial Intelligence (AI) has emerged as a powerful solution to transform the way businesses function, helping them save time, reduce errors, and make smarter decisions."
      },
      {
        id: "e-p2",
        type: "paragraph",
        text: "At CityScene Global, Jaipur's leading IT and digital innovation company, we believe that AI isn't just about advanced technology; it's about creating a smarter workplace that helps people focus on what truly matters: creativity, strategy, and growth. Let's explore how Artificial Intelligence can uplift your work efficiency and make your day-to-day business operations smoother and more effective."
      },
      {
        id: "e-h2-1",
        type: "h2",
        text: "1. Smart HR Management — Simplify Salary, Attendance, and Employee Records"
      },
      {
        id: "e-p3",
        type: "paragraph",
        text: "Human Resources (HR) is the backbone of any organisation, but it often involves repetitive and time-consuming tasks like salary processing, attendance tracking, and record maintenance. AI helps automate these functions seamlessly."
      },
      {
        id: "e-p4",
        type: "paragraph",
        text: "With AI-powered HR management tools, companies can automatically track attendance using biometric systems or face recognition, ensuring accurate time logs. Salary calculations and deductions are managed intelligently, eliminating the need for manual checks or spreadsheets."
      },
      {
        id: "e-p5",
        type: "paragraph",
        text: "Furthermore, AI helps maintain employee records with precision. It can alert HR teams about contract renewals, probation periods, or compliance updates. Predictive analytics can even identify trends such as employee attrition risks or productivity patterns, allowing organisations to take proactive measures."
      },
      {
        id: "e-p6",
        type: "paragraph",
        text: "CityScene Global integrates AI-driven HR modules tailored for your company's needs. Whether you're a small business or an enterprise, our AI-powered HR automation can help you reduce workload, improve accuracy, and enhance employee satisfaction."
      },
      {
        id: "e-h2-2",
        type: "h2",
        text: "2. Task Automation — Streamline Your Routine Work"
      },
      {
        id: "e-p7",
        type: "paragraph",
        text: "Routine and repetitive tasks often consume a large portion of an employee's time, leaving less room for innovation and creativity. Imagine if these routine processes could be handled automatically, allowing your team to focus on what really drives growth."
      },
      {
        id: "e-p8",
        type: "paragraph",
        text: "With CityScene Global's AI and automation solutions, you can convert manual workflows into smooth, intelligent systems. For instance:"
      },
      {
        id: "e-ul-1",
        type: "bullet_list",
        items: [
          "Automated email responses can handle customer inquiries.",
          "AI-driven task schedulers can assign and monitor progress automatically.",
          "Document management systems can classify and archive files intelligently.",
          "Inventory and billing can be tracked in real time without manual input."
        ]
      },
      {
        id: "e-p9",
        type: "paragraph",
        text: "Automation ensures consistency and minimises human error. The result? A faster, smarter workflow that increases overall productivity. Our experts specialise in integrating AI-driven task automation tools that perfectly fit your existing systems, transforming your everyday operations into a seamless and efficient process."
      },
      {
        id: "e-h2-3",
        type: "h2",
        text: "3. Data Understanding and Analysis — Make Smarter, Faster Decisions"
      },
      {
        id: "e-p10",
        type: "paragraph",
        text: "In the digital age, data is the new oil. But without proper analysis, raw data remains underutilised. Artificial Intelligence enables businesses to make sense of vast data sets, offering clear insights that help in better decision-making."
      },
      {
        id: "e-p11",
        type: "paragraph",
        text: "AI algorithms can analyse sales trends, customer behaviour, and operational performance, presenting the information in visual dashboards that offer a one-glance understanding. This not only saves hours of manual analysis but also helps identify opportunities and risks instantly."
      },
      {
        id: "e-p12",
        type: "paragraph",
        text: "For instance, an AI tool can highlight which products are selling best, predict customer demand, and identify operational bottlenecks to help you make informed, data-backed strategic decisions."
      },
      {
        id: "e-h2-4",
        type: "h2",
        text: "4. Predictive Intelligence & Customer Engagement"
      },
      {
        id: "e-p13",
        type: "paragraph",
        text: "AI-driven virtual assistants and smart chatbots handle customer queries 24/7, offering instant answers and personalized user support. By learning from past interactions, AI predicts customer expectations and delivers customized recommendations that elevate customer satisfaction."
      },
      {
        id: "e-h2-5",
        type: "h2",
        text: "5. Enhanced Cybersecurity & Risk Management"
      },
      {
        id: "e-p14",
        type: "paragraph",
        text: "Modern workplaces require robust digital security. AI continuously scans network traffic, detects unauthorized access anomalies, and responds to cybersecurity threats in real time, safeguarding sensitive company and employee data."
      },
      {
        id: "e-h2-conc",
        type: "h2",
        text: "Make Your Work Easy with CityScene Global"
      },
      {
        id: "e-p15",
        type: "paragraph",
        text: "Artificial Intelligence is no longer just a futuristic concept—it is a practical business tool designed to maximize productivity and eliminate operational friction. Partner with CityScene Global to integrate tailored AI workflows, smart HR modules, and automated data solutions today."
      }
    ]
  },
  {
    id: "app-increase-sales",
    title: "How an App Can Increase Your Sales",
    category: "IT Solutions",
    date: "March 11, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    slug: "how-an-app-can-increase-your-sales",
    summary: "In today's competitive digital landscape, having just a website is no longer enough. Discover how an eCommerce mobile app can increase sales, improve customer retention, and grow your online business.",
    author: "Vishwambhar Singh",
    authorAvatar: "/assets/images/author-vishwambhar.png",
    authorRole: "Senior Tech Lead & Solution Architect",
    authorBio: "Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.",
    ctaHeading: "Ready to Build Your eCommerce Mobile App?",
    ctaDescription: "CityScene Global can help you build a powerful, scalable, and revenue-generating mobile app tailored to your business needs.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact",
    seoTitle: "How an App Can Increase Your Sales | CityScene Global",
    seoDescription: "Discover how an eCommerce mobile app increases sales, improves customer retention, and grows your online business with CityScene Global.",
    content: "<h1>How an App Can Increase Your Sales</h1><p>In today's competitive digital landscape, having just a website is no longer enough. If you are running an eCommerce business, a mobile app can significantly increase your sales.</p>",
    blocks: [
      {
        id: "s-p1",
        type: "paragraph",
        text: "In today's competitive digital landscape, having just a website is no longer enough. If you are running an eCommerce business, a mobile app can significantly increase your sales, improve customer retention, and strengthen your brand presence."
      },
      {
        id: "s-p2",
        type: "paragraph",
        text: "At CityScene Global, we have seen how businesses transform their revenue streams by investing in custom eCommerce app development."
      },
      {
        id: "s-h2-why",
        type: "h2",
        text: "Why an eCommerce Mobile App Is Essential in 2026"
      },
      {
        id: "s-p3",
        type: "paragraph",
        text: "With millions of users shopping via smartphones, mobile commerce is growing rapidly. Apps provide faster and better experiences than websites."
      },
      {
        id: "s-h2-1",
        type: "h2",
        text: "1. Faster Shopping Experience"
      },
      {
        id: "s-p4",
        type: "paragraph",
        text: "A mobile app loads faster and ensures smooth navigation, reducing cart abandonment."
      },
      {
        id: "s-h2-2",
        type: "h2",
        text: "2. Personalized Shopping Experience"
      },
      {
        id: "s-p5",
        type: "paragraph",
        text: "Apps allow personalized recommendations and targeted offers, improving conversions."
      },
      {
        id: "s-h2-3",
        type: "h2",
        text: "3. Push Notifications – A Powerful Marketing Channel"
      },
      {
        id: "s-p6",
        type: "paragraph",
        text: "You can instantly inform customers about:"
      },
      {
        id: "s-ul-1",
        type: "bullet_list",
        items: [
          "Flash sales",
          "New product launches",
          "Festive offers",
          "Limited-time discounts"
        ]
      },
      {
        id: "s-p7",
        type: "paragraph",
        text: "This drives traffic and boosts revenue."
      },
      {
        id: "s-h2-4",
        type: "h2",
        text: "4. Improved Customer Loyalty"
      },
      {
        id: "s-p8",
        type: "paragraph",
        text: "Features like rewards and referral programs increase repeat purchases."
      },
      {
        id: "s-h2-5",
        type: "h2",
        text: "5. Secure and Multiple Payment Options"
      },
      {
        id: "s-ul-2",
        type: "bullet_list",
        items: [
          "UPI",
          "Credit / Debit Cards",
          "Net Banking",
          "Wallets",
          "Apple Pay",
          "Google Pay"
        ]
      },
      {
        id: "s-h2-types",
        type: "h2",
        text: "What Are the Main Types of eCommerce Apps?"
      },
      {
        id: "s-h2-b2c",
        type: "h2",
        text: "1. B2C (Business to Consumer)"
      },
      {
        id: "s-ul-b2c",
        type: "bullet_list",
        items: [
          "Product filtering",
          "Easy checkout",
          "Order tracking",
          "Customer reviews"
        ]
      },
      {
        id: "s-h2-b2b",
        type: "h2",
        text: "2. B2B (Business to Business)"
      },
      {
        id: "s-ul-b2b",
        type: "bullet_list",
        items: [
          "Bulk pricing",
          "MOQ (Minimum Order Quantity)",
          "Inventory management",
          "Automated invoicing"
        ]
      },
      {
        id: "s-h2-c2c",
        type: "h2",
        text: "3. C2C (Consumer to Consumer)"
      },
      {
        id: "s-ul-c2c",
        type: "bullet_list",
        items: [
          "Marketplace model",
          "Commission-based earnings"
        ]
      },
      {
        id: "s-h2-seo",
        type: "h2",
        text: "How an eCommerce App Improves SEO"
      },
      {
        id: "s-ul-seo",
        type: "bullet_list",
        items: [
          "Increased brand searches",
          "Better engagement",
          "App indexing"
        ]
      },
      {
        id: "s-h2-features",
        type: "h2",
        text: "Key Features That Increase Sales"
      },
      {
        id: "s-ul-features",
        type: "bullet_list",
        items: [
          "Advanced search",
          "AI recommendations",
          "Wishlist",
          "One-click checkout",
          "Order tracking",
          "Secure payments",
          "Multi-language support",
          "Support chat"
        ]
      },
      {
        id: "s-h2-whycs",
        type: "h2",
        text: "Why Choose CityScene Global?"
      },
      {
        id: "s-ul-whycs",
        type: "bullet_list",
        items: [
          "Custom app development",
          "Android & iOS apps",
          "UI/UX design",
          "SEO & marketing",
          "AI integrations"
        ]
      },
      {
        id: "s-h2-final",
        type: "h2",
        text: "Final Thoughts"
      },
      {
        id: "s-p-final",
        type: "paragraph",
        text: "Investing in a mobile app is a powerful growth strategy for any eCommerce business. CityScene Global can help you build a powerful, scalable, and revenue-generating mobile app tailored to your business needs."
      }
    ]
  }
];

export const initialServices = [
  {
    id: "custom-software-development",
    title: "Custom\nSoftware\nDevelopment",
    displayTitle: "Custom Software Development Solutions",
    path: "/services/custom-software-development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "High-performance custom software development solutions tailored to meet the unique operational needs of modern enterprise businesses.",
    topicName: "Custom Software",
    heroDesc: "At CityScene Global, we specialise in delivering high-performance, custom software development solutions tailored to meet the unique needs of modern businesses. With a strong foundation in building scalable, secure, and user-friendly applications, we serve B2B, B2C, manufacturing, healthcare, retail, banking, education, and many other industries.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    introP1: "Our expert developers analyse your challenges, design efficient workflows, and create powerful software that works seamlessly across web, desktop, and mobile platforms.",
    introP2: "Based in Jaipur with extended services in Dubai, we offer end-to-end development—from planning and design to deployment, integration, and expert training—ensuring reliable, cost-effective, and future-ready solutions for your business.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "At CityScene Global, we create innovative and high-performing digital solutions designed to enhance security, efficiency, and business growth. As a reliable provider of custom software development in Jaipur, we prioritise user-centric design, robust development, and long-term dependability.",
    whyChooseCards: [
      { title: "Client-First Approach", desc: "We understand your goals and deliver solutions that truly solve business challenges." },
      { title: "Cost-Effective & Value-Driven", desc: "Quality software at competitive pricing without compromising performance or security." },
      { title: "Advanced Technology Expertise", desc: "Modern tools, automation, AI, cloud, and frameworks for future-proof solutions." },
      { title: "Dedicated Expert Team", desc: "Highly skilled professionals with strong technical and industry experience." },
      { title: "Proven Track Record", desc: "Trusted by clients across B2B, B2C, retail, finance, healthcare, education, and manufacturing." },
      { title: "Commitment to Quality & Security", desc: "Every solution is thoroughly tested, secure, and built for long-term reliability." }
    ],
    expertiseTitle: "Expertise That Powers Innovation",
    expertiseSubtitle: "We combine engineering excellence, modern technology, and industry understanding to build intelligent, scalable, and future-ready software systems that evolve with your business.",
    expertiseItems: [
      { title: "RPA (Robotic Process Automation)", desc: "Use intelligent software robots to automate repetitive, high-volume tasks, reduce manual effort, improve accuracy, and accelerate operational efficiency across business workflows." },
      { title: "Internet of Things (IoT)", desc: "Build connected ecosystems that collect real-time data from devices, enable smart monitoring, predictive insights, and data-driven decision-making." },
      { title: "Artificial Intelligence Solutions", desc: "Develop AI-powered applications capable of analysing images, videos, and patterns to enhance automation, intelligence, and business productivity." },
      { title: "Mobile Application Development", desc: "Design and develop high-performance mobile applications that are scalable, secure, brand-focused, and tailored to your users and industry requirements." },
      { title: "Blockchain Solutions", desc: "Create secure, transparent, and tamper-proof blockchain platforms that automate processes, strengthen digital trust, and enable decentralised systems." }
    ],
    softwareTypesTitle: "Explore Our Custom Software Development Expertise",
    softwareTypesSubtitle: "Specialized enterprise software engines built specifically for operational dominance.",
    softwareTypesItems: [
      { title: "CRM Software Development", desc: "Custom-built CRM systems that help businesses manage customer interactions, automate marketing workflows, simplify sales tracking, and enhance customer support." },
      { title: "Enterprise Software Development", desc: "Robust and scalable enterprise software designed to streamline operations, integrate workflows, and boost productivity." },
      { title: "Logistics & Supply Chain Software", desc: "Advanced logistics solutions for real-time tracking, inventory optimisation, warehouse management, and route planning." },
      { title: "HRMS Software Development", desc: "Custom HRMS platforms covering payroll, attendance, employee management, performance tracking, and workforce automation." }
    ],
    processTitle: null,
    processSteps: [],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find answers to the most common questions about our custom software development services, enterprise applications, cloud solutions, and database development.",
    faqs: [
      { q: "What is custom software development?", a: "It means building software specifically designed around your business's exact workflow, instead of using generic off-the-shelf tools. Custom software offers greater flexibility, improved efficiency, enhanced security, and the ability to scale as your business grows." },
      { q: "Is CityScene Global the best software development company in Jaipur for enterprise solutions?", a: "CityScene Global develops enterprise-grade software solutions, including ERP, CRM, HRMS, logistics, inventory, finance, and workflow automation systems tailored to your organization's operational requirements, scalability, and long-term growth." },
      { q: "Do you offer cloud application development?", a: "Yes. We build secure, scalable cloud-based applications that can be accessed from anywhere while reducing dependency on physical infrastructure. Our cloud solutions improve collaboration, performance, security, and business continuity." },
      { q: "Can you build a custom database for our business?", a: "Yes. Our database development services include designing, developing, and optimizing secure, high-performance databases tailored to your business processes. We ensure reliable data storage, fast retrieval, scalability, and seamless integration with your existing software systems." }
    ],
    ctaHeading: "Ready to Build Your Custom Software Solution?",
    ctaDescription: "Talk to our senior software architects at CityScene Global to design a secure, scalable, and high-performance application.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
  },
  {
    id: "mobile-app-development",
    title: "Mobile App\nDevelopment",
    displayTitle: "Mobile App Development Services",
    path: "/services/mobile-app-development",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Innovative, high-performance mobile applications built for iOS & Android that engage users and drive business growth across global markets.",
    topicName: "Mobile App",
    heroDesc: "We build innovative, high-performance mobile applications that engage users, adapt to behavioural trends, and drive measurable business growth across global markets.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    introP1: "At CityScene Global, we empower businesses to grow digitally by transforming powerful ideas into seamless, high-performance mobile applications. As a trusted mobile app development company in India and Dubai, we craft user-focused apps that enhance engagement, streamline operations, and strengthen long-term business growth.",
    introP2: "Whether you're a startup or an established enterprise, our expert team delivers customised native and cross-platform mobile solutions that are fast, secure, scalable, and future-ready—from concept to deployment.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We design and develop mobile applications that combine performance, usability, security, and scalability—helping businesses stay ahead in today's mobile-first world.",
    whyChooseCards: [
      { title: "iOS & Android Expertise", desc: "High-quality applications for iOS, Android, Apple Watch, and Apple TV. Built to meet platform-specific standards and performance benchmarks." },
      { title: "Cross-Platform Excellence", desc: "React Native and Flutter apps with native performance and faster time-to-market. Ideal for businesses seeking speed without compromising quality." },
      { title: "Secure App Architecture", desc: "Enterprise-grade security, data protection, and compliance. Designed to safeguard user data and meet regulatory requirements." },
      { title: "User-Centric Design", desc: "Intuitive UI/UX crafted for engagement, retention, and conversion. Focused on delivering seamless and enjoyable user experiences." },
      { title: "Technology Consulting", desc: "Expert guidance on frameworks, architecture, and long-term scalability. Helping you make informed technical decisions from day one." },
      { title: "Global Delivery", desc: "Apps designed for global markets, performance, and evolving user behaviour. Optimised for scale, localisation, and international audiences." }
    ],
    expertiseTitle: "Mobile App Development Expertise",
    expertiseSubtitle: "We build mobile applications that deliver performance, scalability, and long-term business impact across industries.",
    expertiseItems: [
      { title: "iOS App Development", desc: "Feature-rich apps for iPhone, iPad, Apple Watch, and Apple TV. Designed to align with Apple's ecosystem." },
      { title: "Android App Development", desc: "High-performance Android applications with wide device compatibility. Optimised for speed and stability." },
      { title: "React Native & Flutter", desc: "Cost-effective cross-platform apps with consistent native performance. Faster development cycles." },
      { title: "IoT App Development", desc: "Smart apps connecting devices, sensors, and real-time data. Enabling automation and insights." },
      { title: "Upgradation & Migration", desc: "Seamless upgrades and secure migrations with zero downtime. Improved reliability and performance." }
    ],
    processTitle: "Our App Development Process",
    processSteps: [
      { title: "Consultation", desc: "Idea validation, strategy planning, and technical consulting. Clear roadmap definition." },
      { title: "UI / UX Design", desc: "Modern, intuitive interfaces designed for engagement. Focused on user journeys." },
      { title: "Development", desc: "Custom-built, scalable mobile application development. Clean and maintainable code." },
      { title: "Testing & QA", desc: "Security, performance, and compatibility testing. Ensuring a bug-free launch." },
      { title: "Deployment", desc: "Seamless Play Store and App Store launches. Full submission support." },
      { title: "Maintenance", desc: "Continuous updates, enhancements, and long-term support. Keeping apps competitive." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find answers to common questions about our mobile app development services, cross-platform solutions, enterprise applications, and post-launch support.",
    faqs: [
      { q: "Who is the best app development company in Jaipur for startups?", a: "CityScene Global partners with startups to transform innovative ideas into high-quality mobile applications. We help validate your concept, design intuitive user experiences, and build scalable apps within realistic budgets and development timelines." },
      { q: "Do you build both Android and iOS apps?", a: "Yes. We develop native Android and iOS applications as well as cross-platform mobile apps using Flutter and React Native, allowing businesses to reach users on multiple platforms with exceptional performance and user experience." },
      { q: "Do you provide support after the app is launched?", a: "Yes. Our post-launch support includes bug fixes, security updates, performance monitoring, feature enhancements, compatibility updates for new Android and iOS versions, and ongoing technical assistance." },
      { q: "Can you build enterprise app solutions for large businesses?", a: "Yes. We build enterprise-grade mobile applications with advanced security, cloud integration, API connectivity, workflow automation, and scalable architecture to meet the complex requirements of large organizations and growing enterprises." }
    ],
    ctaHeading: "Ready to Build Your Mobile App?",
    ctaDescription: "Talk to our mobile app architects at CityScene Global to build a fast, intuitive, and high-converting iOS or Android application.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
  },
  {
    id: "web-development",
    title: "Web\nDevelopment",
    displayTitle: "Web Development Services",
    path: "/services/web-development",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Modern, scalable, and responsive web development solutions designed to build strong digital foundations and drive measurable business growth.",
    topicName: "Web",
    heroDesc: "Modern, scalable, and responsive web development solutions designed to build strong digital foundations and drive measurable business growth.",
    heroImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    introP1: "CityScene Global is a leading website development company in India, delivering powerful, user-focused digital solutions that help businesses build a strong online presence. We work with B2B, B2C, and D2C brands worldwide, creating websites that are visually engaging, highly functional, and easy to navigate.",
    introP2: "As a trusted web development company in Jaipur, we design and develop custom websites including eCommerce platforms, business portals, CRM-based systems, and fully mobile-responsive websites that support long-term brand growth.",
    whyChooseTitle: "Why Choose Us?",
    whyChooseSubtitle: "We build high-performance websites that combine design, usability, security, and scalability to support real business objectives.",
    whyChooseCards: [
      { title: "Custom Design", desc: "Tailored UI/UX designs that reflect your brand identity and business vision." },
      { title: "Clean & Scalable Code", desc: "Well-structured, maintainable code optimised for long-term performance." },
      { title: "High Performance", desc: "Fast-loading websites delivering smooth and seamless user experiences." },
      { title: "Secure & Reliable", desc: "Strong security practices ensuring data protection and system stability." },
      { title: "SEO-Friendly Structure", desc: "Search-optimised websites designed to improve visibility and rankings." },
      { title: "Growth-Ready Solutions", desc: "Flexible architectures that scale easily as your business grows." }
    ],
    expertiseTitle: "Web Development Expertise",
    expertiseSubtitle: "Result-oriented web development services built using modern technologies and proven development practices.",
    expertiseItems: [
      { title: "Frontend Development", desc: "Visually appealing and responsive interfaces using HTML, CSS, JavaScript, React, and more." },
      { title: "Backend Development", desc: "Secure server-side architecture using Node.js, PHP, Python, and modern frameworks." },
      { title: "Full Stack Development", desc: "End-to-end solutions seamlessly integrating frontend and backend technologies." },
      { title: "Database Management", desc: "Structured and secure databases ensuring smooth data handling and performance." },
      { title: "API Development & Integration", desc: "Reliable APIs enabling seamless system communication and third-party integrations." }
    ],
    processTitle: "Driving Digital Growth Through Web Development",
    processSteps: [
      { title: "Planning & Strategy", desc: "Understanding business goals and creating a clear development roadmap." },
      { title: "UI / UX Design", desc: "Designing intuitive layouts that enhance user engagement and navigation." },
      { title: "Development", desc: "Building secure, scalable, and high-performing web applications." },
      { title: "Testing & Optimisation", desc: "Ensuring performance, security, and compatibility across devices." },
      { title: "Deployment", desc: "Seamless hosting, launch, and environment configuration." },
      { title: "Support & Growth", desc: "Continuous support, updates, and scalability enhancements." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Get answers to the most common questions about our website development services, responsive design, CMS solutions, and post-launch support.",
    faqs: [
      { q: "What makes CityScene Global a top web development company in Jaipur?", a: "We focus on delivering fast, secure, and fully customized websites tailored to your business goals. Every website is built with responsive design, modern UI/UX, SEO best practices, and clean, scalable code instead of relying on generic templates." },
      { q: "Will my website be responsive on mobile devices?", a: "Yes. Every website we develop is fully responsive, ensuring it automatically adapts to smartphones, tablets, laptops, and desktop screens. This provides a seamless user experience across all devices." },
      { q: "Can I manage my own website content after launch?", a: "Yes. If you choose a CMS-based website, we provide complete training so you can easily update pages, blog posts, images, and other content without requiring technical knowledge or developer assistance." },
      { q: "Do you offer ongoing support after the website is live?", a: "Yes. We offer comprehensive website maintenance packages that include regular updates, security monitoring, performance optimization, backups, bug fixes, and dedicated technical support to keep your website running smoothly after launch." }
    ],
    ctaHeading: "Ready to Build Your Website?",
    ctaDescription: "Talk to our web architects at CityScene Global to build a fast, secure, and high-converting website.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    displayTitle: "UI/UX Design Services",
    path: "/services/ui-ux-design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    position: "bottom-left",
    shortDesc: "Crafting seamless, intuitive, and engaging digital experiences that connect brands with users and drive meaningful results.",
    topicName: "UI/UX Design",
    heroDesc: "Crafting seamless, intuitive, and engaging digital experiences that connect brands with users and drive meaningful results.",
    heroImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    introP1: "We create impactful digital experiences that extend beyond visuals and authentically represent your brand's identity. As a trusted UI/UX design company in India, we focus on intuitive, visually engaging, and goal-oriented digital solutions.",
    introP2: "Our approach blends creativity with functionality, ensuring every interface not only looks impressive but also performs effectively to support your business objectives and deliver measurable results.",
    whyChooseTitle: "Why Choose CityScene Global?",
    whyChooseSubtitle: "We design user-centric experiences that balance creativity, usability, and performance across digital platforms.",
    whyChooseCards: [
      { title: "User-Centric Approach", desc: "Designs driven by real user behaviour and interaction patterns. This ensures intuitive navigation and effortless user journeys." },
      { title: "Creative & Functional", desc: "Visually appealing designs that remain intuitive and practical. A perfect balance between aesthetics and usability." },
      { title: "Responsive Design", desc: "Optimised experiences across mobile, tablet, and desktop. Consistent performance on every screen size." },
      { title: "Prototyping & Testing", desc: "Wireframes and usability testing for reliable outcomes. Early validation reduces risk and development cost." },
      { title: "Brand-Aligned UI", desc: "Visual elements crafted to reflect brand identity. Maintaining consistency across all digital touchpoints." },
      { title: "Performance-Focused UX", desc: "Interfaces designed to improve engagement and conversions. UX decisions driven by measurable business goals." }
    ],
    whyChooseBottomText: "What truly sets CityScene Global apart is our ability to align design with business strategy. We build scalable, future-ready interfaces that evolve with your product while maintaining clarity, consistency, and performance.",
    expertiseTitle: "UI/UX Design Expertise",
    expertiseSubtitle: "Comprehensive UI/UX services focused on usability, clarity, accessibility, and business impact.",
    expertiseItems: [
      { title: "Wireframing & Prototyping", desc: "Interactive models using modern design tools. Helping stakeholders visualise ideas before development." },
      { title: "Visual & Interaction Design", desc: "Clean layouts with thoughtful micro-interactions. Enhancing usability while maintaining visual clarity." },
      { title: "User Research & IA", desc: "Understanding users and structuring information logically. Creating frictionless paths to key actions." },
      { title: "Accessibility & Design Systems", desc: "Inclusive designs with scalable component systems. Ensuring long-term consistency and ease of expansion." },
      { title: "UI/UX Audit & Optimisation", desc: "Refining existing interfaces for better engagement. Improving usability without disrupting workflows." }
    ],
    processTitle: "UI/UX Design Services That Drive Digital Growth",
    processSteps: [
      { title: "Research & Discovery", desc: "Understanding users, goals, and challenges. Building a strong foundation for design decisions." },
      { title: "User Journey Mapping", desc: "Designing seamless flows with minimal friction. Improving task completion and satisfaction." },
      { title: "Visual UI Design", desc: "High-fidelity interfaces aligned with brand identity. Creating trust through consistent visual language." },
      { title: "Prototyping & Validation", desc: "Testing ideas early to reduce risk. Ensuring designs meet real user expectations." },
      { title: "Testing & Optimisation", desc: "Ensuring usability across devices and browsers. Continuous refinement for optimal performance." },
      { title: "Post-Launch Enhancement", desc: "Continuous UX improvements based on feedback. Supporting long-term product success." }
    ],
    faqs: [],
    ctaHeading: "Ready to Elevate Your Product's UI/UX?",
    ctaDescription: "Talk to our senior UI/UX designers at CityScene Global to create intuitive, beautiful, and high-converting digital products.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
  },
  {
    id: "digital-marketing",
    title: "Digital\nMarketing",
    displayTitle: "Digital Marketing Services",
    path: "/services/digital-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    position: "top-right",
    shortDesc: "Boost Your Brand's Visibility, Engagement, and Growth with data-driven SEO, SEM, content, and social media campaigns.",
    topicName: "Digital Marketing",
    heroDesc: "Boost Your Brand's Visibility, Engagement, and Growth",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    introP1: "We deliver result-driven digital marketing services in India and Dubai to help businesses build a strong online presence and attract the right audience. From boosting brand visibility to increasing website traffic and generating quality leads, our digital marketing solutions are designed to support businesses at every stage of growth.",
    introP2: "Whether it's search engine optimisation, social media marketing, Google Ads, or complete online brand management, our expert team ensures your business connects with customers across digital platforms and stands out in competitive markets like Jaipur and Dubai.",
    whyChooseTitle: "Drive Growth and Revenue with Our Digital Marketing Services",
    whyChooseSubtitle: "Comprehensive, performance-driven digital marketing channels tailored to scale your brand online.",
    whyChooseCards: [
      { title: "Search Engine Optimisation (SEO)", desc: "Improve your website's visibility on search engines and attract high-quality organic traffic with our proven SEO services. We help your business rank higher, reach the right audience, and achieve long-term online growth." },
      { title: "Search Engine Marketing (SEM)", desc: "Promote your products and services instantly with result-focused search engine marketing campaigns. Our SEM strategies increase clicks, enquiries, and conversions effectively." },
      { title: "Content Marketing", desc: "Connect with your audience through engaging, keyword-focused content that builds trust and strengthens your online presence." },
      { title: "Email Marketing", desc: "Turn leads into loyal customers with well-planned email marketing campaigns that improve open rates and drive consistent conversions." },
      { title: "Influencer Marketing", desc: "Expand your brand reach by partnering with relevant influencers to build credibility and connect with new audiences organically." },
      { title: "Social Media Marketing", desc: "Grow your social media presence with data-driven strategies that encourage interaction and brand awareness across platforms." },
      { title: "Brand Marketing", desc: "Build a strong and recognisable brand identity that strengthens customer trust and creates lasting impressions." },
      { title: "Video Marketing", desc: "Tell your brand story through powerful video marketing solutions designed to capture attention and boost engagement." }
    ],
    expertiseTitle: "Digital Marketing Expertise",
    expertiseSubtitle: "Performance-driven strategies focused on visibility, engagement, and revenue.",
    expertiseItems: [
      { title: "SEO, SEM & Paid Advertising", desc: "Driving qualified traffic and measurable conversions." },
      { title: "Social Media & Influencer Marketing", desc: "Building engagement and brand loyalty." },
      { title: "Content & Email Marketing", desc: "Nurturing leads and strengthening trust." }
    ],
    processTitle: "Digital Marketing Services That Drive Digital Growth",
    processSteps: [
      { title: "Strategy & Research", desc: "Understanding audience behaviour and market opportunities." },
      { title: "Campaign Planning", desc: "Defining channels, budgets, and performance goals." },
      { title: "Execution & Optimisation", desc: "Launching campaigns and improving performance continuously." },
      { title: "Analytics & Reporting", desc: "Measuring results and refining strategies." }
    ],
    industriesTitle: "Industries",
    industriesSubtitle: "Developing specialized digital ecosystems that resonate with niche audiences and drive measurable commercial growth.",
    industries: [
      { num: "01/", title: "Renewable Energy", desc: "Awareness & lead generation. We help clean energy brands scale by educating the public on sustainability. Our data-driven funnels turn climate awareness into actionable commercial leads." },
      { num: "02/", title: "Real Estate", desc: "Location-focused SEO & paid campaigns. We capture high-intent buyers through hyper-local targeting and immersive digital tours. Our strategies bridge the gap between luxury listings and qualified prospects." },
      { num: "03/", title: "Food & Beverage", desc: "Social & influencer marketing. We leverage visual storytelling and creator partnerships to build cravings and brand loyalty. Our campaigns drive foot traffic to outlets while scaling your delivery presence." },
      { num: "04/", title: "NGO & Non-Profit", desc: "Awareness & donor engagement. We amplify your mission through emotional storytelling that resonates with global supporters. Our digital strategies focus on maximizing fundraising and community impact." },
      { num: "05/", title: "Automotive", desc: "Local search & video campaigns. We drive showroom traffic by targeting local buyers with high-definition video content. Our precision ads ensure your latest models are seen by the right demographics." },
      { num: "06/", title: "Financial Services", desc: "Trust-driven content & ads. We build credibility through educational content and security-focused digital positioning. Our approach simplifies complex products to build long-term trust with investors." },
      { num: "07/", title: "Retail & E-Com", desc: "SEO, paid ads & CRO. We optimize every touchpoint from the first click to the final checkout for maximum ROI. Our multi-channel strategies focus on repeat purchases and reducing abandoned carts." },
      { num: "08/", title: "Education", desc: "Enrolment-driven campaigns. We help institutions fill seats by targeting prospective students across social and search. Our funnel-based approach nurtures leads from initial inquiry to final enrollment." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find answers to common questions about our digital marketing services, including PPC advertising, social media marketing, content marketing, branding, and creative solutions.",
    faqs: [
      { q: "Do you offer PPC services in Jaipur?", a: "Yes. As a leading PPC company in Jaipur, we create and manage high-performing Google Ads and Facebook Ads campaigns that focus on generating qualified leads, maximizing ROI, and reaching the right audience through data-driven advertising strategies." },
      { q: "Can you handle social media marketing for my business?", a: "Yes. Our social media marketing services include strategy development, content planning, creative design, paid advertising, audience engagement, and campaign management across Instagram, Facebook, LinkedIn, and other major social platforms." },
      { q: "Do you provide email marketing and content marketing services?", a: "Yes. We offer professional email marketing campaigns along with content marketing services, including SEO-focused blog writing, website content, newsletters, and marketing copy designed to attract, engage, and retain customers." },
      { q: "Do you offer graphic design and branding services?", a: "Yes. Our creative team provides graphic design, logo design, branding, advertising creatives, promotional videos, social media graphics, and complete brand identity solutions to help businesses establish a strong and consistent market presence." }
    ],
    ctaHeading: "Ready to Scale Your Brand Online?",
    ctaDescription: "Talk to our digital marketing specialists at CityScene Global to create high-ROI SEO, SEM, and social media campaigns.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
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
    shortDesc: "Build secure, transparent, and decentralised digital solutions with our professional Blockchain Development services.",
    topicName: "Blockchain",
    heroDesc: "Build secure, transparent, and decentralised digital solutions with our professional Blockchain Development services.",
    heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    introTitle: "About Blockchain Development",
    introP1: "Blockchain technology is transforming the way businesses manage data, transactions, security, and digital ownership. At CityScene Global, we develop secure and scalable blockchain solutions designed to improve transparency, efficiency, and trust across digital ecosystems.",
    introP2: "Our blockchain development services help businesses build decentralised applications, secure transaction systems, smart contracts, and custom blockchain-based platforms tailored to their specific requirements. We focus on practical blockchain implementation that delivers real business value while ensuring security, scalability, and long-term adaptability.",
    whyChooseTitle: "Why Choose CityScene Global?",
    whyChooseSubtitle: "We combine blockchain expertise with practical business understanding to develop secure, scalable, and future-ready decentralised solutions.",
    whyChooseCards: [
      { title: "Secure & Reliable Solutions", desc: "Blockchain systems designed with security, transparency, and data integrity as core priorities." },
      { title: "Decentralised Architecture", desc: "Reducing dependency on centralised systems and enabling transparent, distributed digital ecosystems." },
      { title: "Smart Contract Development", desc: "Building automated and secure smart contracts that execute transactions based on predefined conditions." },
      { title: "Scalable Blockchain Systems", desc: "Developing blockchain solutions that can adapt and grow alongside your business requirements." },
      { title: "Custom Blockchain Development", desc: "Creating tailored blockchain applications based on your industry, business model, and technical needs." },
      { title: "End-to-End Support", desc: "Supporting the complete blockchain development lifecycle from strategy and architecture to deployment and optimisation." }
    ],
    expertiseTitle: "Blockchain Development Expertise",
    expertiseSubtitle: "Building secure, transparent, and decentralised digital solutions for modern businesses.",
    expertiseItems: [
      { title: "Smart Contract Development", desc: "Secure automated agreements designed to execute predefined actions without unnecessary manual intervention." },
      { title: "Decentralised Applications", desc: "Building blockchain-powered applications that operate across decentralised networks." },
      { title: "Private & Public Blockchain Solutions", desc: "Developing solutions based on the right blockchain architecture for the specific business use case." },
      { title: "Cryptocurrency & Token Development", desc: "Creating secure digital tokens and blockchain-based assets where required." },
      { title: "Blockchain Integration", desc: "Integrating blockchain capabilities with existing applications, platforms, and business systems." },
      { title: "Blockchain Consulting", desc: "Helping businesses identify practical blockchain opportunities and define the right implementation strategy." }
    ],
    processTitle: "Blockchain Solutions That Drive Digital Growth",
    processSteps: [
      { title: "Discovery & Strategy", desc: "Understanding the business challenge, blockchain opportunity, and the most suitable decentralised solution." },
      { title: "Architecture & Planning", desc: "Defining the blockchain network, technology stack, security requirements, and implementation roadmap." },
      { title: "Smart Contract Development", desc: "Creating secure and reliable smart contracts based on defined business rules and workflows." },
      { title: "Blockchain Application Development", desc: "Developing decentralised applications and blockchain-powered features." },
      { title: "Testing & Security Validation", desc: "Testing transactions, smart contracts, integrations, performance, and security before deployment." },
      { title: "Deployment & Continuous Support", desc: "Deploying the blockchain solution and providing ongoing monitoring, optimisation, and improvements." }
    ],
    industriesTitle: "Transforming Businesses with Blockchain Technology",
    industriesSubtitle: "Our blockchain solutions help businesses create more secure, transparent, efficient, and decentralised digital ecosystems.",
    industries: [
      { num: "01/", title: "Secure Transactions", desc: "Enable transparent and tamper-resistant digital transactions." },
      { num: "02/", title: "Smart Automation", desc: "Use smart contracts to automate agreements and business workflows." },
      { num: "03/", title: "Digital Asset Management", desc: "Manage tokens, digital assets, and ownership securely through blockchain technology." },
      { num: "04/", title: "Supply Chain Transparency", desc: "Improve visibility and traceability across supply chain operations." },
      { num: "05/", title: "Decentralised Platforms", desc: "Build applications that reduce dependency on traditional centralised infrastructure." },
      { num: "06/", title: "Data Security & Integrity", desc: "Protect critical information through transparent and tamper-resistant blockchain records." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find answers to common questions about blockchain technology, smart contracts, decentralised applications, blockchain integration, and blockchain development services.",
    faqs: [
      { q: "What is Blockchain Development?", a: "Blockchain development involves creating decentralised systems and applications that use distributed ledger technology to securely record transactions, manage digital assets, automate processes, and improve transparency." },
      { q: "How can Blockchain benefit my business?", a: "Blockchain can help improve transparency, data security, transaction traceability, automation, and trust between multiple parties. The actual benefits depend on the specific business use case." },
      { q: "What are Smart Contracts?", a: "Smart contracts are digital programs stored on a blockchain that automatically execute predefined actions when specific conditions are met." },
      { q: "Can Blockchain integrate with my existing application?", a: "Yes. Blockchain functionality can be integrated with existing websites, mobile applications, enterprise systems, databases, and digital platforms depending on the technical architecture and requirements." },
      { q: "Do all businesses need Blockchain?", a: "No. Blockchain should only be implemented when decentralisation, transparency, shared trust, immutable records, or automated transactions provide genuine value to the business." }
    ],
    ctaHeading: "Ready to Build Your Blockchain Solution?",
    ctaDescription: "Talk to our blockchain architects at CityScene Global to design a secure, transparent, and high-performance decentralised application.",
    ctaButtonText: "Contact Us Today",
    ctaButtonLink: "/contact"
  },
  {
    id: "ai-scope-evaluation",
    title: "Artificial Intelligence\nDetailed Study & Evaluation",
    displayTitle: "Artificial Intelligence\nDetailed Study & Evaluation",
    path: "/services/ai-scope-evaluation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Unlocking the Future with Smart Systems and Cognitive Computing",
    topicName: "RESEARCH",
    heroDesc: "Unlocking the Future with Smart Systems and Cognitive Computing",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    introP1: "Evaluate the ROI, technical feasibility, and security risks of deploying AI solutions across your enterprise operations.",
    introP2: "Our AI consultants provide comprehensive audit reports, data hygiene blueprints, and architectural benchmarks before you commit major capital.",
    whyChooseTitle: "Why Study AI?",
    whyChooseSubtitle: "Studying and evaluating the potential, impact, and applications of Artificial Intelligence across modern ecosystems.",
    whyChooseCards: [
      { title: "Human-like Intelligence", desc: "Develop systems that simulate human thinking and reasoning" },
      { title: "Automation & Robotics", desc: "Enable intelligent automation in complex environments" },
      { title: "Data-Driven Insights", desc: "Extract meaningful patterns from massive datasets" },
      { title: "Ethics & Evaluation", desc: "Understand the ethical implications of AI on society" }
    ],
    expertiseTitle: "Our Expertise in Artificial Intelligence",
    expertiseSubtitle: "Empowering systems with cognitive capabilities and intelligent automation.",
    expertiseItems: [
      { title: "Machine Learning", desc: "Design models that learn from data to make predictions" },
      { title: "Natural Language Processing", desc: "Build systems that understand and generate human language" },
      { title: "Computer Vision", desc: "Empower machines to interpret visual information" },
      { title: "AI Integration", desc: "Seamlessly embed AI into your products and processes" }
    ],
    processSteps: null,
    industries: null,
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find answers to common questions about our AI consulting services, generative AI development, business automation, and intelligent enterprise solutions.",
    faqs: [
      { q: "What AI consulting services does CityScene Global offer in Jaipur?", a: "We help businesses identify where artificial intelligence can create the greatest impact, then design and implement tailored AI solutions such as intelligent chatbots, predictive analytics, machine learning models, workflow automation, and decision-support systems to improve efficiency and business growth." },
      { q: "Can small businesses benefit from AI solutions?", a: "Yes. AI solutions can be tailored to businesses of all sizes. Small businesses can begin with affordable automation, AI-powered chatbots, customer support tools, and intelligent data analysis, then scale their AI capabilities as their business grows." },
      { q: "Do you offer generative AI development?", a: "Yes. Our generative AI development services include building AI-powered tools for content generation, document automation, intelligent assistants, workflow automation, knowledge management, and custom business applications using the latest AI technologies." },
      { q: "What is AIOps and does CityScene Global provide it?", a: "AIOps, or Artificial Intelligence for IT Operations, uses AI and machine learning to automate system monitoring, detect issues, predict failures, and improve IT performance. Our AIOps solutions help businesses reduce downtime, optimize infrastructure, and resolve operational issues faster through intelligent automation." }
    ],
    ctaHeading: "Ready to Explore AI Opportunities?",
    ctaDescription: "Talk to our AI architects at CityScene Global to evaluate, design, and implement intelligent AI systems.",
    ctaButtonText: "About Us",
    ctaButtonLink: "/about"
  },
  {
    id: "robotics-automation",
    title: "Robotics and\nAutomation",
    displayTitle: "Robotics and\nAutomation",
    path: "/services/robotics-automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Revolutionising Industries through Intelligent Machines and Automated Systems",
    topicName: "TECHNOLOGY",
    heroDesc: "Revolutionising Industries through Intelligent Machines and Automated Systems",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    introP1: "Robotics and automation are transforming industries by introducing intelligent machines and automated systems that improve productivity, accuracy, and operational control across sectors such as manufacturing, logistics, healthcare, and smart infrastructure.",
    introP2: "At CityScene Global, we help businesses in India and Dubai transform operations through advanced robotics and automation solutions, empowering them to stay competitive in rapidly evolving markets.",
    whyChooseTitle: "Why Robotics\n& Automation?",
    whyChooseSubtitle: "Empowering businesses with high-accuracy systems and intelligent operational control.",
    whyChooseCards: [
      { title: "Precision & Operational Efficiency", desc: "We implement high-accuracy robotic and automated systems to streamline complex workflows and minimise manual errors, resulting in consistent output quality." },
      { title: "Reduced Human Dependency", desc: "By automating repetitive, labour-intensive, and time-consuming tasks, we help businesses lower operational costs and improve efficiency." },
      { title: "Industrial Growth & Modernisation", desc: "Our solutions upgrade traditional operations into smart, technology-driven systems for manufacturing plants and logistics hubs." },
      { title: "Safety & System Reliability", desc: "Deploy dependable robotic systems in hazardous industrial areas to reduce workplace risks and prevent human exposure to danger." }
    ],
    expertiseTitle: "Our Expertise in Robotics",
    expertiseSubtitle: "Engineering advanced microcontroller-based systems, industrial PLC/SCADA control, and IoT integration.",
    expertiseItems: [
      { title: "Embedded Systems", desc: "Design microcontroller-based systems for robotic control, ensuring seamless integration between hardware and software intelligence." },
      { title: "Automation Engineering", desc: "Develop PLC and SCADA systems for industrial automation, providing real-time data monitoring and process control." },
      { title: "Robotic Design", desc: "Custom robotic hardware and kinematic systems engineered for specific industrial tasks and structural durability." },
      { title: "IoT Integration", desc: "Connect robots with IoT for real-time monitoring and control, bridging the gap between physical machines and digital ecosystems." }
    ],
    processTitle: "Smart Infrastructure Solutions",
    processSteps: [
      { title: "System Stability", desc: "Stable performance and enhanced safety compliance even in heavy construction zones and sensitive settings." },
      { title: "Output Capacity", desc: "Higher output capacity and improved operational visibility through advanced process control mechanisms." },
      { title: "Uninterrupted Operations", desc: "Reliable automation that ensures business continuity by mitigating human-related downtime." },
      { title: "Decision-Making", desc: "Allows skilled professionals to focus on critical responsibilities, innovation, and high-level strategy." }
    ],
    industriesTitle: "Impacted Industries",
    industriesSubtitle: "Advanced robotics transforming core sectors across India and Dubai.",
    industries: [
      { num: "01/", title: "Manufacturing", desc: "Automating factories with smart machines to improve consistent output quality and streamline complex production stages." },
      { num: "02/", title: "Logistics", desc: "Enhancing warehouse sorting and transport operations to reduce operational costs and accelerate fulfillment speeds." },
      { num: "03/", title: "Healthcare", desc: "Deploying sensitive robotic systems for diagnostics and handling tasks to reduce human exposure to hazardous materials." },
      { num: "04/", title: "Infrastructure", desc: "Integrating automation into heavy construction zones for better process control and improved workplace safety." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: null,
    faqs: [],
    ctaHeading: "Ready to Automate Your Operations?",
    ctaDescription: "Talk to our robotics and automation engineers at CityScene Global to transform your industrial workflows.",
    ctaButtonText: "About Us",
    ctaButtonLink: "/about"
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
    title: "Software Testing\n& Quality Assurance",
    displayTitle: "Software Testing\n& Quality Assurance",
    path: "/services/software-testing-qa",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    position: "top-left",
    shortDesc: "Delivering Reliable, Secure, and High-Performance Applications.",
    topicName: "QUALITY FIRST",
    heroDesc: "Delivering Reliable, Secure, and High-Performance Applications.",
    heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    introP1: "Delivering reliable and high-quality digital experiences requires a strong foundation of testing and quality assurance. With a focus on accuracy, performance, and user satisfaction, our services help businesses across India and Dubai release stable, secure, and efficient applications.",
    introP2: "From functional and manual testing to advanced automation and performance validation, every process is designed to detect issues early, minimise risks, and ensure smooth product launches.",
    whyChooseTitle: "CityScene Automation Services",
    whyChooseSubtitle: "Implementing robust test automation frameworks, real-device cloud validation, and continuous delivery integration.",
    whyChooseCards: [
      { title: "Framework Design", desc: "Implementing robust frameworks using Selenium, Appium, and Cypress. Our solutions include execution logs, screenshots, and custom dashboards for complete visibility." },
      { title: "Mobile & Cloud Testing", desc: "Comprehensive validation on real devices (Android/iOS) and simulators. We leverage cloud device farms like BrowserStack and Perfecto for real-world coverage." },
      { title: "CI/CD Pipelines", desc: "Seamless integration with GitLab CI and CircleCI. We ensure test scripts are version-controlled via GitHub, GitLab, and Bitbucket for continuous delivery." }
    ],
    expertiseTitle: "Our QA\nExpertise",
    expertiseSubtitle: "Experienced QA professionals maintaining consistent quality across web, mobile, and enterprise applications.",
    expertiseItems: [
      { title: "Manual Testing", desc: "Detailed human-driven testing for UI/UX and functionality to ensure the highest standards of usability." },
      { title: "Automation Testing", desc: "Boosting test coverage with powerful scripts and modern tools to improve release confidence and reduce defects." },
      { title: "Mobile App Testing", desc: "Ensuring mobile applications perform flawlessly on all devices, resolutions, and form factors." },
      { title: "Cross-Browser Validation", desc: "Checking compatibility across Chrome, Firefox, Safari, Edge, and more for a unified experience." }
    ],
    processTitle: "Why Quality Assurance Matters?",
    processSteps: [
      { title: "Bug-Free Software", desc: "Ensuring applications run smoothly across all platforms by identifying and fixing bugs before they reach the user." },
      { title: "Performance Assurance", desc: "Rigorous load and stress testing to ensure your application remains responsive and reliable under pressure." },
      { title: "Security Validation", desc: "Protecting systems from vulnerabilities and threats through comprehensive security and compliance testing." },
      { title: "User Satisfaction", desc: "Delivering error-free experiences that result in higher user retention and consistent business growth." }
    ],
    industriesTitle: "Our Impact",
    industriesSubtitle: "Setting new standards for quality across high-stakes industries.",
    industries: [
      { num: "01/", title: "Enterprise Software", desc: "Validating complex business logic and large-scale data migrations for zero-defect production environments." },
      { num: "02/", title: "Fintech & Payments", desc: "Security-first testing protocols to protect transaction integrity and comply with international regulations." },
      { num: "03/", title: "Logistics & Supply Chain", desc: "End-to-end testing of real-time tracking systems and API integrations for 24/7 reliability." }
    ],
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: null,
    faqs: [],
    ctaHeading: "Ready to Guarantee Your Application Quality?",
    ctaDescription: "Talk to our QA lead specialists at CityScene Global to design an automated testing strategy for your software release.",
    ctaButtonText: "About Us",
    ctaButtonLink: "/about"
  },
  {
    id: "it-consulting",
    title: "IT Consultation\nServices",
    displayTitle: "IT Consultation\nServices",
    path: "/services/it-consulting",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    position: "bottom-right",
    shortDesc: "Empowering Businesses with Scalable, Secure, and Future-Ready Technology",
    topicName: "IT STRATEGY",
    heroDesc: "Empowering Businesses with Scalable, Secure, and Future-Ready Technology",
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    introP1: "Align your IT infrastructure with long-term business goals through strategic technology advisory services.",
    introP2: "Our senior enterprise architects help organizations modernize cloud environments, optimize IT spend, and fortify cybersecurity protocols.",
    whyChooseTitle: "Why Choose Our IT Consultation?",
    whyChooseSubtitle: "Align your business goals with scalable, secure, and future-ready technology environments.",
    whyChooseCards: [
      { title: "Technology Strategy", desc: "Align your business goals with a sustainable IT roadmap" },
      { title: "Infrastructure Planning", desc: "Design resilient, secure, and scalable IT environments" },
      { title: "Digital Transformation", desc: "Modernize legacy systems and embrace cloud-native solutions" },
      { title: "Risk & Compliance", desc: "Ensure cybersecurity, data protection, and regulatory compliance" }
    ],
    expertiseTitle: "Our Areas of Expertise",
    expertiseSubtitle: "Delivering specialized IT advisement across cloud architectures, networking, and enterprise integration.",
    expertiseItems: [
      { title: "Network Architecture", desc: "Plan and implement robust networking for seamless operations" },
      { title: "Cloud Services", desc: "Leverage AWS, Azure, or GCP for optimal scalability" },
      { title: "DevOps Consulting", desc: "Accelerate development through CI/CD and automation" },
      { title: "Enterprise Solutions", desc: "ERP, CRM, and ITSM integration tailored to business needs" }
    ],
    processSteps: null,
    industries: null,
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: null,
    faqs: [],
    ctaHeading: "Ready to Transform Your IT Infrastructure?",
    ctaDescription: "Talk to our IT strategy consultants at CityScene Global to design a future-ready technology roadmap.",
    ctaButtonText: "About Us",
    ctaButtonLink: "/about"
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
    if ((await Blog.count()) === 0) {
      for (const blogData of initialBlogs) {
        const [, created] = await Blog.findOrCreate({
          where: { id: blogData.id },
          defaults: blogData
        });
        if (created) blogsInserted++;
      }
    }

    // 2. Seed Services
    let servicesInserted = 0;
    if ((await Service.count()) === 0) {
      for (const serviceData of initialServices) {
        const [, created] = await Service.findOrCreate({
          where: { id: serviceData.id },
          defaults: serviceData
        });
        if (created) servicesInserted++;
      }
    }

    // 3. Seed Clients
    let clientsInserted = 0;
    if ((await Client.count()) === 0) {
      for (const clientData of initialClients) {
        const [, created] = await Client.findOrCreate({
          where: { id: clientData.id },
          defaults: clientData
        });
        if (created) clientsInserted++;
      }
    }

    // 4. Seed Projects
    let projectsInserted = 0;
    if ((await Project.count()) === 0) {
      for (const projectData of initialProjects) {
        const [, created] = await Project.findOrCreate({
          where: { id: projectData.id },
          defaults: projectData
        });
        if (created) projectsInserted++;
      }
    }

    // 5. Seed Jobs
    let jobsInserted = 0;
    if ((await Job.count()) === 0) {
      for (const jobData of initialJobs) {
        const [, created] = await Job.findOrCreate({
          where: { id: jobData.id },
          defaults: jobData
        });
        if (created) jobsInserted++;
      }
    }

    // 6. Seed Testimonials
    let testimonialsInserted = 0;
    if ((await Testimonial.count()) === 0) {
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
    }

    // 7. Seed HomeContent
    let homeSectionsInserted = 0;
    if ((await HomeContent.count()) === 0) {
      for (const [section, content] of Object.entries(defaultHomeContent)) {
        const [, created] = await HomeContent.findOrCreate({
          where: { section },
          defaults: { section, content }
        });
        if (created) homeSectionsInserted++;
      }
    }

    // 8. Seed SeoMetas
    let seoMetasInserted = 0;
    if ((await SeoMeta.count()) === 0) {
      for (const seoData of initialSeoMetas) {
        const [, created] = await SeoMeta.findOrCreate({
          where: { pageKey: seoData.pageKey },
          defaults: seoData
        });
        if (created) seoMetasInserted++;
      }
    }

    const [totalBlogs, totalServices, totalClients, totalProjects, totalJobs, totalTestimonials, totalHome, totalSeo] = await Promise.all([
      Blog.count(),
      Service.count(),
      Client.count(),
      Project.count(),
      Job.count(),
      Testimonial.count(),
      HomeContent.count(),
      SeoMeta.count()
    ]);

    console.log('✅ MySQL Database Status & Seeding Check:');
    console.log(`   - Blogs: ${totalBlogs} total records in MySQL (${blogsInserted} new inserted)`);
    console.log(`   - Services: ${totalServices} total records in MySQL (${servicesInserted} new inserted)`);
    console.log(`   - Clients: ${totalClients} total records in MySQL (${clientsInserted} new inserted)`);
    console.log(`   - Projects: ${totalProjects} total records in MySQL (${projectsInserted} new inserted)`);
    console.log(`   - Jobs: ${totalJobs} total records in MySQL (${jobsInserted} new inserted)`);
    console.log(`   - Testimonials: ${totalTestimonials} total records in MySQL (${testimonialsInserted} new inserted)`);
    console.log(`   - HomeContent Sections: ${totalHome} total records in MySQL (${homeSectionsInserted} new inserted)`);
    console.log(`   - SEO Metas: ${totalSeo} total records in MySQL (${seoMetasInserted} new inserted)`);
  } catch (error) {
    console.error('❌ Error during SQL database seeding:', error);
  }
};


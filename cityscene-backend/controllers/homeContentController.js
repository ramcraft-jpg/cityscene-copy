import { HomeContent } from '../models/HomeContent.js';

export const defaultHomeContent = {
  hero: {
    slides: [
      {
        id: 1,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
        image: '/assets/home/hero/hero-1.jpg',
        fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
        titleLine1: 'Transforming Visions',
        titleLine2: 'into Digital Realities',
        subtitle: 'We empower your business with cutting-edge IT solutions through seamless digital engagement. From virtual consultations to personalized meetings, we deliver tailored solutions to drive your success.'
      },
      {
        id: 2,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-31620-large.mp4',
        image: '/assets/home/hero/hero-2.jpg',
        fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
        titleLine1: 'Empowering Businesses',
        titleLine2: 'With AI & Automation',
        subtitle: 'Streamline operations, improve efficiency, and unlock new growth opportunities with our custom AI and cloud engineering services.'
      },
      {
        id: 3,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-on-a-laptop-keyboard-41555-large.mp4',
        image: '/assets/home/hero/hero-3.jpg',
        fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        titleLine1: 'Next-Gen Infrastructure',
        titleLine2: '& Smart City Solutions',
        subtitle: 'Building sustainable, secure, and scalable digital ecosystems tailored for modern enterprises and forward-thinking communities.'
      }
    ],
    button1Text: 'About Us',
    button1Link: '/about',
    button2Text: "Let's Talk",
    button2Link: '/contact'
  },
  services: {
    badge: 'What We Deliver',
    heading: 'Our Services',
    services: [
      { id: 'custom-software-development', title: 'Custom Software Development', textPosition: 'bottom', image: '/assets/home/services/service-1.jpg', fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
      { id: 'mobile-app-development', title: 'Mobile App Development', textPosition: 'top', image: '/assets/home/services/service-2.jpg', fallback: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
      { id: 'web-development', title: 'Web Development', textPosition: 'bottom', image: '/assets/home/services/service-3.jpg', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
      { id: 'ui-ux-design', title: 'UI/UX Design', textPosition: 'top', image: '/assets/home/services/service-4.jpg', fallback: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80' },
      { id: 'blockchain-development', title: 'Blockchain Development', textPosition: 'bottom', image: '/assets/home/services/service-5.jpg', fallback: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80' },
      { id: 'ai-machine-learning', title: 'AI & Machine Learning', textPosition: 'top', image: '/assets/home/services/service-6.jpg', fallback: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80' },
      { id: 'ai-tools-agents', title: 'Development of AI Tools & Agents', textPosition: 'bottom', image: '/assets/home/services/service-7.jpg', fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
      { id: 'ai-scope-feasibility', title: 'AI Scope & Feasibility Analysis', textPosition: 'top', image: '/assets/home/services/service-8.jpg', fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
      { id: 'robotics-automation', title: 'Robotics & Automation', textPosition: 'bottom', image: '/assets/home/services/service-9.jpg', fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' },
      { id: 'business-research-ai-innovation', title: 'Business Research with AI Innovation', textPosition: 'top', image: '/assets/home/services/service-10.jpg', fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
      { id: 'software-testing-qa', title: 'Software Testing & QA', textPosition: 'bottom', image: '/assets/home/services/service-11.jpg', fallback: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
      { id: 'it-consulting', title: 'IT Consulting', textPosition: 'top', image: '/assets/home/services/service-12.jpg', fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  about: {
    badge: 'Who We Are',
    heading: 'About Us',
    paragraph1: 'At CityScene Global Private Limited, we are committed to transforming urban landscapes with cutting-edge technology and sustainable solutions. In an era where businesses face challenges such as outdated infrastructure, slow system performance, and complex IT management, we provide future-ready solutions that drive efficiency, security, and innovation.',
    paragraph2: 'We specialize in Automation, Artificial Intelligence (AI), Blockchain, Smart City Solutions, and Digital Infrastructure, enabling businesses and governments to navigate the fast-paced digital world seamlessly. Our expertise ensures the integration of intelligent, scalable, and efficient systems tailored to your needs.',
    image: '/assets/home/about/about-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    buttonText: 'Learn More',
    buttonLink: '/about'
  },
  career: {
    badge: 'ARE YOU READY ?',
    headingLine1: 'Be A Part Of The',
    headingLine2: 'Next Big Thing',
    description: 'Join our global network of innovators shaping AI, smart software, and digital infrastructure.',
    image: '/assets/home/career/career-bg.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'VIEW OUR MORE',
    buttonLink: '/career'
  },
  testimonials: {
    heading: 'What People Are Saying?',
    testimonials: [
      { id: 1, quote: '"A game-changer for my business. Thank you!"', author: 'EsunScope' },
      { id: 2, quote: '"Incredible service! The results exceeded my expectations"', author: 'Jai Kisaan Solar' },
      { id: 3, quote: '"Great experience, excellent support, and fantastic results!"', author: 'Nazart' },
      { id: 4, quote: '"Professional, innovative, and reliable—highly recommended!"', author: 'Kun Arabian' },
      { id: 5, quote: '"A seamless experience from start to finish. Thank you!"', author: 'SunScope Capital' }
    ]
  },
  'social-impact': {
    badge: 'Social Impact',
    heading: 'By CityScene Global',
    paragraph1: 'At CityScene Global, we are committed to leveraging technology to create a sustainable and inclusive future. Our initiatives focus on smart urban solutions, AI-driven job creation, and environmental sustainability.',
    paragraph2: 'We drive innovation by enhancing cybersecurity, advancing AI-driven education, and strengthening digital infrastructure. Through automation, blockchain, and AI, we create efficient, secure, and sustainable solutions that benefit businesses and communities alike.',
    image: '/assets/home/social-impact/social-impact-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    buttonText: 'View All Impact',
    buttonLink: '/about'
  },
  commitment: {
    badge: 'Partnering For Growth',
    heading: 'Our Commitment',
    paragraph: 'We empower organizations through long-term technical partnership, transparent project management, and enterprise-grade SLA reliability.',
    cards: [
      { title: 'Innovation Driven', desc: 'Cutting-edge software solutions engineered with scalable modern architecture.' },
      { title: 'Client Centric', desc: 'Tailored development aligns strictly with your unique business KPIs.' },
      { title: 'Zero Downtime', desc: 'Cloud infrastructure designed for 99.99% operational availability.' }
    ]
  },
  'why-us': {
    badge: 'Why CityScene',
    heading: 'Engineering Excellence',
    cards: [
      { title: 'End-to-End Delivery', desc: 'From architectural discovery to deployment and post-launch maintenance.' },
      { title: 'Security First', desc: 'Strict data compliance, role-based access control, and bank-grade encryption.' }
    ]
  },
  team: {
    heading: 'Leadership Team',
    subtitle: 'Passionate technologists driving enterprise digital transformation.',
    members: [
      { name: 'Vishwambhar', role: 'Chief Executive Officer', image: '/assets/team/ceo.jpg' }
    ]
  },
  faqs: {
    heading: 'Frequently Asked Questions',
    faqs: [
      { q: 'How long does a custom software build take?', a: 'Typically 8 to 12 weeks for an MVP depending on complexity.' }
    ]
  },
  'contact-hero': {
    subheading: "LET'S TALK",
    title: 'Contact\nUs',
    description: 'Bridging The Gap Between Ideas & Execution, Contact Us Today.',
    bgImage: '/assets/images/contact-hero.jpg',
    bgVideo: ''
  },
  'contact-intro': {
    heading: 'How can we\nassist you today?',
    description: "We're here to assist you! Let us know your requirements, and we'll connect you with the right IT experts to deliver the best solutions.",
    badgeText: 'REACH US OUT'
  },
  'contact-details': {
    title: 'Contact Us',
    address: 'Second Floor, S.p Tower, 150, Sirsi Rd,\nOfficers Campus Colony, Jaipur, Rajasthan, India',
    phone1: '+91-7689999377',
    phone2: '+971-528225509',
    email: 'info@citysceneglobal.com'
  },
  'contact-info': {
    title: 'Contact Us',
    address: 'Second Floor, S.p Tower, 150, Sirsi Rd,\nOfficers Campus Colony, Jaipur, Rajasthan, India',
    phone1: '+91-7689999377',
    phone2: '+971-528225509',
    email: 'info@citysceneglobal.com'
  },
  'contact-map': {
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.513233887208!2d75.72754637604473!3d26.9189874591522!2m3!1f00!2f00!3f00!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db350106fffff%3A0x8670fa929d91fbd0!2sSirsi%20Rd%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    directMapLink: 'https://maps.google.com/?q=S.P+Tower,+Sirsi+Rd,+Jaipur,+Rajasthan',
    buttonText: 'Open in Maps'
  }
};

/**
 * Ensure default home content sections are seeded in MySQL database
 */
const ensureSeedHomeContent = async () => {
  try {
    const count = await HomeContent.count();
    if (count === 0) {
      const records = Object.entries(defaultHomeContent).map(([section, content]) => ({
        section,
        content
      }));
      await HomeContent.bulkCreate(records, { ignoreDuplicates: true });
    }
  } catch (error) {
    console.error('[Home Content Seed Error]:', error.message);
  }
};

/**
 * @desc    Get content for all Home sections
 * @route   GET /api/home-content
 * @access  Public
 */
export const getAllHomeContent = async (req, res) => {
  try {
    await ensureSeedHomeContent();
    const rows = await HomeContent.findAll();

    const dbContent = {};
    rows.forEach(r => {
      dbContent[r.section] = r.content;
    });

    const contentMap = { ...defaultHomeContent, ...dbContent };

    return res.status(200).json({
      success: true,
      data: contentMap
    });
  } catch (error) {
    console.error('[Get All Home Content Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve home content',
      data: defaultHomeContent
    });
  }
};

/**
 * @desc    Get content for a specific Home section
 * @route   GET /api/home-content/:section
 * @access  Public
 */
export const getHomeSectionContent = async (req, res) => {
  try {
    await ensureSeedHomeContent();
    const { section } = req.params;

    const record = await HomeContent.findOne({ where: { section } });
    const content = record ? record.content : (defaultHomeContent[section] || {});

    return res.status(200).json({
      success: true,
      section,
      content
    });
  } catch (error) {
    console.error(`[Get Home Section Error - ${req.params.section}]:`, error);
    return res.status(500).json({
      success: false,
      message: `Failed to retrieve ${req.params.section} content`,
      content: defaultHomeContent[req.params.section] || {}
    });
  }
};

/**
 * @desc    Update content for a specific Home section
 * @route   PUT /api/home-content/:section
 * @access  Private (Admin)
 */
export const updateHomeSectionContent = async (req, res) => {
  try {
    await ensureSeedHomeContent();
    const { section } = req.params;
    const { content } = req.body;

    if (!content || typeof content !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Content payload is required and must be an object.'
      });
    }

    const [record, created] = await HomeContent.findOrCreate({
      where: { section },
      defaults: { section, content }
    });

    if (!created) {
      await record.update({ content });
    }

    return res.status(200).json({
      success: true,
      message: `Home ${section} updated successfully.`,
      section,
      content
    });
  } catch (error) {
    console.error(`[Update Home Section Error - ${req.params.section}]:`, error);
    return res.status(500).json({
      success: false,
      message: `Failed to update Home ${req.params.section}.`
    });
  }
};

/**
 * @desc    Upload image/video file for Home content
 * @route   POST /api/home-content/upload-media
 * @access  Private (Admin)
 */
export const uploadHomeMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file was uploaded.'
      });
    }

    const relativePath = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Media uploaded successfully.',
      fileUrl: relativePath,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    console.error('[Upload Home Media Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'File upload failed.'
    });
  }
};

import HomeContent from '../models/HomeContent.js';

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
    description: 'Your success is our priority! We go beyond just providing IT solutions – we build partnerships that drive real growth.',
    backgroundMediaType: 'video',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
    backgroundVideo: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
    videoFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
    posterSrc: '/assets/home/commitment/commitment-bg.jpg',
    backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    posterFallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'Learn More',
    buttonLink: '/about'
  },
  'client-adoption': {
    badge: 'Our Process',
    heading: 'How do we serve the client',
    paragraph1: 'Our IT Client Adoption Process starts with the Initial Engagement phase, where we establish communication channels through digital platforms.',
    paragraph2: 'We begin with an in-depth consultation—either virtual or in-person—to understand your IT requirements, business goals, and operational challenges. During this stage, we gather essential documentation, including current IT infrastructure details, application landscapes, workflows, and user requirements, ensuring a tailored solution that aligns with your strategic objectives.',
    image: '/assets/home/adoption/adoption-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    buttonText: 'View All Topics',
    buttonLink: '/services'
  },
  transformation: {
    badge: 'Digital Leadership',
    heading: 'Transformation starts here',
    subtitle: 'Reimagine your future.',
    description: 'Be part of an innovative team driving AI, Blockchain, and Smart City solutions. Work on global projects, grow with cutting-edge training, and shape the future of digital transformation.',
    features: [
      'Exciting global opportunities',
      'AI & smart tech innovation',
      'Career growth & learning.'
    ],
    buttonText: 'Connect With Us',
    buttonLink: '/contact'
  },
  'whatwedo-hero': {
    subheading: 'WHAT WE DO',
    title: 'Professional Services Tailored for You',
    description: 'Helping businesses innovate and grow in the digital age.',
    buttonText: "Let's Talk",
    buttonLink: '/contact',
    backgroundMediaType: 'image',
    bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80',
    bgVideo: '',
    backgroundVideo: ''
  },
  'whatwedo-innovation': {
    heading: 'Empowering Businesses with Innovation',
    description: 'At CityScene Global, we help businesses thrive through cutting-edge solutions. Our services empower companies to achieve sustainable growth, enhance customer experiences, and stay ahead in the digital era.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'
  },
  'about-hero': {
    subheading: 'WHO WE ARE',
    title: 'About Us',
    description: 'We provide top-notch, high-quality services tailored to meet your unique needs. Our expert solutions are designed to enhance your growth, efficiency, and creativity. Let us help you turn your vision into reality and achieve long-term success.',
    buttonText: "Let's Talk",
    buttonLink: '/contact',
    backgroundMediaType: 'image',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    bgVideo: '',
    backgroundVideo: ''
  },
  'about-company': {
    paragraph1: 'At CityScene Global Private Limited, we understand the challenges businesses face in navigating today’s fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.',
    paragraph2: 'We are here to help. At CityScene Global, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.',
    image: ''
  },
  'about-people': {
    subheading: 'Our People',
    title: 'How do you drive meaningful change? By recruiting, appreciating, and supporting top talent from diverse backgrounds.',
    buttonText: "Let's Talk",
    buttonLink: '/contact',
    bgImage: ''
  },
  'about-values': {
    heading: 'Our Values',
    values: [
      {
        id: 'integrity',
        title: 'Integrity',
        description: 'We act with honesty, ethics, and strong accountability.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        position: 'bottom-left'
      },
      {
        id: 'innovation',
        title: 'Innovation',
        description: 'We embrace creativity, technology, and drive progress.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        position: 'top-left'
      },
      {
        id: 'sustainability',
        title: 'Sustainability',
        description: 'We grow responsibly with care and positive impact.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
        position: 'bottom-left'
      }
    ]
  },
  'about-transformation': {
    heading: 'Transformation starts here',
    subtitle: 'Reimagine your future.',
    buttonText: 'Connect with us',
    buttonLink: '/contact',
    link1Text: 'What we do',
    link1Url: '/services',
    link2Text: 'Home',
    link2Url: '/services'
  },
  'career-hero': {
    subheading: 'CAREER OPPORTUNITIES',
    title: 'Join Our Team',
    description: 'Find exciting career opportunities with us.',
    buttonText: 'Explore Jobs',
    buttonLink: '/career/apply',
    backgroundMediaType: 'image',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    bgVideo: '',
    backgroundVideo: ''
  },
  'career-grid-header': {
    heading: 'Job Opportunities',
    subtitle: 'Explore open roles and build the future of technology with us.'
  },
  'career-contact': {
    heading: 'Contact Us',
    subtitle: 'Have questions? Get in touch with us.'
  },
  'portfolio-hero': {
    subheading: 'PORTFOLIO',
    title: 'Focused\nOn achieving client\nGoals',
    description: 'Purpose-driven digital work focused on delivering results that support your business direction.',
    buttonText: "Let's Talk",
    buttonLink: '/contact',
    backgroundMediaType: 'image',
    bgImage: '/assets/images/portfolio-hero.jpg',
    backgroundImage: '/assets/images/portfolio-hero.jpg',
    bgVideo: '',
    backgroundVideo: ''
  },
  'portfolio-clients': {
    heading: 'Trusted by fast growing startups',
    subtitle: 'Empowering innovative brands, enterprises, and high-growth ventures globally.'
  },
  'portfolio-grid-header': {
    heading: 'Our Projects'
  },
  'blog-hero': {
    subheading: 'BLOG',
    title: 'Pioneering the\nNext Wave of\nTechnology',
    description: 'Innovative, scalable, and AI-driven solutions for a smarter digital world.',
    backgroundMediaType: 'image',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    bgVideo: '',
    backgroundVideo: ''
  },
  'blog-intro': {
    heading: 'Technology is evolving rapidly - are you keeping up?',
    description: 'Dive into our latest articles covering AI, cloud computing, cybersecurity, data analytics, and emerging technologies to stay informed, enhance your digital strategy, and maintain a competitive edge in the ever-evolving tech landscape.'
  },
  'blog-grid-header': {
    heading: 'Latest Articles'
  },
  'contact-hero': {
    subheading: "LET'S TALK",
    title: 'Contact\nUs',
    description: 'Bridging The Gap Between Ideas & Execution, Contact Us Today.',
    backgroundMediaType: 'image',
    bgImage: '/assets/images/contact-hero.jpg',
    backgroundImage: '/assets/images/contact-hero.jpg',
    bgVideo: '',
    backgroundVideo: ''
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
  'contact-map': {
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.513233887208!2d75.72754637604473!3d26.9189874591522!2m3!1f00!2f00!3f00!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db350106fffff%3A0x8670fa929d91fbd0!2sSirsi%20Rd%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    directMapLink: 'https://maps.google.com/?q=S.P+Tower,+Sirsi+Rd,+Jaipur,+Rajasthan',
    buttonText: 'Open in Maps'
  }
};

/**
 * @desc    Get content for all Home sections
 * @route   GET /api/home-content
 * @access  Public
 */
export const getAllHomeContent = async (req, res) => {
  try {
    const docs = await HomeContent.find({});
    const contentMap = { ...defaultHomeContent };

    docs.forEach((doc) => {
      contentMap[doc.section] = doc.content;
    });

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
    const { section } = req.params;
    const doc = await HomeContent.findOne({ section });

    const content = doc ? doc.content : (defaultHomeContent[section] || {});

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
    const { section } = req.params;
    const { content } = req.body;

    if (!content || typeof content !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Content payload is required and must be an object.'
      });
    }

    const updatedDoc = await HomeContent.findOneAndUpdate(
      { section },
      { section, content },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: `Home ${section} updated successfully.`,
      section: updatedDoc.section,
      content: updatedDoc.content
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

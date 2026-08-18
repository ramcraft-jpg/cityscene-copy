import { Testimonial } from '../models/Testimonial.js';

export const initialTestimonials = [
  {
    id: "testimonial-1",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "FinTech Global",
    quote: "CityScene Global transformed our legacy mobile platform into a sleek, ultra-performant flagship application. Exceptional execution speed and top-tier UI design.",
    rating: 5,
    status: "active"
  },
  {
    id: "testimonial-2",
    author: "David Chen",
    role: "Chief Technology Officer",
    company: "Nexus Logistics",
    quote: "Working with CityScene Global's AI & Cloud team scaled our analytics throughput tenfold. Their engineering rigor and architecture guidance were invaluable.",
    rating: 5,
    status: "active"
  },
  {
    id: "testimonial-3",
    author: "Sarah Jenkins",
    role: "Head of Marketing",
    company: "Aura Health",
    quote: "Our brand website redesign drove a 140% boost in organic user engagement. The custom animations and responsive layouts exceeded our highest expectations.",
    rating: 5,
    status: "active"
  }
];

/**
 * Ensure seed testimonials exist in MySQL database
 */
const ensureSeedTestimonials = async () => {
  try {
    const count = await Testimonial.count();
    if (count === 0 && initialTestimonials && initialTestimonials.length > 0) {
      for (const t of initialTestimonials) {
        await Testimonial.findOrCreate({
          where: { author: t.author, company: t.company },
          defaults: {
            author: t.author,
            role: t.role,
            company: t.company,
            quote: t.quote,
            rating: t.rating,
            status: t.status
          }
        });
      }
    }
  } catch (error) {
    console.error('[Testimonial Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
export const getTestimonials = async (req, res, next) => {
  try {
    await ensureSeedTestimonials();
    const testimonials = await Testimonial.findAll({
      where: { status: 'active' },
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

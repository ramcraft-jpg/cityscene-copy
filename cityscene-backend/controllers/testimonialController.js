import Testimonial from '../models/Testimonial.js';

export const initialTestimonials = [
  {
    author: "Elena Rostova",
    role: "VP of Product",
    company: "FinTech Global",
    quote: "CityScene Global transformed our legacy mobile platform into a sleek, ultra-performant flagship application. Exceptional execution speed and top-tier UI design.",
    rating: 5,
    status: "active"
  },
  {
    author: "David Chen",
    role: "Chief Technology Officer",
    company: "Nexus Logistics",
    quote: "Working with CityScene Global's AI & Cloud team scaled our analytics throughput tenfold. Their engineering rigor and architecture guidance were invaluable.",
    rating: 5,
    status: "active"
  },
  {
    author: "Sarah Jenkins",
    role: "Head of Marketing",
    company: "Aura Health",
    quote: "Our brand website redesign drove a 140% boost in organic user engagement. The custom animations and responsive layouts exceeded our highest expectations.",
    rating: 5,
    status: "active"
  }
];

export const getTestimonials = async (req, res, next) => {
  try {
    let testimonials = [];
    try {
      testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn('[Testimonial Controller] DB fetch warning:', dbErr.message);
    }

    if (!testimonials || testimonials.length === 0) {
      testimonials = initialTestimonials;
    }

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

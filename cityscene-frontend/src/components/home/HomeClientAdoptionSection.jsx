import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeClientAdoptionSection() {
  const imageSrc = '/assets/home/adoption/adoption-1.jpg';
  const fallbackSrc = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="w-full min-h-screen min-h-[100svh] bg-white py-10 md:py-14 flex flex-col justify-center border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vertical Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none h-[380px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
              <img
                src={imageSrc}
                alt="How do we serve the client - Consultation"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackSrc;
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Heading & Text with Vertical Left Divider */}
          <div className="lg:col-span-7 border-l-2 border-gray-900 pl-6 sm:pl-8 md:pl-10 space-y-6 flex flex-col items-start">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-600 uppercase">
              Our Process
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              How do we <br />
              serve the client
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Our IT Client Adoption Process starts with the Initial Engagement phase, where we establish communication channels through digital platforms.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              We begin with an in-depth consultation—either virtual or in-person—to understand your IT requirements, business goals, and operational challenges. During this stage, we gather essential documentation, including current IT infrastructure details, application landscapes, workflows, and user requirements, ensuring a tailored solution that aligns with your strategic objectives.
            </p>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                View All Topics
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

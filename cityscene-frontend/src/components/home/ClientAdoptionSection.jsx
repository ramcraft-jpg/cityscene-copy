import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientAdoptionSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vertical Image (Matching Image 1) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="How do we serve the client - Consultation"
                className="w-full h-auto max-h-[480px] object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Heading & Text with Vertical Left Divider */}
          <div className="lg:col-span-7 border-l-2 border-gray-900 pl-6 sm:pl-8 md:pl-10 space-y-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              How do we <br />
              serve the client
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our IT Client Adoption Process starts with the Initial Engagement phase, where we establish communication channels through digital platforms.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We begin with an in-depth consultation—either virtual or in-person—to understand your IT requirements, business goals, and operational challenges. During this stage, we gather essential documentation, including current IT infrastructure details, application landscapes, workflows, and user requirements, ensuring a tailored solution that aligns with your strategic objectives.
            </p>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-200"
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

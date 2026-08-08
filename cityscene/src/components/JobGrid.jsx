import React from 'react';
import { jobsData } from '../data/jobs';
import JobCard from './JobCard';

export default function JobGrid() {
  return (
    <section id="jobs-section" className="relative w-full py-20 md:py-28 overflow-hidden bg-gray-100">
      {/* Background Image Overlay matching Screenshot 1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
          alt="Mountains scenic backdrop"
          className="w-full h-full object-cover opacity-25 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-gray-200/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Job Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Explore open roles and build the future of technology with us.
          </p>
        </div>

        {/* 3 Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

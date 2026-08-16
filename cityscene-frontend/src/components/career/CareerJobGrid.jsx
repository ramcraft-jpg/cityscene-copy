import React, { useState, useEffect } from 'react';
import { jobsData as fallbackJobs } from '../../data/jobs';
import CareerJobCard from './CareerJobCard';

const defaultHeader = {
  heading: 'Job Opportunities',
  subtitle: 'Explore open roles and build the future of technology with us.'
};

export default function CareerJobGrid() {
  const [header, setHeader] = useState(defaultHeader);
  const [jobs, setJobs] = useState(fallbackJobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/home-content/career-grid-header').then(r => r.json()).catch(() => null),
      fetch('http://localhost:5000/api/jobs').then(r => r.json()).catch(() => null)
    ]).then(([headerRes, jobsRes]) => {
      if (headerRes && headerRes.success && headerRes.content && headerRes.content.heading) {
        setHeader(headerRes.content);
      }
      if (jobsRes && jobsRes.success && jobsRes.data && jobsRes.data.length > 0) {
        setJobs(jobsRes.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <section id="jobs-section" className="relative w-full min-h-[85vh] py-28 md:py-40 lg:py-48 overflow-hidden bg-gray-100 flex flex-col justify-center">
      {/* Background Image Overlay */}
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
            {header.heading || defaultHeader.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            {header.subtitle || defaultHeader.subtitle}
          </p>
        </div>

        {/* 3 Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {jobs.map((job) => (
            <CareerJobCard key={job.id || job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

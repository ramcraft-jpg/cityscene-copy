import React, { useState, useEffect } from 'react';
import PortfolioProjectCard from './PortfolioProjectCard';
import { flashApiFetch } from '../../config/api';

const defaultHeader = {
  heading: 'Our Projects'
};

export default function PortfolioProjectGrid({ projects }) {
  const [header, setHeader] = useState(defaultHeader);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    flashApiFetch('/home-content/portfolio-grid-header')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setHeader(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching PortfolioProjectGrid API header:', err));
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-[#181818] py-16 text-center text-gray-400">
        No projects found.
      </div>
    );
  }

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleToggle = () => {
    if (hasMore) {
      setVisibleCount(projects.length);
    } else {
      setVisibleCount(6);
    }
  };

  return (
    <section className="w-full bg-[#181818] py-12 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
            {header.heading || defaultHeader.heading}
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {visibleProjects.map((project) => (
            <PortfolioProjectCard key={project.id || project.slug || project._id} project={project} />
          ))}
        </div>

        {/* View More / Show Less Pill Button */}
        {projects.length > 6 && (
          <div className="text-center pt-2">
            <button
              onClick={handleToggle}
              className="inline-flex items-center justify-center px-8 py-2.5 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-md"
            >
              {hasMore ? 'View More' : 'Show Less'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }) {
  const [visibleCount, setVisibleCount] = useState(6);

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
    <section className="w-full bg-[#181818] py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Image 1 */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Our Projects
          </h2>
        </div>

        {/* Project Cards Grid matching Images 1, 2, 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More / Show Less Pill Button matching Image 2 */}
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


import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

export default function PortfolioProjectCard({ project }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group relative aspect-[3/3.8] w-full rounded-[20px] overflow-hidden bg-neutral-900 border-0 outline-none block transition-all duration-300 hover:-translate-y-1.5 focus:outline-none"
    >
      {/* Full Cover Image */}
      <img
        src={getMediaUrl(project.image)}
        alt={project.title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Persistent Dark Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none" />

      {/* Top Hover Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Hover Description Text */}
      {project.description && (
        <div className="absolute top-0 left-0 right-0 p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
          <p className="text-sm font-normal text-gray-200 leading-relaxed drop-shadow">
            {project.description}
          </p>
        </div>
      )}

      {/* Bottom Card Title - Bottom Left Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-20 text-left">
        <h3 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight leading-tight drop-shadow-md">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

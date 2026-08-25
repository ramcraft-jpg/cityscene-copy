import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl, handleImageError } from '../../utils/imageUrl';

export default function CareerJobCard({ job }) {
  const jobId = job.id || job._id;

  return (
    <div className="group relative bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 flex flex-col justify-between items-center text-center h-full shadow-lg">
      {/* Top Job Image */}
      <div className="w-full h-40 sm:h-44 rounded-xl overflow-hidden mb-4 border border-white/20 shrink-0 bg-black/40">
        <img
          src={getMediaUrl(job.image)}
          alt={job.title}
          onError={(e) => handleImageError(e)}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between w-full">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight drop-shadow-sm">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed max-w-xs mx-auto line-clamp-2">
            {job.description}
          </p>
        </div>

        {/* Apply Now Button */}
        <div className="pt-1 w-full flex justify-center">
          <Link
            to={`/career/apply/${jobId}`}
            className="inline-block px-6 py-2.5 rounded-full bg-white text-gray-900 hover:bg-gray-100 font-medium text-xs sm:text-sm shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

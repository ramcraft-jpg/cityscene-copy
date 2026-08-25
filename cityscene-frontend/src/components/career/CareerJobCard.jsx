import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

export default function CareerJobCard({ job }) {
  const jobId = job.id || job._id;

  return (
    <div className="group relative bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/40 transition-all duration-300 flex flex-col justify-between items-center text-center h-full">
      {/* Top Job Image */}
      <div className="w-full h-36 sm:h-40 md:h-[155px] rounded-lg overflow-hidden mb-3 border border-white/20 shrink-0">
        <img
          src={getMediaUrl(job.image)}
          alt={job.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between w-full">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 tracking-tight">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-800 font-normal leading-snug max-w-xs mx-auto line-clamp-2">
            {job.description}
          </p>
        </div>

        {/* Apply Now Button */}
        <div className="pt-1 w-full flex justify-center">
          <Link
            to={`/career/apply/${jobId}`}
            className="inline-block px-5 py-2 rounded-full bg-white text-gray-900 hover:bg-black hover:text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}



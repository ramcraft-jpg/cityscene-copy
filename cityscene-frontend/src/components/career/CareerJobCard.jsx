import React from 'react';
import { Link } from 'react-router-dom';

export default function CareerJobCard({ job }) {
  return (
    <div className="group relative bg-white/15 backdrop-blur-md rounded-2xl md:rounded-3xl p-8 sm:p-10 min-h-[480px] border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between items-center text-center">
      {/* Top Job Image */}
      <div className="w-full h-52 sm:h-60 rounded-xl md:rounded-2xl overflow-hidden mb-8 border border-white/10">
        <img
          src={job.image}
          alt={job.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between w-full space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            {job.title}
          </h3>
          <p className="text-sm text-gray-700 font-normal leading-relaxed max-w-xs mx-auto">
            {job.description}
          </p>
        </div>

        {/* Apply Now Button */}
        <div className="pt-4 pb-2 w-full flex justify-center">
          <Link
            to={`/career/apply/${job.id}`}
            className="inline-block px-8 py-2.5 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

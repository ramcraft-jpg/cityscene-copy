import React, { useState, useEffect } from 'react';
import { jobsData as fallbackJobs } from '../../data/jobs';
import CareerJobCard from './CareerJobCard';

export default function CareerJobGrid({ jobs: customJobs }) {
  const [jobs, setJobs] = useState(customJobs || fallbackJobs);

  useEffect(() => {
    if (!customJobs) {
      fetch('http://localhost:5000/api/jobs')
        .then((r) => r.json())
        .then((jobsRes) => {
          if (jobsRes && jobsRes.success && jobsRes.data && jobsRes.data.length > 0) {
            setJobs(jobsRes.data);
          }
        })
        .catch(() => null);
    }
  }, [customJobs]);

  return (
    <div id="jobs-section" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-20 md:pb-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {jobs.map((job) => (
          <CareerJobCard key={job.id || job._id} job={job} />
        ))}
      </div>
    </div>
  );
}




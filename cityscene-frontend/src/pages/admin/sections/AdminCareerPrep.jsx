import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { flashApiFetch } from '../../../config/api';

export default function AdminCareerPrep() {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    flashApiFetch('/jobs')
      .then(r => r.json())
      .then(d => setJobCount(d.count || (d.data ? d.data.length : 0)))
      .catch(() => setJobCount(0));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💼</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Career & Hiring Management</h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Preparation Stage
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Post open positions, manage job descriptions, requirements, locations, and applicant records.
          </p>
        </div>

        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Career Database Status</h3>
          <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-100">
            {jobCount} Open Jobs Active
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Will support publishing new job requisitions, updating job details, setting application links, and reviewing submitted candidate resumes.
        </p>
      </div>
    </div>
  );
}

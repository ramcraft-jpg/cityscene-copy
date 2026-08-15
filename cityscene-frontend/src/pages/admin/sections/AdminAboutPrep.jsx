import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminAboutPrep() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">About Page Management</h2>
            <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
              Preparation Stage
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage company profile, leadership team, mission, vision, and corporate history.
          </p>
        </div>

        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900">About Page CMS Overview</h3>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          This section will host controls for updating executive bios, core values, company metrics, and brand storytelling elements.
        </p>
      </div>
    </div>
  );
}

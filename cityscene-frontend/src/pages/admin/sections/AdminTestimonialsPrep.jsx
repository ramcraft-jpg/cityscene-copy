import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { flashApiFetch } from '../../../config/api';

export default function AdminTestimonialsPrep() {
  const [testimonialCount, setTestimonialCount] = useState(0);

  useEffect(() => {
    flashApiFetch('/testimonials')
      .then(r => r.json())
      .then(d => setTestimonialCount(d.count || (d.data ? d.data.length : 0)))
      .catch(() => setTestimonialCount(0));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Testimonials Management</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-200">
              Preparation Stage
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage customer reviews, enterprise testimonials, ratings, and avatar images.
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
          <h3 className="text-base font-bold text-slate-900">Testimonials Database Status</h3>
          <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-100">
            {testimonialCount} Testimonials Available
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Will support adding client testimonials, star ratings, author titles, company names, and display ordering.
        </p>
      </div>
    </div>
  );
}

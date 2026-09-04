import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { flashApiFetch } from '../../../config/api';

export default function AdminContactPrep() {
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    flashApiFetch('/contact')
      .then(r => r.json())
      .then(d => setContactCount(d.count || (d.data ? d.data.length : 0)))
      .catch(() => setContactCount(0));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📞</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Contact Information & Inquiries</h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
              Preparation Stage
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage company contact details, address, support email, phone numbers, and incoming message inquiries.
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
          <h3 className="text-base font-bold text-slate-900">Inquiries Database Status</h3>
          <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-100">
            {contactCount} Inquiries Received
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Will support configuring corporate office locations, main phone lines, inquiry routing emails, and reviewing detailed client messages.
        </p>
      </div>
    </div>
  );
}

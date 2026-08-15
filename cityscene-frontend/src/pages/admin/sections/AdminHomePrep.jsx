import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHomePrep() {
  const homeComponents = [
    { name: 'HomeHero', title: 'Hero Banner Section', desc: 'Main headline, tagline, background media & CTA buttons' },
    { name: 'HomeServices', title: 'Services Highlights', desc: 'Featured enterprise digital services cards' },
    { name: 'HomeAbout', title: 'About Preview Section', desc: 'Company vision statement & mission highlights' },
    { name: 'HomeCareer', title: 'Career & Culture Spotlight', desc: 'Life at CityScene & hiring callouts' },
    { name: 'HomeTestimonials', title: 'Client Reviews & Ratings', desc: 'Featured client quotes & enterprise testimonials' },
    { name: 'HomeSocialImpact', title: 'Social Impact & CSR', desc: 'Community impact metrics and initiatives' },
    { name: 'HomeCommitment', title: 'Brand Commitment', desc: 'Quality assurance & SLA guarantees' },
    { name: 'HomeClientAdoption', title: 'Global Client Adoption', desc: 'Partner logos and industry reach' },
    { name: 'HomeTransformation', title: 'Digital Transformation CTA', desc: 'Bottom lead capture & conversion banner' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Home Page Management</h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              Preparation Stage
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Next step in CMS roadmap: Manage all Home page text, media, buttons, and sections dynamically.
          </p>
        </div>

        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Info Alert Banner */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm text-slate-800 space-y-1">
        <p className="text-sm font-bold text-orange-900 flex items-center gap-2">
          <span>ℹ️ Home CMS Preparation Ready</span>
        </p>
        <p className="text-xs text-orange-800 leading-relaxed font-normal">
          The Dashboard structure is established. The Home Page editor will be built next to allow direct content updates without modifying React source code.
        </p>
      </div>

      {/* Recognized Components Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3">Recognized Home Page Components ({homeComponents.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeComponents.map((comp, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                  {comp.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Component</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{comp.title}</h4>
              <p className="text-xs text-slate-500">{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../../../services/serviceService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { Search, ExternalLink, ArrowRight, Layers, Layout, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function AdminServicePagesList() {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices(true);
      if (data) setServicesList(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load service detail pages.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = servicesList.filter((srv) => {
    const query = searchQuery.toLowerCase();
    return (
      srv.title?.toLowerCase().includes(query) ||
      srv.id?.toLowerCase().includes(query) ||
      srv.displayTitle?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Service Detail Pages...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📄</span> Service Detail Pages Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage the full page content (Hero, Intro, Why Choose Us Cards, Expertise, Process Steps, FAQs) for every service detail page (`/services/:id`).
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service page..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-orange-500 shadow-sm"
          />
        </div>
      </div>

      {/* Alert Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal">Dismiss</button>
        </div>
      )}

      {/* Service Detail Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => {
          const serviceId = srv.id || srv._id;
          const whyChooseCount = Array.isArray(srv.whyChooseCards) ? srv.whyChooseCards.length : 0;
          const expertiseCount = Array.isArray(srv.expertiseItems) ? srv.expertiseItems.length : 0;
          const processCount = Array.isArray(srv.processSteps) ? srv.processSteps.length : 0;
          const faqCount = Array.isArray(srv.faqs) ? srv.faqs.length : 0;

          return (
            <div
              key={serviceId}
              onClick={() => navigate(`/admin/services/pages/${serviceId}`)}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Top Banner & Thumbnail */}
              <div className="h-44 w-full bg-slate-900 overflow-hidden relative">
                <img
                  src={getMediaUrl(srv.heroImage || srv.image)}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Service+Page+Cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Active Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${
                      srv.isActive !== false
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {srv.isActive !== false ? 'Live Page' : 'Draft'}
                  </span>
                </div>

                {/* Public Link Badge */}
                <div className="absolute top-3 right-3">
                  <a
                    href={`/services/${serviceId}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-lg backdrop-blur-sm transition flex items-center gap-1 text-[10px]"
                    title="View Live Public Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* ID Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    /services/{serviceId}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {srv.displayTitle || srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {srv.heroDesc || srv.shortDesc || 'No page description specified.'}
                  </p>
                </div>

                {/* Section Stats Badges */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <Layout className="w-3.5 h-3.5 text-orange-500" />
                    <span>Why Choose: <strong className="text-slate-900">{whyChooseCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Expertise: <strong className="text-slate-900">{expertiseCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Steps: <strong className="text-slate-900">{processCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                    <span>FAQs: <strong className="text-slate-900">{faqCount}</strong></span>
                  </div>
                </div>

                {/* Manage Page Action Button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/services/pages/${serviceId}`);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow"
                  >
                    <span>Manage Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
          <p className="text-slate-500 text-sm font-semibold">No service detail pages match your search.</p>
        </div>
      )}
    </div>
  );
}

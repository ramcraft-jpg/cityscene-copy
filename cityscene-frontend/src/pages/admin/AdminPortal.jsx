import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAdminUser, verifySession } from '../../services/adminAuthService';
import { fetchDashboardMetrics } from '../../services/adminDashboardService';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAdminUser());
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    counts: {
      services: 0,
      blogs: 0,
      projects: 0,
      jobs: 0,
      testimonials: 0,
      contacts: 0,
      applications: 0
    },
    recentActivity: {
      contacts: [],
      applications: [],
      blogs: [],
      projects: []
    }
  });

  useEffect(() => {
    let isMounted = true;
    verifySession().then((isValid) => {
      if (!isValid) {
        navigate('/admin/login', { replace: true });
      } else {
        setUser(getAdminUser());
        fetchDashboardMetrics().then((data) => {
          if (isMounted) {
            setMetrics(data);
            setLoading(false);
          }
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const statCards = [
    {
      title: 'What We Do Services',
      count: metrics.counts.services,
      icon: '⚡',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      link: '/admin/services'
    },
    {
      title: 'Total Blogs',
      count: metrics.counts.blogs,
      icon: '📝',
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50',
      link: '/admin/blogs'
    },
    {
      title: 'Portfolio Projects',
      count: metrics.counts.projects,
      icon: '🚀',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      link: '/admin/portfolio'
    },
    {
      title: 'Career Jobs',
      count: metrics.counts.jobs,
      icon: '💼',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgLight: 'bg-amber-50',
      link: '/admin/career'
    },
    {
      title: 'Contact Inquiries',
      count: metrics.counts.contacts,
      icon: '📞',
      color: 'from-orange-500 to-red-600',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
      link: '/admin/contact'
    }
  ];

  const quickActions = [
    { title: 'Manage Home', desc: 'Hero, services overview, commitment & branding', path: '/admin/home', icon: '🏠', color: 'bg-gradient-to-r from-orange-500 to-amber-500' },
    { title: 'Manage What We Do', desc: 'Add, update, or remove digital services', path: '/admin/services', icon: '⚡', color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
    { title: 'Manage Blogs', desc: 'Publish technical articles and company news', path: '/admin/blogs', icon: '📝', color: 'bg-gradient-to-r from-purple-500 to-violet-600' },
    { title: 'Manage Portfolio', desc: 'Showcase enterprise project case studies', path: '/admin/portfolio', icon: '🚀', color: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
    { title: 'Manage Career', desc: 'Post open job roles and view candidate apps', path: '/admin/career', icon: '💼', color: 'bg-gradient-to-r from-amber-500 to-orange-600' },
    { title: 'Manage Contact Info', desc: 'Update contact info, address & social links', path: '/admin/contact', icon: '📞', color: 'bg-gradient-to-r from-red-500 to-rose-600' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Control Center Active
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Administrator'}!
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-normal">
            Manage your dynamic CityScene Global website content, track backend database statistics, and update pages seamlessly.
          </p>
        </div>
      </div>

      {/* Overview Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Website Statistics Overview</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Live MongoDB Sync</span>
          </h3>
          {loading && (
            <span className="text-xs text-orange-600 font-semibold animate-pulse flex items-center gap-1">
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Syncing counts...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-200 group flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <p className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition">
                  {loading ? '-' : card.count}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">Click to manage section →</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform`}>
                {card.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Management Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.path}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex items-start gap-4 group"
            >
              <div className={`p-3 rounded-lg ${action.color} text-white text-xl shadow-sm group-hover:scale-105 transition-transform`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  {action.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>Recent Activity & Submissions</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Contact Inquiries */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>📞 Latest Contact Inquiries</span>
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-bold">
                  {metrics.counts.contacts} Total
                </span>
              </h4>
              <Link to="/admin/contact" className="text-xs text-orange-600 font-semibold hover:underline">
                View all →
              </Link>
            </div>

            {metrics.recentActivity.contacts.length > 0 ? (
              <ul className="divide-y divide-slate-100 space-y-3">
                {metrics.recentActivity.contacts.map((contact, i) => (
                  <li key={contact._id || i} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{contact.fullName}</span>
                      <span className="text-slate-400 text-[11px]">{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium truncate">{contact.email} • {contact.phone}</p>
                    <p className="text-xs text-slate-500 line-clamp-1 italic">"{contact.message}"</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs space-y-1">
                <p className="font-semibold text-slate-600">No contact inquiries submitted yet.</p>
                <p>New inquiries submitted from the public site will appear here automatically.</p>
              </div>
            )}
          </div>

          {/* Latest Career Applications */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>💼 Latest Career Applications</span>
                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">
                  {metrics.counts.applications} Total
                </span>
              </h4>
              <Link to="/admin/career" className="text-xs text-amber-600 font-semibold hover:underline">
                View all →
              </Link>
            </div>

            {metrics.recentActivity.applications.length > 0 ? (
              <ul className="divide-y divide-slate-100 space-y-3">
                {metrics.recentActivity.applications.map((app, i) => (
                  <li key={app._id || i} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{app.fullName}</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {app.position}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{app.email} • {app.phone}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs space-y-1">
                <p className="font-semibold text-slate-600">No career applications submitted yet.</p>
                <p>Applications submitted via the Careers portal will populate here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

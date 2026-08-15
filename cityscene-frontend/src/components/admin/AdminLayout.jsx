import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { logoutAdmin, getAdminUser } from '../../services/adminAuthService';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getAdminUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      exact: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6" />
        </svg>
      )
    }
  ];

  const websiteManagementItems = [
    { label: 'Home', path: '/admin/home', icon: '🏠' },
    { label: 'Services', path: '/admin/services', icon: '⚡' },
    { label: 'About', path: '/admin/about', icon: '🏢' },
    { label: 'Career', path: '/admin/career', icon: '💼' },
    { label: 'Blogs', path: '/admin/blogs', icon: '📝' },
    { label: 'Portfolio', path: '/admin/portfolio', icon: '🚀' },
    { label: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
    { label: 'Contact Information', path: '/admin/contact', icon: '📞' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
                S
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  CityScene Global
                  <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-2 py-0.5 rounded border border-orange-500/30">
                    Admin Portal
                  </span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">Central Management System</p>
              </div>
            </div>
          </div>

          {/* Admin User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-semibold text-xs">
                {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-slate-400">{user?.email || 'admin@cityscene.com'}</p>
              </div>
            </div>

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-red-600/90 border border-slate-700 hover:border-red-600 rounded-lg transition duration-200 flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-[61px] left-0 z-40 h-[calc(100vh-61px)] w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Main Menu
              </div>
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition duration-150 ${
                          isActive
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Website Management Sections */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                <span>Website Management</span>
                <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">CMS</span>
              </div>
              <ul className="space-y-1">
                {websiteManagementItems.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                          isActive
                            ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Footer Info inside Sidebar */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MongoDB & API Connected</span>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

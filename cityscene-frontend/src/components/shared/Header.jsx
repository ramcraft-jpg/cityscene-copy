import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

import logo from '../../assets/Untitled design (47).png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'What we do', path: '/services' },
    { name: 'About CityScene', path: '/about' },
    { name: 'Career', path: '/career' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/services') {
      return (
        location.pathname === '/services' ||
        location.pathname.startsWith('/services/')
      );
    }
    if (path === '/blog') {
      const lower = location.pathname.toLowerCase();
      return lower === '/blog' || lower.startsWith('/blog/');
    }
    if (path === '/portfolio') {
      const lower = location.pathname.toLowerCase();
      return lower === '/portfolio' || lower.startsWith('/portfolio/');
    }
    if (path === '/contact') {
      const lower = location.pathname.toLowerCase();
      return lower === '/contact';
    }
    return location.pathname === path;
  };

  const isAdminActive = location.pathname.startsWith('/admin');

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30 transition-all duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="CityScene Global Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5 sm:space-x-6 lg:space-x-8 ml-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-1 text-sm sm:text-sm lg:text-[15px] font-bold tracking-normal transition-colors duration-200 ${active ? 'text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-all duration-300" />
                )}
              </Link>
            );
          })}

          {/* Admin Icon Button */}
          <Link
            to="/admin/login"
            id="navbar-admin-btn"
            title="Admin Portal"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${isAdminActive
              ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
              }`}
          >
            <Shield size={11} />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/admin/login"
            id="mobile-navbar-admin-btn"
            title="Admin Portal"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${isAdminActive
              ? 'bg-orange-600 text-white border-orange-600'
              : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
          >
            <Shield size={11} />
            <span>Admin</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${active
                  ? 'bg-gray-100 text-gray-900 font-bold border-l-4 border-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            to="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-orange-600 bg-orange-50 font-bold"
          >
            <Shield size={11} />
            Admin Portal
          </Link>
        </div>
      )}
    </header>
  );
}


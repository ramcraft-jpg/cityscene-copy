import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
      return location.pathname === '/services' || location.pathname === '/' || location.pathname.startsWith('/services/');
    }
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/services" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-orange-500 to-amber-500 shadow-sm p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div className="relative flex items-center justify-center font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                <span className="text-orange-600 font-extrabold text-xl">S</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-gray-900 leading-none">
              CityScene
            </span>
            <span className="text-sm font-semibold text-gray-800 leading-none mt-0.5">
              Global
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-gray-900 font-bold' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-900 rounded-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
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
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  active
                    ? 'bg-gray-100 text-gray-900 font-bold border-l-4 border-gray-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

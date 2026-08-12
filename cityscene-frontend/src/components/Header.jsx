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

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-orange-500 to-amber-500 shadow-sm p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              <div className="relative flex items-center justify-center font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                <span className="text-orange-600 font-extrabold text-base">S</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-gray-900 leading-none">
              CityScene
            </span>
            <span className="text-xs font-semibold text-gray-800 leading-none mt-0.5">
              Global
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-12 ml-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-1 text-base lg:text-[17px] font-bold tracking-tight transition-colors duration-200 ${
                  active ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black transition-all duration-300" />
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
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${active
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

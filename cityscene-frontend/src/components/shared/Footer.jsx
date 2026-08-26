import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Untitled design (47).png';

export default function Footer() {
  return (
    <footer className="w-full bg-[#171717] text-white font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: Logo */}
          <div className="flex flex-col items-start space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 overflow-hidden relative flex-shrink-0 flex items-center justify-start">
                <img
                  src={logo}
                  alt="CityScene Logo Icon"
                  className="h-full w-auto max-w-none object-contain"
                  style={{ objectPosition: 'left center' }}
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-lg font-semibold tracking-tight text-white leading-none">
                  CityScene
                </span>
                <span className="text-sm font-semibold text-white leading-none mt-0.5">
                  Global
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-[15px] font-medium text-gray-200">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About CityScene</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">What we do</Link></li>
              <li><Link to="/career" className="hover:text-white transition-colors">Career</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
              Services
            </h3>

            <ul className="space-y-2.5 text-[15px] font-medium text-gray-200">
              <li>
                <Link to="/services/custom-software-development" className="hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="hover:text-white transition-colors">
                  App Development
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/ai-machine-learning" className="hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
              Contact
            </h3>

            <div className="space-y-3 text-[15px] font-medium text-gray-200">
              <p className="leading-relaxed">
                S.P Tower, 150, Sirsi Rd,<br />
                Jaipur, Rajasthan, India
              </p>

              <p className="pt-1">+91 7689999377</p>
              <p>+971 528225509</p>

              <p>
                <a
                  href="mailto:info@citysceneglobal.com"
                  className="hover:text-white transition-colors"
                >
                  info@citysceneglobal.com
                </a>
              </p>

              <div className="flex items-center space-x-5 pt-4 text-white">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="w-full bg-[#303030] py-5 px-4 text-center text-[14px] font-medium text-gray-200 font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <p className="mb-1">
          © 2025 CityScene Global Pvt. Ltd. All Rights Reserved.
        </p>

        <p>
          <Link
            to="/privacy-policy"
            className="hover:underline hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

    </footer>
  );
}
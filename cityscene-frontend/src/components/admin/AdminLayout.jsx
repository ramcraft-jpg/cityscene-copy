import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { logoutAdmin, getAdminUser } from '../../services/adminAuthService';
import { getServices } from '../../services/serviceService';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getAdminUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Keep Home menu expanded if navigating inside /admin/home
  const [homeExpanded, setHomeExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/home');
  });

  // Keep What We Do menu expanded if navigating inside /admin/services
  const [servicesExpanded, setServicesExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/services');
  });

  // Keep About menu expanded if navigating inside /admin/about
  const [aboutExpanded, setAboutExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/about');
  });

  // Keep Career menu expanded if navigating inside /admin/career
  const [careerExpanded, setCareerExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/career');
  });

  // Keep Portfolio menu expanded if navigating inside /admin/portfolio
  const [portfolioExpanded, setPortfolioExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/portfolio');
  });

  // Keep Blogs menu expanded if navigating inside /admin/blogs
  const [blogsExpanded, setBlogsExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/blogs');
  });

  // Keep Contact menu expanded if navigating inside /admin/contact
  const [contactExpanded, setContactExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/contact');
  });

  const [dynamicServicesList, setDynamicServicesList] = useState([]);

  useEffect(() => {
    getServices(true)
      .then((data) => {
        if (data) setDynamicServicesList(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
    },
    {
      label: 'SEO & Meta Management',
      path: '/admin/seo',
      exact: true,
      icon: (
        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  const homeSubItems = [
    { label: 'HomeHero', path: '/admin/home/hero' },
    { label: 'HomeServices', path: '/admin/home/services' },
    { label: 'HomeAbout', path: '/admin/home/about' },
    { label: 'HomeCareer', path: '/admin/home/career' },
    { label: 'HomeTestimonials', path: '/admin/home/testimonials' },
    { label: 'HomeSocialImpact', path: '/admin/home/social-impact' },
    { label: 'HomeCommitment', path: '/admin/home/commitment' },
    { label: 'HomeClientAdoption', path: '/admin/home/client-adoption' },
    { label: 'HomeTransformation', path: '/admin/home/transformation' }
  ];

  const servicesSubItems = [
    { label: 'Services Cards Management', path: '/admin/services/grid' },
    { label: 'Service Detail Pages', path: '/admin/services/pages' },
    { label: 'Services Hero Banner', path: '/admin/services/hero' },
    { label: 'Innovation Section', path: '/admin/services/innovation' }
  ];

  const aboutSubItems = [
    { label: 'AboutHero', path: '/admin/about/hero' },
    { label: 'AboutContent', path: '/admin/about/content' },
    { label: 'AboutPeople', path: '/admin/about/people' },
    { label: 'AboutValues', path: '/admin/about/values' },
    { label: 'AboutTransformation', path: '/admin/about/transformation' }
  ];

  const careerSubItems = [
    { label: 'CareerHero', path: '/admin/career/hero' },
    { label: 'CareerJobs', path: '/admin/career/jobs' },
    { label: 'CareerApplications', path: '/admin/career/applications' },
    { label: 'CareerContact', path: '/admin/career/contact' }
  ];

  const portfolioSubItems = [
    { label: 'Projects Cards Management', path: '/admin/projects' },
    { label: 'Portfolio Hero Banner', path: '/admin/portfolio/hero' },
    { label: 'Trusted Clients', path: '/admin/portfolio/clients' }
  ];

  const blogsSubItems = [
    { label: 'BlogHero', path: '/admin/blogs/hero' },
    { label: 'BlogContent', path: '/admin/blogs/content' },
    { label: 'BlogArticles', path: '/admin/blogs/articles' }
  ];

  const contactSubItems = [
    { label: 'ContactHero', path: '/admin/contact/hero' },
    { label: 'ContactIntro', path: '/admin/contact/intro' },
    { label: 'ContactDetails', path: '/admin/contact/details' },
    { label: 'ContactMap', path: '/admin/contact/map' },
    { label: 'ContactInquiries', path: '/admin/contact/inquiries' }
  ];

  const isHomeActive = location.pathname.startsWith('/admin/home');
  const isServicesActive = location.pathname.startsWith('/admin/services');
  const isAboutActive = location.pathname.startsWith('/admin/about');
  const isCareerActive = location.pathname.startsWith('/admin/career');
  const isPortfolioActive = location.pathname.startsWith('/admin/portfolio') || location.pathname.startsWith('/admin/projects');
  const isBlogsActive = location.pathname.startsWith('/admin/blogs');
  const isContactActive = location.pathname.startsWith('/admin/contact');

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
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>

            {/* Brand Logo & CMS Title */}
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#f8fafc] flex items-center gap-1.5 font-sans">
                CityScene<span className="text-orange-500 font-extrabold">CMS</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                Admin Control Center
              </span>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-white leading-tight">
                {user?.name || 'Admin User'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {user?.email || 'admin@cityscene.com'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-sm"
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
                {/* Expandable Home Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setHomeExpanded(!homeExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isHomeActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {homeExpanded ? '⌄' : '›'}
                      </span>
                      <span>Home</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {homeSubItems.length}
                    </span>
                  </button>

                  {/* Home Collapsible Submenu */}
                  {homeExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {homeSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable What We Do Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isServicesActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {servicesExpanded ? '⌄' : '›'}
                      </span>
                      <span>What We Do</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {servicesSubItems.length}
                    </span>
                  </button>

                  {/* What We Do Collapsible Submenu */}
                  {servicesExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {servicesSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        const isPageDetailMenu = sub.path === '/admin/services/pages';
                        return (
                          <li key={sub.path} className="space-y-1">
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>

                            {/* Nested list of individual service detail pages */}
                            {isPageDetailMenu && dynamicServicesList.length > 0 && (
                              <ul className="ml-3 pl-2 border-l border-slate-800/80 space-y-1 my-1">
                                {dynamicServicesList.map((srv) => {
                                  const srvId = srv.id || srv._id;
                                  const srvPath = `/admin/services/pages/${srvId}`;
                                  const isSrvActive = location.pathname === srvPath || location.pathname === `/admin/services/${srvId}`;
                                  return (
                                    <li key={srvId}>
                                      <NavLink
                                        to={srvPath}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`block px-2 py-1 rounded text-[11px] truncate font-medium transition duration-150 ${
                                          isSrvActive
                                            ? 'text-orange-400 font-bold bg-slate-800/80'
                                            : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                        title={srv.title}
                                      >
                                        • {srv.title}
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable About Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setAboutExpanded(!aboutExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isAboutActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {aboutExpanded ? '⌄' : '›'}
                      </span>
                      <span>About</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {aboutSubItems.length}
                    </span>
                  </button>

                  {/* About Collapsible Submenu */}
                  {aboutExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {aboutSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable Career Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setCareerExpanded(!careerExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isCareerActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {careerExpanded ? '⌄' : '›'}
                      </span>
                      <span>Career</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {careerSubItems.length}
                    </span>
                  </button>

                  {/* Career Collapsible Submenu */}
                  {careerExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {careerSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable Portfolio Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setPortfolioExpanded(!portfolioExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isPortfolioActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {portfolioExpanded ? '⌄' : '›'}
                      </span>
                      <span>Portfolio</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {portfolioSubItems.length}
                    </span>
                  </button>

                  {/* Portfolio Collapsible Submenu */}
                  {portfolioExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {portfolioSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable Blogs Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setBlogsExpanded(!blogsExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isBlogsActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {blogsExpanded ? '⌄' : '›'}
                      </span>
                      <span>Blogs</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {blogsSubItems.length}
                    </span>
                  </button>

                  {/* Blogs Collapsible Submenu */}
                  {blogsExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {blogsSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>

                {/* Expandable Contact Information Menu Item */}
                <li>
                  <button
                    type="button"
                    onClick={() => setContactExpanded(!contactExpanded)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                      isContactActive
                        ? 'bg-slate-800 text-orange-400 border-l-4 border-orange-500 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs transition-transform duration-200">
                        {contactExpanded ? '⌄' : '›'}
                      </span>
                      <span>Contact Information</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {contactSubItems.length}
                    </span>
                  </button>

                  {/* Contact Collapsible Submenu */}
                  {contactExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-1">
                      {contactSubItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ${
                                isSubActive
                                  ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>CityScene Global v2.0</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected to MongoDB" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

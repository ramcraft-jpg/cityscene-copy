import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectDetail({ project, relatedProjects = [] }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '' });

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8">The requested portfolio project could not be found.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoModalOpen(false);
      setDemoForm({ name: '', email: '', company: '' });
    }, 2500);
  };

  const categoryCaps = project.categoryCaps || (project.category ? project.category.toUpperCase() : 'ENTERPRISE SOLUTION');
  const titleSystem = project.titleSystem || `${project.title} System`;
  const overviewParas = project.systemOverview || [
    project.overview || project.description
  ];

  return (
    <article className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Hero Section matching Image 2 */}
      <section className="w-full bg-white border-b border-gray-100 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[460px] object-cover"
              />
            </div>

            {/* Right Column Details */}
            <div className="flex flex-col items-start">
              {/* Category Caps */}
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-900 uppercase mb-2 block">
                {categoryCaps}
              </span>

              {/* Short Underline below category */}
              <div className="w-12 h-[2px] bg-gray-900 mb-6" />

              {/* Project System Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-900 tracking-tight leading-[1.15] mb-6">
                {titleSystem}
              </h1>

              {/* Summary Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                {project.description}
              </p>

              {/* Request Demo Button */}
              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-6 py-2.5 border border-gray-900 text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. System Overview Section matching Image 1 */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#f9fafb] rounded-2xl p-8 sm:p-12 border-l-[4px] border-gray-900 shadow-sm border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              System Overview
            </h2>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {overviewParas.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Capabilities / Workflow Split Section matching Image 5 (Top half) */}
      {(project.summaryNote || (project.capabilities && project.capabilities.length > 0)) && (
        <section className="w-full bg-white py-12 md:py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left Summary Paragraph */}
              <div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {project.summaryNote || "Built with enterprise precision, ensuring full operational transparency and accuracy across all workflows."}
                </p>
              </div>

              {/* Right Vertical Feature List */}
              {project.capabilities && project.capabilities.length > 0 && (
                <div className="border-l-2 border-gray-900 pl-6 space-y-8">
                  {project.capabilities.map((cap, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Project Execution & Analytics Section matching Images 3, 4, 5 (Bottom half) */}
      <section className="w-full bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 tracking-tight">
            Project Execution & Analytics
          </h2>

          {/* 3-Column Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(project.executionFeatures || [
              { title: "Project Automation", description: "Auto project creation, task templates, dependencies, and milestones." },
              { title: "Task & Resource Management", description: "Kanban boards, Gantt charts, skill-based allocation." },
              { title: "Time & Cost Control", description: "Timesheets, earned value management, profitability tracking." },
              { title: "Dashboards & Reports", description: "Sales funnels, project health, executive KPIs." }
            ]).map((feat, idx) => (
              <div
                key={idx}
                className="border border-white/20 bg-neutral-950/90 rounded-xl p-8 space-y-3 hover:border-white/40 transition-colors"
              >
                <h3 className="text-xl font-bold text-white leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="w-full bg-[#181818] py-16 md:py-24 border-t border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              More Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Request Demo Popup Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Demo Request Received!</h4>
                <p className="text-sm text-gray-600">
                  Thank you for requesting a demo of <strong>{titleSystem}</strong>. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Request a Demo
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Schedule a personalized walk-through of {titleSystem}
                </p>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={demoForm.company}
                      onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                      placeholder="Company Name"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors mt-2"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PortfolioDetailHero from './PortfolioDetailHero';
import PortfolioDetailOverview from './PortfolioDetailOverview';
import PortfolioDetailModules from './PortfolioDetailModules';
import PortfolioDetailValueProp from './PortfolioDetailValueProp';
import PortfolioDetailExecution from './PortfolioDetailExecution';
import PortfolioDetailDemoModal from './PortfolioDetailDemoModal';

export default function PortfolioProjectDetail({ project }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '' });

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8">The requested portfolio project could not be found.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
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
  let overviewParas = [];
  if (Array.isArray(project.systemOverview) && project.systemOverview.length > 0) {
    overviewParas = project.systemOverview;
  } else if (typeof project.systemOverview === 'string' && project.systemOverview.trim().length > 0) {
    overviewParas = project.systemOverview.split('\n\n').filter(Boolean);
  } else if (typeof project.fullDesc === 'string' && project.fullDesc.trim().length > 0) {
    overviewParas = project.fullDesc.split('\n\n').filter(Boolean);
  } else if (project.shortDesc || project.description) {
    overviewParas = [project.shortDesc || project.description];
  }

  return (
    <article className="min-h-screen bg-white text-gray-900 font-sans">
      <PortfolioDetailHero
        project={project}
        categoryCaps={categoryCaps}
        titleSystem={titleSystem}
        overviewParas={overviewParas}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      <PortfolioDetailOverview overviewParas={overviewParas} />

      <PortfolioDetailValueProp project={project} />

      <PortfolioDetailModules project={project} />

      <PortfolioDetailExecution project={project} />

      <PortfolioDetailDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        titleSystem={titleSystem}
        demoSubmitted={demoSubmitted}
        demoForm={demoForm}
        setDemoForm={setDemoForm}
        onSubmit={handleDemoSubmit}
      />
    </article>
  );
}

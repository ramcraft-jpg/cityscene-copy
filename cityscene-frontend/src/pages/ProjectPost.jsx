import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectDetail from '../components/ProjectDetail';
import { getProjectBySlug } from '../services/projectService';

export default function ProjectPost() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    getProjectBySlug(slug).then((projectData) => {
      setProject(projectData);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Shared Header */}
      <Header />

      <main className="flex-grow">
        {loading ? (
          <div className="py-24 text-center text-gray-600">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading case study...</p>
          </div>
        ) : (
          <ProjectDetail project={project} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

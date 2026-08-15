const API_BASE = 'http://localhost:5000/api';

export const fetchDashboardMetrics = async () => {
  try {
    const [servicesRes, blogsRes, projectsRes, jobsRes, testimonialsRes, contactRes, appRes] = await Promise.all([
      fetch(`${API_BASE}/services`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/blogs`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/projects`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/jobs`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/testimonials`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/contact`).then(r => r.ok ? r.json() : { count: 0, data: [] }),
      fetch(`${API_BASE}/applications`).then(r => r.ok ? r.json() : { count: 0, data: [] })
    ]);

    const services = Array.isArray(servicesRes.data) ? servicesRes.data : [];
    const blogs = Array.isArray(blogsRes.data) ? blogsRes.data : [];
    const projects = Array.isArray(projectsRes.data) ? projectsRes.data : [];
    const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : [];
    const testimonials = Array.isArray(testimonialsRes.data) ? testimonialsRes.data : [];
    const contacts = Array.isArray(contactRes.data) ? contactRes.data : [];
    const applications = Array.isArray(appRes.data) ? appRes.data : [];

    return {
      counts: {
        services: servicesRes.count ?? services.length,
        blogs: blogsRes.count ?? blogs.length,
        projects: projectsRes.count ?? projects.length,
        jobs: jobsRes.count ?? jobs.length,
        testimonials: testimonialsRes.count ?? testimonials.length,
        contacts: contactRes.count ?? contacts.length,
        applications: appRes.count ?? applications.length,
      },
      recentActivity: {
        contacts: contacts.slice(0, 5),
        applications: applications.slice(0, 5),
        blogs: blogs.slice(0, 3),
        projects: projects.slice(0, 3)
      }
    };
  } catch (error) {
    console.error('[Admin Dashboard Service Error]:', error);
    return {
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
    };
  }
};

const API_BASE = 'http://localhost:5000/api';

export const getBlogs = async () => {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs from API (Status ${res.status})`);
  }
  const json = await res.json();
  return json.data || [];
};

export const getBlogBySlug = async (slug) => {
  if (!slug) return null;
  const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog post '${slug}' (Status ${res.status})`);
  }
  const json = await res.json();
  return json.data || null;
};

export const getRelatedBlogs = async (currentSlug, limit = 3) => {
  try {
    const allBlogs = await getBlogs();
    const currentBlog = allBlogs.find(
      (b) => b.slug.toLowerCase() === currentSlug?.toLowerCase() || b.id === currentSlug
    );
    
    if (!currentBlog) return allBlogs.slice(0, limit);

    const filtered = allBlogs.filter((b) => b.id !== currentBlog.id && b.slug !== currentBlog.slug);
    const sameCategory = filtered.filter((b) => b.category === currentBlog.category);
    const otherCategory = filtered.filter((b) => b.category !== currentBlog.category);

    return [...sameCategory, ...otherCategory].slice(0, limit);
  } catch (err) {
    console.error('[Blog Service Related Error]:', err.message);
    return [];
  }
};

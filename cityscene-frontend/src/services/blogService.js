import staticBlogs from '../data/blogs';

const API_BASE = 'http://localhost:5000/api';

export const getBlogs = async () => {
  try {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs from API');
    const json = await res.json();
    return json.data || staticBlogs;
  } catch (error) {
    console.warn('[Blog Service] API unreachable, fallback to local dataset:', error.message);
    return staticBlogs;
  }
};

export const getBlogBySlug = async (slug) => {
  if (!slug) return null;
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (error) {
    console.warn('[Blog Service] API slug fetch failed, fallback to local:', error.message);
  }

  const found = staticBlogs.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase() || b.id === slug
  );
  return found || null;
};

export const getRelatedBlogs = async (currentSlug, limit = 3) => {
  const allBlogs = await getBlogs();
  const currentBlog = allBlogs.find(
    (b) => b.slug.toLowerCase() === currentSlug?.toLowerCase() || b.id === currentSlug
  );
  
  if (!currentBlog) return allBlogs.slice(0, limit);

  const filtered = allBlogs.filter((b) => b.id !== currentBlog.id && b.slug !== currentBlog.slug);
  const sameCategory = filtered.filter((b) => b.category === currentBlog.category);
  const otherCategory = filtered.filter((b) => b.category !== currentBlog.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
};


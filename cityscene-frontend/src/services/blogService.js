import { flashApiFetch } from '../config/api';

export const getBlogs = async (includeAll = false) => {
  const endpoint = includeAll ? '/blogs?all=true' : '/blogs';
  const res = await flashApiFetch(endpoint);
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs from API (Status ${res.status})`);
  }
  const json = await res.json();
  return json.data || [];
};

export const getBlogBySlug = async (slug) => {
  if (!slug) return null;
  const res = await flashApiFetch(`/blogs/${encodeURIComponent(slug)}`);
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
      (b) => b.slug?.toLowerCase() === currentSlug?.toLowerCase() || b.id === currentSlug
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

export const createBlog = async (blogData) => {
  const response = await flashApiFetch('/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to create blog post.');
  }
  return data;
};

export const updateBlog = async (id, blogData) => {
  const response = await flashApiFetch(`/blogs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(blogData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update blog post.');
  }
  return data;
};

export const deleteBlog = async (id) => {
  const response = await flashApiFetch(`/blogs/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete blog post.');
  }
  return data;
};

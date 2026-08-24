import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { getAdminToken } from '../../../services/adminAuthService';

export default function AdminCareerJobs() {
  const [headerData, setHeaderData] = useState({
    heading: 'Job Opportunities',
    subtitle: 'Explore open roles and build the future of technology with us.'
  });

  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [gridHeaderRes, jobsRes] = await Promise.all([
        getHomeSectionContent('career-grid-header').catch(() => null),
        fetch('http://localhost:5000/api/jobs?all=true').then(r => r.json()).catch(() => null)
      ]);

      if (gridHeaderRes && gridHeaderRes.heading) setHeaderData(gridHeaderRes);
      if (jobsRes && jobsRes.data) setJobsList(jobsRes.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load jobs list.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, onSuccess) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      onSuccess(fileUrl);
      setMessage({ type: 'success', text: 'Media uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveGridHeader = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('career-grid-header', headerData);
      setMessage({ type: 'success', text: 'Job grid header updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update section header.' });
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setSelectedJob({
      title: '',
      id: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      location: 'Bengaluru, India',
      type: 'Full Time',
      order: jobsList.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setIsAddMode(false);
    setSelectedJob({ ...job, originalId: job.id || job._id });
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!selectedJob.title) return;

    const token = getAdminToken();
    const targetId = selectedJob.originalId || selectedJob.id || selectedJob._id;
    const url = isAddMode ? 'http://localhost:5000/api/jobs' : `http://localhost:5000/api/jobs/${encodeURIComponent(targetId)}`;
    const method = isAddMode ? 'POST' : 'PUT';

    try {
      setSaving(true);
      setMessage(null);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedJob)
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to save job opening.');
      }

      setMessage({ type: 'success', text: isAddMode ? 'Job created successfully.' : 'Job updated successfully.' });
      setIsModalOpen(false);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save job opening.' });
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const token = getAdminToken();
    const targetId = deleteTarget.id || deleteTarget._id;

    try {
      setSaving(true);
      setMessage(null);
      const response = await fetch(`http://localhost:5000/api/jobs/${encodeURIComponent(targetId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to delete job.');
      }

      setMessage({ type: 'success', text: 'Job deleted successfully.' });
      setDeleteTarget(null);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete job.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Job Opportunities Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>⚡</span> CareerJobs Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Job Opportunities section heading and full CRUD for job openings.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal">Dismiss</button>
        </div>
      )}

      {/* Grid Header Form */}
      <form onSubmit={handleSaveGridHeader} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Grid Header Text</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
            <input
              type="text"
              value={headerData.heading || ''}
              onChange={(e) => setHeaderData({ ...headerData, heading: e.target.value })}
              className="w-full px-3.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              placeholder="Job Opportunities"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtitle</label>
            <input
              type="text"
              value={headerData.subtitle || ''}
              onChange={(e) => setHeaderData({ ...headerData, subtitle: e.target.value })}
              className="w-full px-3.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              placeholder="Explore open roles..."
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow transition"
          >
            Save Header Text
          </button>
        </div>
      </form>

      {/* Jobs CRUD List Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">Job Openings ({jobsList.length})</h2>
          <p className="text-xs text-slate-500">Manage job titles, locations, descriptions, card images, and active status.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition"
        >
          + Add New Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Image</th>
              <th className="p-3.5">Job Title / ID</th>
              <th className="p-3.5">Location / Type</th>
              <th className="p-3.5 text-center">Order</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {jobsList.map((job) => (
              <tr key={job.id || job._id} className="hover:bg-slate-50 transition">
                <td className="p-3.5">
                  <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                    <img src={getMediaUrl(job.image)} alt={job.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-3.5">
                  <p className="font-bold text-slate-900">{job.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{job.id}</p>
                </td>
                <td className="p-3.5">
                  <p className="font-semibold text-slate-800">{job.location || 'Bengaluru, India'}</p>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                    {job.type || 'Full Time'}
                  </span>
                </td>
                <td className="p-3.5 text-center font-bold text-slate-700">{job.order || 0}</td>
                <td className="p-3.5 text-center">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.isActive !== false
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {job.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(job)}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-[11px] rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {isAddMode ? 'Add New Job Opening' : `Edit Job: ${selectedJob.title}`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={selectedJob.title || ''}
                    onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Frontend Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Slug ID</label>
                  <input
                    type="text"
                    value={selectedJob.id || ''}
                    onChange={(e) => setSelectedJob({ ...selectedJob, id: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. frontend-engineer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={selectedJob.location || ''}
                    onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Bengaluru, India"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <input
                    type="text"
                    value={selectedJob.type || ''}
                    onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Full Time"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={selectedJob.description || ''}
                  onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="Job duties and role description..."
                  required
                />
              </div>

              {/* Job Card Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Card Image</label>
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <img src={getMediaUrl(selectedJob.image)} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1 w-full">
                    <input
                      type="text"
                      value={selectedJob.image || ''}
                      onChange={(e) => setSelectedJob({ ...selectedJob, image: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
                    />
                    <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded inline-block">
                      {uploading ? 'Uploading...' : 'Replace Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, (url) => setSelectedJob({ ...selectedJob, image: url }))}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={selectedJob.order || 0}
                    onChange={(e) => setSelectedJob({ ...selectedJob, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={selectedJob.isActive !== false ? 'true' : 'false'}
                    onChange={(e) => setSelectedJob({ ...selectedJob, isActive: e.target.value === 'true' })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="true">Active (Visible on Website)</option>
                    <option value="false">Inactive (Hidden from Website)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow"
                >
                  {saving ? 'Saving...' : isAddMode ? 'Create Job' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Delete Job Opening</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title}</strong>? This will remove the job opening from MongoDB and the public Career page.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition"
              >
                {saving ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

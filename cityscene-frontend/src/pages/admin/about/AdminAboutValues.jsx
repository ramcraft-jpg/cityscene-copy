import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';

export default function AdminAboutValues() {
  const [data, setData] = useState({
    heading: 'Our Values',
    values: [
      {
        id: 'integrity',
        title: 'Integrity',
        description: 'We act with honesty, ethics, and strong accountability.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        position: 'bottom-left'
      },
      {
        id: 'innovation',
        title: 'Innovation',
        description: 'We embrace creativity, technology, and drive progress.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        position: 'top-left'
      },
      {
        id: 'sustainability',
        title: 'Sustainability',
        description: 'We grow responsibly with care and positive impact.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
        position: 'bottom-left'
      }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Value Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getHomeSectionContent('about-values');
      if (res && res.values) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
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
      setMessage({ type: 'success', text: 'Image uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditIndex(-1);
    setEditingValue({
      id: `value-${Date.now()}`,
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      position: 'bottom-left'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (val, idx) => {
    setEditIndex(idx);
    setEditingValue({ ...val });
    setIsModalOpen(true);
  };

  const handleSaveValueItem = (e) => {
    e.preventDefault();
    if (!editingValue.title) return;

    const newValues = [...(data.values || [])];
    if (editIndex >= 0) {
      newValues[editIndex] = editingValue;
    } else {
      newValues.push(editingValue);
    }

    setData({ ...data, values: newValues });
    setIsModalOpen(false);
  };

  const handleDeleteValueItem = (idx) => {
    const newValues = data.values.filter((_, i) => i !== idx);
    setData({ ...data, values: newValues });
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('about-values', data);
      setMessage({ type: 'success', text: 'Our Values section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update section.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Our Values Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🌟</span> AboutValues Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Our Values section heading, core values list (Integrity, Innovation, Sustainability), images, and positions.
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

      <form onSubmit={handleSubmitAll} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
          <input
            type="text"
            value={data.heading || ''}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Our Values"
            required
          />
        </div>

        {/* Values List Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Values Cards ({data.values?.length || 0})</h2>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition"
          >
            + Add New Value
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.values?.map((val, idx) => (
            <div key={val.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img src={getMediaUrl(val.image)} alt={val.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{val.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{val.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2.5">
                <span className="text-[10px] font-mono text-slate-400">Position: {val.position || 'bottom-left'}</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(val, idx)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteValueItem(idx)}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-[11px] rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save All Values Changes'}
          </button>
        </div>
      </form>

      {/* EDIT / ADD VALUE MODAL */}
      {isModalOpen && editingValue && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editIndex >= 0 ? `Edit Value: ${editingValue.title}` : 'Add New Value Card'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveValueItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Value Title</label>
                <input
                  type="text"
                  value={editingValue.title || ''}
                  onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="e.g. Integrity"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={editingValue.description || ''}
                  onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="e.g. We act with honesty, ethics..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Text Position</label>
                <select
                  value={editingValue.position || 'bottom-left'}
                  onChange={(e) => setEditingValue({ ...editingValue, position: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="bottom-left">bottom-left</option>
                  <option value="top-left">top-left</option>
                  <option value="bottom-right">bottom-right</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Background Image</label>
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <img src={getMediaUrl(editingValue.image)} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1 w-full">
                    <input
                      type="text"
                      value={editingValue.image || ''}
                      onChange={(e) => setEditingValue({ ...editingValue, image: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
                    />
                    <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded inline-block">
                      {uploading ? 'Uploading...' : 'Replace Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, (url) => setEditingValue({ ...editingValue, image: url }))}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
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
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow"
                >
                  Save Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

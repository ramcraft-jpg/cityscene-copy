import React, { useState, useEffect } from 'react';
import { uploadHomeMedia } from '../../../services/homeContentService';
import { getClients, createClient, updateClient, deleteClient } from '../../../services/clientService';
import ConfirmDeleteModal from '../../../components/admin/ConfirmDeleteModal';

export default function AdminPortfolioClients() {
  const [clientsList, setClientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Modal for Adding New Client Image
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const res = await getClients();
      setClientsList(res || []);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load client images.' });
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    return url;
  };

  // Direct Upload New Client Image File
  const handleAddNewImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      setMessage(null);
      const fileUrl = await uploadHomeMedia(file);
      const newId = `client-${Date.now()}`;
      const clientName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Client Image';

      await createClient({
        id: newId,
        name: clientName,
        logo: fileUrl
      });

      setMessage({ type: 'success', text: 'New client image uploaded and added successfully.' });
      setIsAddModalOpen(false);
      setNewImageUrl('');
      loadClients();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to upload new image.' });
    } finally {
      setUploading(false);
    }
  };

  // Add New Image via Pasted URL
  const handleAddImageUrlSubmit = async (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    try {
      setSaving(true);
      setMessage(null);
      const newId = `client-${Date.now()}`;

      await createClient({
        id: newId,
        name: 'Client Image',
        logo: newImageUrl.trim()
      });

      setMessage({ type: 'success', text: 'New image URL added successfully.' });
      setIsAddModalOpen(false);
      setNewImageUrl('');
      loadClients();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to add image URL.' });
    } finally {
      setSaving(false);
    }
  };

  // Replace / Update Existing Client Image URL or File
  const handleReplaceImageFile = async (e, clientItem) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      setMessage(null);
      const fileUrl = await uploadHomeMedia(file);

      await updateClient(clientItem.id || clientItem._id, {
        name: clientItem.name || 'Client Image',
        logo: fileUrl
      });

      setMessage({ type: 'success', text: 'Client image updated successfully.' });
      loadClients();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to replace image.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveImageUrl = async (clientItem) => {
    if (!clientItem.logo || !clientItem.logo.trim()) return;
    try {
      setSaving(true);
      setMessage(null);

      await updateClient(clientItem.id || clientItem._id, {
        name: clientItem.name || 'Client Image',
        logo: clientItem.logo.trim()
      });

      setMessage({ type: 'success', text: 'Client image URL updated successfully.' });
      loadClients();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update image URL.' });
    } finally {
      setSaving(false);
    }
  };

  // Confirm Delete Client Image
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id || deleteTarget._id;

    // Optimistically remove deleted card from UI list immediately
    setClientsList((prev) => prev.filter((c) => (c.id || c._id) !== targetId));
    setDeleteTarget(null);

    try {
      setSaving(true);
      setMessage(null);
      await deleteClient(targetId);
      setMessage({ type: 'success', text: 'Client image deleted successfully.' });
    } catch (err) {
      console.error('[Delete Client Error]:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to delete client image.' });
      loadClients();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Client Images...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🖼️</span> Portfolio Client Images ({clientsList.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Paste image URLs or upload files to manage client brand images displayed on the Portfolio page.
          </p>
        </div>

        {/* Add New Image Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition inline-flex items-center gap-2 shrink-0"
        >
          <span>➕</span>
          <span>Add New Image</span>
        </button>
      </div>

      {/* Alert Banner */}
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

      {/* Client Images Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clientsList.map((client) => (
          <div key={client.id || client._id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3.5 hover:shadow-md transition">
            {/* Image Preview Box */}
            <div className="h-44 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-4 overflow-hidden relative group">
              <img
                src={getMediaUrl(client.logo)}
                alt="Client image"
                className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x100?text=Image+Not+Found';
                }}
              />
              <span className="absolute bottom-1.5 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                ID: {client.id || client._id}
              </span>
            </div>

            {/* Image URL Input Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Image URL or File Path
              </label>
              <input
                type="text"
                value={client.logo || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setClientsList((prev) => prev.map((c) => ((c.id || c._id) === (client.id || client._id) ? { ...c, logo: val } : c)));
                }}
                className="w-full px-3 py-1.5 text-xs font-mono text-slate-700 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="https://... or /uploads/..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <label className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-lg transition inline-flex items-center gap-1">
                <span>🖼️</span>
                <span>{uploading ? 'Uploading...' : 'Replace File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleReplaceImageFile(e, client)}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveImageUrl(client)}
                  disabled={saving}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition shadow-sm"
                >
                  Save URL
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(client)}
                  disabled={saving}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-[11px] rounded-lg transition shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW IMAGE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>➕</span> Add New Client Image
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleAddImageUrlSubmit} className="space-y-4">
              {/* Image Preview Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image Live Preview</label>
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-3">
                  {newImageUrl ? (
                    <img
                      src={getMediaUrl(newImageUrl)}
                      alt="New Image Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x100?text=Invalid+Image+URL';
                      }}
                    />
                  ) : (
                    <div className="text-slate-400 text-xs font-medium">Paste URL or upload image file below</div>
                  )}
                </div>
              </div>

              {/* Paste URL Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paste Image URL</label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="e.g. https://domain.com/files/image.png"
                />
              </div>

              {/* Or Upload File Button */}
              <div className="pt-1 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Or Upload Image File from Computer:</span>
                <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5 shrink-0">
                  <span>📤</span>
                  <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddNewImageFile}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !newImageUrl.trim()}
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Image URL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Client Image"
        itemName={deleteTarget?.name || 'Client Logo'}
        isDeleting={saving}
      />
    </div>
  );
}

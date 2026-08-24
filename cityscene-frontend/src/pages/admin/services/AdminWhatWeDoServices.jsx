import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices, createService, deleteService } from '../../../services/serviceService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { Plus, Edit, Trash2, ExternalLink, Layers } from 'lucide-react';

export default function AdminWhatWeDoServices() {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // New Service Creation State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    id: '',
    shortDesc: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices(true);
      if (data) setServicesList(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load services.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewService = async (e) => {
    e.preventDefault();
    if (!newService.title.trim()) return;

    const cleanId = (newService.id || newService.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      setSaving(true);
      setMessage(null);
      await createService({
        ...newService,
        id: cleanId,
        displayTitle: newService.title,
        path: `/services/${cleanId}`,
        heroDesc: newService.shortDesc,
        order: servicesList.length + 1,
        isActive: true
      });
      setIsAddModalOpen(false);
      setNewService({ title: '', id: '', shortDesc: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' });
      navigate(`/admin/services/${cleanId}`);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to create new service.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (serviceId, serviceTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${serviceTitle || serviceId}"? This action cannot be undone.`)) {
      return;
    }
    try {
      setSaving(true);
      await deleteService(serviceId);
      setMessage({ type: 'success', text: 'Service deleted successfully.' });
      loadServices();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Services Management Cards...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🛠️</span> Services Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage all service cards displayed on the public website. Click any card to edit its unique details.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Service
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

      {/* Services Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((srv) => {
          const serviceId = srv.id || srv._id;
          return (
            <div
              key={serviceId}
              onClick={() => navigate(`/admin/services/${serviceId}`)}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative"
            >
              {/* Card Cover Image */}
              <div className="h-48 w-full bg-slate-900 overflow-hidden relative">
                <img
                  src={getMediaUrl(srv.image)}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Service+Cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Active Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${
                      srv.isActive !== false
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {srv.isActive !== false ? 'Active' : 'Draft'}
                  </span>
                </div>

                {/* ID Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    ID: {serviceId}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3 font-normal">
                    {srv.shortDesc || srv.heroDesc || 'No description provided for this service card.'}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Order: {srv.order || 0}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteService(serviceId, srv.title);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/services/${serviceId}`);
                      }}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {servicesList.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-slate-500 text-sm font-semibold">No Service Cards found in database.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-xl shadow"
          >
            Create First Service
          </button>
        </div>
      )}

      {/* Add New Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add New Service Card</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Solar Installation"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Custom Service ID / Slug (Optional)</label>
                <input
                  type="text"
                  value={newService.id}
                  onChange={(e) => setNewService({ ...newService, id: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  placeholder="e.g. solar-installation"
                />
                <p className="text-[10px] text-slate-400 mt-1">If left empty, auto-generated from title.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows="3"
                  value={newService.shortDesc}
                  onChange={(e) => setNewService({ ...newService, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="Brief summary displayed on website cards..."
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow"
                >
                  {saving ? 'Creating...' : 'Create & Edit Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

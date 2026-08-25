import React, { useState, useEffect } from 'react';
import { getAdminToken } from '../../../services/adminAuthService';
import ConfirmDeleteModal from '../../../components/admin/ConfirmDeleteModal';

export default function AdminContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const res = await fetch('http://localhost:5000/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data && data.data) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error('Error fetching contact inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!deleteTarget) return;
    try {
      const token = getAdminToken();
      const res = await fetch(`http://localhost:5000/api/contact/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeleteTarget(null);
        loadInquiries();
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Visitor Inquiries Inbox...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📥</span> ContactInquiries Inbox ({inquiries.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review messages and contact form submissions sent by public website visitors.
          </p>
        </div>
        <button
          onClick={loadInquiries}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition"
        >
          🔄 Refresh Inbox
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <span className="text-4xl block">📭</span>
          <h3 className="text-base font-bold text-slate-800">No Inquiries Received Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Messages submitted through the public Contact Us form will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Visitor Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Phone Number</th>
                <th className="p-3.5">Message Excerpt</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {inquiries.map((inq) => (
                <tr key={inq._id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{inq.fullName}</p>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">{inq.email}</td>
                  <td className="p-3.5 font-mono text-slate-700">{inq.phone}</td>
                  <td className="p-3.5 max-w-xs">
                    <p className="text-slate-600 truncate">{inq.message}</p>
                  </td>
                  <td className="p-3.5 text-slate-500 text-[11px]">
                    {new Date(inq.createdAt).toLocaleDateString()} {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setDeleteTarget(inq)}
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
      )}

      {/* VIEW INQUIRY MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedInquiry.fullName}</h3>
                <p className="text-xs text-slate-500 font-mono">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Email Address:</span>
                <span className="text-slate-700 font-mono">{selectedInquiry.email}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Phone Number:</span>
                <span className="text-slate-700 font-mono">{selectedInquiry.phone}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Visitor Message:</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteInquiry}
        title="Delete Contact Inquiry"
        itemName={deleteTarget?.fullName || 'Contact Inquiry'}
      />
    </div>
  );
}

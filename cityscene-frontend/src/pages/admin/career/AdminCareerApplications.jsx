import React, { useState, useEffect } from 'react';
import { getAdminToken } from '../../../services/adminAuthService';

export default function AdminCareerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const res = await fetch('http://localhost:5000/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data && data.data) {
        setApplications(data.data);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Candidate Applications Inbox...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📥</span> CareerApplications Inbox ({applications.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review candidate job applications, contact details, position applied for, cover messages, and uploaded resume files.
          </p>
        </div>
        <button
          onClick={loadApplications}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition"
        >
          🔄 Refresh Inbox
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <span className="text-4xl block">📭</span>
          <h3 className="text-base font-bold text-slate-800">No Candidate Applications Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Applications submitted through the public website's Apply Online page will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Candidate Name</th>
                <th className="p-3.5">Position Applied For</th>
                <th className="p-3.5">Email / Phone</th>
                <th className="p-3.5">Resume Attachment</th>
                <th className="p-3.5">Applied Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{app.fullName}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-200 text-[11px]">
                      {app.position}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <p className="text-slate-800 font-semibold">{app.email}</p>
                    <p className="text-[11px] text-slate-400">{app.phone}</p>
                  </td>
                  <td className="p-3.5">
                    {app.resumePath ? (
                      <a
                        href={`http://localhost:5000${app.resumePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline"
                      >
                        📄 {app.resumeOriginalName || 'Download Resume'}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">No file attached</span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-500 text-[11px]">
                    {new Date(app.createdAt).toLocaleDateString()} {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedApp.fullName}</h3>
                <p className="text-xs text-orange-600 font-bold">{selectedApp.position}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Email Address:</span>
                <span className="text-slate-700 font-mono">{selectedApp.email}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Phone Number:</span>
                <span className="text-slate-700 font-mono">{selectedApp.phone}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Candidate Cover Message:</span>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed font-normal">
                  {selectedApp.message || 'No message provided.'}
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Resume Document:</span>
                {selectedApp.resumePath ? (
                  <a
                    href={`http://localhost:5000${selectedApp.resumePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition"
                  >
                    📄 View/Download Resume ({selectedApp.resumeOriginalName || 'Resume.pdf'})
                  </a>
                ) : (
                  <span className="text-slate-400 italic">No resume attached</span>
                )}
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

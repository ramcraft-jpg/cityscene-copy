import React from 'react';

export function AdminLoadingState({ message = 'Loading management data...' }) {
  return (
    <div className="p-8 text-center space-y-3 bg-slate-900 border border-slate-800 rounded-xl my-4">
      <div className="inline-block p-3 rounded-full bg-slate-800 text-orange-400">
        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
      <p className="text-xs font-semibold text-slate-300">{message}</p>
    </div>
  );
}

export function AdminEmptyState({ title = 'No items found', description = 'Click add to create your first item.', actionText, onAction }) {
  return (
    <div className="p-10 text-center space-y-3 bg-slate-900 border border-slate-800 rounded-xl my-4">
      <div className="inline-block p-3.5 rounded-full bg-slate-800 text-slate-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">{description}</p>
      </div>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-md transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export function AdminErrorState({ message = 'Failed to load data from server.', onRetry }) {
  return (
    <div className="p-8 text-center space-y-3 bg-red-950/20 border border-red-900/40 rounded-xl my-4">
      <div className="inline-block p-3 rounded-full bg-red-900/30 text-red-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-bold text-red-400">Unable to sync data</h4>
        <p className="text-xs text-slate-400 mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

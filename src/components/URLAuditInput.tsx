import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface URLAuditInputProps {
  onAuditStart: (url: string) => void;
  isAuditing: boolean;
}

export default function URLAuditInput({ onAuditStart, isAuditing }: URLAuditInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateAndAudit = () => {
    setError('');

    if (!url.trim()) {
      setError('Please enter a business URL');
      return;
    }

    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      onAuditStart(url);
    } catch {
      setError('Invalid URL. Please enter a valid business website.');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Audit a Merchant
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && validateAndAudit()}
            disabled={isAuditing}
            placeholder="example.com or https://example.com"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
          <button
            onClick={validateAndAudit}
            disabled={isAuditing || !url.trim()}
            className="bg-green-500 hover:bg-green-600 disabled:bg-slate-700 text-slate-950 font-semibold px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Audit
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

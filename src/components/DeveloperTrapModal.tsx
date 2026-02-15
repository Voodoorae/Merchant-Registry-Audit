import { AlertTriangle, X } from 'lucide-react';

interface DeveloperTrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function DeveloperTrapModal({ isOpen, onClose, onProceed }: DeveloperTrapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border-2 border-yellow-500 rounded-lg p-8 max-w-md mx-4">
        <div className="flex items-start gap-4 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-white">STOP</h2>
            <p className="text-slate-400 text-sm mt-1">
              This is not for your web developer.
            </p>
          </div>
        </div>

        <p className="text-slate-300 mb-4 leading-relaxed">
          Traditional SEO cannot fix a Discovery Gap. Adding HTML markup or meta tags won't help AI agents find your business.
        </p>

        <p className="text-slate-300 mb-6 leading-relaxed">
          <span className="text-green-400 font-semibold">Use the AI Visibility Toolkit</span> to bridge the gap yourself. Your data must be structured, verified, and present in the ChatGPT Merchant Registry.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-slate-950 transition-colors font-semibold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

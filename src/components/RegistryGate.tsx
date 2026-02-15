import { ExternalLink, Shield } from 'lucide-react';

export default function RegistryGate() {
  return (
    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
      <div className="flex items-start gap-4">
        <div className="bg-green-500/10 p-3 rounded-lg">
          <Shield className="w-6 h-6 text-green-500" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-2">Step 1: The Merchant Registry Gate</h2>
          <p className="text-slate-400 mb-4">
            Before building your Discovery Infrastructure, establish your Entity Clarity with OpenAI's official registry.
          </p>
          <a
            href="https://chatgpt.com/merchants"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-slate-950 font-semibold py-2.5 px-5 rounded-lg transition-colors"
          >
            Verify Identity at OpenAI
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

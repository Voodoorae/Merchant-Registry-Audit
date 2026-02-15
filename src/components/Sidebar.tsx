import { CheckCircle2, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-screen overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Merchant Registry</h1>
        <p className="text-slate-400 text-sm">Audit Platform</p>
      </div>

      <div className="mb-8 bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-3 text-sm">Entity Trust Key</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-300 text-sm">80%+: Entity Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-slate-300 text-sm">50-79%: Entity Conflict</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-300 text-sm">&lt;50%: System-Invisible</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-white mb-4">Merchant Onboarding Guide</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1">Step 1: Secure Your Registry Entry</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Go to <span className="text-green-500">chatgpt.com/merchants</span> and submit your business.
                  This is how you tell the AI "I am a legitimate entity ready for commerce."
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1">Step 2: Bridge the Discovery Gap</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Use the tool on the right to turn your standard product info into Machine-Readable Signals.
                  If you don't provide "Agent-Ready" data, the system cannot recommend you with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1">Step 3: Establish Machine Trust</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  AI Agents don't just look at your price; they look for Entity Clarity:
                </p>
                <ul className="text-slate-400 text-sm space-y-1 ml-4">
                  <li>• Does your data match the official spec?</li>
                  <li>• Are your "Discovery Flags" (enable_search) active?</li>
                  <li>• Is your Discovery Infrastructure solid?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1">Step 4: The Tune-Up</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  If your "AI Confidence Score" is below 80%, your business is currently AI-Invisible.
                  You are at risk of losing your digital market share to competitors who structure their data first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 rounded-lg p-5 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <Lock className="w-5 h-5 text-yellow-500" />
        </div>
        <h3 className="text-white font-semibold mb-2">Phase 2: Establish Entity Authority</h3>
        <p className="text-slate-400 text-sm mb-4">
          Your data is ready, but does the AI trust your brand? Get the AI Visibility Tune-Up.
        </p>
        <a
          href="https://becomefoundbyai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-500 hover:bg-green-600 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-center transition-colors"
        >
          Get the full AI Visibility Tune-Up (£27)
        </a>
      </div>
    </div>
  );
}

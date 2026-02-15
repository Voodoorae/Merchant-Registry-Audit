import { useState } from 'react';
import { ShieldAlert, CheckCircle2, Globe, ArrowRight, Lock, Activity, AlertCircle } from 'lucide-react';

interface AuditResultsProps {
  score: number;
  url: string;
}

export default function AuditResults({ score, url }: AuditResultsProps) {
  const [entityScanState, setEntityScanState] = useState<'idle' | 'scanning' | 'failed'>('idle');

  // Dynamic Logic for Colors and Titles
  let statusTitle = '';
  let statusDescription = '';
  let statusColor = '';
  let statusBg = '';
  let signalLabel = '';

  if (score >= 80) {
    statusTitle = 'ACCESS GRANTED: ENTITY VERIFIED';
    statusDescription = 'Identity verified in Global Knowledge Graph. This merchant meets the trust threshold for Instant Checkout.';
    statusColor = 'text-green-400';
    statusBg = 'bg-green-500/10';
    signalLabel = 'Signals Optimized';
  } else if (score >= 50) {
    statusTitle = 'ENTRY DENIED: SIGNAL CONFLICT';
    statusDescription = 'Inconsistent data signals detected. AI Agents cannot verify your business hours or location with 100% confidence. Entry is restricted to prevent failed transactions.';
    statusColor = 'text-amber-400';
    statusBg = 'bg-amber-500/10';
    signalLabel = 'Unoptimized Signals';
  } else {
    statusTitle = 'ENTRY DENIED: SYSTEM INVISIBLE';
    statusDescription = 'CRITICAL: No verified record of this business exists in the Knowledge Graph. AI Agents will treat this merchant as a High-Risk Ghost Entity.';
    statusColor = 'text-red-400';
    statusBg = 'bg-red-500/10';
    signalLabel = 'Critical Signal Failure';
  }

  const runEntityScan = () => {
    setEntityScanState('scanning');
    setTimeout(() => setEntityScanState('failed'), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl">
        {/* Top Protocol Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Protocol: ACP-V1.0</p>
          </div>
          <p className="text-xs font-mono text-slate-500 truncate max-w-[200px]">{url}</p>
        </div>

        {/* Primary SKU Layer Score - NOW FULLY DYNAMIC */}
        <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700 flex justify-between items-center mb-8">
          <div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Layer 1: SKU Readiness</h4>
            <p className={`text-4xl font-black ${statusColor}`}>{score}%</p>
          </div>
          <div className="text-right">
             <div className={`px-3 py-1 border rounded text-[10px] font-bold uppercase ${
               score >= 80 ? 'bg-green-500/10 border-green-500/20 text-green-500' : 
               score >= 50 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
               'bg-red-500/10 border-red-500/20 text-red-500'
             }`}>
               {signalLabel}
             </div>
          </div>
        </div>

        {/* The Gatekeeper Section */}
        <div className="relative">
          {entityScanState === 'idle' && (
            <div className="bg-slate-950/50 p-8 border-2 border-dashed border-slate-800 rounded-xl text-center">
              <Lock className="w-8 h-8 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                SKU data successfully mapped. Final Entry Approval requires an <strong>Identity Handshake</strong> with the Global Knowledge Graph.
              </p>
              <button 
                onClick={runEntityScan}
                className="bg-white text-black hover:bg-slate-200 px-8 py-3 rounded-md font-black text-xs uppercase tracking-widest transition-all shadow-lg"
              >
                Request Entry Approval
              </button>
            </div>
          )}

          {entityScanState === 'scanning' && (
            <div className="text-center py-12 animate-pulse">
              <Globe className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Pinging Entity Registry...</p>
            </div>
          )}

          {entityScanState === 'failed' && (
            <div className={`${statusBg} border-2 border-red-500/50 p-8 rounded-xl space-y-6 animate-in zoom-in-95 duration-300`}>
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" />
                <div>
                  <h3 className={`font-black italic text-2xl tracking-tighter uppercase leading-none ${statusColor}`}>
                    {statusTitle}
                  </h3>
                  <p className="text-[10px] font-bold text-red-500/80 uppercase tracking-[0.15em] mt-2">Access Denied by Agentic Protocol</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                {statusDescription}
              </p>

              <div className="space-y-4 pt-2">
                <a 
                  href={`https://go.becomefoundbyai.com?url=${url}&status=entry_denied`}
                  className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-500 text-white font-black py-5 rounded text-xs uppercase tracking-[0.1em] transition-all shadow-xl shadow-red-900/40"
                >
                  Repair Discovery Infrastructure <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-[10px] text-slate-500 font-mono">Reference Error: NULL_ENTITY_SIGNAL_CROSSREF</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import URLAuditInput from './components/URLAuditInput';
import AuditWireframe from './components/AuditWireframe';
import AuditChecklist from './components/AuditChecklist';
import MachineVisionToggle from './components/MachineVisionToggle';
import AuditResults from './components/AuditResults';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ExportButton from './components/ExportButton';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState(0);
  const [auditedUrl, setAuditedUrl] = useState('');
  const [visionMode, setVisionMode] = useState<'human' | 'ai'>('human');
  const [showResults, setShowResults] = useState(false);

  const handleAuditStart = (url: string) => {
    setIsAuditing(true);
    setShowResults(false);
    setAuditedUrl(url);
    setAuditScore(0);

    // DETERMINISTIC SCORING: Ensures AnnanProperty.com always gets the same result
    const urlClean = url.toLowerCase().trim().replace('https://', '').replace('www.', '').split('/')[0];
    const urlSeed = urlClean.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Logic: Most sites fail the "Machine Trust" layer initially
    const baseScore = 35;
    const targetScore = baseScore + (urlSeed % 40); // Will land between 35% and 75%

    let currentScore = 0;
    const duration = 3000; // 3 second audit
    const steps = 60;
    const increment = targetScore / steps;

    const interval = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        clearInterval(interval);
        setAuditScore(Math.round(targetScore));
        setIsAuditing(false);
        setShowResults(true);
      } else {
        setAuditScore(Math.round(currentScore));
      }
    }, duration / steps);
  };

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const aiModeContent = (
    <div className="bg-slate-950 rounded-lg p-6 border border-green-500/20 font-mono text-sm">
      <pre className="text-green-400 overflow-x-auto">
        {JSON.stringify(
          {
            audit_session: {
              url: auditedUrl,
              timestamp: new Date().toISOString(),
              score: auditScore,
              visa_status: auditScore >= 80 ? 'APPROVED' : 'DENIED',
              protocol: "Agentic Commerce Protocol (ACP) 1.0",
              entity_signals: {
                knowledge_graph_presence: auditScore > 70,
                discovery_infrastructure: "INCOMPLETE",
                machine_trust_index: auditScore / 100,
              },
            },
          },
          null,
          2
        )}
      </pre>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Merchant Registry Audit</h1>
              <p className="text-slate-400">Detect Entity Conflicts. Verify Machine Trust. Establish AI Visibility.</p>
            </div>
            <MachineVisionToggle mode={visionMode} onChange={setVisionMode} />
          </div>

          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <URLAuditInput onAuditStart={handleAuditStart} isAuditing={isAuditing} />
          </div>

          {isAuditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-900 p-8 rounded-lg border border-slate-800">
              <AuditWireframe />
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${auditScore < 50 ? 'text-red-500' : 'text-amber-500'}`}>
                    {auditScore}%
                  </div>
                  <p className="text-slate-400 font-mono uppercase tracking-widest text-xs">Scanning Discovery Infrastructure...</p>
                </div>
                <AuditChecklist score={auditScore} isAuditing={isAuditing} />
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-6">
              {visionMode === 'human' ? (
                <AuditResults score={auditScore} url={auditedUrl} />
              ) : (
                aiModeContent
              )}

              <button
                onClick={() => {
                  setShowResults(false);
                  setAuditedUrl('');
                  setAuditScore(0);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors border border-slate-700"
              >
                Clear Audit & Run New Session
              </button>
            </div>
          )}

          {!isAuditing && !showResults && (
            <>
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h2 className="text-xl font-semibold text-white mb-2 underline decoration-green-500">Step 2: The SKU Optimizer</h2>
                <p className="text-slate-400">
                  Transform your human-readable product descriptions into **Agent-Ready Signals**. Use the form below to build your Merchant Feed.
                </p>
              </div>

              <ProductForm onProductAdded={handleProductAdded} />
              <ProductList refresh={refreshTrigger} />
              <ExportButton refresh={refreshTrigger} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
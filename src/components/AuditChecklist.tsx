import { CheckCircle2, AlertCircle } from 'lucide-react';

interface AuditChecklistProps {
  score: number;
  isAuditing: boolean;
}

export default function AuditChecklist({ score, isAuditing }: AuditChecklistProps) {
  const checks = [
    { label: 'Verifying Entity Trust', threshold: 0 },
    { label: 'Detecting Entity Conflict', threshold: 25 },
    { label: 'Validating Machine-Readability', threshold: 50 },
    { label: 'Assessing Conversational Reasoning', threshold: 75 },
  ];

  const redLinethrough = score >= 50;
  const amberLinethrough = score >= 80;

  return (
    <div className="space-y-3">
      {checks.map((check, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 transition-all ${
            score >= check.threshold ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <div>
            {score >= check.threshold ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-slate-600" />
            )}
          </div>
          <span className="text-slate-300 text-sm">{check.label}</span>
        </div>
      ))}

      <div className="mt-6 pt-4 border-t border-slate-700 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${redLinethrough ? 'line-through text-red-400/50' : 'text-red-400'}`}>
            Red: System-Invisible
          </span>
          {redLinethrough && <CheckCircle2 className="w-4 h-4 text-green-500" />}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${amberLinethrough ? 'line-through text-yellow-400/50' : 'text-yellow-400'}`}>
            Amber: Entity Conflict
          </span>
          {amberLinethrough && <CheckCircle2 className="w-4 h-4 text-green-500" />}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-green-400">Green: Entity Verified</span>
          {score >= 80 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
        </div>
      </div>
    </div>
  );
}

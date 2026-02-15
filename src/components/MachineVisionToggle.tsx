import { Monitor, Terminal } from 'lucide-react';

interface MachineVisionToggleProps {
  mode: 'human' | 'ai';
  onChange: (mode: 'human' | 'ai') => void;
}

export default function MachineVisionToggle({ mode, onChange }: MachineVisionToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
      <button
        onClick={() => onChange('human')}
        className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
          mode === 'human'
            ? 'bg-green-500 text-slate-950'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        <Monitor className="w-4 h-4" />
        Human Mode
      </button>
      <button
        onClick={() => onChange('ai')}
        className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
          mode === 'ai'
            ? 'bg-green-500 text-slate-950'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        <Terminal className="w-4 h-4" />
        AI Mode
      </button>
    </div>
  );
}

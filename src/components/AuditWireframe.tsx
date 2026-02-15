import { useEffect, useState } from 'react';

export default function AuditWireframe() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    /* Changed h-64 to h-24 (approx 96px/2.5cm) to save vertical space */
    <div className="flex items-center justify-center h-24 perspective">
      <svg
        /* Reduced width/height from 160 to 80 (approx 2cm) */
        width="80"
        height="80"
        viewBox="0 0 160 160"
        style={{
          transform: `rotateX(${rotation}deg) rotateY(${rotation * 0.7}deg) rotateZ(${rotation * 0.5}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.016s linear',
        }}
      >
        <g stroke="#22c55e" strokeWidth="2" fill="none">
          <rect x="20" y="20" width="120" height="120" />
          <line x1="20" y1="20" x2="80" y2="80" />
          <line x1="140" y1="20" x2="80" y2="80" />
          <line x1="20" y1="140" x2="80" y2="80" />
          <line x1="140" y1="140" x2="80" y2="80" />
          <circle cx="80" cy="80" r="8" fill="#22c55e" opacity="0.8" />
          <circle
            cx="80"
            cy="80"
            r="40"
            opacity="0.3"
            style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
          />
          <circle
            cx="80"
            cy="80"
            r="60"
            opacity="0.1"
            style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.3s' }}
          />
        </g>
        <defs>
          <style>{`
            @keyframes pulse {
              0%, 100% { stroke-width: 2; opacity: 0.3; }
              50% { stroke-width: 1; opacity: 0.1; }
            }
          `}</style>
        </defs>
      </svg>
    </div>
  );
}
import { useState } from 'react';
import { Eye, Code } from 'lucide-react';
import { Product } from '../types/product';

interface ToggleViewProps {
  product: Product;
}

export default function ToggleView({ product }: ToggleViewProps) {
  const [view, setView] = useState<'customer' | 'agent'>('customer');

  const agentReadyData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    description: product.description,
    technicalSpecifications: product.technical_specs || {},
    qaData: product.qa_data || {},
    discoveryFlags: {
      enableSearch: product.enable_search,
      confidenceScore: product.confidence_score,
    },
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('customer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'customer'
              ? 'bg-green-500 text-slate-950'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          Customer View
        </button>
        <button
          onClick={() => setView('agent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            view === 'agent'
              ? 'bg-green-500 text-slate-950'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Code className="w-4 h-4" />
          Agent View
        </button>
      </div>

      {view === 'customer' ? (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-300 leading-relaxed">{product.description}</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono">
            {JSON.stringify(agentReadyData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

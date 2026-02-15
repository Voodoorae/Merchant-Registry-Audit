import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import DeveloperTrapModal from './DeveloperTrapModal';

interface ExportButtonProps {
  refresh: number;
}

export default function ExportButton({ refresh }: ExportButtonProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDevTrap, setShowDevTrap] = useState(false);
  const [pendingExportType, setPendingExportType] = useState<'json' | 'csv' | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleExportClick = (type: 'json' | 'csv') => {
    setShowDevTrap(true);
    setPendingExportType(type);
  };

  const procedeWithExport = () => {
    setShowDevTrap(false);
    if (pendingExportType === 'json') {
      exportJSON();
    } else {
      exportCSV();
    }
    setPendingExportType(null);
  };

  const exportJSON = () => {
    const agentReadyFeed = products.map(product => ({
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
      inventory_quantity: product.stock,
      enable_search: product.enable_search,
      technical_specifications: product.technical_specs || {},
      q_and_a: product.qa_data || {},
      confidence_score: product.confidence_score,
    }));

    const blob = new Blob([JSON.stringify(agentReadyFeed, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openai-merchant-feed.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['Title', 'Price', 'Stock', 'Description', 'Confidence Score', 'Discovery Enabled'];
    const rows = products.map(product => [
      product.title,
      product.price,
      product.stock,
      `"${product.description.replace(/"/g, '""')}"`,
      product.confidence_score,
      product.enable_search ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openai-merchant-feed.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <DeveloperTrapModal
        isOpen={showDevTrap}
        onClose={() => {
          setShowDevTrap(false);
          setPendingExportType(null);
        }}
        onProceed={procedeWithExport}
      />

      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4">One-Click Export</h2>
        <p className="text-slate-400 mb-6">
          Download your Agent-Ready Feed formatted to the official OpenAI Merchant Feed Specification.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => handleExportClick('json')}
            disabled={products.length === 0}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download JSON Feed
          </button>

          <button
            onClick={() => handleExportClick('csv')}
            disabled={products.length === 0}
            className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>

        <div className="mt-4 p-4 bg-slate-800 rounded-lg text-sm text-slate-400">
          <p>
            After exporting, submit your feed to{' '}
            <a href="https://becomefoundbyai.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
              becomefoundbyai.com
            </a>
            {' '}to establish Entity Authority.
          </p>
        </div>
      </div>
    </>
  );
}

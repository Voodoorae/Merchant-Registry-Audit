import { useState, useEffect } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { getScoreStatus } from '../utils/confidenceScore';
import ToggleView from './ToggleView';

interface ProductListProps {
  refresh: number;
}

export default function ProductList({ refresh }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const averageScore = products.length > 0
    ? Math.round(products.reduce((sum, p) => sum + p.confidence_score, 0) / products.length)
    : 0;

  const scoreStatus = getScoreStatus(averageScore);

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 text-center">
        <p className="text-slate-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4">Discovery Infrastructure Audit</h2>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">AI Confidence Score</h3>
            <div className="text-right">
              <div className={`text-4xl font-bold ${scoreStatus.color}`}>{averageScore}</div>
              <div className="text-sm text-slate-400 mt-1">out of 100</div>
            </div>
          </div>

          <div className={`text-sm font-medium mb-2 ${scoreStatus.color}`}>{scoreStatus.label}</div>
          <p className="text-slate-400 text-sm">{scoreStatus.message}</p>

          {averageScore < 80 && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 text-sm font-medium mb-1">System-Level Invisibility Risk</p>
                <p className="text-red-400/80 text-sm">
                  Add technical specifications and Q&A data to improve your Machine Trust signals.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 text-center">
          <p className="text-slate-400">No products yet. Add your first product to begin building Machine Trust.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{product.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>Price: £{product.price.toFixed(2)}</span>
                      <span>Stock: {product.stock}</span>
                      <span className={getScoreStatus(product.confidence_score).color}>
                        Score: {product.confidence_score}/100
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <ToggleView product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

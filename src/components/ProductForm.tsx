import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProductFormData } from '../types/product';
import { calculateConfidenceScore } from '../utils/confidenceScore';

interface ProductFormProps {
  onProductAdded: () => void;
}

export default function ProductForm({ onProductAdded }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    price: '',
    stock: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'bulk'>('quick');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        technical_specs: {},
        qa_data: {},
        enable_search: true,
        inventory_quantity: parseInt(formData.stock),
      };

      const confidence_score = calculateConfidenceScore(productData);

      const { error } = await supabase
        .from('products')
        .insert([{ ...productData, confidence_score }]);

      if (error) throw error;

      setFormData({ title: '', price: '', stock: '', description: '' });
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSubmitting(true);
    try {
      const text = await file.text();
      const rows = text.split('\n').slice(1);

      const products = rows
        .filter(row => row.trim())
        .map(row => {
          const [title, price, stock, description] = row.split(',').map(s => s.trim());
          const productData = {
            title,
            price: parseFloat(price),
            stock: parseInt(stock),
            description,
            technical_specs: {},
            qa_data: {},
            enable_search: true,
            inventory_quantity: parseInt(stock),
          };
          return {
            ...productData,
            confidence_score: calculateConfidenceScore(productData),
          };
        });

      const { error } = await supabase.from('products').insert(products);
      if (error) throw error;

      onProductAdded();
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading CSV:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
      <h2 className="text-xl font-semibold text-white mb-4">Step 2: Simple SKU Input</h2>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('quick')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'quick'
              ? 'bg-green-500 text-slate-950'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Quick Entry
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'bulk'
              ? 'bg-green-500 text-slate-950'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Bulk Upload
        </button>
      </div>

      {activeTab === 'quick' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Product Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Describe your product in detail"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      ) : (
        <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Upload CSV File</h3>
          <p className="text-slate-400 text-sm mb-4">
            Format: title, price, stock, description
          </p>
          <label className="inline-block">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              disabled={isSubmitting}
              className="hidden"
            />
            <span className="bg-green-500 hover:bg-green-600 disabled:bg-slate-700 text-slate-950 font-semibold py-2.5 px-6 rounded-lg cursor-pointer inline-block transition-colors">
              {isSubmitting ? 'Uploading...' : 'Choose File'}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

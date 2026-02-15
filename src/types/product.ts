export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  technical_specs?: Record<string, unknown>;
  qa_data?: Record<string, unknown>;
  enable_search: boolean;
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  title: string;
  price: string;
  stock: string;
  description: string;
}

import { Product } from '../types/product';

export function calculateConfidenceScore(product: Partial<Product>): number {
  let score = 0;

  if (product.title && product.title.length > 10) score += 20;
  if (product.description && product.description.length > 50) score += 20;
  if (product.price && product.price > 0) score += 10;
  if (product.stock !== undefined && product.stock >= 0) score += 10;

  if (product.technical_specs && Object.keys(product.technical_specs).length > 0) {
    score += 20;
  } else {
    score -= 10;
  }

  if (product.qa_data && Object.keys(product.qa_data).length > 0) {
    score += 20;
  } else {
    score -= 10;
  }

  if (product.enable_search) score += 10;

  return Math.max(0, Math.min(100, score));
}

export function getScoreStatus(score: number): {
  label: string;
  color: string;
  message: string;
} {
  if (score >= 80) {
    return {
      label: 'Agent-Ready',
      color: 'text-green-500',
      message: 'Your product has strong Machine Trust signals.',
    };
  } else if (score >= 50) {
    return {
      label: 'Partial Visibility',
      color: 'text-yellow-500',
      message: 'Your product is visible but lacks Entity Clarity.',
    };
  } else {
    return {
      label: 'System-Level Invisibility Risk',
      color: 'text-red-500',
      message: 'Critical: AI Agents cannot recommend your product with confidence.',
    };
  }
}
